import { Metadata } from "next";
import { RequestorMessagesView } from "@/components/requestor/messages/requestor-messages-view";

export const metadata: Metadata = {
  title: "Messages | BusinessAdviser",
  description:
    "View and manage your messages with clients and other users.",
};

export default function RequestorMessagesPage() {
  return <RequestorMessagesView />;
}

