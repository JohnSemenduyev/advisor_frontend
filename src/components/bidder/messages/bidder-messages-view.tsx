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
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar userName="Mike A." avatarLetter="M" />

      {/* Main Brushed Silver Shell Canvas - fills screen height to bottom margin */}
      <main className="flex-1 p-3 sm:p-4 lg:p-4.5 max-w-[1680px] w-full mx-auto flex flex-col min-h-0 overflow-hidden">
        <div className="maximal-shell p-3.5 sm:p-4 lg:p-4.5 flex-1 flex flex-col min-h-0 shadow-lg">

          {/* Split Content: Table and Chat stretch to exact same height, aligning at the bottom */}
          <div className="flex-1 flex flex-col lg:flex-row gap-4 xl:gap-5 items-stretch min-h-0 overflow-hidden">
            {/* Conversations Table - Primary wide space, stretches to match height */}
            <div
              className={`min-w-0 h-full flex flex-col transition-all duration-300 ease-in-out ${
                isChatOpen ? "flex-1 w-full" : "w-full"
              }`}
            >
              <ConversationsTable
                conversations={conversations}
                selectedId={isChatOpen ? selectedId : null}
                onSelect={handleSelectConversation}
              />
            </div>

            {/* Active Conversation Panel - Slides in from right, stretches to exact same height */}
            {isChatOpen && (
              <div className="w-full lg:w-[315px] xl:w-[350px] 2xl:w-[380px] h-full flex-none chat-slide-in-right flex flex-col min-h-0">
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
