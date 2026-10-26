"use client";

import React from "react";
import { FileText, ArrowRight } from "lucide-react";

interface CtaProjectButtonProps {
  onClick: () => void;
}

export function CtaProjectButton({ onClick }: CtaProjectButtonProps) {
  return (
    <div className="flex justify-center w-full px-4">
      <button
        type="button"
        onClick={onClick}
        className="ba-cta w-full max-w-[510px] min-h-[88px] px-[25px] py-[17px] rounded-[16px] flex items-center gap-[18px] text-left text-white cursor-pointer"
      >
        <div className="ba-cta-icon w-[49px] h-[49px] flex-none rounded-[13px] p-[9px] flex items-center justify-center">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 32 32"
            className="w-full h-full text-white"
          >
            <path d="M7 3h12l6 6v20H7zM19 3v7h6M11 15h10M11 20h10M11 25h7" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <strong className="block text-[21px] font-bold leading-[1.2] text-white">
            Post a Project Request
          </strong>
          <small className="block text-[11px] font-bold tracking-[0.08em] text-[#dbe4e9] uppercase mt-[5px]">
            TELL US WHAT YOU NEED
          </small>
        </div>

        <span className="cta-arrow text-[29px] text-white leading-none font-normal flex-none">
          →
        </span>
      </button>
    </div>
  );
}
