"use client";

import React from "react";
import { Edit3, Check, RotateCcw } from "lucide-react";

interface ProfileHeaderProps {
  isEditing: boolean;
  onToggleEdit: () => void;
  onCancelEdit?: () => void;
}

export function ProfileHeader({
  isEditing,
  onToggleEdit,
  onCancelEdit,
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
      <div className="flex items-center gap-3.5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#223542] tracking-tight">
          Profile Information
        </h1>

        <button
          type="button"
          onClick={onToggleEdit}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
            isEditing
              ? "bg-gradient-to-r from-[#216738] to-[#144725] text-white border border-[#3b8753] shadow-md shadow-green-950/20 hover:brightness-110"
              : "maximal-btn-secondary"
          }`}
          title={isEditing ? "Save changes" : "Edit profile information"}
        >
          {isEditing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Save</span>
            </>
          ) : (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </>
          )}
        </button>

        {isEditing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-[#5a6f7c] hover:text-[#253946] hover:bg-[#e4ecf0] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
        )}
      </div>

      <div className="text-xs text-[#6a808e] font-medium hidden sm:block">
        Account ID: <span className="font-mono text-[#334b5b]">BID-884029</span>
      </div>
    </div>
  );
}
