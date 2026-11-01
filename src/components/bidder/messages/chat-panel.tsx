"use client";

import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, MessageSquare } from "lucide-react";
import { Conversation, ChatMessage } from "./messages-types";

interface ChatPanelProps {
  conversation: Conversation | null;
  onSendMessage: (conversationId: string, text: string) => void;
  onClose: () => void;
}

export function ChatPanel({
  conversation,
  onSendMessage,
  onClose,
}: ChatPanelProps) {
  const [inputText, setInputText] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="maximal-card p-6 rounded-2xl border border-[#b8c9d4] bg-white shadow-lg flex flex-col items-center justify-center text-center h-full min-h-[320px]">
        <div className="w-12 h-12 rounded-2xl bg-[#e5f1fb] text-[#0066c0] flex items-center justify-center mb-3">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#1a384c]">
          No Conversation Selected
        </h3>
        <p className="text-xs text-[#627e90] max-w-xs mt-1">
          Click any row in the conversations list on the left to read correspondence and respond.
        </p>
      </div>
    );
  }

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(conversation.id, inputText.trim());
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col overflow-hidden text-left h-full bg-[#f8fafc]">
      {/* Service Request Context Banner */}
      <div className="px-4 py-2 border-b border-[#e5eef4] bg-white flex items-center justify-between gap-2 flex-none text-xs">
        <div className="truncate text-[#536b7b]">
          <span className="font-semibold text-[#1a384c]">Service Request:</span>{" "}
          <span className="text-[#253946]">{conversation.serviceRequest}</span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-[#eaf2f7] text-[#1e4b6b] font-semibold text-[11px] flex-none">
          ID: {conversation.serviceRequestId}
        </span>
      </div>

      {/* Input Textarea Container */}
      <div className="p-3 border-b border-[#e5eef4] bg-[#fbfdfd] flex-none">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-[#526d80] font-semibold">
            Me: (Chatting with <strong className="text-[#1a384c]">{conversation.name}</strong>)
          </span>
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="chat-btn-send disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer !px-3 !py-1 text-xs"
            title="Send message"
          >
            <SendHorizontal className="w-3.5 h-3.5 stroke-[2.4]" />
            <span>Send</span>
          </button>
        </div>
        <textarea
          rows={2}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="maximal-input w-full p-2.5 text-xs rounded-xl resize-none bg-white border-[#cad8e2] text-[#1c3342] placeholder:text-[#88a0b0] focus:ring-2 focus:ring-[#0077d9]/20"
        />
        <div className="flex justify-between items-center mt-1 px-0.5 text-[10.5px] text-[#7d97a7]">
          <span>
            <span className="hidden xl:inline">Press </span>Enter to send
          </span>
          <span>{inputText.length} chars</span>
        </div>
      </div>

      {/* Message History Thread - stretches to fill height, never overflows page */}
      <div
        ref={messagesContainerRef}
        className="p-3 space-y-2.5 overflow-y-auto flex-1 min-h-0 bg-gradient-to-b from-[#f9fbfd] to-[#edf4f8]/50"
      >
        {conversation.messages.map((msg: ChatMessage) => {
          if (!msg.isMe) {
            // Client Message Bubble: Mint Green styling matching screenshot
            return (
              <div
                key={msg.id}
                className="p-3 rounded-xl bg-[#f0f9f3] border border-[#c3ead2] shadow-xs text-left"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-[#14703a]">
                    {msg.sender}:
                  </span>
                  <span className="text-[11px] font-medium text-[#4f8063]">
                    {msg.timestamp}
                  </span>
                </div>
                <div className="text-xs leading-relaxed text-[#1e442c] whitespace-pre-line font-normal break-words">
                  {msg.text}
                </div>
              </div>
            );
          } else {
            // User / Me Message Bubble: Soft Slate-Blue styling matching screenshot
            return (
              <div
                key={msg.id}
                className="p-3 rounded-xl bg-[#f2f7fc] border border-[#c6dceb] shadow-xs text-left"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-bold text-[#183c55]">
                    {msg.sender}:
                  </span>
                  <span className="text-[11px] font-medium text-[#5f7e92]">
                    {msg.timestamp}
                  </span>
                </div>
                <div className="text-xs leading-relaxed text-[#233d4f] whitespace-pre-line font-normal break-words">
                  {msg.text}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
