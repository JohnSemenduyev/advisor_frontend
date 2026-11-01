"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface RequestorTopbarProps {
  userName?: string;
  avatarLetter?: string;
}

export function RequestorTopbar({
  userName = "John Semenduyev",
  avatarLetter = "J",
}: RequestorTopbarProps) {
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
    { name: "Homepage", href: "/requestor/dashboard" },
    { name: "Make New Request", href: "/requestor/requests/new" },
    { name: "Active Requests", href: "/requestor/requests" },
    { name: "Request History", href: "/requestor/requests/history" },
    { name: "Messages", href: "/requestor/messages", badge: "1" },
    { name: "Notifications", href: "/requestor/notifications" },
  ];


  return (
    <header className="maximal-topbar w-full px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-40">
      {/* Interlocking Raised Capsule Tabs */}
      <div className="overflow-x-auto no-scrollbar py-1">
        <nav aria-label="Main navigation" className="maximal-tabs">
          {tabs.map((tab) => {
            const isActive =
              tab.name === "Homepage"
                ? pathname === "/requestor/dashboard" || pathname === "/requestor"
                : tab.name === "Make New Request"
                  ? pathname === "/requestor/requests/new"
                  : tab.name === "Active Requests"
                    ? pathname === "/requestor/requests"
                    : tab.name === "Request History"
                      ? pathname === "/requestor/requests/history" || pathname === "/requestor/history"
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
          <span className="text-[12.5px] font-normal tracking-tight text-white hidden sm:inline drop-shadow-[0_1px_1px_rgba(8,19,27,0.3)]">
            {userName}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#cfdbe3] hidden sm:inline" />
        </button>

        {/* User Dropdown matching screenshot */}
        {userMenuOpen && (
          <div className="absolute right-0 top-[calc(100%+8px)] w-44 py-2 px-1.5 rounded-2xl bg-white border border-[#dce3e8] shadow-xl z-50 animate-in fade-in duration-100">
            <div className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase px-3 pt-1 pb-1 select-none">
              SWITCH ROLE
            </div>

            {/* Switch Role: Bidder (Dark bold / clickable) */}
            <Link
              href="/bidder/dashboard"
              onClick={() => setUserMenuOpen(false)}
              className="text-[14px] font-bold text-[#1e293b] hover:text-[#0f172a] hover:bg-[#f1f5f9] px-3 py-1.5 rounded-lg transition-colors cursor-pointer block"
            >
              Bidder
            </Link>

            {/* Current Role: Requestor (Lighter grey / non-clickable) */}
            <div className="text-[14px] font-medium text-[#94a3b8] px-3 py-1.5 cursor-default select-none">
              Requestor
            </div>

            <div className="border-t border-[#e2e8f0] my-2 mx-1.5" />

            {/* Logout */}
            <Link
              href="/login"
              onClick={() => setUserMenuOpen(false)}
              className="text-[14px] font-semibold text-[#8b2d2d] hover:text-[#721c24] hover:bg-[#fef2f2] px-3 py-1.5 rounded-lg transition-colors cursor-pointer block"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
