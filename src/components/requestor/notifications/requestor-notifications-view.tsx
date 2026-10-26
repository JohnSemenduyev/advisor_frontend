"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  FileText,
  CheckCircle2,
  MessageSquare,
  Calendar,
  User,
  X,
  Gavel,
  ExternalLink,
  Flag,
} from "lucide-react";
import { RequestorTopbar } from "../navigation/requestor-topbar";

export interface RequestorNotificationItem {
  id: string;
  dateTime: string;
  iconType: "file" | "check" | "message" | "calendar" | "user";
  textPrefix?: string;
  boldEntity?: string;
  textSuffix?: string;
  requestId?: string;
  requestTitle?: string;
  actionLabel: string;
  actionType: "view_bid" | "view_request" | "view_message" | "view_profile";
  bidDetails?: {
    bidderName: string;
    amount: string;
    notes: string;
  };
}

const SEED_NOTIFICATIONS: RequestorNotificationItem[] = [
  {
    id: "notif-1",
    dateTime: "08/31/2026 - 11:33 AM",
    iconType: "file",
    boldEntity: "Maximal Security Services",
    textSuffix: "has submitted a bid for your request:",
    requestId: "10001",
    requestTitle: "10001 - Norfolk Guard Services",
    actionLabel: "View Bid",
    actionType: "view_bid",
    bidDetails: {
      bidderName: "Maximal Security Services",
      amount: "$48,500",
      notes: "Turnkey 24/7 armed & unarmed security patrol with electronic logging and patrol validation checkpoints.",
    },
  },
  {
    id: "notif-2",
    dateTime: "08/30/2026 - 03:15 PM",
    iconType: "check",
    textPrefix: "You have accepted the bid from",
    boldEntity: "Guardian Pros",
    textSuffix: "for request:",
    requestId: "10002",
    requestTitle: "10002 - Warehouse Security",
    actionLabel: "View Request",
    actionType: "view_request",
  },
  {
    id: "notif-3",
    dateTime: "08/28/2026 - 10:42 AM",
    iconType: "message",
    boldEntity: "Creative Logistics",
    textSuffix: "has sent you a message regarding request:",
    requestId: "10001",
    requestTitle: "10001 - Norfolk Guard Services",
    actionLabel: "View Message",
    actionType: "view_message",
  },
  {
    id: "notif-4",
    dateTime: "08/27/2026 - 04:21 PM",
    iconType: "file",
    boldEntity: "Titan Security Group",
    textSuffix: "has submitted a bid for your request:",
    requestId: "10001",
    requestTitle: "10001 - Norfolk Guard Services",
    actionLabel: "View Bid",
    actionType: "view_bid",
    bidDetails: {
      bidderName: "Titan Security Group",
      amount: "$52,000",
      notes: "Dedicated site supervisor, perimeter monitoring sensors, and daily digital incident reporting.",
    },
  },
  {
    id: "notif-5",
    dateTime: "08/27/2026 - 09:00 AM",
    iconType: "calendar",
    textPrefix: "Reminder: Bidding period for request",
    requestTitle: "10001 - Norfolk Guard Services",
    requestId: "10001",
    textSuffix: "ends on 08/30/2026.",
    actionLabel: "View Request",
    actionType: "view_request",
  },
  {
    id: "notif-6",
    dateTime: "08/25/2026 - 02:17 PM",
    iconType: "file",
    boldEntity: "Secure Solutions LLC",
    textSuffix: "has submitted a bid for your request:",
    requestId: "10001",
    requestTitle: "10001 - Norfolk Guard Services",
    actionLabel: "View Bid",
    actionType: "view_bid",
    bidDetails: {
      bidderName: "Secure Solutions LLC",
      amount: "$49,800",
      notes: "Rapid response mobile security units with TWIC certification and gate control automation.",
    },
  },
  {
    id: "notif-7",
    dateTime: "08/24/2026 - 11:06 AM",
    iconType: "message",
    boldEntity: "Mark Reynolds (Creative Logistics)",
    textSuffix: "has sent you a message regarding request:",
    requestId: "10003",
    requestTitle: "10003 - Event Security",
    actionLabel: "View Message",
    actionType: "view_message",
  },
  {
    id: "notif-8",
    dateTime: "08/20/2026 - 08:00 AM",
    iconType: "calendar",
    textPrefix: "A new service request has been published:",
    requestTitle: "10003 - Event Security",
    requestId: "10003",
    actionLabel: "View Request",
    actionType: "view_request",
  },
  {
    id: "notif-9",
    dateTime: "08/18/2026 - 01:45 PM",
    iconType: "user",
    textPrefix: "Your profile has been updated successfully.",
    actionLabel: "View Profile",
    actionType: "view_profile",
  },
];

