import { Metadata } from "next";
import { BidderMessagesView } from "@/components/bidder/messages/bidder-messages-view";

export const metadata: Metadata = {
  title: "Messages | BusinessAdviser",
  description:
    "View and manage your messages with clients and buyers. Real-time project discussions and proposal negotiations.",
};

export default function BidderMessagesPage() {
  return <BidderMessagesView />;
}
