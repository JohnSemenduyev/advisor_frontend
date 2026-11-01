"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { BidderTopbar } from "../navigation/bidder-topbar";
import { ConversationsTable } from "./conversations-table";
import { ChatPanel } from "./chat-panel";
import { INITIAL_CONVERSATIONS, Conversation, ChatMessage } from "./messages-types";

export function BidderMessagesView() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string | null>("conv-10001");
  const [isChatOpen, setIsChatOpen] = useState(true);

  const selectedConversation = conversations.find((c) => c.id === selectedId) || null;

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedId(conv.id);
    setIsChatOpen(true);

    // Clear "New" badge when selected
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, hasNewMessages: false } : c))
    );
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Michael",
      isMe: true,
      timestamp: timeString,
      text,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar userName="Mike A." avatarLetter="M" />

      {/* Main Brushed Silver Shell Canvas - standardized viewport margins */}
      <main className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 w-full flex flex-col min-h-0 overflow-hidden box-border">
        <div className="maximal-shell p-3 sm:p-4.5 flex-1 flex flex-col min-h-0 shadow-lg">

          {/* Split Content: Table and Chat */}
          <div className="flex-1 flex flex-col lg:flex-row items-start min-h-0 overflow-y-auto">
            {/* Conversations Table - Fits rows naturally with pagination directly beneath */}
            <div className="flex-1 min-w-0 flex flex-col transition-[width] duration-300 ease-out">
              <ConversationsTable
                conversations={conversations}
                selectedId={isChatOpen ? selectedId : null}
                onSelect={handleSelectConversation}
              />
            </div>

            {/* Active Conversation Panel - Gradually fades in and out from right, squeezing the table */}
            <div
              className={`chat-drawer-container ${
                isChatOpen ? "is-open lg:ml-4 xl:ml-5" : "is-closed"
              }`}
              style={{ height: "600px", maxHeight: "100%" }}
              aria-hidden={!isChatOpen}
            >
              <div className="chat-drawer-inner">
                <ChatPanel
                  conversation={selectedConversation}
                  onSendMessage={handleSendMessage}
                  onClose={handleCloseChat}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
