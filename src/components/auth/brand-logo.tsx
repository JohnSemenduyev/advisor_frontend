"use client";

import React from "react";
import Image from "next/image";

export function BrandLogo() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-full max-w-[530px] px-4">
        <Image
          src="/images/business-adviser-logo.png"
          alt="BusinessAdviser Logo"
          width={675}
          height={380}
          priority
          className="w-full h-auto object-contain mx-auto drop-shadow-[0_5px_12px_rgba(30,102,152,0.15)]"
        />
      </div>

      <div className="eyebrow text-[#1c669e] text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-[0.24em] mt-3 sm:mt-4 mb-2">
        CONNECTING BUSINESSES WITH OPPORTUNITIES
      </div>

      <p className="tagline text-[#5886ab] text-sm sm:text-base md:text-lg mb-5 sm:mb-6">
        Post project requests. Receive bids. Grow your business.
      </p>
    </div>
  );
}
