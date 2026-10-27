"use client";

import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { RequestorTopbar } from "../navigation/requestor-topbar";
import { RequestorConversationsTable } from "./requestor-conversations-table";
import { RequestorChatPanel } from "./requestor-chat-panel";
import {
  INITIAL_REQUESTOR_CONVERSATIONS,
  RequestorConversation,
  ChatMessage,
} from "./messages-types";

export function RequestorMessagesView() {
  const [conversations, setConversations] = useState<RequestorConversation[]>(
    INITIAL_REQUESTOR_CONVERSATIONS
  );
  const [selectedId, setSelectedId] = useState<string | null>("conv-10001");
  const [isChatOpen, setIsChatOpen] = useState(true);

  const selectedConversation =
    conversations.find((c) => c.id === selectedId) || null;

  const handleSelectConversation = (conv: RequestorConversation) => {
    setSelectedId(conv.id);
    setIsChatOpen(true);

    // Clear "New" badge when selected
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conv.id ? { ...c, hasNewMessages: false } : c
      )
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
      sender: "John Semenduyev",
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
      {/* Top Navigation Bar with Interlocking Domino Tabs */}
      <RequestorTopbar userName="John Semenduyev" avatarLetter="J" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 p-3 sm:px-4 py-4 w-full flex flex-col min-h-0 overflow-hidden">
        <div className="maximal-shell p-3 sm:p-5 w-full flex-1 flex flex-col min-h-0 space-y-4">


          {/* Split Content: Table on Left, Chat on Right */}
          <div className="flex-1 flex flex-col lg:flex-row gap-4 xl:gap-5 items-stretch min-h-0 overflow-hidden">
            {/* Conversations Table */}
            <div
              className={`min-w-0 h-full flex flex-col transition-all duration-300 ease-in-out ${
                isChatOpen ? "flex-1 w-full" : "w-full"
              }`}
            >
              <RequestorConversationsTable
                conversations={conversations}
                selectedId={isChatOpen ? selectedId : null}
                onSelect={handleSelectConversation}
              />
            </div>

            {/* Active Conversation Panel */}
            {isChatOpen && (
              <div className="w-full lg:w-[360px] xl:w-[410px] 2xl:w-[460px] h-full flex-none chat-slide-in-right flex flex-col min-h-0">
                <RequestorChatPanel
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
