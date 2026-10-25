import { UnifiedLoginView } from "@/components/auth/unified-login-view";

export const metadata = {
  title: "Bidder Log In | BusinessAdviser",
  description: "Log in to your Bidder workspace on BusinessAdviser.",
};

export default function BidderLoginPage() {
  return <UnifiedLoginView role="bidder" defaultModal="login" />;
}
