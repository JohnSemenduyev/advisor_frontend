"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Edit3, Check, FileText } from "lucide-react";

interface BidSubmissionHeaderProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  returnHref?: string;
  requestId?: string;
}

export function BidSubmissionHeader({
  isEditing,
  onToggleEdit,
  returnHref = "/bidder/search-requests",
  requestId = "10001",
}: BidSubmissionHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Top action row: Return on left, Edit on right matching 2nd screenshot */}
      <div className="flex items-center justify-between">
        <Link
          href={returnHref}
          className="maximal-btn-secondary inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#204a6e]" />
          <span>Return</span>
        </Link>

        <button
          type="button"
          onClick={onToggleEdit}
          className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-xs ${
            isEditing
              ? "bg-gradient-to-r from-[#216738] to-[#144725] text-white border border-[#3b8753] shadow-md shadow-green-950/20 hover:brightness-110"
              : "maximal-btn-secondary"
          }`}
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 text-[#204a6e]" />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>

      {/* Main Title Banner matching screenshot */}
      <div className="flex items-start gap-3.5 pt-1">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86] flex-none shadow-xs">
          <FileText className="w-6 h-6 stroke-[2.2]" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a4463] tracking-tight">
              Bid Submission
            </h1>
            <span className="text-xs font-bold text-[#18689c] bg-[#e1f0f8] border border-[#b9dbee] px-2.5 py-0.5 rounded-full">
              Requisition #{requestId}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5d7c8e] mt-0.5">
            Review the request details below and submit your bid for this project.
          </p>
        </div>
      </div>
    </div>
  );
}
