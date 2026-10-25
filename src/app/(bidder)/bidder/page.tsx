import { UnifiedLoginView } from "@/components/auth/unified-login-view";

export const metadata = {
  title: "Bidder Portal | BusinessAdviser",
  description: "Bidder portal for contractors to explore projects, submit proposals, and grow their business.",
};

export default function BidderPortalPage() {
  return <UnifiedLoginView role="bidder" />;
}
