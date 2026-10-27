import { Metadata } from "next";
import { MakeNewRequestView } from "@/components/requestor/new-request/new-request-view";

export const metadata: Metadata = {
  title: "Make New Request | BusinessAdviser",
  description:
    "Post a new service request and receive competitive proposals from verified service providers.",
};

export default function NewRequestPage() {
  return <MakeNewRequestView />;
}

