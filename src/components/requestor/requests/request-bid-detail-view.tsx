"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  ArrowLeft,
  Building2,
  CheckCircle2,
  MessageSquare,
  X,
  User,
  Paperclip,
  Download,
  Send,
  Calendar,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { RequestorTopbar } from "../navigation/requestor-topbar";
import { getRequestData } from "./bids-data";

export interface RequestBidDetailViewProps {
  requestId?: string;
  bidId?: string;
}

export function RequestBidDetailView({
  requestId = "10001",
  bidId,
}: RequestBidDetailViewProps) {
  const router = useRouter();
  const requestData = getRequestData(requestId);
  const selectedBid =
    (bidId ? requestData.bids.find((b) => b.id === bidId) : null) ||
    requestData.bids[0];

  const data = {
    requestId: requestData.requestId,
    requestTitle: requestData.requestTitle,
    requestDescription: requestData.requestDescription,
    location: requestData.location,
    bidDueDate: requestData.bidDueDate,
    bidder: selectedBid.bidderDetails,
    attachments: selectedBid.attachments,
    initialMessages: selectedBid.messages,
  };

  // Chat State
  const [messages, setMessages] = useState(data.initialMessages);
  const [chatInput, setChatInput] = useState("");
  const isInitialMount = useRef(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Accept Bid State
  const [isAccepted, setIsAccepted] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);

  // Guarantee window always starts at the top on navigation / page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      const rAF = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });

      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 50);

      return () => {
        cancelAnimationFrame(rAF);
        clearTimeout(timer);
      };
    }
  }, [requestId]);

  // Only scroll the internal chat container down when new messages are added, never moving the window
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "John",
      isBidder: false,
      greeting: "Hello Michael,",
      body: chatInput.trim(),
      signOff: "Best regards,\nJohn",
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFocusChat = () => {
    textareaRef.current?.focus();
  };

  const handleConfirmAccept = () => {
    setIsAccepted(true);
    setShowAcceptModal(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs */}
      <RequestorTopbar userName="John Semenduyev" avatarLetter="J" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 px-3 sm:px-4 py-4 w-full">
        <div className="maximal-shell p-3 sm:p-5 w-full space-y-4 sm:space-y-5">
          {/* Top Actions: Back to Bids Button */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href={`/requestor/requests/${requestId}`}
              scroll={true}
              className="maximal-btn-secondary inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold cursor-pointer text-[#294254] hover:text-[#112d40]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Bids</span>
            </Link>

            {isAccepted && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-[#166534] bg-[#eaf7ee] border border-[#a4e6be] shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bid Formally Accepted & Contracted</span>
              </span>
            )}
          </div>

          {/* Page Title & Subtitle Header matching Client Screenshot */}
          <div className="flex items-center gap-3.5 pb-1">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86] flex-none shadow-xs">
              <FileText className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a4463] tracking-tight">
                {data.requestTitle}
              </h1>
              <p className="text-xs sm:text-sm text-[#5d7c8e] mt-0.5">
                View details of the submitted bid and communicate with the bidder.
              </p>
            </div>
          </div>

          {/* Section 1: Upper Summary Card matching Screenshot 1 */}
          <section className="profile-panel shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs sm:text-[13px]">
              {/* Left Column (col-span-7): Request Title & Request Description */}
              <div className="md:col-span-7 space-y-3.5 border-b md:border-b-0 md:border-r border-[#e0e8ed] pb-3 md:pb-0 md:pr-5">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#637d8f] mb-1">
                    Request Title
                  </span>
                  <span className="font-bold text-base text-[#15344a]">
                    {data.requestTitle}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#637d8f] mb-1">
                    Request Description
                  </span>
                  <p className="text-[#324a5b] leading-relaxed">
                    {data.requestDescription}
                  </p>
                </div>
              </div>

              {/* Right Column (col-span-5): Request ID, Location, Bid Due Date */}
              <div className="md:col-span-5 space-y-3 pl-0 md:pl-2">
                <div className="flex items-center justify-between py-1 border-b border-[#edf2f6]">
                  <span className="font-bold text-[#637d8f]">Request ID</span>
                  <span className="font-bold text-[#185a86] font-mono text-sm">
                    {data.requestId}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#edf2f6]">
                  <span className="font-bold text-[#637d8f]">Location</span>
                  <span className="font-medium text-[#253e50] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#185a86]" />
                    {data.location}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="font-bold text-[#637d8f]">Bid Due Date</span>
                  <span className="font-semibold text-[#253e50] font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#185a86]" />
                    {data.bidDueDate}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Split Bottom Half - Left: Bidder Details, Right: Message Bidder */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-5 items-start">
            {/* LEFT SIDE (col-span-12 lg:col-span-7 xl:col-span-8): Bidder Info & Attachments */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-4">
              {/* Bidder Card Container with Silver Theme */}
              <section className="profile-panel shadow-sm space-y-4">
                {/* Header with Company Name & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#e2eaf0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86] flex-none">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-extrabold text-[#1a4463] tracking-tight">
                        {data.bidder.companyName}
                      </h2>
                      <span className="text-[11px] font-semibold text-[#166534] bg-[#eaf7ee] border border-[#b6e8c8] px-2 py-0.5 rounded-full inline-block mt-0.5">
                        Verified Prime Vendor
                      </span>
                    </div>
                  </div>

                  {/* Header Action Buttons matching Screenshot 1 */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Accept Bid Button */}
                    <button
                      type="button"
                      onClick={() => setShowAcceptModal(true)}
                      disabled={isAccepted}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-b from-[#2ea858] to-[#1f8b44] border border-[#1a7e3c] shadow-xs hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      title="Accept this submitted bid"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.4]" />
                      <span>{isAccepted ? "Bid Accepted" : "Accept Bid"}</span>
                    </button>

                    {/* Message Bidder Button */}
                    <button
                      type="button"
                      onClick={handleFocusChat}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-b from-[#0264b3] to-[#014f8e] border border-[#01447a] shadow-xs hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all"
                      title="Direct message this bidder"
                    >
                      <MessageSquare className="w-3.5 h-3.5 stroke-[2.4]" />
                      <span>Message Bidder</span>
                    </button>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => router.push(`/requestor/requests/${requestId}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-b from-[#263c4a] to-[#14232c] border border-[#14232c] shadow-xs hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all"
                      title="Back to bids"
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.4]" />
                      <span>Close</span>
                    </button>
                  </div>
                </div>

                {/* Sub-panel 1: Bidder Information */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="profile-heading-icon !w-7 !h-7" aria-hidden="true">
                      <User className="w-4 h-4 text-[#24475a]" />
                    </span>
                    <h3 className="text-sm font-bold text-[#1f3b4f]">
                      Bidder Information
                    </h3>
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
                        value={data.bidder.firstName}
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
                        value={data.bidder.companyName}
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
                        value={data.bidder.lastName}
                        readOnly
                        aria-readonly="true"
                      />
                    </label>

                    {/* Company Street Address */}
                    <label>
                      <span className="label-title">
                        <span className="text-[12px] leading-none select-none">♧</span>
                        <span>Company Street Address</span>
                      </span>
                      <input
                        type="text"
                        value={data.bidder.streetAddress}
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
                        value={data.bidder.title}
                        readOnly
                        aria-readonly="true"
                      />
                    </label>

                    {/* Company City */}
                    <label>
                      <span className="label-title">
                        <span className="text-[12px] leading-none select-none">♧</span>
                        <span>Company City</span>
                      </span>
                      <input
                        type="text"
                        value={data.bidder.city}
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
                      <a
                        href={`mailto:${data.bidder.email}`}
                        className="flex items-center h-[34px] px-3 rounded-lg border border-[#c2d0d9] bg-gradient-to-b from-[#ffffff] to-[#f8fafb] text-xs font-semibold text-[#0066c0] hover:underline"
                      >
                        {data.bidder.email}
                      </a>
                    </label>

                    {/* Company State */}
                    <label>
                      <span className="label-title">
                        <span className="text-[12px] leading-none select-none">♧</span>
                        <span>Company State</span>
                      </span>
                      <input
                        type="text"
                        value={data.bidder.state}
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
                        value={data.bidder.phone}
                        readOnly
                        aria-readonly="true"
                      />
                    </label>

                    {/* Company Zip Code */}
                    <label>
                      <span className="label-title">
                        <span className="text-[12px] leading-none select-none">♧</span>
                        <span>Company Zip Code</span>
                      </span>
                      <input
                        type="text"
                        value={data.bidder.zipCode}
                        readOnly
                        aria-readonly="true"
                      />
                    </label>

                    {/* Company Website */}
                    <label className="col-span-1 sm:col-span-2">
                      <span className="label-title">
                        <span className="text-[12px] leading-none select-none">▥</span>
                        <span>Company Website</span>
                      </span>
                      <a
                        href={`https://${data.bidder.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 h-[34px] px-3 rounded-lg border border-[#c2d0d9] bg-gradient-to-b from-[#ffffff] to-[#f8fafb] text-xs font-semibold text-[#0066c0] hover:underline"
                      >
                        <span>{data.bidder.website}</span>
                        <ExternalLink className="w-3 h-3 text-[#0066c0]" />
                      </a>
                    </label>
                  </div>
                </div>

                {/* Sub-panel 2: Attachments matching Screenshot 1 */}
                <div className="pt-3 border-t border-[#e2eaf0]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="profile-heading-icon !w-7 !h-7" aria-hidden="true">
                      <Paperclip className="w-4 h-4 text-[#24475a]" />
                    </span>
                    <h3 className="text-sm font-bold text-[#1f3b4f]">
                      Attachments
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {data.attachments.map((item) => (
                      <React.Fragment key={item.id}>
                        {/* Description Box with Download */}
                        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-[#d2dde3] bg-[#ffffff] shadow-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-bold text-[#185a86] flex-none">
                              Description {item.descNumber}:
                            </span>
                            <span
                              className="text-xs font-medium text-[#2d4251] truncate"
                              title={item.description}
                            >
                              {item.description}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="maximal-btn-action-icon text-[#185a86] hover:bg-[#e4eff6]"
                            title={`Download ${item.description}`}
                            aria-label={`Download ${item.description}`}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* File Name Box with Download */}
                        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-[#d2dde3] bg-[#ffffff] shadow-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-xs font-bold text-[#185a86] flex-none">
                              File Name {item.descNumber}:
                            </span>
                            <span
                              className="text-xs font-mono font-medium text-[#2d4251] truncate"
                              title={item.fileName}
                            >
                              {item.fileName}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="maximal-btn-action-icon text-[#185a86] hover:bg-[#e4eff6]"
                            title={`Download ${item.fileName}`}
                            aria-label={`Download ${item.fileName}`}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT SIDE (col-span-12 lg:col-span-5 xl:col-span-4): Message Bidder Chat Panel */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="maximal-card rounded-2xl border border-[#b8c9d4] bg-white shadow-lg flex flex-col overflow-hidden text-left sticky top-20">
                {/* Header */}
                <div className="px-4 py-3 border-b border-[#e5eef4] bg-gradient-to-r from-[#ffffff] to-[#f6f9fb] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#e4f2f8] text-[#185a86] flex items-center justify-center">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#1a4463] tracking-tight">
                      Message Bidder
                    </h3>
                  </div>

                  <span className="text-[11px] font-semibold text-[#668192]">
                    Direct Channel
                  </span>
                </div>

                {/* Input Area */}
                <div className="p-3 border-b border-[#e5eef4] bg-[#fbfdfd]">
                  <textarea
                    ref={textareaRef}
                    rows={3}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    className="maximal-input w-full p-2.5 text-xs rounded-xl resize-none bg-white border border-[#cad8e2] text-[#1c3342] placeholder:text-[#88a0b0] focus:ring-2 focus:ring-[#0077d9]/20 shadow-inner"
                  />

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <span className="text-[10.5px] text-[#7d97a7]">
                      Press <kbd className="font-sans px-1 rounded bg-slate-100 border border-slate-200">Enter</kbd> to send
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSendMessage()}
                      disabled={!chatInput.trim()}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs text-white bg-gradient-to-b from-[#2ea858] to-[#1f8b44] border border-[#1a7e3c] shadow-xs hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Send message"
                    >
                      <Send className="w-3.5 h-3.5 stroke-[2.4]" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>

                {/* Date Divider */}
                <div className="relative my-3 text-center">
                  <div className="absolute inset-0 flex items-center px-4">
                    <div className="w-full border-t border-[#e2eaf0]" />
                  </div>
                  <div className="relative inline-block px-3 bg-white text-[10.5px] font-semibold text-[#8198a6] uppercase tracking-wider rounded-full">
                    Aug 20, 2026
                  </div>
                </div>

                {/* Message Stream */}
                <div
                  ref={chatContainerRef}
                  className="px-3 pb-3 space-y-3 max-h-[460px] overflow-y-auto"
                >
                  {messages.map((msg) => {
                    return (
                      <div
                        key={msg.id}
                        className={`p-3.5 rounded-2xl shadow-xs text-left border ${
                          msg.isBidder
                            ? "bg-[#f2f7fc] border-[#c6dceb]"
                            : "bg-[#f0f9f3] border-[#c3ead2]"
                        }`}
                      >
                        {/* Greeting */}
                        <div className="text-xs font-bold text-[#1f3747] mb-1.5">
                          {msg.greeting}
                        </div>

                        {/* Body */}
                        <div className="text-xs leading-relaxed text-[#233f52] whitespace-pre-line font-normal break-words mb-2">
                          {msg.body}
                        </div>

                        {/* Signoff & Timestamp */}
                        <div className="flex items-end justify-between pt-1 border-t border-black/5 text-[11px]">
                          <span className="font-semibold text-[#486375] whitespace-pre-line leading-tight">
                            {msg.signOff}
                          </span>
                          <span className="font-medium text-[#7791a1]">
                            {msg.timestamp}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Accept Bid Confirmation Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-md p-6 sm:p-7 rounded-2xl border border-white shadow-2xl relative text-left space-y-4">
            <button
              onClick={() => setShowAcceptModal(false)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#e8f7ee] border border-[#a4e6be] flex items-center justify-center text-[#117a3f]">
                <ShieldCheck className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a4463]">
                  Accept Tender Proposal
                </h3>
                <p className="text-xs text-[#5d7c8e]">
                  Confirm contract award to {data.bidder.companyName}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#405969] leading-relaxed">
              Are you sure you wish to accept the bid submitted by{" "}
              <strong className="text-[#132c3d]">
                {data.bidder.companyName}
              </strong>{" "}
              for tender{" "}
              <strong className="text-[#132c3d]">
                #{data.requestId} ({data.requestTitle})
              </strong>
              ? This action will generate the formal service contract and notify
              the contractor.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowAcceptModal(false)}
                className="maximal-btn-secondary px-4 py-2 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAccept}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl font-bold text-xs text-white bg-gradient-to-b from-[#2ea858] to-[#1f8b44] border border-[#1a7e3c] shadow-sm hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirm Acceptance</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
