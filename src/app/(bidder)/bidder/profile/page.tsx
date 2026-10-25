import { Metadata } from "next";
import { BidderProfileView } from "@/components/bidder/profile/bidder-profile-view";

export const metadata: Metadata = {
  title: "Bidder Profile | BusinessAdviser",
  description:
    "Manage your bidder profile, view accepted and rejected bids summary, configure industry competencies, and update geographic reach.",
};

export default function BidderProfilePage() {
  return <BidderProfileView />;
}
