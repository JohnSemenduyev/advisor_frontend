import { Suspense } from "react";
import { Metadata } from "next";
import { BidSubmissionView } from "@/components/bidder/bid-submission/bid-submission-view";

export const metadata: Metadata = {
  title: "Bid Submission | BusinessAdviser",
  description: "Review request details, verify company credentials, and submit project bids.",
};

export const instant = false;


export function generateStaticParams() {
  return [
    { requestId: "10001" },
    { requestId: "10002" },
    { requestId: "10003" },
    { requestId: "10004" },
    { requestId: "10005" },
    { requestId: "10006" },
    { requestId: "10007" },
  ];
}

interface SubmitBidPageProps {
  params: Promise<{
    requestId: string;
  }>;
}

async function BidSubmissionContent({ params }: SubmitBidPageProps) {
  const resolvedParams = await params;
  return <BidSubmissionView requestId={resolvedParams.requestId} />;
}

export default function SubmitBidPage({ params }: SubmitBidPageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#556c7b]">Loading request details...</div>}>
      <BidSubmissionContent params={params} />
    </Suspense>
  );
}

