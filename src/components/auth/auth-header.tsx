"use client";

import React from "react";
import Link from "next/link";
import { User, UserPlus, ArrowLeftRight, Briefcase, Gavel } from "lucide-react";

interface AuthHeaderProps {
  role?: "requestor" | "bidder";
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
}

export function AuthHeader({
  role,
  onOpenLogin,
  onOpenSignUp,
}: AuthHeaderProps) {
  return (
    <header className="ba-header h-16 w-full flex items-center justify-end px-[clamp(20px,3vw,48px)] relative z-20">
      {/* Right: Chrome action buttons matching client reference */}
      <nav className="nav-actions flex items-center gap-3 ml-auto">
        <button
          type="button"
          onClick={onOpenSignUp}
          className="ba-chrome-btn flex items-center gap-[7px] px-4 py-[7px] rounded-[22px] text-[13px] font-semibold tracking-wide cursor-pointer"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4 text-[#344d60]"
          >
            <circle cx="9" cy="8" r="4" />
            <path d="M2 21v-3c0-5 14-5 14 0v3M19 6v8m-4-4h8" />
          </svg>
          <span>Sign Up</span>
        </button>

        <button
          type="button"
          onClick={onOpenLogin}
          className="ba-chrome-btn flex items-center gap-[7px] px-4 py-[7px] rounded-[22px] text-[13px] font-semibold tracking-wide cursor-pointer"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4 text-[#344d60]"
          >
            <circle cx="12" cy="7" r="4" />
            <path d="M4 21v-3c0-6 16-6 16 0v3" />
          </svg>
          <span>Log In</span>
        </button>
      </nav>
    </header>
  );
}
