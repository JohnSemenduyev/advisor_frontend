"use client";

import React from "react";
import Image from "next/image";

export function BrandLogo() {
  return (
    <div className="flex flex-col items-center text-center w-full">
      <div className="w-[min(530px,75%)] mx-auto mb-1">
        <Image
          src="/images/business-adviser-logo.png"
          alt="BusinessAdviser logo"
          width={675}
          height={380}
          priority
          className="w-full h-auto object-contain mx-auto"
        />
      </div>

      <div className="eyebrow text-[#236daf] text-[clamp(12px,1.15vw,17px)] font-extrabold uppercase tracking-[0.24em] mt-[14px] mb-[8px]">
        CONNECTING BUSINESSES WITH OPPORTUNITIES
      </div>

      <p className="tagline text-[#66889a] text-[clamp(16px,1.6vw,21px)] mt-[8px] mb-[20px] leading-[1.4]">
        Post project requests. Receive bids. Grow your business.
      </p>
    </div>
  );
}
