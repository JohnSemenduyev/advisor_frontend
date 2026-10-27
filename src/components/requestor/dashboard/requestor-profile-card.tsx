"use client";

import React, { useState } from "react";
import { User } from "lucide-react";

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

  const handleToggleEdit = () => {
    if (isEditing) {
      setSavedData(data);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setData(savedData);
    setIsEditing(false);
  };

  return (
    <section className={`profile-panel ${isEditing ? "edit-mode" : ""}`}>
      {/* Panel Header matching Bidder theme and reference HTML */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2eaf0]">
        <h2 className="profile-heading mb-0">
          <span className="profile-heading-icon" aria-hidden="true">
            <User className="w-4 h-4 text-[#24475a]" />
          </span>
          <span>Profile Information</span>
        </h2>

        {/* Edit / Done Button matching bidder theme */}
        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs font-semibold text-[#546e7f] hover:text-[#213543] px-2 py-1 cursor-pointer transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleToggleEdit}
            aria-pressed={isEditing}
            className="edit-profile-account cursor-pointer"
          >
            {isEditing ? "✓  Done Editing" : "✎  Edit Profile"}
          </button>
        </div>
      </div>

      {/* Profile Form Fields matching reference HTML .profile-grid */}
      <div className="profile-grid">
        {/* First Name */}
        <label>
          <span className="label-title">
            <span className="text-[12px] leading-none select-none">♟</span>
            <span>First Name</span>
          </span>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            readOnly={!isEditing}
            aria-readonly={!isEditing}
          />
        </label>

        {/* Last Name */}
        <label>
          <span className="label-title">
            <span className="text-[12px] leading-none select-none">♟</span>
            <span>Last Name</span>
          </span>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            readOnly={!isEditing}
            aria-readonly={!isEditing}
          />
        </label>

        {/* Title */}
        <label>
          <span className="label-title">
            <span className="text-[12px] leading-none select-none">♧</span>
            <span>Title</span>
          </span>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
            readOnly={!isEditing}
            aria-readonly={!isEditing}
          />
        </label>

        {/* Company Name */}
        <label>
          <span className="label-title">
            <span className="text-[12px] leading-none select-none">▥</span>
            <span>Company Name</span>
          </span>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            readOnly={!isEditing}
            aria-readonly={!isEditing}
          />
        </label>

        {/* Phone Number */}
        <label>
          <span className="label-title">
            <span className="text-[12px] leading-none select-none">♧</span>
            <span>Phone Number</span>
          </span>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            readOnly={!isEditing}
            aria-readonly={!isEditing}
          />
        </label>

        {/* E-mail */}
        <label>
          <span className="label-title">
            <span className="text-[12px] leading-none select-none">✉</span>
            <span>E-mail</span>
          </span>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            readOnly={!isEditing}
            aria-readonly={!isEditing}
          />
        </label>
      </div>
    </section>
  );
}
