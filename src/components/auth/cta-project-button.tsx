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
        className="ba-cta w-full max-w-[510px] min-h-[82px] sm:min-h-[88px] px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl flex items-center gap-4 sm:gap-5 text-left text-white cursor-pointer shadow-lg"
      >
        <div className="ba-cta-icon w-11 h-11 sm:w-12 sm:h-12 flex-none rounded-xl flex items-center justify-center p-2.5">
          <FileText className="w-full h-full text-white" strokeWidth={2} />
        </div>

        <div className="flex-1 min-w-0">
          <strong className="block text-lg sm:text-xl font-bold leading-tight tracking-tight text-white">
            Post a Project Request
          </strong>
          <small className="block text-[10px] sm:text-[11px] font-bold tracking-[0.08em] text-[#d8efff] uppercase mt-1">
            TELL US WHAT YOU NEED
          </small>
        </div>

        <div className="flex-none text-2xl sm:text-3xl text-white font-light pr-1">
          <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
      </button>
    </div>
  );
}
