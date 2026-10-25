"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeroBackground } from "./hero-background";
import { ForgotPasswordForm } from "./forgot-password-form";

interface ForgotPasswordViewProps {
  role?: "requestor" | "bidder";
}

export function ForgotPasswordView({ role = "bidder" }: ForgotPasswordViewProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#082846] text-[#1b3447]">
      {/* Left Hero Area matching Screenshot 1 */}
      <div className="relative flex-1 min-h-[420px] lg:min-h-screen flex items-center justify-center p-6 sm:p-12 overflow-hidden">
        {/* City & Sky Backdrop */}
        <HeroBackground />

        {/* Branding & Headline */}
        <div className="relative z-10 max-w-lg text-center">
          <div className="relative w-[320px] sm:w-[420px] h-[90px] sm:h-[120px] mx-auto mb-3">
            <Image
              src="/images/business-adviser-logo.png"
              alt="BusinessAdviser Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-xs sm:text-sm font-extrabold tracking-[0.25em] text-[#115b8b] uppercase mb-3">
            Connecting Businesses with Opportunities
          </h1>

          <p className="text-sm sm:text-base text-[#416279] font-medium leading-relaxed max-w-md mx-auto">
            Reset your password and get back to your account.
          </p>
        </div>
      </div>

      {/* Right Area with Floating Card matching Screenshot 1 */}
      <div className="w-full lg:w-[500px] xl:w-[560px] bg-gradient-to-b from-[#0e3b65] to-[#072440] flex items-center justify-center p-5 sm:p-10 lg:p-12 relative z-10">
        <div className="w-full max-w-[440px] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/90">
          <ForgotPasswordForm
            onBackToLogin={() => router.push(`/${role}/login`)}
            onSuccess={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
