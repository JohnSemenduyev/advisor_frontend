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
    <div className="maximal-tablewrap shadow-lg overflow-hidden border border-[#b8c9d4] rounded-2xl bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[620px]">
          {/* Header Gradient matching screenshot */}
          <thead>
            <tr className="bg-gradient-to-r from-[#005ea6] via-[#006bbd] to-[#004f8c] text-white text-xs font-bold tracking-tight select-none">
              <th
                onClick={() => handleSort("name")}
                className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span>Name</span>
                  <ArrowUpDown className="w-3 h-3 text-white/70" />
                </div>
              </th>

              <th
                onClick={() => handleSort("title")}
                className="px-3.5 py-3.5 cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span>Title</span>
                  <ArrowUpDown className="w-3 h-3 text-white/70" />
                </div>
              </th>

              <th
                onClick={() => handleSort("companyName")}
                className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span>Company Name</span>
                  <ArrowUpDown className="w-3 h-3 text-white/70" />
                </div>
              </th>

              <th
                onClick={() => handleSort("serviceRequest")}
                className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span>Service Request</span>
                  <ArrowUpDown className="w-3 h-3 text-white/70" />
                </div>
              </th>

              <th
                onClick={() => handleSort("serviceRequestId")}
                className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span>Service Request ID</span>
                  <ArrowUpDown className="w-3 h-3 text-white/70" />
                </div>
              </th>

              <th
                onClick={() => handleSort("hasNewMessages")}
                className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors whitespace-nowrap w-[110px]"
              >
                <div className="flex items-center gap-1.5">
                  <span>Messages</span>
                  <ArrowUpDown className="w-3 h-3 text-white/70" />
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-[#e3edf3] text-xs text-[#203646]">
            {sortedConversations.map((conv) => {
              const isSelected = selectedId === conv.id;
              return (
                <tr
                  key={conv.id}
                  onClick={() => onSelect(conv)}
                  className={`cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-[#e5f1fb] font-semibold text-[#0f4b75]"
                      : "hover:bg-[#f3f8fc]"
                  }`}
                >
                  {/* Name */}
                  <td className="px-4 py-3.5 font-bold text-[#143247] whitespace-nowrap">
                    {conv.name}
                  </td>

                  {/* Title */}
                  <td className="px-3.5 py-3.5 text-[#3e5667] whitespace-nowrap">
                    {conv.title}
                  </td>

                  {/* Company Name */}
                  <td className="px-4 py-3.5 text-[#253e50] whitespace-nowrap">
                    {conv.companyName}
                  </td>

                  {/* Service Request */}
                  <td className="px-4 py-3.5 text-[#253e50] whitespace-nowrap">
                    {conv.serviceRequest}
                  </td>

                  {/* Service Request ID */}
                  <td className="px-4 py-3.5 font-bold text-[#0066c0] whitespace-nowrap">
                    <Link
                      href={`/bidder/submit-bid/${conv.serviceRequestId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline"
                    >
                      {conv.serviceRequestId}
                    </Link>
                  </td>

                  {/* Messages Icon + New Badge perfectly aligned */}
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-[#0070c9] stroke-[2.2] flex-none" />
                      {conv.hasNewMessages && (
                        <span className="text-[11px] font-extrabold text-[#e53935] tracking-tight">
                          New
                        </span>
                      )}
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
