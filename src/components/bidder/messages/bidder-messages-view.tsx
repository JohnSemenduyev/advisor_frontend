"use client";

import React, { useState, useEffect } from "react";
import { BidderTopbar } from "../navigation/bidder-topbar";
import { ConversationsTable } from "./conversations-table";
import { ChatPanel } from "./chat-panel";
import { INITIAL_CONVERSATIONS, Conversation, ChatMessage } from "./messages-types";

export function BidderMessagesView() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string | null>("conv-10001");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const selectedConversation = conversations.find((c) => c.id === selectedId) || null;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isChatOpen) {
        setIsChatOpen(false);
      }
    }
    if (isChatOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isChatOpen]);

  const handleSelectConversation = (conv: Conversation) => {
    setSelectedId(conv.id);
    setIsChatOpen(true);

    // Clear "New" badge when selected
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, hasNewMessages: false } : c))
    );
  };

  const handlePrev = () => {
    if (!conversations.length) return;
    const currentIndex = conversations.findIndex((c) => c.id === selectedId);
    const prevIndex = (currentIndex - 1 + conversations.length) % conversations.length;
    setSelectedId(conversations[prevIndex].id);
  };

  const handleNext = () => {
    if (!conversations.length) return;
    const currentIndex = conversations.findIndex((c) => c.id === selectedId);
    const nextIndex = (currentIndex + 1) % conversations.length;
    setSelectedId(conversations[nextIndex].id);
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

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 w-full flex flex-col min-h-0 overflow-hidden box-border">
        <div className="maximal-shell p-3 sm:p-4.5 flex-1 flex flex-col min-h-0 shadow-lg">
          {/* Full-width Conversations Table - never squeezed */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <ConversationsTable
              conversations={conversations}
              selectedId={isChatOpen ? selectedId : null}
              onSelect={handleSelectConversation}
            />
          </div>
        </div>
      </main>

      {/* Sliding Window & Blurred Backdrop matching Visitor_Timeline_One_Visitor_Working_Demo.html */}
      <div
        id="vtDetailOverlay"
        className={`messages-slide-overlay ${isChatOpen ? "open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleCloseChat();
          }
        }}
        aria-hidden={!isChatOpen}
      >
        <aside
          id="vtDetailDrawer"
          className="messages-slide-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Conversation details"
        >
          {/* Drawer Top Header matching reference */}
          <div className="vtd-top flex-none">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <strong className="text-[16px] font-[650] text-[#223745] truncate">
                {selectedConversation ? `Chatting with ${selectedConversation.name}` : "Conversation"}
              </strong>
            </div>

            <div className="vtd-nav flex items-center gap-1.5 flex-none">
              <button
                type="button"
                onClick={handlePrev}
                className="vtd-icon"
                title="Previous conversation"
                aria-label="Previous conversation"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="vtd-icon"
                title="Next conversation"
                aria-label="Next conversation"
              >
                ›
              </button>
              <button
                type="button"
                onClick={handleCloseChat}
                className="vtd-icon"
                title="Close"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Drawer Body: Chat Panel fills the sliding window */}
          <div className="flex-1 min-h-0 flex flex-col bg-[#f8fafc] overflow-hidden">
            <ChatPanel
              conversation={selectedConversation}
              onSendMessage={handleSendMessage}
              onClose={handleCloseChat}
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
