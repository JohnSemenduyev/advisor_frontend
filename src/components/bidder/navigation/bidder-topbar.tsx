"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, User, LogOut } from "lucide-react";

interface BidderTopbarProps {
  userName?: string;
  avatarLetter?: string;
}

export function BidderTopbar({
  userName = "John Gomez",
  avatarLetter = "J",
}: BidderTopbarProps) {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const tabs: { name: string; href: string; badge?: string }[] = [
    { name: "Homepage", href: "/bidder/dashboard" },
    { name: "Search Requests", href: "/bidder/search-requests" },
    { name: "My Bids", href: "/bidder/my-bids" },
    { name: "Messages", href: "/bidder/messages" },
    { name: "Notifications", href: "/bidder/notifications" },
  ];

  return (
    <header className="maximal-topbar w-full px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-40">
      {/* Interlocking Raised Capsule Tabs */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <nav aria-label="Main navigation" className="maximal-tabs">
          {tabs.map((tab) => {
            const isActive =
              tab.name === "Homepage"
                ? pathname.includes("/bidder/profile") || pathname === "/bidder" || pathname === "/bidder/dashboard"
                : tab.name === "Search Requests"
                ? pathname.includes("/bidder/search-requests") || pathname.includes("/bidder/projects") || pathname.includes("/bidder/submit-bid")
                : pathname.startsWith(tab.href);

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`maximal-tab ${isActive ? "active" : ""}`}
              >
                <span>{tab.name}</span>
                {tab.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase rounded-full bg-[#e53935] text-white tracking-wider shadow-xs leading-none">
                    {tab.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Badge on the Right */}
      <div className="relative flex-none">
        <button
          type="button"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#f7f9f9] to-[#d7e0e3] border border-[#b8c4c9] text-[#293840] flex items-center justify-center font-bold text-xs shadow-md flex-none">
            {avatarLetter}
          </div>
          <span className="text-[13px] font-[650] tracking-tight text-white hidden sm:inline drop-shadow-[0_1px_1px_rgba(8,19,27,0.42)]">
            {userName}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#cfdbe3] hidden sm:inline" />
        </button>

        {/* User Dropdown */}
        {userMenuOpen && (
          <div className="absolute right-0 top-[calc(100%+8px)] w-48 p-2 rounded-2xl bg-[#192732] border border-[#3b5364] shadow-2xl z-50 text-xs text-[#cfdbe3] space-y-1 animate-in fade-in duration-100">
            <div className="px-3 py-2 border-b border-[#293d4c] mb-1">
              <p className="font-bold text-white text-sm truncate">{userName}</p>
              <p className="text-[11px] text-[#7d99aa]">Primary Role: Bidder</p>
            </div>
            <Link
              href="/bidder/profile"
              onClick={() => setUserMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#253948] text-white transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#5daecf]" />
              <span>Profile Information</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setUserMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#f39090] hover:bg-[#341e22]/50 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
