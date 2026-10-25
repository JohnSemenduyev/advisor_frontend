import { Metadata } from "next";
import { BidderMyBidsView } from "@/components/bidder/my-bids/bidder-my-bids-view";

export const metadata: Metadata = {
  title: "My Submitted Bids | BusinessAdviser",
  description:
    "View and manage your submitted bids. Track status, edit proposals, and stay updated.",
};

export default function MyBidsPage() {
  return <BidderMyBidsView />;
}
