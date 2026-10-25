"use client";

import React from "react";
import { BarChart3, Check, X } from "lucide-react";

interface BidsSummaryProps {
  acceptedCount?: number;
  expiredRejectedCount?: number;
}

export function BidsSummaryCard({
  acceptedCount = 4,
  expiredRejectedCount = 0,
}: BidsSummaryProps) {
  return (
    <div className="maximal-card p-5 sm:p-6 h-full flex flex-col justify-between">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#dce6ed] to-[#cad7df] border border-[#b8c9d4] flex items-center justify-center text-[#273d4c] shadow-xs">
          <BarChart3 className="w-4 h-4" />
        </div>
        <h2 className="text-base font-bold text-[#203440] tracking-tight">
          Bids Summary
        </h2>
      </div>

      {/* Two Stat Tiles */}
      <div className="grid grid-cols-2 gap-3.5 flex-1 items-stretch">
        {/* Accepted Tile */}
        <div className="maximal-stat-card p-4 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5">
          <div className="flex items-center justify-between gap-1 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full maximal-chip-accepted flex items-center justify-center">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold text-[#2a4352]">
                Accepted
              </span>
            </div>
            <span className="maximal-badge-new text-[10px] font-bold px-2 py-0.5 rounded-full">
              New
            </span>
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-[#17303f] tracking-tight">
            {acceptedCount}
          </div>
        </div>

        {/* Expired / Rejected Tile */}
        <div className="maximal-stat-card p-4 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full maximal-chip-rejected flex items-center justify-center">
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span className="text-xs font-bold text-[#445b6a] leading-tight">
              Expired/Rejected
            </span>
          </div>

          <div className="text-3xl sm:text-4xl font-extrabold text-[#3a5260] tracking-tight">
            {expiredRejectedCount}
          </div>
        </div>
      </div>
    </div>
  );
}
