"use client";

import React, { useState } from "react";
import Link from "next/link";
import { History, Eye, Star, Check } from "lucide-react";
import { LeaveReviewModal } from "./leave-review-modal";

export interface HistoryRequestItem {
  id: string;
  title: string;
  bidsReceived: number;
  bidAccepted: string;
  rating?: number;
  reviewComment?: string;
}

interface RequestHistoryCardProps {
  history?: HistoryRequestItem[];
}

export function RequestHistoryCard({
  history = [
    {
      id: "10003",
      title: "Guard Services",
      bidsReceived: 11,
      bidAccepted: "John Semenduyev, Maximal Security Services",
      rating: 0,
    },
    {
      id: "10004",
      title: "Maintenance",
      bidsReceived: 10,
      bidAccepted: "John Semenduyev, Maximal Security Services",
      rating: 5,
    },
  ],
}: RequestHistoryCardProps) {
  const [data, setData] = useState<HistoryRequestItem[]>(history);
  const [selectedReviewItem, setSelectedReviewItem] = useState<HistoryRequestItem | null>(null);

  const handleReviewSubmitted = (requestId: string, rating: number, comment: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === requestId ? { ...item, rating, reviewComment: comment } : item
      )
    );
  };

  return (
    <>
      <div className="maximal-card overflow-hidden rounded-2xl border border-white shadow-md">
        {/* Card Brushed Header Bar */}
        <div className="bg-gradient-to-r from-[#2c3c46] to-[#18252d] px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#7dc0df]">
              <History className="w-4 h-4" />
            </div>
            <h2 className="text-sm sm:text-base font-bold tracking-tight text-[#f1f6fa]">
              Service Request History
            </h2>
          </div>

          <span className="text-xs text-[#a0b5c4] font-medium hidden sm:inline">
            Completed & Contracted Records
          </span>
        </div>

        {/* Table in reference styling */}
        <div className="maximal-tablewrap border-t border-[#d6dde1]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead className="maximal-thead maximal-thead-compact">
                <tr className="select-none">
                  {/* Service Request ID */}
                  <th className="w-[140px]">
                    <div className="th-title">
                      <span>Service Request ID</span>
                    </div>
                  </th>

                  {/* Request Title */}
                  <th className="w-[170px]">
                    <div className="th-title">
                      <span>Request Title</span>
                    </div>
                  </th>

                  {/* Bids Received */}
                  <th className="w-[110px] text-center">
                    <div className="th-title justify-center">
                      <span>Bids Received</span>
                    </div>
                  </th>

                  {/* Bid Accepted */}
                  <th>
                    <div className="th-title">
                      <span>Bid Accepted</span>
                    </div>
                  </th>

                  {/* Leave Review */}
                  <th className="w-[200px] text-center">
                    <div className="th-title justify-center">
                      <span>Leave Review</span>
                    </div>
                  </th>

                  {/* Actions */}
                  <th className="actions-header w-[90px]">
                    <div className="th-title justify-center">
                      <span>Actions</span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    {/* Service Request ID */}
                    <td>
                      <Link
                        href={`/requestor/requests/${item.id}`}
                        className="hover:underline"
                      >
                        {item.id}
                      </Link>
                    </td>

                    {/* Request Title */}
                    <td>{item.title}</td>

                    {/* Bids Received Badge */}
                    <td className="text-center">
                      <Link
                        href={`/requestor/requests/${item.id}/bids`}
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-bold transition-all shadow-xs ${
                          item.bidsReceived > 10
                            ? "bg-[#e8f7ee] text-[#117a3f] border border-[#a6e6bf] hover:brightness-105"
                            : "bg-[#eaf4fb] text-[#146ba3] border border-[#badbef] hover:brightness-105"
                        }`}
                        title={`View ${item.bidsReceived} bids`}
                      >
                        {item.bidsReceived}
                      </Link>
                    </td>

                    {/* Bid Accepted */}
                    <td className="font-medium text-[#253946]">
                      {item.bidAccepted}
                    </td>

                    {/* Leave Review Star UI + Button */}
                    <td className="text-center whitespace-nowrap">
                      {item.rating && item.rating > 0 ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#fafbf9] border border-[#d6e2d9]">
                          <div className="flex items-center text-[#eab308]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < (item.rating || 0)
                                    ? "fill-[#eab308] text-[#eab308]"
                                    : "text-[#d1d5db]"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] font-semibold text-[#255837] flex items-center gap-0.5">
                            <Check className="w-3 h-3 text-emerald-600" />
                            Reviewed
                          </span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <div className="flex items-center text-[#cbd5e1]">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3" />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedReviewItem(item)}
                            className="maximal-btn-action text-[11px] py-1 px-2.5"
                          >
                            Leave Review
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="text-center">
                      <div className="flex items-center justify-center">
                        <Link
                          href={`/requestor/requests/${item.id}`}
                          className="maximal-btn-action-icon"
                          title="View Completed Request"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-xs text-[#708593]">
                      No historical service requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedReviewItem && (
        <LeaveReviewModal
          isOpen={Boolean(selectedReviewItem)}
          onClose={() => setSelectedReviewItem(null)}
          requestId={selectedReviewItem.id}
          providerName={selectedReviewItem.bidAccepted}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}
    </>
  );
}
