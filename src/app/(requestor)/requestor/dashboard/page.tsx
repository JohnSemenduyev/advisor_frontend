import { Metadata } from "next";
import { RequestorDashboardView } from "@/components/requestor/dashboard/requestor-dashboard-view";

export const metadata: Metadata = {
  title: "Profile Information | BusinessAdviser",
  description: "View and manage requestor profile information, active service requests, and service request history.",
};

export default function RequestorDashboardPage() {
  return <RequestorDashboardView />;
}

