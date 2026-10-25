export type ContractStatus = "active" | "in_review" | "completed" | "disputed";
export type MilestoneStatus = "pending" | "in_progress" | "submitted" | "approved" | "funded";

export interface ContractMilestone {
  id: string;
  contractId: string;
  title: string;
  description: string;
  amount: number;
  status: MilestoneStatus;
  dueDate: string;
  deliverables?: {
    id: string;
    fileName: string;
    fileUrl: string;
    submittedAt: string;
    notes?: string;
  }[];
}

export interface Contract {
  id: string;
  requestId: string;
  requestTitle: string;
  requestorId: string;
  bidderId: string;
  bidderName: string;
  totalAmount: number;
  currency: string;
  escrowFunded: boolean;
  status: ContractStatus;
  milestones: ContractMilestone[];
  startDate: string;
  completionDate?: string;
}
