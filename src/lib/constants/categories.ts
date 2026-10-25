export interface Category {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const REQUEST_CATEGORIES: Category[] = [
  {
    id: "software-development",
    name: "Software & Web Development",
    description: "Fullstack apps, APIs, mobile apps, smart contracts, cloud infrastructure",
    iconName: "Code",
  },
  {
    id: "design-creative",
    name: "Design & Creative",
    description: "UI/UX product design, branding, 3D modeling, animations",
    iconName: "Palette",
  },
  {
    id: "construction-engineering",
    name: "Construction & Engineering",
    description: "Commercial tenders, architectural drafting, electrical, civil works",
    iconName: "Building",
  },
  {
    id: "logistics-procurement",
    name: "Procurement & Logistics",
    description: "Bulk supplies, freight shipping, inventory fulfillment",
    iconName: "Truck",
  },
  {
    id: "marketing-growth",
    name: "Marketing & Growth",
    description: "SEO campaigns, performance marketing, content strategy",
    iconName: "TrendingUp",
  },
  {
    id: "legal-consulting",
    name: "Legal & Business Consulting",
    description: "Regulatory compliance, financial auditing, tax advisory",
    iconName: "Briefcase",
  },
];
