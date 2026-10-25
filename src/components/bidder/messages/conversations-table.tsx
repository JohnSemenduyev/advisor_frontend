"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpDown, MessageSquare } from "lucide-react";
import { Conversation } from "./messages-types";

interface ConversationsTableProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (conv: Conversation) => void;
}

export function ConversationsTable({
  conversations,
  selectedId,
  onSelect,
}: ConversationsTableProps) {
  const [sortField, setSortField] = useState<keyof Conversation | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: keyof Conversation) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedConversations = useMemo(() => {
    if (!sortField) return conversations;
    return [...conversations].sort((a, b) => {
      const aVal = String(a[sortField] || "").toLowerCase();
      const bVal = String(b[sortField] || "").toLowerCase();
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [conversations, sortField, sortAsc]);

  // Pad table with subtle empty placeholder rows to match screenshot aesthetic
  const minRows = 7;
  const emptyRowsCount = Math.max(0, minRows - sortedConversations.length);

  return (
    <div className="maximal-tablewrap shadow-lg overflow-hidden border border-[#b8c9d4] rounded-2xl bg-white w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          {/* Header matching Maximal Reference metallic silver */}
          <thead className="maximal-thead maximal-thead-compact">
            <tr className="select-none">
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer w-[15%] min-w-[105px]"
              >
                <div className="th-title">
                  <span>Name</span>
                  <button type="button" className="sort" title="Sort Name">
                    {sortField === "name" ? (sortAsc ? "↑" : "↓") : "↕"}
                  </button>
                </div>
              </th>

              <th
                onClick={() => handleSort("title")}
                className="cursor-pointer w-[12%] min-w-[75px]"
              >
                <div className="th-title">
                  <span>Title</span>
                  <button type="button" className="sort" title="Sort Title">
                    {sortField === "title" ? (sortAsc ? "↑" : "↓") : "↕"}
                  </button>
                </div>
              </th>

              <th
                onClick={() => handleSort("companyName")}
                className="cursor-pointer w-[24%] min-w-[120px]"
              >
                <div className="th-title">
                  <span>Company Name</span>
                  <button type="button" className="sort" title="Sort Company Name">
                    {sortField === "companyName" ? (sortAsc ? "↑" : "↓") : "↕"}
                  </button>
                </div>
              </th>

              <th
                onClick={() => handleSort("serviceRequest")}
                className="cursor-pointer w-[26%] min-w-[130px]"
              >
                <div className="th-title">
                  <span>Service Request</span>
                  <button type="button" className="sort" title="Sort Service Request">
                    {sortField === "serviceRequest" ? (sortAsc ? "↑" : "↓") : "↕"}
                  </button>
                </div>
              </th>

              <th
                onClick={() => handleSort("serviceRequestId")}
                className="cursor-pointer w-[13%] min-w-[75px] whitespace-nowrap"
              >
                <div className="th-title">
                  <span>Service Request ID</span>
                  <button type="button" className="sort" title="Sort Service Request ID">
                    {sortField === "serviceRequestId" ? (sortAsc ? "↑" : "↓") : "↕"}
                  </button>
                </div>
              </th>

              <th
                onClick={() => handleSort("hasNewMessages")}
                className="actions-header w-[10%] min-w-[65px] cursor-pointer"
              >
                <div className="th-title">
                  <span>Messages</span>
                  <button type="button" className="sort" title="Sort Messages">
                    {sortField === "hasNewMessages" ? (sortAsc ? "↑" : "↓") : "↕"}
                  </button>
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {sortedConversations.map((conv) => {
              const isSelected = selectedId === conv.id;
              return (
                <tr
                  key={conv.id}
                  onClick={() => onSelect(conv)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "!bg-[#e5f1fb]" : ""
                  }`}
                >
                  {/* Name */}
                  <td className="whitespace-nowrap font-medium text-[#253946]">
                    {conv.name}
                  </td>

                  {/* Title */}
                  <td className="whitespace-nowrap text-[#536b7b]">
                    {conv.title}
                  </td>

                  {/* Company Name */}
                  <td className="leading-snug text-[#253946]">
                    {conv.companyName}
                  </td>

                  {/* Service Request */}
                  <td className="leading-snug text-[#253946]">
                    {conv.serviceRequest}
                  </td>

                  {/* Service Request ID */}
                  <td className="whitespace-nowrap font-medium">
                    <Link
                      href={`/bidder/submit-bid/${conv.serviceRequestId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline text-[#0066c0]"
                    >
                      {conv.serviceRequestId}
                    </Link>
                  </td>

                  {/* Messages Icon */}
                  <td className="text-center">
                    <div className="flex items-center justify-center">
                      <div className="maximal-btn-action-icon" title="View conversation">
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* Ruled Empty Rows matching screenshot presentation */}
            {Array.from({ length: emptyRowsCount }).map((_, i) => (
              <tr key={`empty-${i}`} className="h-11">
                <td colSpan={6} className="px-4 py-3 text-transparent select-none border-b border-[#e8f0f5]">
                  &nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
