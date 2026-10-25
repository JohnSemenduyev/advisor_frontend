import { UnifiedLoginView } from "@/components/auth/unified-login-view";

export const metadata = {
  title: "BusinessAdviser | Tender & Contracting Platform",
  description: "Post tenders, review bids, and connect with qualified service providers.",
};

export default function RequestorPortalPage() {
  return <UnifiedLoginView role="requestor" />;
}
