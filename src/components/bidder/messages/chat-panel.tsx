"use client";

import React, { useState, useRef, useEffect } from "react";
import { SendHorizontal, X, MessageSquare } from "lucide-react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="maximal-card p-6 rounded-2xl border border-[#b8c9d4] bg-white shadow-lg flex flex-col items-center justify-center text-center min-h-[320px]">
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
    <div className="maximal-card rounded-2xl border border-[#b8c9d4] bg-white shadow-lg flex flex-col overflow-hidden text-left animate-in fade-in duration-150">
      {/* Top Header matching screenshot */}
      <div className="px-3.5 py-2 border-b border-[#e5eef4] bg-gradient-to-r from-[#ffffff] to-[#f6f9fb] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="text-sm font-extrabold text-[#112d40] tracking-tight flex-none">
            Me:
          </span>
          <span
            className="text-xs text-[#6c8697] truncate"
            title={`Chatting with ${conversation.name}`}
          >
            (Chatting with <strong className="text-[#1a384c]">{conversation.name}</strong>)
          </span>
        </div>

        {/* Top Right Action Buttons: Green Send & Blue Close */}
        <div className="flex items-center gap-1.5 flex-none">
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="chat-btn-send disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer !px-2.5 !py-1 text-xs"
            title="Send message"
          >
            <SendHorizontal className="w-3.5 h-3.5 stroke-[2.4]" />
            <span>Send</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="chat-btn-close cursor-pointer !px-2.5 !py-1 text-xs"
            title="Close conversation"
          >
            <X className="w-3.5 h-3.5 stroke-[2.4]" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Input Textarea Container */}
      <div className="p-3 border-b border-[#e5eef4] bg-[#fbfdfd]">
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

      {/* Message History Thread - constrained to visible view */}
      <div className="p-3 space-y-2.5 overflow-y-auto max-h-[220px] sm:max-h-[250px] lg:max-h-[270px] xl:max-h-[300px] bg-gradient-to-b from-[#f9fbfd] to-[#edf4f8]/50">
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
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
