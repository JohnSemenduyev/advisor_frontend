"use client";

import React, { useState } from "react";
import { BidderTopbar } from "../navigation/bidder-topbar";
import { ProfileHeader } from "./profile-header";
import { PersonalInfoCard, ProfileData } from "./personal-info-card";
import { BidsSummaryCard } from "./bids-summary-card";
import { IndustriesCard } from "./industries-card";
import { GeographicReachCard } from "./geographic-reach-card";
import { ProfileActions } from "./profile-actions";

export function BidderProfileView() {
  const [isEditing, setIsEditing] = useState(false);

  // Exact fields copied from screenshot 2
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "John",
    lastName: "Gomez",
    title: "Manager",
    companyName: "Business 444-567",
    email: "someonestestsomeone62@gmail.com",
    phone: "732-518-4794",
  });

  const [initialData, setInitialData] = useState<ProfileData>(profileData);

  const [industries, setIndustries] = useState({
    industry1: "Security Guard Services",
    industry2: "Security Technology",
    industry3: "",
    industry4: "",
  });

  const [locations, setLocations] = useState<string[]>([
    "New Jersey",
    "New York",
    "California",
    "Texas",
  ]);

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIndustryChange = (key: string, value: string) => {
    setIndustries((prev) => ({ ...prev, [key]: value }));
  };

  const handleRemoveLocation = (loc: string) => {
    setLocations((prev) => prev.filter((item) => item !== loc));
  };

  const handleAddLocation = (loc: string) => {
    if (!locations.includes(loc)) {
      setLocations((prev) => [...prev, loc]);
    }
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setInitialData(profileData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setProfileData(initialData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar
        userName={`${profileData.firstName} ${profileData.lastName}`}
        avatarLetter={profileData.firstName.charAt(0) || "M"}
      />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1480px] w-full mx-auto">
        <div className="maximal-shell p-5 sm:p-7 lg:p-8 space-y-6">
          {/* Profile Header: Profile Information & Edit button */}
          <ProfileHeader
            isEditing={isEditing}
            onToggleEdit={handleToggleEdit}
            onCancelEdit={handleCancelEdit}
          />

          {/* Row 1: Personal Info Card (left ~ 65%) + Bids Summary Card (right ~ 35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            <div className="lg:col-span-8">
              <PersonalInfoCard
                data={profileData}
                isEditing={isEditing}
                onChange={handleProfileChange}
              />
            </div>
            <div className="lg:col-span-4">
              <BidsSummaryCard
                acceptedCount={4}
                expiredRejectedCount={0}
              />
            </div>
          </div>

          {/* Row 2: Industries Card (2x2 grid of dropdown selectors) */}
          <IndustriesCard
            industries={industries}
            isEditing={isEditing}
            onChange={handleIndustryChange}
          />

          {/* Row 3: Geographic Reach Card (tags with remove x, helper note) */}
          <GeographicReachCard
            locations={locations}
            isEditing={isEditing}
            onRemoveLocation={handleRemoveLocation}
            onAddLocation={handleAddLocation}
          />

          {/* Bottom Right Actions (Reset Password, Delete Account) */}
          <ProfileActions email={profileData.email} />
        </div>
      </main>
    </div>
  );
}
