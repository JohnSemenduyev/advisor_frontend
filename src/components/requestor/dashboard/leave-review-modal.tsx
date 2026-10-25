"use client";

import React, { useState } from "react";
import { Star, X, CheckCircle2 } from "lucide-react";

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  providerName: string;
  onReviewSubmitted: (requestId: string, rating: number, comment: string) => void;
}

export function LeaveReviewModal({
  isOpen,
  onClose,
  requestId,
  providerName,
  onReviewSubmitted,
}: LeaveReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onReviewSubmitted(requestId, rating, comment);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="maximal-card w-full max-w-md p-6 rounded-2xl border border-white shadow-2xl relative text-left">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5f0f7] to-[#cadbe6] border border-[#b8c9d4] flex items-center justify-center text-[#204358]">
            <Star className="w-5 h-5 fill-[#eab308] text-[#eab308]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#203440]">
              Leave Contractor Review
            </h3>
            <p className="text-xs text-[#6e8492]">
              Request #{requestId} • {providerName}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-[#eaf7ee] border border-[#a8e2bc] text-[#136838] flex items-center gap-3 my-4">
            <CheckCircle2 className="w-5 h-5 flex-none" />
            <span className="text-xs font-semibold">
              Thank you! Your review has been recorded.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#48606f] mb-1.5">
                Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const filled = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          filled
                            ? "fill-[#f59e0b] text-[#f59e0b]"
                            : "text-[#cbd5e1] hover:text-[#f59e0b]"
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="text-xs font-bold text-[#344c5b] ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#48606f] mb-1.5">
                Review & Feedback (Optional)
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience working with this contractor..."
                className="w-full px-3 py-2 text-xs maximal-input font-normal resize-none focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-[#5a6f7c] hover:bg-[#e4ecf0]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="maximal-btn-primary px-4 py-2 text-xs font-semibold"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
