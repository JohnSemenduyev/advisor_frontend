import { Metadata } from "next";
import { ActiveServiceRequestsView } from "@/components/requestor/requests/active-service-requests-view";

export const metadata: Metadata = {
  title: "Active Service Requests | BusinessAdviser",
  description:
    "View and manage your submitted requests. Track status and stay updated.",
};

export default function RequestorRequestsPage() {
  return <ActiveServiceRequestsView />;
}


