"use client";

import React from "react";
import {
  Building2,
  User,
  Briefcase,
  Mail,
  Phone,
  Globe,
  Home,
  MapPin,
  Store,
} from "lucide-react";

export interface CompanyInfoData {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  companyName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

interface BidCompanyInfoCardProps {
  data: CompanyInfoData;
  isEditing: boolean;
  onChange: (field: keyof CompanyInfoData, value: string) => void;
}

export function BidCompanyInfoCard({
  data,
  isEditing,
  onChange,
}: BidCompanyInfoCardProps) {
  const leftFields = [
    { key: "firstName", label: "First Name", icon: User, value: data.firstName },
    { key: "lastName", label: "Last Name", icon: User, value: data.lastName },
    { key: "title", label: "Title", icon: Briefcase, value: data.title },
    { key: "email", label: "E-mail", icon: Mail, value: data.email },
    { key: "phone", label: "Phone Number", icon: Phone, value: data.phone },
    { key: "website", label: "Company Website", icon: Globe, value: data.website },
  ] as const;

  const rightFields = [
    { key: "companyName", label: "Company Name", icon: Building2, value: data.companyName },
    { key: "streetAddress", label: "Company Street Address", icon: Home, value: data.streetAddress },
    { key: "city", label: "Company City", icon: Building2, value: data.city },
    { key: "state", label: "Company State", icon: MapPin, value: data.state },
    { key: "zipCode", label: "Company Zip Code", icon: Store, value: data.zipCode },
  ] as const;

  return (
    <div className="maximal-card p-5 sm:p-6 rounded-2xl border border-white shadow-lg space-y-4">
      {/* Card Header with Building Icon matching 2nd screenshot */}
      <div className="flex items-center gap-2.5 pb-1">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#dceaf3] to-[#c9dbe7] border border-[#b5cddc] flex items-center justify-center text-[#1c4d6f] shadow-xs">
          <Building2 className="w-4 h-4" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-[#1a4463] tracking-tight">
          Company Information
        </h2>
      </div>

      {/* Two Column Layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Left Column (6 fields) */}
        <div className="space-y-2.5">
          {leftFields.map((field) => {
            const Icon = field.icon;
            return (
              <div
                key={field.key}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 px-3.5 rounded-xl border border-[#d6e3ec] bg-gradient-to-r from-[#ffffff] to-[#f4f8fa] shadow-xs gap-1.5"
              >
                <div className="flex items-center gap-2.5 w-44 flex-none">
                  <Icon className="w-4 h-4 text-[#446e8c]" />
                  <span className="text-xs font-semibold text-[#486374]">
                    {field.label}
                  </span>
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    className="maximal-input text-xs sm:text-sm px-2.5 py-1 flex-1 font-semibold text-[#183447]"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-semibold text-[#1a384c] truncate">
                    {field.value}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column (5 fields) */}
        <div className="space-y-2.5">
          {rightFields.map((field) => {
            const Icon = field.icon;
            return (
              <div
                key={field.key}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 px-3.5 rounded-xl border border-[#d6e3ec] bg-gradient-to-r from-[#ffffff] to-[#f4f8fa] shadow-xs gap-1.5"
              >
                <div className="flex items-center gap-2.5 w-52 flex-none">
                  <Icon className="w-4 h-4 text-[#446e8c]" />
                  <span className="text-xs font-semibold text-[#486374]">
                    {field.label}
                  </span>
                </div>

                {isEditing ? (
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    className="maximal-input text-xs sm:text-sm px-2.5 py-1 flex-1 font-semibold text-[#183447]"
                  />
                ) : (
                  <span className="text-xs sm:text-sm font-semibold text-[#1a384c] truncate">
                    {field.value}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
