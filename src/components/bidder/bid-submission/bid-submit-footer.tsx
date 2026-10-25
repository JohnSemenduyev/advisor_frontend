"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Send, X, CheckCircle2, AlertCircle } from "lucide-react";

interface BidSubmitFooterProps {
  onCancelHref?: string;
  requestId?: string;
}

export function BidSubmitFooter({
  onCancelHref = "/bidder/search-requests",
  requestId = "10001",
}: BidSubmitFooterProps) {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleConfirmSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        router.push("/bidder/search-requests");
      }, 1800);
    }, 900);
  };

  return (
    <>
      <div className="maximal-card p-4 sm:p-5 rounded-2xl border border-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Message to Submitter Box matching 2nd screenshot */}
        <div className="flex items-start gap-3 flex-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86] flex-none mt-0.5">
            <MessageSquare className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1a4463] tracking-tight">
              Message to Submitter
            </h3>
            <p className="text-xs text-[#537387] mt-0.5 leading-relaxed">
              Pop up message before submitting the bid - Please confirm that you would like to Submit the bid?
            </p>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3 flex-none justify-end">
          <button
            type="button"
            onClick={() => router.push(onCancelHref)}
            className="maximal-btn-secondary px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="maximal-btn-primary px-6 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Submit Bid</span>
          </button>
        </div>
      </div>

      {/* Confirmation Pop-up Modal matching prompt specification */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-md p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            {!isSubmitting && !submitSuccess && (
              <button
                onClick={() => setShowConfirmModal(false)}
                className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86]">
                <AlertCircle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a4463]">
                  Submit Bid Confirmation
                </h3>
                <p className="text-xs text-[#6e8492]">Requisition #{requestId}</p>
              </div>
            </div>

            {submitSuccess ? (
              <div className="p-4 rounded-xl bg-[#eaf7ee] border border-[#a8e2bc] text-[#136838] flex items-start gap-3 my-2">
                <CheckCircle2 className="w-6 h-6 flex-none mt-0.5" />
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong className="block font-bold">Bid Successfully Submitted!</strong>
                  Your proposal and attached documentation have been registered for Requisition #{requestId}. Redirecting...
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-[#385264] leading-relaxed">
                  Please confirm that you would like to Submit the bid? Once submitted, the buyer will be notified to review your qualifications.
                </p>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowConfirmModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-[#597180] hover:bg-[#e6eff4] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleConfirmSubmit}
                    className="maximal-btn-primary px-5 py-2 text-xs font-bold rounded-xl text-white flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? "Submitting..." : "Yes, Submit Bid"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
