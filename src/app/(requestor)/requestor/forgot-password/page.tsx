import { Metadata } from "next";
import { ForgotPasswordView } from "@/components/auth/forgot-password-view";

export const metadata: Metadata = {
  title: "Requestor Forgot Password | BusinessAdviser",
  description: "Reset your Requestor account password.",
};

export default function RequestorForgotPasswordPage() {
  return <ForgotPasswordView role="requestor" />;
}
