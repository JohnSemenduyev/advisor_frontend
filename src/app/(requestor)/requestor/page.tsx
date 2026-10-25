import { UnifiedLoginView } from "@/components/auth/unified-login-view";

export const metadata = {
  title: "Requestor Portal | BusinessAdviser",
  description: "Requestor portal for businesses to post tenders, review bids, and hire qualified contractors.",
};

export default function RequestorPortalPage() {
  return <UnifiedLoginView role="requestor" />;
}
