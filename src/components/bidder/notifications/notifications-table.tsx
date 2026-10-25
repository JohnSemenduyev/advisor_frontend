"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCircle2,
  X,
  CreditCard,
  Send,
  Eye,
  Calendar,
} from "lucide-react";

export interface NotificationItem {
  id: string;
  dateTime: string;
  text: string;
  requestId?: string;
  actionType: "view_bid" | "contact_buyer" | "renew" | "update_profile";
  actionLabel: string;
}

const SEED_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    dateTime: "03/31/2026 - 11:33am",
    text: "Your bid to the following request has been successfully submitted: ",
    requestId: "10001",
    actionType: "view_bid",
    actionLabel: "View Bid",
  },
  {
    id: "notif-2",
    dateTime: "04/11/2026 - 12:01am",
    text: "Your bid to the following request has been accepted: ",
    requestId: "10001",
    actionType: "contact_buyer",
    actionLabel: "Contact Buyer",
  },
  {
    id: "notif-3",
    dateTime: "04/14/2026 - 17:09am",
    text: "Your subscription is about to expire. Subscription period: 01/01/2026 - 12/31/2026",
    actionType: "renew",
    actionLabel: "Renew",
  },
  {
    id: "notif-4",
    dateTime: "04/14/2026 - 17:09am",
    text: "Your profile has been created",
    actionType: "update_profile",
    actionLabel: "Update Profile",
  },
];

