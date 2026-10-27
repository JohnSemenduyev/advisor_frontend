"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, X, MessageSquare } from "lucide-react";
import { RequestorConversation, ChatMessage } from "./messages-types";

interface RequestorChatPanelProps {
  conversation: RequestorConversation | null;
  onSendMessage: (conversationId: string, text: string) => void;
  onClose: () => void;
}

export function RequestorChatPanel({
  conversation,
  onSendMessage,
  onClose,
}: RequestorChatPanelProps) {
  const [inputText, setInputText] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  if (!conversation) {
    return (
      <div className="maximal-card p-6 rounded-2xl border border-[#b8c9d4] bg-white shadow-lg flex flex-col items-center justify-center text-center h-full min-h-[360px]">
        <div className="w-12 h-12 rounded-2xl bg-[#e5f1fb] text-[#185a86] flex items-center justify-center mb-3">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#1a384c]">
          No Active Conversation
        </h3>
        <p className="text-xs text-[#627e90] max-w-xs mt-1">
          Select a conversation from the table on the left to read correspondence and send replies.
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
    <div className="maximal-card rounded-2xl border border-[#b8c9d4] bg-white shadow-lg flex flex-col overflow-hidden text-left h-full">
      {/* Top Header matching client screenshot */}
      <div className="px-3.5 py-2.5 border-b border-[#e5eef4] bg-gradient-to-r from-[#ffffff] to-[#f6f9fb] flex items-center justify-between gap-2 flex-none">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="text-sm font-extrabold text-[#112d40] tracking-tight flex-none">
            Me:
          </span>
          <span
            className="text-xs text-[#6c8697] truncate"
            title={`Conversation for Tender #${conversation.serviceRequestId}`}
          >
            (<strong className="text-[#1a384c]">{conversation.serviceRequest}</strong>)
          </span>
        </div>

        {/* Top Right Action Buttons: Green Send & Blue Close */}
        <div className="flex items-center gap-2 flex-none">
          {/* Green Send Button */}
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-b from-[#2ea858] to-[#1f8b44] border border-[#1a7e3c] shadow-xs hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title="Send message"
          >
            <Send className="w-3.5 h-3.5 stroke-[2.4]" />
            <span>Send</span>
          </button>

          {/* Blue Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-b from-[#0264b3] to-[#014f8e] border border-[#01447a] shadow-xs hover:brightness-110 active:translate-y-0.5 cursor-pointer transition-all"
            title="Close conversation"
          >
            <X className="w-3.5 h-3.5 stroke-[2.4]" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Input Textarea Container */}
      <div className="p-3 border-b border-[#e5eef4] bg-[#fbfdfd] flex-none">
        <textarea
          rows={3}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="maximal-input w-full p-2.5 text-xs rounded-xl resize-none bg-white border border-[#cad8e2] text-[#1c3342] placeholder:text-[#88a0b0] focus:ring-2 focus:ring-[#0077d9]/20 shadow-inner"
        />
        <div className="flex justify-between items-center mt-1 px-0.5 text-[10.5px] text-[#7d97a7]">
          <span>
            <span className="hidden sm:inline">Press </span>Enter to send
          </span>
          <span>{inputText.length} chars</span>
        </div>
      </div>

      {/* Message History Thread */}
      <div
        ref={messagesContainerRef}
        className="p-3.5 space-y-3 overflow-y-auto flex-1 min-h-[250px] bg-gradient-to-b from-[#f9fbfd] to-[#edf4f8]/50"
      >
        {conversation.messages.map((msg: ChatMessage) => {
          // If message is from John Semenduyev (or Me) -> Greenish Bubble like in screenshot
          const isGreenBubble = msg.sender.includes("John");

          return (
            <div
              key={msg.id}
              className={`p-3.5 rounded-xl shadow-xs text-left border ${
                isGreenBubble
                  ? "bg-[#f0f9f3] border-[#c3ead2]"
                  : "bg-[#f2f7fc] border-[#c6dceb]"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  className={`text-xs font-bold ${
                    isGreenBubble ? "text-[#14703a]" : "text-[#183c55]"
                  }`}
                >
                  {msg.sender}:
                </span>
                <span
                  className={`text-[11px] font-medium ${
                    isGreenBubble ? "text-[#4f8063]" : "text-[#5f7e92]"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
              <div
                className={`text-xs leading-relaxed whitespace-pre-line font-normal break-words ${
                  isGreenBubble ? "text-[#1e442c]" : "text-[#233d4f]"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
