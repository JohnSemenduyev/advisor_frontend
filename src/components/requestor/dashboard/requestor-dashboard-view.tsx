"use client";

import React, { useState } from "react";
import { User, RotateCw, Trash2, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { RequestorTopbar } from "../navigation/requestor-topbar";
import { RequestorProfileCard } from "./requestor-profile-card";
import { ActiveRequestsCard } from "./active-requests-card";
import { RequestHistoryCard } from "./request-history-card";

export function RequestorDashboardView() {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const email = "john.s.semenduyev@email.com";

  const handleResetPassword = () => {
    setResetSent(true);
    setTimeout(() => {
      setShowResetModal(false);
      setResetSent(false);
    }, 2000);
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setShowDeleteModal(false);
      window.location.href = "/";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation with Interlocking Capsule Tabs matching Bidder */}
      <RequestorTopbar userName="John Semenduyev" avatarLetter="J" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1480px] w-full mx-auto">
        <div className="maximal-shell p-5 sm:p-7 lg:p-8 space-y-6">
          {/* Top Page Header */}
          <div className="flex items-center gap-3.5 pb-2">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86] flex-none shadow-xs">
              <User className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a4463] tracking-tight">
                Profile Information
              </h1>
              <p className="text-xs sm:text-sm text-[#5d7c8e] mt-0.5">
                Manage your requestor credentials, review active tenders, and track completed contracts.
              </p>
            </div>
          </div>

          {/* Section 1: Profile Information */}
          <RequestorProfileCard />

          {/* Section 2: Active Service Requests */}
          <ActiveRequestsCard />

          {/* Section 3: Service Request History */}
          <RequestHistoryCard />

          {/* Bottom Actions: Reset Password & Delete Account */}
          <div className="flex flex-wrap items-center justify-start gap-3 pt-4 border-t border-[#d8e2e7]">
            {/* Reset Password Button */}
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-b from-[#1b8c4c] to-[#126b38] border border-[#1b8c4c] shadow-md shadow-emerald-950/20 hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all"
            >
              <RotateCw className="w-4 h-4" />
              <span>Reset Password</span>
            </button>

            {/* Delete Account Button */}
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="maximal-btn-danger inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          </div>
        </div>
      </main>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-md p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5f0f7] to-[#cadbe6] border border-[#b8c9d4] flex items-center justify-center text-[#204358]">
                <RotateCw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#203440]">
                  Reset Account Password
                </h3>
                <p className="text-xs text-[#6e8492]">
                  Send verification credentials
                </p>
              </div>
            </div>

            {resetSent ? (
              <div className="p-4 rounded-xl bg-[#eaf7ee] border border-[#a8e2bc] text-[#136838] flex items-center gap-3 my-4">
                <CheckCircle2 className="w-5 h-5 flex-none" />
                <span className="text-xs font-semibold">
                  A password reset link has been dispatched to {email}.
                </span>
              </div>
            ) : (
              <div className="space-y-4 my-4">
                <p className="text-xs text-[#4d6676] leading-relaxed">
                  We will transmit a secure, single-use authentication link to:
                  <strong className="block text-sm font-bold text-[#1f313e] mt-1 break-all">
                    {email}
                  </strong>
                </p>
                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-[#5a6f7c] hover:bg-[#e4ecf0]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="maximal-btn-primary px-4 py-2 text-xs font-semibold"
                  >
                    Send Verification Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-md p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3 text-[#d32f2f]">
              <div className="w-10 h-10 rounded-xl bg-[#fde8e8] border border-[#f8b4b4] flex items-center justify-center text-[#c81e1e]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#9b1c1c]">
                  Deactivate Account
                </h3>
                <p className="text-xs text-[#c81e1e]">
                  Irreversible operation
                </p>
              </div>
            </div>

            <p className="text-xs text-[#52636f] leading-relaxed my-4">
              Are you sure you wish to permanently delete your Requestor profile? All active service requests, contract records, and communications will be archived.
            </p>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-[#5a6f7c] hover:bg-[#e4ecf0]"
              >
                Keep Account
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="maximal-btn-danger px-4 py-2 text-xs font-semibold"
              >
                {isDeleting ? "Processing..." : "Confirm Deletion"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
