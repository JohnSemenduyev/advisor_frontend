import { Metadata } from "next";
import { BidderSearchView } from "@/components/bidder/search/bidder-search-view";

export const metadata: Metadata = {
  title: "Search Requests | BusinessAdviser",
  description:
    "Find open service requests posted by buyers, filter by geographic radius and industry, and submit competitive bids.",
};

export default function SearchRequestsPage() {
  return <BidderSearchView initialView="search" />;
}
