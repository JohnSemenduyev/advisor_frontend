export interface ChatMessage {
  id: string;
  sender: string;
  isMe: boolean;
  timestamp: string;
  text: string;
}

export interface RequestorConversation {
  id: string;
  name: string;
  title: string;
  companyName: string;
  serviceRequest: string;
  serviceRequestId: string;
  hasNewMessages: boolean;
  messages: ChatMessage[];
}

export const INITIAL_REQUESTOR_CONVERSATIONS: RequestorConversation[] = [
  {
    id: "conv-10001",
    name: "John Semenduyev",
    title: "CFO",
    companyName: "Business Adviser",
    serviceRequest: "Warehouse Security",
    serviceRequestId: "10001",
    hasNewMessages: true,
    messages: [
      {
        id: "msg-1",
        sender: "John Semenduyev",
        isMe: true,
        timestamp: "10:24 AM",
        text: "Hello Michael,\n\nThank you for submitting your bid for security guard services. I wanted to follow up to discuss your proposal. Can you please let me know when is a convenient time for you to meet at our headquarters....\n\nThank you,\nJohn",
      },
      {
        id: "msg-2",
        sender: "Michael",
        isMe: false,
        timestamp: "11:02 AM",
        text: "Hello John,\n\nThank you for the opportunity. I am available tomorrow at 10 AM or 2 PM. Please let me know which time works best for you.\n\nBest regards,\nMichael",
      },
    ],
  },
  {
    id: "conv-10002",
    name: "Sarah Jenkins",
    title: "Operations Director",
    companyName: "Apex Facility Solutions",
    serviceRequest: "Commercial Maintenance & HVAC",
    serviceRequestId: "10002",
    hasNewMessages: false,
    messages: [
      {
        id: "msg-201",
        sender: "John Semenduyev",
        isMe: true,
        timestamp: "09:15 AM",
        text: "Good morning Sarah, regarding the HVAC preventative inspection timeline, can we finalize the contractor access credentials by Friday?",
      },
      {
        id: "msg-202",
        sender: "Sarah Jenkins",
        isMe: false,
        timestamp: "09:40 AM",
        text: "Hi John, yes absolutely. Our certified technicians will submit all compliance certificates and badge requests before Thursday close of business.",
      },
    ],
  },
  {
    id: "conv-10003",
    name: "David Vance",
    title: "VP of Security",
    companyName: "SafeGuard Access Inc.",
    serviceRequest: "Biotech Laboratory Access Control",
    serviceRequestId: "10003",
    hasNewMessages: false,
    messages: [
      {
        id: "msg-301",
        sender: "David Vance",
        isMe: false,
        timestamp: "02:18 PM",
        text: "Hello John, we have updated the biometrics hardware specifications and uploaded the revised scope document to our tender bid.",
      },
    ],
  },
  {
    id: "conv-10004",
    name: "Elena Rostova",
    title: "Port Logistics Lead",
    companyName: "Harbor Security Patrol",
    serviceRequest: "Maritime Cargo & Yard Patrol",
    serviceRequestId: "10004",
    hasNewMessages: false,
    messages: [
      {
        id: "msg-401",
        sender: "John Semenduyev",
        isMe: true,
        timestamp: "11:50 AM",
        text: "Elena, does your team provide 24/7 continuous radio dispatch monitoring during overnight container discharge?",
      },
      {
        id: "msg-402",
        sender: "Elena Rostova",
        isMe: false,
        timestamp: "12:10 PM",
        text: "Yes, our tier-1 command center monitors all container yard zones live with GPS body cams and dedicated radio frequencies.",
      },
    ],
  },
];