export function NotificationsTable() {
  const router = useRouter();
  const [notifications] = useState<NotificationItem[]>(SEED_NOTIFICATIONS);

  // Active Modals
  const [viewBidOpen, setViewBidOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [renewOpen, setRenewOpen] = useState(false);
  const [renewSuccess, setRenewSuccess] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [messageText, setMessageText] = useState("");

  const handleAction = (item: NotificationItem) => {
    switch (item.actionType) {
      case "view_bid":
        setViewBidOpen(true);
        break;
      case "contact_buyer":
        setContactOpen(true);
        break;
      case "renew":
        setRenewOpen(true);
        break;
      case "update_profile":
        router.push("/bidder/profile");
        break;
    }
  };

  const handleRenewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRenewSuccess(true);
    setTimeout(() => {
      setRenewSuccess(false);
      setRenewOpen(false);
    }, 1800);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setContactOpen(false);
      setMessageText("");
    }, 1800);
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">


      {/* Elevated Notifications Card & Table matching screenshot */}
      <div className="maximal-tablewrap shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            {/* Header matching solid blue header in screenshot */}
            <thead className="maximal-thead">
              <tr className="text-xs sm:text-sm font-bold tracking-tight select-none">
                <th className="px-5 py-3.5 w-[220px]">Date/Time</th>
                <th className="px-5 py-3.5">Notification</th>
                <th className="px-5 py-3.5 text-center w-[160px]">Actions</th>
              </tr>
            </thead>

            {/* Table Rows */}
            <tbody className="divide-y divide-[#e4edf3] text-xs sm:text-sm font-medium text-[#243d4f]">
              {notifications.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f3f8fc] transition-colors"
                >
                  {/* Date / Time */}
                  <td className="px-5 py-4 whitespace-nowrap text-[#496577] text-xs font-semibold">
                    {item.dateTime}
                  </td>

                  {/* Notification text & Request ID link */}
                  <td className="px-5 py-4 text-[#203a4c] leading-relaxed">
                    <span>{item.text}</span>
                    {item.requestId && (
                      <Link
                        href={`/bidder/submit-bid/${item.requestId}`}
                        className="text-[#0066c0] font-bold underline underline-offset-2 hover:text-[#00478a] ml-1"
                      >
                        {item.requestId}
                      </Link>
                    )}
                  </td>

                  {/* Action Button */}
                  <td className="px-5 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => handleAction(item)}
                      className="maximal-btn-action"
                    >
                      {item.actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Bid Modal */}
      {viewBidOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-lg p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            <button
              onClick={() => setViewBidOpen(false)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86]">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a4463]">
                  Submitted Bid Details
                </h3>
                <p className="text-xs text-[#6e8492]">Request ID #10001</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f2f7fa] border border-[#d5e2ea] text-xs space-y-2 mb-4">
              <div className="flex justify-between border-b border-[#d8e6ef] pb-1.5">
                <span className="text-[#647f91] font-semibold">Project Title:</span>
                <span className="font-bold text-[#1f3747]">Norfolk Guard Services</span>
              </div>
              <div className="flex justify-between border-b border-[#d8e6ef] pb-1.5">
                <span className="text-[#647f91] font-semibold">Requestor:</span>
                <span className="font-bold text-[#1f3747]">Creative Logistics</span>
              </div>
              <div className="flex justify-between border-b border-[#d8e6ef] pb-1.5">
                <span className="text-[#647f91] font-semibold">Submitted Amount:</span>
                <span className="font-extrabold text-[#116938] text-sm">$52,000 USD</span>
              </div>
              <div className="flex justify-between border-b border-[#d8e6ef] pb-1.5">
                <span className="text-[#647f91] font-semibold">Current Status:</span>
                <span className="px-2 py-0.5 rounded-full maximal-badge-new text-[10px] font-bold">Accepted</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#647f91] font-semibold">Location:</span>
                <span className="font-medium text-[#2d4657]">Edison, New Jersey</span>
              </div>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setViewBidOpen(false)}
                className="maximal-btn-secondary px-4 py-2 text-xs font-semibold rounded-xl"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewBidOpen(false);
                  setContactOpen(true);
                }}
                className="maximal-btn-action text-xs font-semibold"
              >
                Contact Buyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Buyer Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-lg p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            <button
              onClick={() => setContactOpen(false)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5f1fc] to-[#cae3f8] border border-[#aed3f3] flex items-center justify-center text-[#156cb8]">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#203440]">
                  Contact Buyer: Creative Logistics
                </h3>
                <p className="text-xs text-[#6e8492]">Re: Request #10001 (Accepted Bid)</p>
              </div>
            </div>

            {messageSent ? (
              <div className="p-4 rounded-xl bg-[#eaf7ee] border border-[#a8e2bc] text-[#136838] flex items-center gap-3 my-4">
                <CheckCircle2 className="w-6 h-6 flex-none" />
                <span className="text-xs font-semibold">
                  Your message has been sent to Creative Logistics! They will be notified via email and in-app message.
                </span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#233d4e] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Hello, thank you for accepting our bid for Norfolk Guard Services. We are ready to coordinate deployment schedules..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="maximal-input w-full px-3 py-2 text-xs resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-[#597180] hover:bg-[#e6eff4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="maximal-btn-action text-xs font-bold flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Subscription Renewal Modal */}
      {renewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-lg p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            <button
              onClick={() => setRenewOpen(false)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5f1fc] to-[#cae3f8] border border-[#aed3f3] flex items-center justify-center text-[#156cb8]">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#203440]">
                  Renew Annual Subscription
                </h3>
                <p className="text-xs text-[#6e8492]">
                  Current Period: 01/01/2026 - 12/31/2026
                </p>
              </div>
            </div>

            {renewSuccess ? (
              <div className="p-4 rounded-xl bg-[#eaf7ee] border border-[#a8e2bc] text-[#136838] flex items-center gap-3 my-4">
                <CheckCircle2 className="w-6 h-6 flex-none" />
                <span className="text-xs font-semibold">
                  Subscription successfully extended through 12/31/2027!
                </span>
              </div>
            ) : (
              <form onSubmit={handleRenewSubmit} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-[#f2f7fa] border border-[#d5e2ea] text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#486374]">Plan:</span>
                    <span className="font-bold text-[#1f3747]">BusinessAdviser Premium Bidder</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#486374]">Renewal Term:</span>
                    <span className="font-bold text-[#1f3747]">12 Months (2027)</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#d8e6ef] pt-2">
                    <span className="font-bold text-[#1f3747]">Renewal Rate:</span>
                    <span className="font-extrabold text-sm text-[#0066c0]">$299 / year</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setRenewOpen(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-[#597180] hover:bg-[#e6eff4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="maximal-btn-action text-xs font-bold flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Confirm & Renew</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
