import { UnifiedLoginView } from "@/components/auth/unified-login-view";

export const metadata = {
  title: "Requestor Log In | BusinessAdviser",
  description: "Log in to your Requestor workspace on BusinessAdviser.",
};

export default function RequestorLoginPage() {
  return <UnifiedLoginView role="requestor" defaultModal="login" />;
}
