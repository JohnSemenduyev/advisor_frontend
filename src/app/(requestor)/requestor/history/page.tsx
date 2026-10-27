import { Metadata } from "next";
import { ServiceRequestHistoryView } from "@/components/requestor/history/service-request-history-view";

export const metadata: Metadata = {
  title: "Service Requests History | BusinessAdviser",
  description:
    "View your submitted requests and their status. Track completed and contracted records.",
};

export default function RequestorDirectHistoryPage() {
  return <ServiceRequestHistoryView />;
}
