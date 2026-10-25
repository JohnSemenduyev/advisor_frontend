"use client";

import React from "react";
import { Building2, ChevronDown } from "lucide-react";

interface IndustriesCardProps {
  industries: {
    industry1: string;
    industry2: string;
    industry3: string;
    industry4: string;
  };
  isEditing: boolean;
  onChange: (key: string, value: string) => void;
}

const INDUSTRY_OPTIONS = [
  "Security Guard Services",
  "Security Technology",
  "Surveillance & Video Monitoring",
  "Access Control Systems",
  "Facility Management & Maintenance",
  "Private Investigation & Intelligence",
  "Fire & Life Safety Systems",
  "Event Security & Crowd Management",
  "Executive Protection & Transport",
  "Cybersecurity & Network Defense",
];

export function IndustriesCard({
  industries,
  isEditing,
  onChange,
}: IndustriesCardProps) {
  const fields = [
    { key: "industry1", label: "Industry #1", value: industries.industry1 },
    { key: "industry2", label: "Industry #2", value: industries.industry2 },
    { key: "industry3", label: "Industry #3", value: industries.industry3 },
    { key: "industry4", label: "Industry #4", value: industries.industry4 },
  ];

  return (
    <div className="maximal-card p-5 sm:p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#dce6ed] to-[#cad7df] border border-[#b8c9d4] flex items-center justify-center text-[#273d4c] shadow-xs">
          <Building2 className="w-4 h-4" />
        </div>
        <h2 className="text-base font-bold text-[#203440] tracking-tight">
          Industries
        </h2>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs font-semibold text-[#48606f] mb-1.5">
              {field.label}
            </label>
            <div className="relative">
              <select
                value={field.value}
                onChange={(e) => onChange(field.key, e.target.value)}
                disabled={!isEditing}
                className={`w-full appearance-none px-3.5 py-2.5 pr-10 text-sm maximal-input font-medium transition-all ${
                  !isEditing
                    ? "bg-[#f5f8fa]/80 text-[#243540] border-[#d5e0e6] cursor-default"
                    : "bg-white text-[#1a2933] border-[#7ea3b7] shadow-sm cursor-pointer"
                }`}
              >
                <option value="">Select industry...</option>
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#688292]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
