import { BidStatus } from "@/lib/constants/bidding";

export interface MilestoneProposal {
  id: string;
  title: string;
  description: string;
  amount: number;
  durationDays: number;
}

export interface Bid {
  id: string;
  requestId: string;
  requestTitle: string;
  bidderId: string;
  bidderName: string;
  bidderAvatar?: string;
  bidderRating: number;
  bidderCompletedProjects: number;
  amount: number;
  currency: string;
  deliveryDays: number;
  coverLetter: string;
  milestones?: MilestoneProposal[];
  status: BidStatus;
  isShortlisted?: boolean;
  submittedAt: string;
  revisedAt?: string;
}
