import { RequestStatus, AuctionType, BudgetType } from "@/lib/constants/bidding";

export interface Attachment {
  id: string;
  name: string;
  url: string;
  sizeBytes: number;
  mimeType: string;
}

export interface BiddingRequest {
  id: string;
  title: string;
  description: string;
  requestorId: string;
  requestorName: string;
  categoryId: string;
  categoryName: string;
  tags: string[];
  status: RequestStatus;
  auctionType: AuctionType;
  budgetType: BudgetType;
  budgetMin?: number;
  budgetMax: number;
  currency: string;
  bidDeadline: string; // ISO date string
  projectDeadline?: string;
  attachments?: Attachment[];
  bidsCount: number;
  lowestBidAmount?: number;
  averageBidAmount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ClarificationQuestion {
  id: string;
  requestId: string;
  bidderId: string;
  bidderName: string;
  question: string;
  answer?: string;
  createdAt: string;
  answeredAt?: string;
}
