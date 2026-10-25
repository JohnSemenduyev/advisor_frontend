"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { AuthInput } from "./auth-input";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
  onSwitchToForgotPassword?: () => void;
}

export function LoginForm({
  onSuccess,
  onSwitchToSignup,
  onSwitchToForgotPassword,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("user@business.com");
  const [password, setPassword] = useState("demo1234");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/bidder/profile");
      }
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <AuthInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email address"
        icon={<Mail className="h-4 w-4" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <AuthInput
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••"
        icon={<Lock className="h-4 w-4" />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <div className="flex items-center justify-between text-xs text-[#50788c]">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="rounded border-[#b9d5e3] text-[#25678b] focus:ring-[#3a9dbd]"
          />
          <span>Remember me</span>
        </label>

        <button
          type="button"
          onClick={onSwitchToForgotPassword}
          className="font-semibold text-[#1c669e] hover:underline cursor-pointer"
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="ba-submit-btn w-full py-3 px-4 rounded-xl text-white font-bold text-sm tracking-wide cursor-pointer shadow-md flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-emerald-300 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Log In</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {onSwitchToSignup && (
        <div className="pt-2 text-center text-xs text-[#6d8a9a]">
          <span>Don&apos;t have an account? </span>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-bold text-[#1c669e] hover:underline cursor-pointer"
          >
            Register now
          </button>
        </div>
      )}
    </form>
  );
}
