"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  const tabs: { name: string; href: string; badge?: string }[] = [
    { name: "Homepage", href: "/bidder/dashboard" },
    { name: "Search Requests", href: "/bidder/search-requests" },
    { name: "My Bids", href: "/bidder/my-bids" },
    { name: "Messages", href: "/bidder/messages" },
    { name: "Notifications", href: "/bidder/notifications" },
  ];

  return (
    <header className="maximal-topbar w-full px-4 flex items-center justify-between gap-4 sticky top-0 z-40">
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
      <div className="relative flex-none" ref={menuRef}>
        <button
          type="button"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-white"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#f7f9f9] to-[#d7e0e3] border border-[#b8c4c9] text-[#293840] flex items-center justify-center font-bold text-xs shadow-md flex-none">
            {avatarLetter}
          </div>
          <span className="text-[12.5px] font-bold tracking-tight text-white hidden sm:inline drop-shadow-[0_1px_1px_rgba(8,19,27,0.3)]">
            {userName}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#cfdbe3] hidden sm:inline" />
        </button>

        {/* User Dropdown matching Client Reference 1:1 */}
        {userMenuOpen && (
          <div className="absolute right-0 top-[calc(100%+6px)] w-[146px] rounded-[10px] bg-white border border-[#dce2e6] shadow-[0_4px_16px_rgba(0,0,0,0.09),0_1px_3px_rgba(0,0,0,0.05)] z-50 animate-in fade-in duration-100 text-left px-3.5 py-2.5">
            <div className="text-[9.5px] font-semibold text-[#718290] tracking-[0.06em] uppercase select-none pb-1.5">
              SWITCH ROLE
            </div>

            {/* Current Role: Bidder (Lighter grey / non-clickable) */}
            <div className="text-[12px] font-medium text-[#95a4af] py-0.5 select-none cursor-default">
              Bidder
            </div>

            {/* Switch Role: Requestor (Dark charcoal / clickable) */}
            <Link
              href="/requestor/dashboard"
              onClick={() => setUserMenuOpen(false)}
              className="text-[12px] font-semibold text-[#22303a] hover:text-[#0b649d] py-0.5 transition-colors cursor-pointer block"
            >
              Requestor
            </Link>

            <div className="border-t border-[#e2e8ed] my-2 -mx-1" />

            {/* Logout */}
            <Link
              href="/login"
              onClick={() => setUserMenuOpen(false)}
              className="text-[12px] font-semibold text-[#963b3b] hover:text-[#782424] pt-0.5 transition-colors cursor-pointer block"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
