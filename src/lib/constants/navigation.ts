export interface NavItem {
  title: string;
  href: string;
  iconName: string;
  badge?: string;
}

/**
 * Sidebar navigation items for the Requestor role
 */
export const REQUESTOR_NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/requestor/dashboard",
    iconName: "LayoutDashboard",
  },
  {
    title: "My Requests",
    href: "/requestor/requests",
    iconName: "FolderKanban",
  },
  {
    title: "Post New Request",
    href: "/requestor/requests/new",
    iconName: "PlusCircle",
  },
  {
    title: "Active Contracts",
    href: "/requestor/contracts",
    iconName: "FileCheck",
  },
  {
    title: "Messages",
    href: "/requestor/messages",
    iconName: "MessageSquare",
  },
  {
    title: "Settings",
    href: "/requestor/settings",
    iconName: "Settings",
  },
];

/**
 * Sidebar navigation items for the Bidder role
 */
export const BIDDER_NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/bidder/dashboard",
    iconName: "LayoutDashboard",
  },
  {
    title: "Explore Requests",
    href: "/bidder/explore",
    iconName: "Search",
  },
  {
    title: "My Submitted Bids",
    href: "/bidder/my-bids",
    iconName: "Gavel",
  },
  {
    title: "Active Contracts",
    href: "/bidder/contracts",
    iconName: "FileCheck",
  },
  {
    title: "Earnings & Escrow",
    href: "/bidder/earnings",
    iconName: "Wallet",
  },
  {
    title: "Messages",
    href: "/bidder/messages",
    iconName: "MessageSquare",
  },
  {
    title: "Public Profile",
    href: "/bidder/profile",
    iconName: "User",
  },
  {
    title: "Settings",
    href: "/bidder/settings",
    iconName: "Settings",
  },
];

/**
 * Public header navigation links
 */
export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { title: "Browse Requests", href: "/requests", iconName: "Compass" },
  { title: "Find Bidders", href: "/bidders", iconName: "Users" },
  { title: "How It Works", href: "/how-it-works", iconName: "HelpCircle" },
];
