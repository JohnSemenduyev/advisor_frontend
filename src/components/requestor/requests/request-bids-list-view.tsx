"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  ArrowLeft,
  MessageSquare,
  Send,
  X,
  MessageCircle,
  Building2,
  DollarSign,
  User,
  MapPin,
} from "lucide-react";
import { RequestorTopbar } from "../navigation/requestor-topbar";
import {
  getRequestData,
  RequestBidItem,
  RequestBidMessage,
} from "./bids-data";

interface RequestBidsListViewProps {
  requestId: string;
}

type SortField = "company" | "officeLocation" | "contactName" | "bidPrice";

export function RequestBidsListView({ requestId }: RequestBidsListViewProps) {
  const router = useRouter();
  const requestData = useMemo(() => getRequestData(requestId), [requestId]);

  // Selected bidder for right-hand chat panel (null initially, matching Screenshot 1)
  const [selectedBidderId, setSelectedBidderId] = useState<string | null>(null);

  // Sorting state
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Chat state per bidder: Map of bidderId -> RequestBidMessage[]
  const [bidderConversations, setBidderConversations] = useState<
    Record<string, RequestBidMessage[]>
  >(() => {
    const initialMap: Record<string, RequestBidMessage[]> = {};
    requestData.bids.forEach((bid) => {
      initialMap[bid.id] = [...bid.messages];
    });
    return initialMap;
  });

  const [chatInput, setChatInput] = useState<string>("");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Guarantee window stays at top on navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [requestId]);

  // Scroll internal chat container when messages change
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [bidderConversations, selectedBidderId]);

  // Handle column sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc((prev) => !prev);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedBids = useMemo(() => {
    const list = [...requestData.bids];
    if (!sortField) return list;

    return list.sort((a, b) => {
      let valA: string | number = a[sortField];
      let valB: string | number = b[sortField];

      if (typeof valA === "string") {
        const cmp = valA.localeCompare(valB as string);
        return sortAsc ? cmp : -cmp;
      } else {
        return sortAsc ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      }
    });
  }, [requestData.bids, sortField, sortAsc]);

  const selectedBidder = useMemo(() => {
    if (!selectedBidderId) return null;
    return requestData.bids.find((b) => b.id === selectedBidderId) || null;
  }, [requestData.bids, selectedBidderId]);

  const currentMessages = useMemo(() => {
    if (!selectedBidderId) return [];
    return bidderConversations[selectedBidderId] || [];
  }, [bidderConversations, selectedBidderId]);

  // Send message
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    // If no bidder is selected, select the first bidder automatically
    const targetBidderId = selectedBidderId || requestData.bids[0]?.id;
    if (!targetBidderId) return;

    if (!selectedBidderId) {
      setSelectedBidderId(targetBidderId);
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg: RequestBidMessage = {
      id: `msg-${Date.now()}`,
      sender: "John",
      isBidder: false,
      greeting: `Hello ${selectedBidder?.contactName.split(" ")[0] || "Vendor"},`,
      body: chatInput.trim(),
      signOff: "Best regards,\nJohn Semenduyev",
      timestamp: timeStr,
    };

    setBidderConversations((prev) => ({
      ...prev,
      [targetBidderId]: [...(prev[targetBidderId] || []), newMsg],
    }));

    setChatInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCloseChat = () => {
    setSelectedBidderId(null);
    setChatInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Raised Tabs */}
      <RequestorTopbar userName="John Semenduyev" avatarLetter="J" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 px-3 sm:px-4 py-4 w-full">
        <div className="maximal-shell p-3 sm:p-5 w-full space-y-4 sm:space-y-5">
          {/* Breadcrumb / Back to Active Requests */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/requestor/requests"
              className="maximal-btn-secondary inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold cursor-pointer text-[#294254] hover:text-[#112d40]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Active Requests</span>
            </Link>

            <span className="text-xs font-mono font-bold text-[#185a86] bg-[#eaf4fb] border border-[#c3ddf0] px-3 py-1 rounded-full shadow-2xs">
              Request #{requestData.requestId}
            </span>
          </div>

          {/* Page Title & Subtitle Header matching Screenshot 1 */}
          <div className="flex items-center gap-3.5 pb-1">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86] flex-none shadow-xs">
              <FileText className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a4463] tracking-tight">
                {requestData.requestTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[#5d7c8e] mt-0.5">
                View bids submitted by security companies for your request.
              </p>
            </div>
          </div>

          {/* Main 2-Column Split: Left Table (col-span-8) & Right Chat Panel (col-span-4) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-5 items-start">
            {/* LEFT SIDE: Submitted Bids Table matching exact Maximal theme */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              <section className="profile-panel !p-0 overflow-hidden shadow-md">
                <div className="maximal-tablewrap border-0 rounded-xl overflow-hidden bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead className="maximal-thead">
                        <tr className="select-none">
                          {/* Company Header */}
                          <th className="min-w-[150px] !py-3 !px-3 border-r border-[#ffffffcc]">
                            <div className="th-title">
                              <span>Company</span>
                              <button
                                type="button"
                                onClick={() => handleSort("company")}
                                className="sort"
                                title="Sort by Company"
                              >
                                {sortField === "company" ? (sortAsc ? "↑" : "↓") : "⇅"}
                              </button>
                            </div>
                          </th>

                          {/* Office Location Header */}
                          <th className="min-w-[140px] !py-3 !px-3 border-r border-[#ffffffcc]">
                            <div className="th-title">
                              <span>Office Location</span>
                              <button
                                type="button"
                                onClick={() => handleSort("officeLocation")}
                                className="sort"
                                title="Sort by Office Location"
                              >
                                {sortField === "officeLocation" ? (sortAsc ? "↑" : "↓") : "⇅"}
                              </button>
                            </div>
                          </th>

                          {/* Contact Name Header */}
                          <th className="min-w-[140px] !py-3 !px-3 border-r border-[#ffffffcc]">
                            <div className="th-title">
                              <span>Contact Name</span>
                              <button
                                type="button"
                                onClick={() => handleSort("contactName")}
                                className="sort"
                                title="Sort by Contact Name"
                              >
                                {sortField === "contactName" ? (sortAsc ? "↑" : "↓") : "⇅"}
                              </button>
                            </div>
                          </th>

                          {/* Bid Price Header */}
                          <th className="min-w-[110px] !py-3 !px-3 border-r border-[#ffffffcc]">
                            <div className="th-title">
                              <span>Bid Price</span>
                              <button
                                type="button"
                                onClick={() => handleSort("bidPrice")}
                                className="sort"
                                title="Sort by Bid Price"
                              >
                                {sortField === "bidPrice" ? (sortAsc ? "↑" : "↓") : "⇅"}
                              </button>
                            </div>
                          </th>

                          {/* View Bid Header */}
                          <th className="w-[85px] !py-3 !px-3 text-center border-r border-[#ffffffcc]">
                            <div className="th-title justify-center">
                              <span>View Bid</span>
                            </div>
                          </th>

                          {/* Message Bidder Header */}
                          <th className="w-[115px] !py-3 !px-3 text-center">
                            <div className="th-title justify-center">
                              <span>Message Bidder</span>
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {sortedBids.map((bid) => {
                          const isSelected = selectedBidderId === bid.id;
                          return (
                            <tr
                              key={bid.id}
                              className={`transition-colors ${
                                isSelected
                                  ? "!bg-[#e1f0fa]"
                                  : "hover:bg-[#e7eef2] odd:bg-white even:bg-[#f8fafb]"
                              }`}
                            >
                              {/* Company Name */}
                              <td className="!py-3 !px-3 border-b border-[#e8edef]">
                                <span className="font-bold text-[#185a86]">
                                  {bid.company}
                                </span>
                              </td>

                              {/* Office Location */}
                              <td className="!py-3 !px-3 border-b border-[#e8edef] text-[#324b5c]">
                                {bid.officeLocation}
                              </td>

                              {/* Contact Name */}
                              <td className="!py-3 !px-3 border-b border-[#e8edef] text-[#324b5c]">
                                {bid.contactName}
                              </td>

                              {/* Bid Price */}
                              <td className="!py-3 !px-3 border-b border-[#e8edef]">
                                <span className="font-bold text-[#166534] font-mono">
                                  {bid.bidPriceFormatted}
                                </span>
                              </td>

                              {/* View Bid Action (Document Icon) -> Goes to Screenshot 2 */}
                              <td className="!py-3 !px-3 border-b border-[#e8edef] text-center">
                                <div className="flex items-center justify-center">
                                  <Link
                                    href={`/requestor/requests/${requestId}?bidId=${bid.id}`}
                                    scroll={true}
                                    className="maximal-btn-action-icon"
                                    title={`View Bid Details for ${bid.company}`}
                                    aria-label={`View Bid Details for ${bid.company}`}
                                  >
                                    <FileText className="w-3.5 h-3.5 text-[#185a86]" />
                                  </Link>
                                </div>
                              </td>

                              {/* Message Bidder Action (Chat Icon) -> Selects bidder in right chat */}
                              <td className="!py-3 !px-3 border-b border-[#e8edef] text-center">
                                <div className="flex items-center justify-center">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedBidderId(isSelected ? null : bid.id);
                                    }}
                                    className={`maximal-btn-action-icon ${
                                      isSelected ? "is-active" : ""
                                    }`}
                                    title={
                                      isSelected
                                        ? `Deselect ${bid.company}`
                                        : `Message ${bid.company}`
                                    }
                                    aria-label={`Message ${bid.company}`}
                                  >
                                    <MessageSquare className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE: Chat Panel matching Screenshot 1 */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="maximal-card rounded-2xl border border-[#b8c9d4] bg-white shadow-lg flex flex-col overflow-hidden text-left sticky top-20 min-h-[480px]">
                {/* Header: "Me:" with Send and Close buttons */}
                <div className="px-4 py-3 border-b border-[#e5eef4] bg-gradient-to-r from-[#ffffff] to-[#f6f9fb] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-[#1a4463]">
                      Me:
                    </span>
                    {selectedBidder && (
                      <span className="text-[11px] font-bold text-[#185a86] bg-[#e4f2f8] px-2 py-0.5 rounded-full border border-[#b4d2e3] truncate max-w-[150px]">
                        {selectedBidder.company}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Send Button */}
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-b from-[#2ea858] to-[#1f8b44] border border-[#1a7e3c] shadow-xs hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Send message"
                    >
                      <Send className="w-3.5 h-3.5 stroke-[2.4]" />
                      <span>Send</span>
                    </button>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={handleCloseChat}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-b from-[#185a86] to-[#104061] border border-[#0d344f] shadow-xs hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all"
                      title="Close conversation"
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.4]" />
                      <span>Close</span>
                    </button>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-3 border-b border-[#e5eef4] bg-[#fbfdfd]">
                  <textarea
                    rows={3}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    className="maximal-input w-full p-2.5 text-xs rounded-xl resize-none bg-white border border-[#cad8e2] text-[#1c3342] placeholder:text-[#88a0b0] focus:ring-2 focus:ring-[#0077d9]/20 shadow-inner"
                  />
                  <div className="flex items-center justify-between mt-1.5 text-[10.5px] text-[#7d97a7]">
                    <span>
                      Press <kbd className="font-sans px-1 rounded bg-slate-100 border border-slate-200">Enter</kbd> to send
                    </span>
                    {selectedBidder && (
                      <span className="font-medium text-[#185a86]">
                        Messaging {selectedBidder.contactName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Area */}
                {!selectedBidderId ? (
                  /* Empty State: Matching Screenshot 1 exactly */
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                    <div className="relative mb-4 text-[#9fb3c2]">
                      <div className="w-20 h-20 rounded-full bg-[#f2f7fb] flex items-center justify-center border border-[#d6e5ef] shadow-inner">
                        <MessageCircle className="w-10 h-10 text-[#8ba3b4] stroke-[1.6]" />
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-[#668092] max-w-[240px] leading-relaxed">
                      Select a bidder from the list to view or start a conversation.
                    </p>
                  </div>
                ) : (
                  /* Active Chat Stream */
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Date Divider */}
                    <div className="relative my-3 text-center">
                      <div className="absolute inset-0 flex items-center px-4">
                        <div className="w-full border-t border-[#e2eaf0]" />
                      </div>
                      <div className="relative inline-block px-3 bg-white text-[10.5px] font-semibold text-[#8198a6] uppercase tracking-wider rounded-full">
                        Aug 20, 2026
                      </div>
                    </div>

                    <div
                      ref={chatScrollRef}
                      className="px-3 pb-3 space-y-3 max-h-[360px] overflow-y-auto"
                    >
                      {currentMessages.length > 0 ? (
                        currentMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`p-3.5 rounded-2xl shadow-xs text-left border ${
                              msg.isBidder
                                ? "bg-[#f2f7fc] border-[#c6dceb]"
                                : "bg-[#f0f9f3] border-[#c3ead2]"
                            }`}
                          >
                            <div className="text-xs font-bold text-[#1f3747] mb-1">
                              {msg.greeting}
                            </div>
                            <div className="text-xs leading-relaxed text-[#233f52] whitespace-pre-line break-words mb-2">
                              {msg.body}
                            </div>
                            <div className="flex items-end justify-between pt-1 border-t border-black/5 text-[11px]">
                              <span className="font-semibold text-[#486375] whitespace-pre-line leading-tight">
                                {msg.signOff}
                              </span>
                              <span className="font-medium text-[#7791a1]">
                                {msg.timestamp}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6 text-xs text-[#7e97a7]">
                          No messages yet. Send a message to start the conversation.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
