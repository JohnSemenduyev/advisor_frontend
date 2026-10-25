import { UnifiedLoginView } from "@/components/auth/unified-login-view";

export const metadata = {
  title: "Requestor Registration | BusinessAdviser",
  description: "Register as a Requestor to post project RFPs and hire qualified bidders on BusinessAdviser.",
};

export default function RequestorSignupPage() {
  return <UnifiedLoginView role="requestor" defaultModal="signup" />;
}
