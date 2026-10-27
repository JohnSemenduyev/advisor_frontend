export interface RequestBidAttachment {
  id: string;
  descNumber: number;
  description: string;
  fileName: string;
}

export interface RequestBidMessage {
  id: string;
  sender: string;
  isBidder: boolean;
  greeting: string;
  body: string;
  signOff: string;
  timestamp: string;
}

export interface RequestBidItem {
  id: string;
  company: string;
  officeLocation: string;
  contactName: string;
  bidPrice: number;
  bidPriceFormatted: string;
  bidderDetails: {
    companyName: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phone: string;
    website: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
  };
  attachments: RequestBidAttachment[];
  messages: RequestBidMessage[];
}

export interface RequestData {
  requestId: string;
  requestTitle: string;
  requestDescription: string;
  location: string;
  bidDueDate: string;
  bids: RequestBidItem[];
}

export const SEED_REQUESTS_MAP: Record<string, RequestData> = {
  "10001": {
    requestId: "10001",
    requestTitle: "Norfolk Guard Services",
    requestDescription:
      "Security guard services for our corporate headquarters. Seeking 24/7 unarmed security with professional and reliable officers.",
    location: "Edison, NJ, USA",
    bidDueDate: "04/30/2026",
    bids: [
      {
        id: "bid-1",
        company: "Maximal Security",
        officeLocation: "Edison, NJ, USA",
        contactName: "John Simantov",
        bidPrice: 180000,
        bidPriceFormatted: "$180,000",
        bidderDetails: {
          companyName: "Maximal Security Services",
          firstName: "John",
          lastName: "Semenduyev",
          title: "Manager",
          email: "john.semenduyev@gmail.com",
          phone: "732-513-4794",
          website: "businessadviser.com",
          streetAddress: "77 Lafayette Mills Road",
          city: "Manalapan",
          state: "New Jersey",
          zipCode: "07726",
        },
        attachments: [
          {
            id: "att-1",
            descNumber: 1,
            description: "Project Proposal",
            fileName: "proposal.pdf",
          },
          {
            id: "att-2",
            descNumber: 2,
            description: "Company Brochure",
            fileName: "brochure.pdf",
          },
          {
            id: "att-3",
            descNumber: 3,
            description: "References",
            fileName: "references.pdf",
          },
          {
            id: "att-4",
            descNumber: 4,
            description: "Additional Documents",
            fileName: "additional.pdf",
          },
        ],
        messages: [
          {
            id: "msg-1",
            sender: "Michael",
            isBidder: true,
            greeting: "Hello John,",
            body: "Thank you for submitting your bid for security guard services. I wanted to follow up to discuss your proposal. Can you please let me know when there is a convenient time for you to meet at our headquarters?",
            signOff: "Thank you,\nMichael",
            timestamp: "10:15 AM",
          },
          {
            id: "msg-2",
            sender: "John",
            isBidder: false,
            greeting: "Hello Michael,",
            body: "Thank you for the opportunity. I am available next week. Please let me know your preferred date and time.",
            signOff: "Best regards,\nJohn",
            timestamp: "11:42 AM",
          },
        ],
      },
      {
        id: "bid-2",
        company: "Creative Logistics",
        officeLocation: "New York, NY, USA",
        contactName: "Mark Reynolds",
        bidPrice: 165000,
        bidPriceFormatted: "$165,000",
        bidderDetails: {
          companyName: "Creative Logistics Inc.",
          firstName: "Mark",
          lastName: "Reynolds",
          title: "Senior Account Director",
          email: "m.reynolds@creativelogistics.com",
          phone: "212-555-0149",
          website: "creativelogistics.com",
          streetAddress: "350 5th Avenue",
          city: "New York",
          state: "New York",
          zipCode: "10118",
        },
        attachments: [
          {
            id: "att-21",
            descNumber: 1,
            description: "Commercial Security Bid Proposal",
            fileName: "creative-proposal.pdf",
          },
          {
            id: "att-22",
            descNumber: 2,
            description: "Insurance Certificate",
            fileName: "coi-insurance.pdf",
          },
        ],
        messages: [
          {
            id: "msg-201",
            sender: "Mark",
            isBidder: true,
            greeting: "Hello Michael,",
            body: "We have reviewed your Norfolk facility requirements and submitted our fixed-price quotation of $165,000. Let us know if you would like to inspect our guard credentials.",
            signOff: "Sincerely,\nMark Reynolds",
            timestamp: "09:15 AM",
          },
        ],
      },
      {
        id: "bid-3",
        company: "Titan Security Group",
        officeLocation: "Elizabeth, NJ, USA",
        contactName: "Sarah Kim",
        bidPrice: 172500,
        bidPriceFormatted: "$172,500",
        bidderDetails: {
          companyName: "Titan Security Group LLC",
          firstName: "Sarah",
          lastName: "Kim",
          title: "VP of Commercial Accounts",
          email: "skim@titansecurity.com",
          phone: "908-555-8821",
          website: "titansecurity.com",
          streetAddress: "1200 North Avenue",
          city: "Elizabeth",
          state: "New Jersey",
          zipCode: "07201",
        },
        attachments: [
          {
            id: "att-31",
            descNumber: 1,
            description: "Titan Security Technical Specs",
            fileName: "titan-specs.pdf",
          },
          {
            id: "att-32",
            descNumber: 2,
            description: "Corporate References",
            fileName: "references-2026.pdf",
          },
        ],
        messages: [
          {
            id: "msg-301",
            sender: "Sarah",
            isBidder: true,
            greeting: "Hello Michael,",
            body: "Titan Security Group has submitted our tender proposal. We have 14 certified patrol vehicles stationed in Middlesex and Union counties ready for immediate deployment.",
            signOff: "Best regards,\nSarah Kim",
            timestamp: "08:45 AM",
          },
        ],
      },
      {
        id: "bid-4",
        company: "Guardian Pros",
        officeLocation: "Newark, NJ, USA",
        contactName: "David Lopez",
        bidPrice: 169000,
        bidPriceFormatted: "$169,000",
        bidderDetails: {
          companyName: "Guardian Pros Protection",
          firstName: "David",
          lastName: "Lopez",
          title: "Operations Manager",
          email: "dlopez@guardianpros.com",
          phone: "973-555-7319",
          website: "guardianpros.com",
          streetAddress: "744 Broad Street",
          city: "Newark",
          state: "New Jersey",
          zipCode: "07102",
        },
        attachments: [
          {
            id: "att-41",
            descNumber: 1,
            description: "Guard Service Compliance Packet",
            fileName: "guardian-compliance.pdf",
          },
        ],
        messages: [
          {
            id: "msg-401",
            sender: "David",
            isBidder: true,
            greeting: "Hello Michael,",
            body: "Guardian Pros is pleased to bid on your Norfolk headquarters contract. Our officers are state licensed and background-checked.",
            signOff: "Regards,\nDavid Lopez",
            timestamp: "Yesterday",
          },
        ],
      },
      {
        id: "bid-5",
        company: "Secure Solutions LLC",
        officeLocation: "Jersey City, NJ, USA",
        contactName: "Michael Brown",
        bidPrice: 167800,
        bidPriceFormatted: "$167,800",
        bidderDetails: {
          companyName: "Secure Solutions LLC",
          firstName: "Michael",
          lastName: "Brown",
          title: "Founder & Managing Director",
          email: "mbrown@securesolutions.com",
          phone: "201-555-4490",
          website: "securesolutions.com",
          streetAddress: "101 Hudson Street",
          city: "Jersey City",
          state: "New Jersey",
          zipCode: "07302",
        },
        attachments: [
          {
            id: "att-51",
            descNumber: 1,
            description: "Service Level Agreement (SLA) Draft",
            fileName: "draft-contract.pdf",
          },
        ],
        messages: [
          {
            id: "msg-501",
            sender: "Michael",
            isBidder: true,
            greeting: "Hello Michael,",
            body: "We submitted our proposal with a 24/7 dedicated dispatch manager included at no extra cost.",
            signOff: "Best,\nMichael Brown",
            timestamp: "Aug 19, 2026",
          },
        ],
      },
    ],
  },
  "10002": {
    requestId: "10002",
    requestTitle: "Commercial Maintenance & HVAC",
    requestDescription:
      "Comprehensive quarterly HVAC maintenance, filter replacements, and rapid 24-hour on-call mechanical repair services.",
    location: "Paramus, NJ, USA",
    bidDueDate: "05/15/2026",
    bids: [
      {
        id: "bid-1",
        company: "Apex Facility Solutions",
        officeLocation: "Paramus, NJ, USA",
        contactName: "Sarah Jenkins",
        bidPrice: 220000,
        bidPriceFormatted: "$220,000",
        bidderDetails: {
          companyName: "Apex Facility Solutions",
          firstName: "Sarah",
          lastName: "Jenkins",
          title: "Operations Director",
          email: "s.jenkins@apexfacility.com",
          phone: "201-482-9901",
          website: "apexfacility.com",
          streetAddress: "400 Route 17 North",
          city: "Paramus",
          state: "New Jersey",
          zipCode: "07652",
        },
        attachments: [
          {
            id: "att-201",
            descNumber: 1,
            description: "HVAC Preventative Schedule",
            fileName: "hvac-schedule.pdf",
          },
          {
            id: "att-202",
            descNumber: 2,
            description: "Contractor Compliance License",
            fileName: "license-cert.pdf",
          },
        ],
        messages: [
          {
            id: "msg-601",
            sender: "Sarah",
            isBidder: true,
            greeting: "Hello John,",
            body: "Our certified HVAC specialists have submitted our comprehensive annual service quotation.",
            signOff: "Warm regards,\nSarah",
            timestamp: "09:30 AM",
          },
        ],
      },
    ],
  },
};

export function getRequestData(requestId: string): RequestData {
  if (SEED_REQUESTS_MAP[requestId]) {
    return SEED_REQUESTS_MAP[requestId];
  }
  // Fallback template for any other request ID
  return {
    requestId,
    requestTitle: `Request #${requestId}`,
    requestDescription: "Service request description and requirements.",
    location: "New Jersey, USA",
    bidDueDate: "05/30/2026",
    bids: SEED_REQUESTS_MAP["10001"].bids,
  };
}
