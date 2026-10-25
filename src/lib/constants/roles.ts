export type UserRole = "requestor" | "bidder" | "admin";

export const USER_ROLES = {
  REQUESTOR: "requestor" as const,
  BIDDER: "bidder" as const,
  ADMIN: "admin" as const,
} as const;

export const ROLE_DETAILS = {
  requestor: {
    title: "Requestor",
    label: "Project Poster / Client",
    description: "Post projects, specify RFP requirements, review bids, hire bidders, and release milestone payments.",
    dashboardPath: "/requestor/dashboard",
  },
  bidder: {
    title: "Bidder",
    label: "Service Provider / Contractor",
    description: "Explore open requests, submit competitive proposals, track active bids, and deliver milestones.",
    dashboardPath: "/bidder/dashboard",
  },
} as const;
