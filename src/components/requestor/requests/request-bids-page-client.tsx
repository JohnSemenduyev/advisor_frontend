"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { RequestBidsListView } from "./request-bids-list-view";
import { RequestBidDetailView } from "./request-bid-detail-view";

function BidsPageContent({ requestId }: { requestId: string }) {
  const searchParams = useSearchParams();
  const bidId = searchParams.get("bidId");

  if (bidId) {
    return <RequestBidDetailView requestId={requestId} bidId={bidId} />;
  }

  return <RequestBidsListView requestId={requestId} />;
}

export function RequestBidsPageClient({ requestId }: { requestId: string }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex items-center justify-center">
          <div className="maximal-card p-6 rounded-2xl shadow-lg border border-[#c8d4dc] bg-white text-center">
            <span className="text-sm font-bold text-[#185a86]">
              Loading tender details...
            </span>
          </div>
        </div>
      }
    >
      <BidsPageContent requestId={requestId} />
    </Suspense>
  );
}
