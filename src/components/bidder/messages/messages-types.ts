export interface ChatMessage {
  id: string;
  sender: string;
  isMe: boolean;
  timestamp: string;
  text: string;
}

export interface Conversation {
  id: string;
  name: string;
  title: string;
  companyName: string;
  serviceRequest: string;
  serviceRequestId: string;
  hasNewMessages: boolean;
  messages: ChatMessage[];
}

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-10001",
    name: "John Semerdujyev",
    title: "CFO",
    companyName: "Business Adviser",
    serviceRequest: "Warehouse Security",
    serviceRequestId: "10001",
    hasNewMessages: true,
    messages: [
      {
        id: "m-1",
        sender: "John Semerdujyev",
        isMe: false,
        timestamp: "10:24 AM",
        text: `Hello Michael,\n\nThank you for submitting your bid for security guard services. I wanted to follow up to discuss your proposal. Can you please let me know when is a convenient time for you to meet at our headquarters...\n\nThank you,\nJohn`,
      },
      {
        id: "m-2",
        sender: "Michael",
        isMe: true,
        timestamp: "11:02 AM",
        text: `Hello John,\n\nThank you for the opportunity. I am available tomorrow at 10 AM or 2 PM. Please let me know which time works best for you.\n\nBest regards,\nMichael`,
      },
    ],
  },
  {
    id: "conv-10002",
    name: "Sarah Jenkins",
    title: "Procurement Lead",
    companyName: "Pinnacle Security Solutions",
    serviceRequest: "Access Control & Gate Automation",
    serviceRequestId: "10002",
    hasNewMessages: false,
    messages: [
      {
        id: "m-3",
        sender: "Sarah Jenkins",
        isMe: false,
        timestamp: "Yesterday, 3:15 PM",
        text: "Hi Michael, your proposal for gate automation looks solid. We'll be announcing the final award on Friday.",
      },
      {
        id: "m-4",
        sender: "Michael",
        isMe: true,
        timestamp: "Yesterday, 4:00 PM",
        text: "Understood Sarah, thank you for the update! Looking forward to hearing from you.",
      },
    ],
  },
  {
    id: "conv-10003",
    name: "David Vance",
    title: "Facility Director",
    companyName: "Apex Metro Infrastructure",
    serviceRequest: "Commercial Facility Patrol 24/7",
    serviceRequestId: "10003",
    hasNewMessages: false,
    messages: [
      {
        id: "m-5",
        sender: "David Vance",
        isMe: false,
        timestamp: "Oct 19, 09:30 AM",
        text: "Michael, can you provide confirmation regarding the liability insurance certificate before our board review?",
      },
      {
        id: "m-6",
        sender: "Michael",
        isMe: true,
        timestamp: "Oct 19, 10:10 AM",
        text: "Hi David, absolutely. Our policy certificate has been uploaded to our bidder profile and sent over.",
      },
    ],
  },
  {
    id: "conv-10004",
    name: "Elena Rostova",
    title: "Security Architect",
    companyName: "Vanguard Defense & Surveillance",
    serviceRequest: "Perimeter CCTV System Overhaul",
    serviceRequestId: "10004",
    hasNewMessages: true,
    messages: [
      {
        id: "m-7",
        sender: "Elena Rostova",
        isMe: false,
        timestamp: "Oct 21, 01:45 PM",
        text: "Hello Michael, could you clarify whether the NVR storage quota in your estimate includes 30 or 60 days retention?",
      },
    ],
  },
];
