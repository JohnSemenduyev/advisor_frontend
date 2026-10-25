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
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar userName="Mike A." avatarLetter="M" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1600px] w-full mx-auto">
        <div className="maximal-shell p-5 sm:p-7 lg:p-8 space-y-6">

          {/* Split Content: Table takes wide primary space, Chat takes sleek compact space */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Conversations Table - Primary wide space (no scrollbar) */}
            <div
              className={`min-w-0 transition-all duration-200 ${
                isChatOpen ? "flex-1 w-full" : "w-full"
              }`}
            >
              <ConversationsTable
                conversations={conversations}
                selectedId={isChatOpen ? selectedId : null}
                onSelect={handleSelectConversation}
              />
            </div>

            {/* Active Conversation Panel - Sleek compact messaging panel */}
            {isChatOpen && (
              <div className="w-full lg:w-[410px] xl:w-[440px] 2xl:w-[460px] flex-none">
                <ChatPanel
                  conversation={selectedConversation}
                  onSendMessage={handleSendMessage}
                  onClose={handleCloseChat}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
