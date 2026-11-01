"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handleSort = (field: keyof Conversation) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
    setCurrentPage(1);
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

  const totalPages = Math.max(1, Math.ceil(sortedConversations.length / pageSize));
  const currentRecords = sortedConversations.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="maximal-tablewrap shadow-lg overflow-hidden border border-[#b8c9d4] rounded-2xl bg-white w-full flex flex-col flex-1 min-h-0">
      <div className="overflow-x-auto overflow-y-auto w-full flex-1 min-h-0">
        <table className="w-full text-left border-collapse table-fixed min-w-[700px]">
          <colgroup>
            <col style={{ width: "16%" }} />
            <col style={{ width: "13%" }} />
            <col style={{ width: "24%" }} />
            <col style={{ width: "24%" }} />
            <col style={{ width: "14%" }} />
            <col style={{ width: "9%" }} />
          </colgroup>

          {/* Header matching Maximal Reference metallic silver */}
          <thead className="maximal-thead maximal-thead-compact">
            <tr className="select-none">
              <th
                onClick={() => handleSort("name")}
                className="cursor-pointer"
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
                className="cursor-pointer"
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
                className="cursor-pointer"
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
                className="cursor-pointer"
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
                className="cursor-pointer whitespace-nowrap"
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
                className="actions-header cursor-pointer text-center"
              >
                <div className="th-title justify-center">
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
            {currentRecords.map((conv) => {
              const isSelected = selectedId === conv.id;
              return (
                <tr
                  key={conv.id}
                  onClick={() => onSelect(conv)}
                  className={`cursor-pointer transition-colors ${isSelected ? "!bg-[#e5f1fb]" : "hover:bg-[#f2f7fb]"
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

            {currentRecords.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-[#668090]">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with Full Pagination directly below the rows - always visible pinned at bottom */}
      <div className="maximal-table-footer flex-none px-4 py-3 border-t border-[#d6dde1] bg-[#f9fafb] text-xs text-[#526673]">
        {/* Record Count */}
        <div className="font-medium text-[#526673]">
          Showing {sortedConversations.length ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(currentPage * pageSize, sortedConversations.length)} of {sortedConversations.length} records
        </div>

        {/* Page Selector & Arrows - Segmented Capsule */}
        <div className="page-navigation" aria-label="Pagination">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="pager-arrow"
            title="First Page"
            aria-label="First Page"
          >
            «
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="pager-arrow"
            title="Previous Page"
            aria-label="Previous Page"
          >
            ‹
          </button>

          <span className="page-number-list">
            {(() => {
              const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
              const end = Math.min(totalPages, start + 4);
              const pages: number[] = [];
              for (let i = start; i <= end; i++) {
                pages.push(i);
              }
              return pages.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`page-number ${currentPage === page ? "current" : ""}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </button>
              ));
            })()}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="pager-arrow"
            title="Next Page"
            aria-label="Next Page"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="pager-arrow"
            title="Last Page"
            aria-label="Last Page"
          >
            »
          </button>
        </div>

        {/* Page Size Select */}
        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 bg-white border border-[#b8c9d4] rounded text-xs text-[#2c3e50] focus:outline-none focus:ring-1 focus:ring-[#0a84c1]"
            aria-label="Rows per page"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  );
}