export function RequestorNotificationsView() {
  const router = useRouter();
  const [notifications] = useState<RequestorNotificationItem[]>(SEED_NOTIFICATIONS);
  const [selectedBid, setSelectedBid] = useState<RequestorNotificationItem | null>(null);

  // Filters & Pagination matching exact theme
  const [dateFilter, setDateFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [sortKey, setSortKey] = useState<"dateTime" | "text">("dateTime");
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filteredData = notifications.filter((item) => {
    if (dateFilter && !item.dateTime.toLowerCase().includes(dateFilter.toLowerCase())) {
      return false;
    }
    if (
      textFilter &&
      !(item.textPrefix && item.textPrefix.toLowerCase().includes(textFilter.toLowerCase())) &&
      !(item.boldEntity && item.boldEntity.toLowerCase().includes(textFilter.toLowerCase())) &&
      !(item.textSuffix && item.textSuffix.toLowerCase().includes(textFilter.toLowerCase())) &&
      !(item.requestTitle && item.requestTitle.toLowerCase().includes(textFilter.toLowerCase())) &&
      !(item.requestId && item.requestId.toLowerCase().includes(textFilter.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentRecords = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleResetFilters = () => {
    setDateFilter("");
    setTextFilter("");
    setCurrentPage(1);
  };

  const handleAction = (item: RequestorNotificationItem) => {
    switch (item.actionType) {
      case "view_bid":
        setSelectedBid(item);
        break;
      case "view_request":
        if (item.requestId) {
          router.push(`/requestor/requests/${item.requestId}`);
        } else {
          router.push("/requestor/requests");
        }
        break;
      case "view_message":
        router.push("/requestor/messages");
        break;
      case "view_profile":
        router.push("/requestor/dashboard");
        break;
    }
  };

  const renderIcon = (type: RequestorNotificationItem["iconType"]) => {
    switch (type) {
      case "file":
        return (
          <div className="w-8 h-8 rounded-full bg-[#e6f4fc] border border-[#b2dffc] flex items-center justify-center text-[#0974b3] flex-none">
            <FileText className="w-4 h-4" />
          </div>
        );
      case "check":
        return (
          <div className="w-8 h-8 rounded-full bg-[#e8f7ee] border border-[#a4e6be] flex items-center justify-center text-[#117a3f] flex-none">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        );
      case "message":
        return (
          <div className="w-8 h-8 rounded-full bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center text-[#2563eb] flex-none">
            <MessageSquare className="w-4 h-4" />
          </div>
        );
      case "calendar":
        return (
          <div className="w-8 h-8 rounded-full bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center text-[#d97706] flex-none">
            <Calendar className="w-4 h-4" />
          </div>
        );
      case "user":
        return (
          <div className="w-8 h-8 rounded-full bg-[#f3e8ff] border border-[#e9d5ff] flex items-center justify-center text-[#9333ea] flex-none">
            <User className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Capsule Tabs */}
      <RequestorTopbar userName="John Semenduyev" avatarLetter="J" />

      {/* Main Brushed Silver Shell Canvas - full available space */}
      <main className="flex-1 px-3 sm:px-4 py-4 w-full">
        <div className="maximal-shell p-3 sm:p-4 w-full space-y-6">
          {/* Top Page Header */}
          <div className="flex items-center gap-3.5 pb-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86] flex-none shadow-xs">
              <Bell className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a4463] tracking-tight">
                Notifications
              </h1>
              <p className="text-xs sm:text-sm text-[#5d7c8e] mt-0.5">
                Stay updated on your service requests, bids, and important activity.
              </p>
            </div>
          </div>

          {/* Elevated Table Container matching exact theme */}
          <div className="maximal-tablewrap shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px] table-fixed">
                <colgroup>
                  <col style={{ width: "22%" }} />
                  <col style={{ width: "62%" }} />
                  <col style={{ width: "16%" }} />
                </colgroup>

                {/* Header matching metallic gradient */}
                <thead className="maximal-thead">
                  <tr className="select-none">
                    {/* 1. Date / Time */}
                    <th>
                      <div className="th-title">
                        <span>Date / Time</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSortKey("dateTime");
                            setSortAsc(!sortAsc);
                          }}
                          className="sort"
                          title="Sort Date / Time"
                        >
                          {sortKey === "dateTime" ? (sortAsc ? "↑" : "↓") : "↕"}
                        </button>
                      </div>
                      <div className="filter-wrap">
                        <input
                          type="text"
                          placeholder="Search"
                          aria-label="Filter by Date or Time"
                          value={dateFilter}
                          onChange={(e) => {
                            setDateFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                        />
                      </div>
                    </th>

                    {/* 2. Notification */}
                    <th>
                      <div className="th-title">
                        <span>Notification</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSortKey("text");
                            setSortAsc(!sortAsc);
                          }}
                          className="sort"
                          title="Sort Notification"
                        >
                          {sortKey === "text" ? (sortAsc ? "↑" : "↓") : "↕"}
                        </button>
                      </div>
                      <div className="filter-wrap">
                        <input
                          type="text"
                          placeholder="Search"
                          aria-label="Filter by Notification message"
                          value={textFilter}
                          onChange={(e) => {
                            setTextFilter(e.target.value);
                            setCurrentPage(1);
                          }}
                        />
                      </div>
                    </th>

                    {/* 3. Actions */}
                    <th className="actions-header" style={{ textAlign: "center" }}>
                      <div className="th-title" style={{ justifyContent: "center" }}>
                        <span>Actions</span>
                      </div>
                      <div className="actions-flag-filter-slot">
                        <button
                          type="button"
                          onClick={handleResetFilters}
                          className="actions-flag-filter-button"
                          title="Reset filters"
                          aria-label="Reset filters"
                        >
                          <Flag className="w-[14px] h-[14px]" />
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body with zebra striping */}
                <tbody>
                  {currentRecords.map((item) => (
                    <tr key={item.id} className="hover:bg-[#e7eef2] transition-colors">
                      {/* Date / Time */}
                      <td className="whitespace-nowrap font-normal text-[12.3px] text-[#34414a]">
                        <div className="flex items-center gap-2.5">
                          {renderIcon(item.iconType)}
                          <span>{item.dateTime}</span>
                        </div>
                      </td>

                      {/* Notification Content */}
                      <td className="leading-relaxed font-normal text-[12.3px] text-[#34414a]">
                        <div className="space-x-1">
                          {item.textPrefix && <span>{item.textPrefix}</span>}
                          {item.boldEntity && (
                            <strong className="font-semibold text-[#1e2f3a]">
                              {item.boldEntity}
                            </strong>
                          )}
                          {item.textSuffix && <span>{item.textSuffix}</span>}
                          {item.requestId && (
                            <Link
                              href={`/requestor/requests/${item.requestId}`}
                              className="text-[#086ba5] hover:underline font-medium ml-1"
                            >
                              {item.requestTitle || `Request #${item.requestId}`}
                            </Link>
                          )}
                        </div>
                      </td>

                      {/* Action Button */}
                      <td className="text-center">
                        <button
                          type="button"
                          onClick={() => handleAction(item)}
                          className="maximal-btn-action text-[11.5px] py-1 px-3"
                        >
                          {item.actionLabel}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {currentRecords.length === 0 && (
                    <tr>
                      <td colSpan={3} className="text-center py-10 text-xs text-[#708593]">
                        No matching notifications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer with Full Pagination matching My Bids */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-[#d6dde1] bg-[#f9fafb] text-xs text-[#526673]">
              {/* Record Count */}
              <div className="font-medium text-[#526673]">
                Showing {filteredData.length ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
                {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} records
              </div>

              {/* Page Selector & Arrows - Segmented Capsule matching Screenshot 3 */}
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

              {/* Page Size Native Select */}
              <div className="flex items-center gap-2">
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="maximal-pager-select px-2.5 py-1 text-xs border border-[#bdcbd3] rounded-[7px] bg-linear-to-b from-white to-[#e9edf0] text-[#334e5d] font-medium"
                  aria-label="Rows per page"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-xs text-[#526673]">per page</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* View Bid Details Modal */}
      {selectedBid && selectedBid.bidDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-lg p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedBid(null)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5f0f7] to-[#cadbe6] border border-[#b8c9d4] flex items-center justify-center text-[#204358]">
                <Gavel className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#203440]">
                  Submitted Bid Details
                </h3>
                <p className="text-xs text-[#6e8492]">
                  {selectedBid.requestTitle}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#d6e0e6] space-y-3 text-xs mb-5">
              <div className="flex justify-between items-center border-b border-[#e9eff2] pb-2">
                <span className="text-[#647c8c] font-medium">Bidding Contractor</span>
                <span className="font-bold text-[#1a2d38] text-sm">
                  {selectedBid.bidDetails.bidderName}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-[#e9eff2] pb-2">
                <span className="text-[#647c8c] font-medium">Proposed Bid Amount</span>
                <span className="font-extrabold text-[#087341] text-base">
                  {selectedBid.bidDetails.amount}
                </span>
              </div>

              <div>
                <span className="text-[#647c8c] font-medium block mb-1">
                  Scope & Proposal Summary
                </span>
                <p className="text-[#354956] leading-relaxed bg-[#f8fafb] p-2.5 rounded-lg border border-[#e4ecf0]">
                  {selectedBid.bidDetails.notes}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedBid(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-[#5a6f7c] hover:bg-[#e4ecf0]"
              >
                Close
              </button>
              <Link
                href={`/requestor/requests/${selectedBid.requestId}/bids`}
                className="maximal-btn-primary px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <span>View All Tenders</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
