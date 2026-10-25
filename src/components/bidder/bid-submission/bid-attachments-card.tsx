"use client";

import React from "react";
import { Paperclip, FileText, Download } from "lucide-react";

export interface AttachmentItem {
  id: number;
  descriptionLabel: string;
  descriptionText: string;
  fileNameLabel: string;
  fileNameText: string;
}

const DEFAULT_ATTACHMENTS: AttachmentItem[] = [
  {
    id: 1,
    descriptionLabel: "Description 1",
    descriptionText: "Project Proposal",
    fileNameLabel: "File Name 1",
    fileNameText: "proposal.pdf",
  },
  {
    id: 2,
    descriptionLabel: "Description 2",
    descriptionText: "Company Brochure",
    fileNameLabel: "File Name 2",
    fileNameText: "brochure.pdf",
  },
  {
    id: 3,
    descriptionLabel: "Description 3",
    descriptionText: "References",
    fileNameLabel: "File Name 3",
    fileNameText: "references.pdf",
  },
  {
    id: 4,
    descriptionLabel: "Description 4",
    descriptionText: "Additional Documents",
    fileNameLabel: "File Name 4",
    fileNameText: "additional.pdf",
  },
];

interface BidAttachmentsCardProps {
  attachments?: AttachmentItem[];
  isEditing?: boolean;
}

export function BidAttachmentsCard({
  attachments = DEFAULT_ATTACHMENTS,
  isEditing = false,
}: BidAttachmentsCardProps) {
  const handleDownload = (fileName: string) => {
    // Mock download action
    alert(`Downloading ${fileName}...`);
  };

  return (
    <div className="maximal-card p-5 sm:p-6 rounded-2xl border border-white shadow-lg space-y-4">
      {/* Card Header with Paperclip Icon matching 2nd screenshot */}
      <div className="flex items-center gap-2.5 pb-1">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#dceaf3] to-[#c9dbe7] border border-[#b5cddc] flex items-center justify-center text-[#1c4d6f] shadow-xs">
          <Paperclip className="w-4 h-4" />
        </div>
        <h2 className="text-base sm:text-lg font-bold text-[#1a4463] tracking-tight">
          Attachments
        </h2>
      </div>

      {/* Two Column Layout matching screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {/* Left Column: Descriptions */}
        <div className="space-y-2.5">
          {attachments.map((item) => (
            <div
              key={`desc-${item.id}`}
              className="flex items-center justify-between p-2.5 px-3.5 rounded-xl border border-[#d6e3ec] bg-gradient-to-r from-[#ffffff] to-[#f4f8fa] shadow-xs gap-3"
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <FileText className="w-4 h-4 text-[#446e8c] flex-none" />
                <span className="text-xs font-semibold text-[#486374] w-28 flex-none">
                  {item.descriptionLabel}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#1a384c] truncate">
                  {item.descriptionText}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDownload(item.fileNameText)}
                className="w-7 h-7 rounded-lg text-[#325a75] hover:text-[#0c436b] hover:bg-[#e2eef5] transition-colors flex items-center justify-center flex-none cursor-pointer"
                title={`Download ${item.descriptionText}`}
              >
                <Download className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          ))}
        </div>

        {/* Right Column: File Names */}
        <div className="space-y-2.5">
          {attachments.map((item) => (
            <div
              key={`file-${item.id}`}
              className="flex items-center justify-between p-2.5 px-3.5 rounded-xl border border-[#d6e3ec] bg-gradient-to-r from-[#ffffff] to-[#f4f8fa] shadow-xs gap-3"
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <Paperclip className="w-4 h-4 text-[#446e8c] flex-none" />
                <span className="text-xs font-semibold text-[#486374] w-28 flex-none">
                  {item.fileNameLabel}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#1a384c] font-mono truncate">
                  {item.fileNameText}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDownload(item.fileNameText)}
                className="w-7 h-7 rounded-lg text-[#325a75] hover:text-[#0c436b] hover:bg-[#e2eef5] transition-colors flex items-center justify-center flex-none cursor-pointer"
                title={`Download ${item.fileNameText}`}
              >
                <Download className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
