"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Search,
  Gavel,
  MessageSquare,
  Bell,
  LogOut,
  UserCheck,
  ChevronDown,
  Layers,
  Menu,
  X,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

const navItems: NavItem[] = [
  { name: "Homepage", href: "/bidder/profile", icon: Home },
  { name: "Search Requests", href: "/bidder/search-requests", icon: Search },
  { name: "My Bids", href: "/bidder/my-bids", icon: Gavel },
  { name: "Messages", href: "/bidder/messages", icon: MessageSquare, badge: 1 },
  { name: "Notifications", href: "/bidder/notifications", icon: Bell },
  { name: "Sign Out", href: "/login", icon: LogOut },
];

export function BidderSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isProfileActive = pathname.includes("/bidder/profile");

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#111c24] text-white border-b border-[#233540] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2f495a] to-[#162732] border border-[#486374] flex items-center justify-center text-white shadow-sm font-bold text-sm">
            BA
          </div>
          <span className="font-semibold text-sm tracking-tight text-[#e1ebf0]">
            BusinessAdviser
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-[#9ab0bd] hover:text-white hover:bg-[#1f313e] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Rail */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 maximal-sidebar flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand / Logo Header */}
        <div className="px-5 py-5 border-b border-[#1f303a]/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3b5567] via-[#243946] to-[#121f27] border border-[#52748b] flex items-center justify-center text-white shadow-md font-bold text-sm tracking-wide">
            BA
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-[#e6f0f5] tracking-tight leading-none">
              BusinessAdviser
            </h1>
            <p className="text-[11px] text-[#78919f] mt-1 font-medium">
              Bidder Workspace
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isSignOut = item.name === "Sign Out";
            const isActive =
              !isSignOut &&
              (pathname === item.href ||
                (item.name === "Homepage" && isProfileActive));

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-[#2c424f] to-[#1c2c36] text-white shadow-sm border border-[#446071]/50 font-semibold translate-x-0.5"
                    : isSignOut
                    ? "text-[#8e9fa9] hover:text-[#e47676] hover:bg-[#2c1e21]/40"
                    : "text-[#97aab5] hover:text-[#e6f0f5] hover:bg-[#182833]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#5daecf]" : "text-[#7a93a3]"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="w-5 h-5 rounded-full bg-[#d32f2f] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Role Card */}
        <div className="p-3 border-t border-[#1f303a]/80 relative">
          <button
            type="button"
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#1a2933] to-[#121e25] border border-[#2b3f4c] text-left text-white shadow-inner hover:border-[#3d5769] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-[#273d4b] border border-[#3c5667] flex items-center justify-center text-[#74c3e8] flex-none">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[13px] font-semibold text-[#e1ebf0] truncate">
                Role: Bidder
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-[#7e95a3] transition-transform duration-200 ${
                roleMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Role Switcher Menu */}
          {roleMenuOpen && (
            <div className="absolute bottom-[calc(100%+8px)] left-3 right-3 p-2 bg-[#17252f] border border-[#344b5a] rounded-xl shadow-2xl z-50 text-[12px] space-y-1">
              <div className="px-2 py-1 text-[11px] font-semibold text-[#6d8796] uppercase tracking-wider">
                Active Role
              </div>
              <div className="px-2.5 py-1.5 rounded-lg bg-[#243946] text-white font-medium flex items-center justify-between">
                <span>Bidder (Current)</span>
                <span className="w-2 h-2 rounded-full bg-[#3cd070]" />
              </div>
              <button
                type="button"
                onClick={() => {
                  setRoleMenuOpen(false);
                  router.push("/requestor/dashboard");
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg text-[#9ab0bd] hover:text-white hover:bg-[#20323e] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[#6c8695]" />
                <span>Switch to Requestor</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
