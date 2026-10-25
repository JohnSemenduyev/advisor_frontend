import { UnifiedLoginView } from "@/components/auth/unified-login-view";

export const metadata = {
  title: "BusinessAdviser | Bidding & Contracting Platform",
  description: "Explore business projects, submit proposals, and grow your enterprise.",
};

export default function BidderPortalPage() {
  return <UnifiedLoginView role="bidder" />;
}
