"use client";

import React, { useState } from "react";
import { RotateCw, Trash2, CheckCircle2, AlertTriangle, X } from "lucide-react";

interface ProfileActionsProps {
  email: string;
}

export function ProfileActions({ email }: ProfileActionsProps) {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = () => {
    setResetSent(true);
    setTimeout(() => {
      setShowResetModal(false);
      setResetSent(false);
    }, 2500);
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
    <>
      <div className="flex flex-wrap items-center justify-end gap-3 pt-4">
        {/* Reset Password Button */}
        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="maximal-btn-secondary inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
        >
          <RotateCw className="w-4 h-4 text-[#334e5f]" />
          <span>Reset Password</span>
        </button>

        {/* Delete Account Button */}
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="maximal-btn-danger inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete Account</span>
        </button>
      </div>

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
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-[#597180] hover:bg-[#e6eff4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="maximal-btn-primary px-4 py-2 text-xs font-semibold rounded-xl"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Maximal Delete Confirmation Dialog */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[430px] rounded-2xl overflow-hidden border border-[#a8b7bf] bg-gradient-to-br from-[#ffffff] to-[#f0f4f6] shadow-2xl text-left">
            <div className="flex items-center gap-3.5 p-6 pb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#feebe9] to-[#fbd3cf] border border-[#f3a8a0] flex items-center justify-center text-[#c43224] flex-none">
                <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1f2d36] leading-tight">
                  Delete Account?
                </h3>
                <p className="text-xs text-[#6e828f] mt-0.5">
                  Permanent action
                </p>
              </div>
            </div>

            <p className="px-6 py-2 text-xs text-[#526673] leading-relaxed">
              Are you sure you want to permanently delete your contractor profile and remove all active bids? This action cannot be reversed.
            </p>

            <div className="flex items-center justify-end gap-2.5 p-4 px-6 border-t border-[#d8e2e7] bg-[#edf2f5]/60 mt-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#b8c6ce] bg-gradient-to-b from-[#fff] to-[#e8edf0] text-[#334550] shadow-xs hover:brightness-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold rounded-xl maximal-btn-danger flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? "Deleting..." : "Delete Account"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
