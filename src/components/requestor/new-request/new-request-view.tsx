"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  User,
  FileText,
  LayoutGrid,
  MapPin,
  Paperclip,
  Plus,
  Trash2,
  Upload,
  Send,
  CheckCircle2,
  X,
  FileCheck,
} from "lucide-react";
import { RequestorTopbar } from "../navigation/requestor-topbar";

interface IndustryItem {
  id: string;
  name: string;
}

interface LocationItem {
  id: string;
  address: string;
}

interface AttachmentItem {
  id: string;
  description: string;
  fileName: string;
  fileSize?: string;
}

const COMMON_INDUSTRIES = [
  "Accounting Services",
  "Security Guard Services",
  "Facility Management & Maintenance",
  "Access Control & Gate Automation",
  "IT & Cybersecurity Solutions",
  "Cleaning & Janitorial Services",
  "Logistics & Freight Supervision",
  "Commercial Facility Patrol 24/7",
  "Maritime Security & Cargo Escort",
  "Biotech Laboratory Access Control",
];

export function MakeNewRequestView() {
  const router = useRouter();

  // Requester Information (read-only prefilled)
  const requesterInfo = {
    firstName: "John",
    lastName: "Semenduyev",
    title: "Manager",
    companyName: "Business Adviser",
    phone: "732-513-4794",
    email: "john.s.semenduyev@email.com",
  };

  // Form States
  const [description, setDescription] = useState("");
  const [industries, setIndustries] = useState<IndustryItem[]>([
    { id: "ind-1", name: "Accounting Services" },
  ]);
  const [locations, setLocations] = useState<LocationItem[]>([
    { id: "loc-1", address: "74 Horizon Drive, Manalapan, NJ 07726" },
  ]);
  const [attachments, setAttachments] = useState<AttachmentItem[]>([
    { id: "att-1", description: "", fileName: "" },
  ]);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Industry handlers
  const handleAddIndustry = () => {
    setIndustries((prev) => [
      ...prev,
      { id: `ind-${Date.now()}`, name: COMMON_INDUSTRIES[0] },
    ]);
  };

  const handleUpdateIndustry = (id: string, name: string) => {
    setIndustries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, name } : item))
    );
  };

  const handleRemoveIndustry = (id: string) => {
    if (industries.length <= 1) return;
    setIndustries((prev) => prev.filter((item) => item.id !== id));
  };

  // Location handlers
  const handleAddLocation = () => {
    setLocations((prev) => [
      ...prev,
      { id: `loc-${Date.now()}`, address: "" },
    ]);
  };

  const handleUpdateLocation = (id: string, address: string) => {
    setLocations((prev) =>
      prev.map((item) => (item.id === id ? { ...item, address } : item))
    );
  };

  const handleRemoveLocation = (id: string) => {
    if (locations.length <= 1) return;
    setLocations((prev) => prev.filter((item) => item.id !== id));
  };

  // Attachment handlers
  const handleAddAttachment = () => {
    setAttachments((prev) => [
      ...prev,
      { id: `att-${Date.now()}`, description: "", fileName: "" },
    ]);
  };

  const handleUpdateAttachmentDesc = (id: string, description: string) => {
    setAttachments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, description } : item))
    );
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    setAttachments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, fileName: file.name, fileSize: sizeStr } : item
      )
    );
  };

  const handleRemoveAttachment = (id: string) => {
    if (attachments.length <= 1) {
      setAttachments([{ id: `att-${Date.now()}`, description: "", fileName: "" }]);
      return;
    }
    setAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      setErrorMessage("Please enter a short description for your service request.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRequestId("10003");
    }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs */}
      <RequestorTopbar userName="John Semenduyev" avatarLetter="J" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 px-3 sm:px-4 py-4 w-full">
        <div className="maximal-shell p-3 sm:p-5 w-full space-y-5">
          {/* Top Page Header matching Bidder theme */}


          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-[#fee2e2] border border-[#fca5a5] text-xs font-semibold text-[#b91c1c] flex items-center justify-between">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => setErrorMessage("")}
                  className="text-[#b91c1c] hover:opacity-75"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Section 1: Requester Information */}
            <section className="profile-panel">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2eaf0]">
                <h2 className="profile-heading mb-0">
                  <span className="profile-heading-icon" aria-hidden="true">
                    <User className="w-4 h-4 text-[#24475a]" />
                  </span>
                  <span>Requester Information</span>
                </h2>
                <span className="text-xs text-[#708593] font-medium hidden sm:inline">
                  Verified Contact Details
                </span>
              </div>

              <div className="profile-grid">
                {/* First Name */}
                <label>
                  <span className="label-title">
                    <span className="text-[12px] leading-none select-none">♟</span>
                    <span>First Name</span>
                  </span>
                  <input
                    type="text"
                    value={requesterInfo.firstName}
                    readOnly
                    aria-readonly="true"
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
                    value={requesterInfo.lastName}
                    readOnly
                    aria-readonly="true"
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
                    value={requesterInfo.title}
                    readOnly
                    aria-readonly="true"
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
                    value={requesterInfo.companyName}
                    readOnly
                    aria-readonly="true"
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
                    value={requesterInfo.phone}
                    readOnly
                    aria-readonly="true"
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
                    value={requesterInfo.email}
                    readOnly
                    aria-readonly="true"
                  />
                </label>
              </div>
            </section>

            {/* Section 2: Short Description */}
            <section className="profile-panel">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2eaf0]">
                <h2 className="profile-heading mb-0">
                  <span className="profile-heading-icon" aria-hidden="true">
                    <FileText className="w-4 h-4 text-[#24475a]" />
                  </span>
                  <span>Short Description</span>
                </h2>
                <span className="text-xs text-[#708593] font-medium">
                  {description.length} / 500 characters
                </span>
              </div>

              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                  placeholder="Enter a brief description (up to 500 characters).."
                  rows={4}
                  className="w-full text-xs sm:text-sm text-[#183144] p-3 rounded-xl border border-[#c2d0d9] bg-gradient-to-b from-[#ffffff] to-[#f8fafb] focus:border-[#4e9bc0] focus:ring-2 focus:ring-[#4e9bc0]/20 outline-none transition-all resize-y shadow-inner font-sans"
                />
              </div>
            </section>

            {/* Section 3: Project Industry */}
            <section className="profile-panel">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2eaf0]">
                <h2 className="profile-heading mb-0">
                  <span className="profile-heading-icon" aria-hidden="true">
                    <LayoutGrid className="w-4 h-4 text-[#24475a]" />
                  </span>
                  <span>Project Industry</span>
                </h2>

                <button
                  type="button"
                  onClick={handleAddIndustry}
                  className="maximal-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Industry</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {industries.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-[#ffffff] border border-[#d2dde3] shadow-xs"
                  >
                    <span className="text-xs font-bold text-[#244e70] min-w-[70px]">
                      Industry {idx + 1}:
                    </span>

                    <div className="flex-1 relative">
                      <select
                        value={item.name}
                        onChange={(e) => handleUpdateIndustry(item.id, e.target.value)}
                        className="w-full h-[34px] px-3 pr-8 rounded-lg border border-[#c2d0d9] bg-gradient-to-b from-[#ffffff] to-[#f8fafb] text-xs sm:text-[13px] font-medium text-[#092e4c] outline-none focus:border-[#4e9bc0] focus:ring-2 focus:ring-[#4e9bc0]/20 cursor-pointer appearance-none"
                      >
                        {COMMON_INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#567283] text-xs">
                        ▼
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleAddIndustry}
                        className="maximal-btn-action-icon"
                        title="Add Another Industry"
                        aria-label="Add Another Industry"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      {industries.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIndustry(item.id)}
                          className="maximal-btn-action-icon btn-delete"
                          title="Remove Industry"
                          aria-label="Remove Industry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Project Location */}
            <section className="profile-panel">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2eaf0]">
                <h2 className="profile-heading mb-0">
                  <span className="profile-heading-icon" aria-hidden="true">
                    <MapPin className="w-4 h-4 text-[#24475a]" />
                  </span>
                  <span>Project Location</span>
                </h2>

                <button
                  type="button"
                  onClick={handleAddLocation}
                  className="maximal-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Location</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {locations.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-[#ffffff] border border-[#d2dde3] shadow-xs"
                  >
                    <span className="text-xs font-bold text-[#244e70] min-w-[70px]">
                      Address {idx + 1}:
                    </span>

                    <input
                      type="text"
                      value={item.address}
                      onChange={(e) => handleUpdateLocation(item.id, e.target.value)}
                      placeholder="e.g. 74 Horizon Drive, Manalapan, NJ 07726"
                      className="flex-1 h-[34px] px-3 rounded-lg border border-[#c2d0d9] bg-gradient-to-b from-[#ffffff] to-[#f8fafb] text-xs sm:text-[13px] font-medium text-[#092e4c] outline-none focus:border-[#4e9bc0] focus:ring-2 focus:ring-[#4e9bc0]/20"
                    />

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleAddLocation}
                        className="maximal-btn-action-icon"
                        title="Add Another Location"
                        aria-label="Add Another Location"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      {locations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveLocation(item.id)}
                          className="maximal-btn-action-icon btn-delete"
                          title="Remove Location"
                          aria-label="Remove Location"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Attachments */}
            <section className="profile-panel">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2eaf0]">
                <h2 className="profile-heading mb-0">
                  <span className="profile-heading-icon" aria-hidden="true">
                    <Paperclip className="w-4 h-4 text-[#24475a]" />
                  </span>
                  <span>Attachments</span>
                </h2>

                <button
                  type="button"
                  onClick={handleAddAttachment}
                  className="maximal-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Attachment</span>
                </button>
              </div>

              {/* Attachments Table */}
              <div className="maximal-tablewrap shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead className="maximal-thead">
                      <tr className="select-none">
                        <th className="w-[50%]">
                          <div className="th-title">
                            <span>Description</span>
                          </div>
                        </th>
                        <th>
                          <div className="th-title">
                            <span>File</span>
                          </div>
                        </th>
                        <th className="actions-header w-[100px] text-center">
                          <div className="th-title justify-center">
                            <span>Actions</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {attachments.map((item) => (
                        <tr key={item.id}>
                          {/* Description Input */}
                          <td>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) =>
                                handleUpdateAttachmentDesc(item.id, e.target.value)
                              }
                              placeholder="e.g. Scope of Work specification PDF"
                              className="w-full h-[32px] px-3 rounded-lg border border-[#c2d0d9] bg-gradient-to-b from-[#ffffff] to-[#f8fafb] text-xs font-medium text-[#092e4c] outline-none focus:border-[#4e9bc0]"
                            />
                          </td>

                          {/* File Upload Button / Display */}
                          <td>
                            <div className="flex items-center gap-2">
                              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#b9cbd5] bg-gradient-to-b from-[#fdfefe] to-[#d9dedf] text-xs font-semibold text-[#293d4a] shadow-xs hover:brightness-105 active:translate-y-0.5 cursor-pointer transition-all">
                                <Upload className="w-3.5 h-3.5 text-[#1b6b9e]" />
                                <span>UPLOAD</span>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(item.id, e)}
                                />
                              </label>

                              {item.fileName ? (
                                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#117a3f] bg-[#e8f7ee] border border-[#a4e6be] px-2 py-0.5 rounded-md">
                                  <FileCheck className="w-3.5 h-3.5" />
                                  <span className="truncate max-w-[180px]" title={item.fileName}>
                                    {item.fileName}
                                  </span>
                                  {item.fileSize && (
                                    <span className="text-[10px] text-[#4b7a5a]">
                                      ({item.fileSize})
                                    </span>
                                  )}
                                </span>
                              ) : (
                                <span className="text-xs text-[#7d93a2] italic">
                                  No file selected
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Row Actions */}
                          <td className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={handleAddAttachment}
                                className="maximal-btn-action-icon"
                                title="Add Row"
                                aria-label="Add Row"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveAttachment(item.id)}
                                className="maximal-btn-action-icon btn-delete"
                                title="Remove Attachment"
                                aria-label="Remove Attachment"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 6: Action Footer with Iconic Green Submit Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Link
                href="/requestor/dashboard"
                className="maximal-btn-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-b from-[#2ea858] to-[#1f8b44] border border-[#1a7e3c] shadow-md shadow-emerald-950/20 hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Submitting Request..." : "Submit Request"}</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Success Modal Confirmation Dialog */}
      {submittedRequestId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-md p-6 sm:p-7 rounded-2xl border border-white shadow-2xl relative text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#e8f7ee] border border-[#a4e6be] flex items-center justify-center text-[#117a3f]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#1a4463]">
                Service Request Published!
              </h3>
              <p className="text-xs sm:text-sm text-[#5d7c8e] mt-1.5">
                Your request has been posted successfully with Request ID{" "}
                <span className="font-extrabold text-[#117a3f]">
                  #{submittedRequestId}
                </span>
                . Verified bidders will now be able to review and submit bids.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <Link
                href="/requestor/requests"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-b from-[#2ea858] to-[#1f8b44] border border-[#1a7e3c] shadow-sm hover:brightness-110 transition-all text-center"
              >
                View Active Requests
              </Link>
              <Link
                href="/requestor/dashboard"
                className="w-full sm:w-auto maximal-btn-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold text-center"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
