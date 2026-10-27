"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { RequestorConversation } from "./messages-types";

interface RequestorConversationsTableProps {
  conversations: RequestorConversation[];
  selectedId: string | null;
  onSelect: (conv: RequestorConversation) => void;
}

export function RequestorConversationsTable({
  conversations,
  selectedId,
  onSelect,
}: RequestorConversationsTableProps) {
  const [sortField, setSortField] = useState<keyof RequestorConversation | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (field: keyof RequestorConversation) => {
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

  // Subtle padded empty rows to match screenshot ruling
  const minRows = 8;
  const emptyRowsCount = Math.max(0, minRows - sortedConversations.length);

  return (
    <div className="maximal-tablewrap shadow-md overflow-hidden border border-[#b8c9d4] rounded-2xl bg-white w-full h-full flex flex-col">
      <div className="overflow-x-auto overflow-y-auto flex-1 w-full">
        <table className="w-full text-left border-collapse min-w-[620px]">
          {/* Header matching Maximal Bidder Reference metallic silver */}
          <thead className="maximal-thead maximal-thead-compact">
            <tr className="select-none">
              {/* Name */}
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer w-[18%] min-w-[130px]"
              >
                <div className="th-title">
                  <span>Name</span>
                  <button type="button" className="sort" title="Sort by Name">
                    {sortField === "name" ? (sortAsc ? "↑" : "↓") : "⇅"}
                  </button>
                </div>
              </th>

              {/* Title */}
              <th
                onClick={() => handleSort("title")}
                className="cursor-pointer w-[12%] min-w-[70px]"
              >
                <div className="th-title">
                  <span>Title</span>
                  <button type="button" className="sort" title="Sort by Title">
                    {sortField === "title" ? (sortAsc ? "↑" : "↓") : "⇅"}
                  </button>
                </div>
              </th>

              {/* Company Name */}
              <th
                onClick={() => handleSort("companyName")}
                className="cursor-pointer w-[24%] min-w-[130px]"
              >
                <div className="th-title">
                  <span>Company Name</span>
                  <button type="button" className="sort" title="Sort by Company Name">
                    {sortField === "companyName" ? (sortAsc ? "↑" : "↓") : "⇅"}
                  </button>
                </div>
              </th>

              {/* Service Request */}
              <th
                onClick={() => handleSort("serviceRequest")}
                className="cursor-pointer w-[25%] min-w-[140px]"
              >
                <div className="th-title">
                  <span>Service Request</span>
                  <button type="button" className="sort" title="Sort by Service Request">
                    {sortField === "serviceRequest" ? (sortAsc ? "↑" : "↓") : "⇅"}
                  </button>
                </div>
              </th>

              {/* Service Request ID */}
              <th
                onClick={() => handleSort("serviceRequestId")}
                className="cursor-pointer w-[12%] min-w-[85px] whitespace-nowrap"
              >
                <div className="th-title">
                  <span>Service Request ID</span>
                  <button
                    type="button"
                    className="sort"
                    title="Sort by Service Request ID"
                  >
                    {sortField === "serviceRequestId" ? (sortAsc ? "↑" : "↓") : "⇅"}
                  </button>
                </div>
              </th>

              {/* Messages */}
              <th
                onClick={() => handleSort("hasNewMessages")}
                className="actions-header w-[9%] min-w-[75px] cursor-pointer text-center"
              >
                <div className="th-title justify-center">
                  <span>Messages</span>
                  <button type="button" className="sort" title="Sort Messages">
                    {sortField === "hasNewMessages" ? (sortAsc ? "↑" : "↓") : "⇅"}
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
                    isSelected ? "!bg-[#e5f1fb]" : "hover:bg-[#f2f7fb]"
                  }`}
                >
                  {/* Name */}
                  <td className="whitespace-nowrap font-semibold text-[#1d3545]">
                    {conv.name}
                  </td>

                  {/* Title */}
                  <td className="whitespace-nowrap text-[#516b7b] text-xs">
                    {conv.title}
                  </td>

                  {/* Company Name */}
                  <td className="leading-snug text-[#223947] font-medium text-xs">
                    {conv.companyName}
                  </td>

                  {/* Service Request */}
                  <td className="leading-snug text-[#1f3748] text-xs font-medium">
                    {conv.serviceRequest}
                  </td>

                  {/* Service Request ID */}
                  <td className="whitespace-nowrap font-bold">
                    <Link
                      href={`/requestor/requests/${conv.serviceRequestId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#185a86] hover:underline cursor-pointer"
                    >
                      {conv.serviceRequestId}
                    </Link>
                  </td>

                  {/* Messages Icon + New Badge */}
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div
                        className="maximal-btn-action-icon text-[#185a86]"
                        title="Open conversation"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </div>
                      {conv.hasNewMessages && (
                        <span className="text-[10.5px] font-extrabold text-[#e53935] uppercase tracking-wide leading-none select-none">
                          New
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* Padded Empty Rows for clean ruled structure matching client reference */}
            {Array.from({ length: emptyRowsCount }).map((_, i) => (
              <tr key={`empty-${i}`} className="h-11">
                <td
                  colSpan={6}
                  className="px-4 py-3 text-transparent select-none border-b border-[#e8f0f5]"
                >
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
