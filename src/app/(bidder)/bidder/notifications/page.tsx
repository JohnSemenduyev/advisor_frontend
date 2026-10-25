import { Metadata } from "next";
import { BidderNotificationsView } from "@/components/bidder/notifications/bidder-notifications-view";

export const metadata: Metadata = {
  title: "Notifications | BusinessAdviser",
  description:
    "Review your bid statuses, contract awards, subscription alerts, and platform announcements.",
};

export default function BidderNotificationsPage() {
  return <BidderNotificationsView />;
}
