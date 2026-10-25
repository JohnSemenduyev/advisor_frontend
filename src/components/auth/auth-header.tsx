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
  const isRequestor = role === "requestor";
  const isBidder = role === "bidder";

  return (
    <header className="ba-header h-16 w-full flex items-center justify-between px-4 sm:px-8 md:px-12 relative z-20">
      {/* Left: Brand */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1.5 text-white font-extrabold text-lg tracking-tight hover:opacity-90 transition-opacity">
          <span className="text-[#a8d3ed]">Business</span>
          <span className="text-white">Adviser</span>
        </Link>
      </div>

      {/* Right: Chrome action buttons */}
      <nav className="flex items-center gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={onOpenSignUp}
          className="ba-chrome-btn flex items-center gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide cursor-pointer"
        >
          <UserPlus className="w-4 h-4 text-[#344d60]" />
          <span>Sign Up</span>
        </button>

        <button
          type="button"
          onClick={onOpenLogin}
          className="ba-chrome-btn flex items-center gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide cursor-pointer"
        >
          <User className="w-4 h-4 text-[#344d60]" />
          <span>Log In</span>
        </button>
      </nav>
    </header>
  );
}
