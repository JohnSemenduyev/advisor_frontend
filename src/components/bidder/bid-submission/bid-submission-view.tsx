"use client";

import React, { useState } from "react";
import { BidderTopbar } from "../navigation/bidder-topbar";
import { BidSubmissionHeader } from "./bid-submission-header";
import { BidCompanyInfoCard, CompanyInfoData } from "./bid-company-info-card";
import { BidAttachmentsCard } from "./bid-attachments-card";
import { BidSubmitFooter } from "./bid-submit-footer";

interface BidSubmissionViewProps {
  requestId?: string;
}

export function BidSubmissionView({ requestId = "10001" }: BidSubmissionViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Exact fields copied from 2nd screenshot
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoData>({
    firstName: "John",
    lastName: "Semenduyev",
    title: "Manager",
    email: "john.semenduyev@gmail.com",
    phone: "732-513-4794",
    website: "businessadviser.com",
    companyName: "Business Adviser",
    streetAddress: "77 Lafayette Mills Road",
    city: "Manalapan",
    state: "New Jersey",
    zipCode: "07726",
  });

  const [initialData, setInitialData] = useState<CompanyInfoData>(companyInfo);

  const handleCompanyInfoChange = (field: keyof CompanyInfoData, value: string) => {
    setCompanyInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleEdit = () => {
    if (isEditing) {
      setInitialData(companyInfo);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar userName="Mike A." avatarLetter="M" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1480px] w-full mx-auto">
        <div className="maximal-shell p-5 sm:p-7 lg:p-8 space-y-6">
          {/* Header with Return and Edit buttons */}
          <BidSubmissionHeader
            isEditing={isEditing}
            onToggleEdit={handleToggleEdit}
            requestId={requestId}
            returnHref="/bidder/search-requests"
          />

          {/* Section 1: Company Information Card */}
          <BidCompanyInfoCard
            data={companyInfo}
            isEditing={isEditing}
            onChange={handleCompanyInfoChange}
          />

          {/* Section 2: Attachments Card */}
          <BidAttachmentsCard isEditing={isEditing} />

          {/* Section 3: Bottom Action Area with Confirmation Modal */}
          <BidSubmitFooter
            requestId={requestId}
            onCancelHref="/bidder/search-requests"
          />
        </div>
      </main>
    </div>
  );
}
