import { Metadata } from "next";
import { BidderProfileView } from "@/components/bidder/profile/bidder-profile-view";

export const metadata: Metadata = {
  title: "Bidder Dashboard & Profile | BusinessAdviser",
  description: "Bidder dashboard and profile information on BusinessAdviser platform.",
};

export default function BidderDashboardPage() {
  return <BidderProfileView />;
}
