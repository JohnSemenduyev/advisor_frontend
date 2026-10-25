export type NotificationType =
  | "new_bid"
  | "bid_shortlisted"
  | "bid_accepted"
  | "bid_outbid"
  | "clarification_posted"
  | "milestone_submitted"
  | "milestone_approved"
  | "payment_released";

export interface NotificationItem {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  linkUrl: string;
  isRead: boolean;
  createdAt: string;
}
