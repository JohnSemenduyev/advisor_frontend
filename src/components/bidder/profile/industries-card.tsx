"use client";

import React from "react";
import { Building2 } from "lucide-react";
import { CustomSelect } from "../../shared/custom-select";

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
            <CustomSelect
              variant="field"
              ariaLabel={field.label}
              value={field.value}
              onChange={(val) => onChange(field.key, val)}
              disabled={!isEditing}
              options={[
                { value: "", label: "Select industry..." },
                ...INDUSTRY_OPTIONS.map((opt) => ({ value: opt, label: opt })),
              ]}
              className={
                !isEditing
                  ? "bg-[#f5f8fa]/80 text-[#243540] border-[#d5e0e6]"
                  : "bg-white text-[#1a2933] border-[#7ea3b7] shadow-sm"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
