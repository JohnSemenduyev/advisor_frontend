import { Metadata } from "next";
import { BidderSearchView } from "@/components/bidder/search/bidder-search-view";

export const metadata: Metadata = {
  title: "Open Projects | BusinessAdviser",
  description:
    "Browse and bid on available projects. Find the right opportunities for your business.",
};

export default function BidderProjectsPage() {
  return <BidderSearchView initialView="search" />;
}
