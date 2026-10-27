import { Metadata } from "next";
import { RequestBidsPageClient } from "@/components/requestor/requests/request-bids-page-client";

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

interface PageProps {
  params: Promise<{ requestId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { requestId } = await params;
  return {
    title: `Submitted Bids for Request #${requestId} | BusinessAdviser`,
    description: "View bids submitted by security companies for your request.",
  };
}

export default async function RequestorBidsPage({ params }: PageProps) {
  const { requestId } = await params;
  return <RequestBidsPageClient requestId={requestId} />;
}
