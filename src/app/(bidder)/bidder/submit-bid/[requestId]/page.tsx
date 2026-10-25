import { Metadata } from "next";
import { BidSubmissionView } from "@/components/bidder/bid-submission/bid-submission-view";

export const metadata: Metadata = {
  title: "Bid Submission | BusinessAdviser",
  description: "Review request details, verify company credentials, and submit project bids.",
};

interface SubmitBidPageProps {
  params: Promise<{
    requestId: string;
  }>;
}

export default async function SubmitBidPage({ params }: SubmitBidPageProps) {
  const resolvedParams = await params;
  return <BidSubmissionView requestId={resolvedParams.requestId} />;
}
