import { Metadata } from "next";
import { ForgotPasswordView } from "@/components/auth/forgot-password-view";

export const metadata: Metadata = {
  title: "Forgot Password | BusinessAdviser",
  description: "Reset your BusinessAdviser account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordView role="bidder" />;
}
