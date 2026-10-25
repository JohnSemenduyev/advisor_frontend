import { Metadata } from "next";
import { RequestorNotificationsView } from "@/components/requestor/notifications/requestor-notifications-view";

export const metadata: Metadata = {
  title: "Notifications | BusinessAdviser",
  description: "Stay updated on your service requests, bids, and important activity.",
};

export default function RequestorNotificationsPage() {
  return <RequestorNotificationsView />;
}
