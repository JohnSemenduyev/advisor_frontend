import { UnifiedLoginView } from "@/components/auth/unified-login-view";

export const metadata = {
  title: "Bidder Registration | BusinessAdviser",
  description: "Register as a Bidder to submit proposals and win contracts on BusinessAdviser.",
};

export default function BidderSignupPage() {
  return <UnifiedLoginView role="bidder" defaultModal="signup" />;
}
