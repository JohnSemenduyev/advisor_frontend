"use client";

import React, { useState } from "react";
import { BidderTopbar } from "../navigation/bidder-topbar";
import {
  User,
  Sparkles,
  Building2,
  Mail,
  Phone,
  BarChart3,
  MapPin,
  ExternalLink,
  Plus,
  Trash2,
  AlertTriangle,
  X,
  Check,
} from "lucide-react";

export interface ProfileData {
  firstName: string;
  lastName: string;
  title: string;
  companyName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  website: string;
}

export function BidderProfileView() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Exact fields from reference Screenshot 1 & HTML
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "John",
    lastName: "Gomez",
    title: "Manager",
    companyName: "Business 444-567",
    email: "someonestsomeone62@gmail.com",
    phone: "732-518-4794",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    website: "",
  });

  const [industries, setIndustries] = useState<string[]>([
    "Security Services",
    "Facility Management",
  ]);

  const [locations, setLocations] = useState<string[]>([
    "New Jersey",
    "New York",
    "California",
    "Texas",
  ]);

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveIndustry = (ind: string) => {
    setIndustries((prev) => prev.filter((item) => item !== ind));
  };

  const handleAddIndustry = () => {
    const val = prompt("Enter new industry:");
    if (val && val.trim() && !industries.includes(val.trim())) {
      setIndustries((prev) => [...prev, val.trim()]);
    }
  };

  const handleRemoveLocation = (loc: string) => {
    setLocations((prev) => prev.filter((item) => item !== loc));
  };

  const handleAddLocation = () => {
    const val = prompt("Enter state or location:");
    if (val && val.trim() && !locations.includes(val.trim())) {
      setLocations((prev) => [...prev, val.trim()]);
    }
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteModal(false);
      alert("Account deletion request submitted.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Capsule Tabs matching reference HTML & Screenshot 3 */}
      <BidderTopbar
        userName={`${profileData.firstName} ${profileData.lastName}`}
        avatarLetter={profileData.firstName.charAt(0) || "J"}
      />

      {/* Main Container - Exact two-column layout from Screenshot 1 & Reference HTML */}
      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5 flex flex-col">
        <div id="homepageProfile">
          {/* Left Column: Readonly / Editable Profile Information Card */}
          <div id="homepageDashboardLeft">
            <section className={`profile-panel ${isEditing ? "edit-mode" : ""}`}>
              <h2 className="profile-heading">
                <span className="profile-heading-icon" aria-hidden="true">
                  <User className="w-4 h-4 text-[#24475a]" />
                </span>
                <span>Profile Information</span>
              </h2>

              <div className="profile-grid">
                {/* First Name */}
                <label>
                  <span className="label-title">
                    <User className="w-3.5 h-3.5 text-[#486b85] flex-none" />
                    <span>First Name</span>
                  </span>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => handleProfileChange("firstName", e.target.value)}
                    readOnly={!isEditing}
                    aria-readonly={!isEditing}
                  />
                </label>

                {/* Last Name */}
                <label>
                  <span className="label-title">
                    <User className="w-3.5 h-3.5 text-[#486b85] flex-none" />
                    <span>Last Name</span>
                  </span>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => handleProfileChange("lastName", e.target.value)}
                    readOnly={!isEditing}
                    aria-readonly={!isEditing}
                  />
                </label>

                {/* Title */}
                <label>
                  <span className="label-title">
                    <Sparkles className="w-3.5 h-3.5 text-[#486b85] flex-none" />
                    <span>Title</span>
                  </span>
                  <input
                    type="text"
                    value={profileData.title}
                    onChange={(e) => handleProfileChange("title", e.target.value)}
                    readOnly={!isEditing}
                    aria-readonly={!isEditing}
                  />
                </label>

                {/* Company Name */}
                <label>
                  <span className="label-title">
                    <Building2 className="w-3.5 h-3.5 text-[#486b85] flex-none" />
                    <span>Company Name</span>
                  </span>
                  <input
                    type="text"
                    value={profileData.companyName}
                    onChange={(e) => handleProfileChange("companyName", e.target.value)}
                    readOnly={!isEditing}
                    aria-readonly={!isEditing}
                  />
                </label>

                {/* Email */}
                <label>
                  <span className="label-title">
                    <Mail className="w-3.5 h-3.5 text-[#486b85] flex-none" />
                    <span>Email</span>
                  </span>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    readOnly={!isEditing}
                    aria-readonly={!isEditing}
                  />
                </label>

                {/* Phone Number */}
                <label>
                  <span className="label-title">
                    <Phone className="w-3.5 h-3.5 text-[#486b85] flex-none" />
                    <span>Phone Number</span>
                  </span>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    readOnly={!isEditing}
                    aria-readonly={!isEditing}
                  />
                </label>

                {/* Office Address Subsection */}
                <div className="office-address-block">
                  <div className="office-address-title">
                    <span className="font-bold text-sm leading-none">+</span>
                    <span>Office Address</span>
                  </div>
                  <div className="office-address-fields">
                    <label>
                      <span>Street Address</span>
                      <input
                        type="text"
                        placeholder="Enter street address"
                        value={profileData.streetAddress}
                        onChange={(e) => handleProfileChange("streetAddress", e.target.value)}
                        readOnly={!isEditing}
                        aria-readonly={!isEditing}
                      />
                    </label>
                    <label>
                      <span>City</span>
                      <input
                        type="text"
                        placeholder="Enter city"
                        value={profileData.city}
                        onChange={(e) => handleProfileChange("city", e.target.value)}
                        readOnly={!isEditing}
                        aria-readonly={!isEditing}
                      />
                    </label>
                    <label>
                      <span>State</span>
                      <input
                        type="text"
                        placeholder="Select or enter state"
                        value={profileData.state}
                        onChange={(e) => handleProfileChange("state", e.target.value)}
                        readOnly={!isEditing}
                        aria-readonly={!isEditing}
                      />
                    </label>
                    <label>
                      <span>ZIP Code</span>
                      <input
                        type="text"
                        placeholder="Enter ZIP code"
                        value={profileData.zipCode}
                        onChange={(e) => handleProfileChange("zipCode", e.target.value)}
                        readOnly={!isEditing}
                        aria-readonly={!isEditing}
                      />
                    </label>
                  </div>
                </div>

                {/* Company Website */}
                <label>
                  <span className="label-title">
                    <ExternalLink className="w-3.5 h-3.5 text-[#486b85] flex-none" />
                    <span>Company Website</span>
                  </span>
                  <input
                    type="url"
                    placeholder="Enter company website"
                    value={profileData.website}
                    onChange={(e) => handleProfileChange("website", e.target.value)}
                    readOnly={!isEditing}
                    aria-readonly={!isEditing}
                  />
                </label>
              </div>
            </section>
          </div>

          {/* Right Column: 3 Stacked Cards (Bids Summary, Industries, Geographic Reach) */}
          <div id="homepageDashboardRight">
            {/* 1. Bids Summary Card */}
            <section className="bids-panel">
              <h2>
                <span className="chart-icon" aria-hidden="true">
                  <BarChart3 className="w-4 h-4 text-[#24475a]" />
                </span>
                <span>Bids Summary</span>
              </h2>

              <div className="bid-tiles">
                {/* Accepted Tile */}
                <div className="bid-tile">
                  <div className="bid-tile-heading">
                    <span className="status-check">✓</span>
                    <strong>Accepted</strong>
                    <span className="new-pill">New</span>
                  </div>
                  <div className="bid-count">4</div>
                </div>

                {/* Expired / Rejected Tile */}
                <div className="bid-tile">
                  <div className="bid-tile-heading">
                    <span className="status-x">×</span>
                    <strong>Expired/Rejected</strong>
                  </div>
                  <div className="bid-count">0</div>
                </div>
              </div>
            </section>

            {/* 2. Industries Card */}
            <section aria-label="Industries" id="homepageIndustries">
              <h2 className="industries-heading">
                <span className="industries-icon" aria-hidden="true">
                  <Building2 className="w-4 h-4 text-[#24475a]" />
                </span>
                <span>Industries</span>
              </h2>

              <div className="industry-tags" id="industryTags">
                {industries.map((ind) => (
                  <span key={ind} className="industry-tag">
                    <span>{ind}</span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveIndustry(ind)}
                        aria-label={`Remove ${ind}`}
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <button
                  type="button"
                  className="industry-add"
                  onClick={handleAddIndustry}
                >
                  + Add Industry
                </button>
              )}
            </section>

            {/* 3. Geographic Reach Card */}
            <section aria-label="Geographic Reach" id="homepageReach">
              <h2 className="industries-heading">
                <span className="industries-icon" aria-hidden="true">
                  <MapPin className="w-4 h-4 text-[#24475a]" />
                </span>
                <span>Geographic Reach</span>
              </h2>

              <div className="reach-tags" id="reachTags">
                {locations.map((loc) => (
                  <span key={loc} className="reach-tag">
                    <span>{loc}</span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLocation(loc)}
                        aria-label={`Remove ${loc}`}
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <button
                  type="button"
                  className="reach-add"
                  onClick={handleAddLocation}
                >
                  + Add Location
                </button>
              )}
            </section>
          </div>
        </div>

        {/* Bottom Right Actions (Edit Profile, Delete Account) */}
        <div id="homepageAccountActions">
          <button
            type="button"
            aria-pressed={isEditing}
            className={`edit-profile-account ${isEditing ? "active" : ""}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Done Editing</span>
              </>
            ) : (
              <>
                <span>✎</span>
                <span>Edit Profile</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="delete-account"
            onClick={() => setShowDeleteModal(true)}
          >
            <span>▤</span>
            <span>Delete Account</span>
          </button>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[430px] rounded-2xl overflow-hidden border border-[#a8b7bf] bg-gradient-to-br from-[#ffffff] to-[#f0f4f6] shadow-2xl text-left">
            <div className="flex items-center gap-3.5 p-6 pb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#feebe9] to-[#fbd3cf] border border-[#f3a8a0] flex items-center justify-center text-[#c43224] flex-none">
                <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1f2d36] leading-tight">
                  Delete Account?
                </h3>
                <p className="text-xs text-[#6e828f] mt-0.5">
                  Permanent action
                </p>
              </div>
            </div>

            <p className="px-6 py-2 text-xs text-[#526673] leading-relaxed">
              Are you sure you want to permanently delete your contractor profile and remove all active bids? This action cannot be reversed.
            </p>

            <div className="flex items-center justify-end gap-2.5 p-4 px-6 border-t border-[#d8e2e7] bg-[#edf2f5]/60 mt-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#b8c6ce] bg-gradient-to-b from-[#fff] to-[#e8edf0] text-[#334550] shadow-xs hover:brightness-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-b from-[#ed3535] to-[#b90011] text-white flex items-center gap-1.5 cursor-pointer shadow-md hover:brightness-105"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? "Deleting..." : "Delete Account"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
