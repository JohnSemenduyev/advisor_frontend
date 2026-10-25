/**
 * Status lifecycle of a Request (created by Requestor)
 */
export const REQUEST_STATUS = {
  DRAFT: "draft",
  OPEN: "open",                     // Accepting bids
  UNDER_REVIEW: "under_review",     // Bidding deadline reached, evaluating bids
  AWARDED: "awarded",               // Bid selected & contract initiated
  IN_PROGRESS: "in_progress",       // Work being delivered
  COMPLETED: "completed",           // Work accepted and paid
  CANCELLED: "cancelled",
} as const;

export type RequestStatus = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];

/**
 * Status lifecycle of a Bid (submitted by Bidder)
 */
export const BID_STATUS = {
  SUBMITTED: "submitted",
  SHORTLISTED: "shortlisted",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
  REVISED: "revised",
} as const;

export type BidStatus = (typeof BID_STATUS)[keyof typeof BID_STATUS];

/**
 * Auction types supported
 */
export const AUCTION_TYPE = {
  REVERSE_AUCTION: "reverse_auction", // Lowest qualified bid wins
  SEALED_BID: "sealed_bid",           // Bids remain private until deadline
  OPEN_PROPOSAL: "open_proposal",     // Custom pricing & proposal evaluation
} as const;

export type AuctionType = (typeof AUCTION_TYPE)[keyof typeof AUCTION_TYPE];

/**
 * Pricing / Budget models
 */
export const BUDGET_TYPE = {
  FIXED: "fixed",
  HOURLY: "hourly",
  MILESTONE_BASED: "milestone_based",
} as const;

export type BudgetType = (typeof BUDGET_TYPE)[keyof typeof BUDGET_TYPE];
