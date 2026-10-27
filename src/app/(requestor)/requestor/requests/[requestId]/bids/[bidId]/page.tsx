import { Metadata } from "next";
import { RequestBidDetailView } from "@/components/requestor/requests/request-bid-detail-view";

export function generateStaticParams() {
  return [
    { requestId: "10001", bidId: "bid-1" },
    { requestId: "10001", bidId: "bid-2" },
    { requestId: "10001", bidId: "bid-3" },
    { requestId: "10001", bidId: "bid-4" },
    { requestId: "10001", bidId: "bid-5" },
    { requestId: "10002", bidId: "bid-1" },
  ];
}

interface PageProps {
  params: Promise<{ requestId: string; bidId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { requestId, bidId } = await params;
  return {
    title: `Bid Details #${bidId} | Request #${requestId} | BusinessAdviser`,
    description: "View details of the submitted bid and communicate with the bidder.",
  };
}

export default async function RequestorBidDetailPage({ params }: PageProps) {
  const { requestId, bidId } = await params;
  return <RequestBidDetailView requestId={requestId} bidId={bidId} />;
}
