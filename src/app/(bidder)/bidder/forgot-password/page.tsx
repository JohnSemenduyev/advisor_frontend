import { Metadata } from "next";
import { ForgotPasswordView } from "@/components/auth/forgot-password-view";

export const metadata: Metadata = {
  title: "Bidder Forgot Password | BusinessAdviser",
  description: "Reset your Bidder account password.",
};

export default function BidderForgotPasswordPage() {
  return <ForgotPasswordView role="bidder" />;
}
