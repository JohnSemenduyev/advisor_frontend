"use client";

import React from "react";
import { User, Briefcase, Building2, Mail, Phone } from "lucide-react";

export interface ProfileData {
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  email: string;
  phone: string;
}

interface PersonalInfoCardProps {
  data: ProfileData;
  isEditing: boolean;
  onChange: (field: keyof ProfileData, value: string) => void;
}

export function PersonalInfoCard({
  data,
  isEditing,
  onChange,
}: PersonalInfoCardProps) {
  return (
    <div className="maximal-card p-5 sm:p-6 h-full flex flex-col justify-between">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* First Name */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#48606f] mb-1.5">
            <User className="w-3.5 h-3.5 text-[#5e7787]" />
            <span>First Name</span>
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3.5 py-2.5 text-sm maximal-input font-medium transition-all ${
              !isEditing
                ? "bg-[#f5f8fa]/80 text-[#243540] border-[#d5e0e6] cursor-default"
                : "bg-white text-[#1a2933] border-[#7ea3b7] shadow-sm"
            }`}
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#48606f] mb-1.5">
            <User className="w-3.5 h-3.5 text-[#5e7787]" />
            <span>Last Name</span>
          </label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3.5 py-2.5 text-sm maximal-input font-medium transition-all ${
              !isEditing
                ? "bg-[#f5f8fa]/80 text-[#243540] border-[#d5e0e6] cursor-default"
                : "bg-white text-[#1a2933] border-[#7ea3b7] shadow-sm"
            }`}
          />
        </div>

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#48606f] mb-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#5e7787]" />
            <span>Title</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange("title", e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3.5 py-2.5 text-sm maximal-input font-medium transition-all ${
              !isEditing
                ? "bg-[#f5f8fa]/80 text-[#243540] border-[#d5e0e6] cursor-default"
                : "bg-white text-[#1a2933] border-[#7ea3b7] shadow-sm"
            }`}
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#48606f] mb-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#5e7787]" />
            <span>Company Name</span>
          </label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => onChange("companyName", e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3.5 py-2.5 text-sm maximal-input font-medium transition-all ${
              !isEditing
                ? "bg-[#f5f8fa]/80 text-[#243540] border-[#d5e0e6] cursor-default"
                : "bg-white text-[#1a2933] border-[#7ea3b7] shadow-sm"
            }`}
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#48606f] mb-1.5">
            <Mail className="w-3.5 h-3.5 text-[#5e7787]" />
            <span>Email</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3.5 py-2.5 text-sm maximal-input font-medium transition-all ${
              !isEditing
                ? "bg-[#f5f8fa]/80 text-[#243540] border-[#d5e0e6] cursor-default"
                : "bg-white text-[#1a2933] border-[#7ea3b7] shadow-sm"
            }`}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold text-[#48606f] mb-1.5">
            <Phone className="w-3.5 h-3.5 text-[#5e7787]" />
            <span>Phone Number</span>
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            disabled={!isEditing}
            className={`w-full px-3.5 py-2.5 text-sm maximal-input font-medium transition-all ${
              !isEditing
                ? "bg-[#f5f8fa]/80 text-[#243540] border-[#d5e0e6] cursor-default"
                : "bg-white text-[#1a2933] border-[#7ea3b7] shadow-sm"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
