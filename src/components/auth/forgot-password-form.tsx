"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { AuthInput } from "./auth-input";

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
  onSuccess?: (email: string) => void;
}

export function ForgotPasswordForm({
  onBackToLogin,
  onSuccess,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      if (onSuccess) {
        onSuccess(email);
      }
    }, 700);
  };

  return (
    <div className="space-y-4">
      {/* Padlock Icon with Sparkle Rays matching Screenshot 1 */}
      <div className="flex items-center gap-3.5 mb-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e4f3fd] to-[#c9e6fa] border border-[#a8d6f5] flex items-center justify-center text-[#0971b8] shadow-sm flex-none">
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            <circle cx="12" cy="16" r="1.2" fill="currentColor" />
            {/* Sparkle rays */}
            <path d="M19.5 5.5l1.5-1.5" strokeWidth="1.8" />
            <path d="M21 8h2" strokeWidth="1.8" />
            <path d="M16 2.5V1" strokeWidth="1.8" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#173a57] tracking-tight">
            Forgot Password?
          </h2>
          <p className="text-xs sm:text-sm text-[#5d7c90] mt-0.5 leading-relaxed">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>
        </div>
      </div>

      {isSent ? (
        <div className="space-y-4 py-2">
          <div className="p-4 rounded-2xl bg-[#eaf7ee] border border-[#a2dfb8] text-[#136838] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 flex-none mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="block font-bold">Reset link sent!</strong>
              We have emailed instructions to{" "}
              <span className="font-semibold underline">{email}</span>. Please check your inbox and follow the link.
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-[#18649b] hover:bg-[#e4eff6] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Log In</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0066c0] via-[#0055a5] to-[#00478a] hover:from-[#0074d9] hover:to-[#0055a5] text-white font-bold text-sm tracking-wide cursor-pointer shadow-md shadow-[#00478a]/30 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Sending instructions...</span>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          {onBackToLogin && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onBackToLogin}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#547388] hover:text-[#18649b] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Log In</span>
              </button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
