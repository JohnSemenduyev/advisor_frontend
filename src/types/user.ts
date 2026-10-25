import { UserRole } from "@/lib/constants/roles";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: string;
}

export interface RequestorProfile {
  userId: string;
  organizationName?: string;
  industry?: string;
  verifiedBilling: boolean;
  totalRequestsPosted: number;
  totalHires: number;
  averageRating: number;
}

export interface BidderProfile {
  userId: string;
  headline: string;
  bio: string;
  skills: string[];
  hourlyRate?: number;
  totalBidsPlaced: number;
  totalBidsWon: number;
  winRate: number; // percentage e.g. 68%
  completedProjectsCount: number;
  averageRating: number;
  ratingCount: number;
  identityVerified: boolean;
}
