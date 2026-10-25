"use client";

import React, { useState } from "react";
import { User, Briefcase, Building2, Phone, Mail, Edit3, Check, RotateCcw } from "lucide-react";

export interface RequestorProfileData {
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  phone: string;
  email: string;
}

interface RequestorProfileCardProps {
  initialData?: RequestorProfileData;
}

export function RequestorProfileCard({
  initialData = {
    firstName: "John",
    lastName: "Semenduyev",
    title: "Manager",
    companyName: "Business Adviser",
    phone: "732-513-4794",
    email: "john.s.semenduyev@email.com",
  },
}: RequestorProfileCardProps) {
  const [data, setData] = useState<RequestorProfileData>(initialData);
  const [savedData, setSavedData] = useState<RequestorProfileData>(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: keyof RequestorProfileData, val: string) => {
    setData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    setSavedData(data);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setData(savedData);
    setIsEditing(false);
  };

  return (
    <div className="maximal-card overflow-hidden rounded-2xl border border-white shadow-md">
      {/* Card Brushed Header Bar matching reference */}
      <div className="bg-gradient-to-r from-[#2c3c46] to-[#18252d] px-5 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#7dc0df]">
            <User className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold tracking-tight text-[#f1f6fa]">
            Profile Information
          </h2>
        </div>

        {/* Edit / Save controls */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs cursor-pointer transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-[#c0d3de] hover:bg-white/10 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-[#eaf2f7] border border-white/20 cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#88b8d4]" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {/* Card Content - 2-Column Responsive Form Fields */}
      <div className="p-5 sm:p-6 bg-gradient-to-b from-[#ffffff] to-[#f8fafb]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* First Name */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white border border-[#dce5ea] shadow-xs gap-2">
            <span className="text-xs font-semibold text-[#48606f] flex items-center gap-2 min-w-[120px]">
              <User className="w-3.5 h-3.5 text-[#6c8594]" />
              First Name
            </span>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              disabled={!isEditing}
              className={`flex-1 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                isEditing
                  ? "bg-[#ffffff] text-[#1e2d36] border border-[#7ea3b7] outline-none shadow-inner"
                  : "bg-transparent text-[#223542] border-transparent cursor-default"
              }`}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white border border-[#dce5ea] shadow-xs gap-2">
            <span className="text-xs font-semibold text-[#48606f] flex items-center gap-2 min-w-[120px]">
              <User className="w-3.5 h-3.5 text-[#6c8594]" />
              Last Name
            </span>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              disabled={!isEditing}
              className={`flex-1 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                isEditing
                  ? "bg-[#ffffff] text-[#1e2d36] border border-[#7ea3b7] outline-none shadow-inner"
                  : "bg-transparent text-[#223542] border-transparent cursor-default"
              }`}
            />
          </div>

          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white border border-[#dce5ea] shadow-xs gap-2">
            <span className="text-xs font-semibold text-[#48606f] flex items-center gap-2 min-w-[120px]">
              <Briefcase className="w-3.5 h-3.5 text-[#6c8594]" />
              Title
            </span>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
              disabled={!isEditing}
              className={`flex-1 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                isEditing
                  ? "bg-[#ffffff] text-[#1e2d36] border border-[#7ea3b7] outline-none shadow-inner"
                  : "bg-transparent text-[#223542] border-transparent cursor-default"
              }`}
            />
          </div>

          {/* Company Name */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white border border-[#dce5ea] shadow-xs gap-2">
            <span className="text-xs font-semibold text-[#48606f] flex items-center gap-2 min-w-[120px]">
              <Building2 className="w-3.5 h-3.5 text-[#6c8594]" />
              Company Name
            </span>
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              disabled={!isEditing}
              className={`flex-1 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                isEditing
                  ? "bg-[#ffffff] text-[#1e2d36] border border-[#7ea3b7] outline-none shadow-inner"
                  : "bg-transparent text-[#223542] border-transparent cursor-default"
              }`}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white border border-[#dce5ea] shadow-xs gap-2">
            <span className="text-xs font-semibold text-[#48606f] flex items-center gap-2 min-w-[120px]">
              <Phone className="w-3.5 h-3.5 text-[#6c8594]" />
              Phone Number
            </span>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              disabled={!isEditing}
              className={`flex-1 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                isEditing
                  ? "bg-[#ffffff] text-[#1e2d36] border border-[#7ea3b7] outline-none shadow-inner"
                  : "bg-transparent text-[#223542] border-transparent cursor-default"
              }`}
            />
          </div>

          {/* E-mail */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 sm:p-3 rounded-xl bg-white border border-[#dce5ea] shadow-xs gap-2">
            <span className="text-xs font-semibold text-[#48606f] flex items-center gap-2 min-w-[120px]">
              <Mail className="w-3.5 h-3.5 text-[#6c8594]" />
              E-mail
            </span>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange("email", e.target.value)}
              disabled={!isEditing}
              className={`flex-1 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-lg transition-all ${
                isEditing
                  ? "bg-[#ffffff] text-[#1e2d36] border border-[#7ea3b7] outline-none shadow-inner"
                  : "bg-transparent text-[#223542] border-transparent cursor-default text-[#0b66a0]"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
