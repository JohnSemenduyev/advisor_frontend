"use client";

import React from "react";
import { FileText, Users, BarChart3 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Post",
      description: "Share your project details",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 32 32"
          className="w-[25px] h-[25px]"
        >
          <path d="M8 3h12l5 5v21H8zM20 3v6h5M12 15h10M12 21h10" />
        </svg>
      ),
      iconClass: "ba-step-icon-1",
    },
    {
      title: "Connect",
      description: "Get bids from qualified businesses",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          viewBox="0 0 32 32"
          className="w-[25px] h-[25px]"
        >
          <circle cx="16" cy="10" r="5" />
          <circle cx="5" cy="13" r="3" />
          <circle cx="27" cy="13" r="3" />
          <path d="M7 27v-4c0-8 18-8 18 0v4zM1 25v-4c0-3 3-4 6-4m24 8v-4c0-3-3-4-6-4" />
        </svg>
      ),
      iconClass: "ba-step-icon-2",
    },
    {
      title: "Grow",
      description: "Turn opportunities into success",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          viewBox="0 0 32 32"
          className="w-[25px] h-[25px]"
        >
          <rect height="11" rx="1" width="5" x="4" y="17" />
          <rect height="17" rx="1" width="5" x="14" y="11" />
          <rect height="24" rx="1" width="5" x="24" y="4" />
        </svg>
      ),
      iconClass: "ba-step-icon-3",
    },
  ];

  return (
    <section className="w-full max-w-[960px] mx-auto px-4">
      <div className="ba-divider flex items-center justify-center gap-[25px] text-center text-[#265c91] font-extrabold tracking-[0.26em] text-[13px] uppercase mt-[30px] mb-[19px]">
        <span>HOW IT WORKS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[13px] text-left">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="ba-step-card flex items-center gap-[13px] p-[13px] px-[16px] rounded-[15px]"
          >
            <div
              className={`w-[49px] h-[49px] flex-none rounded-[13px] grid place-items-center ${step.iconClass}`}
            >
              {step.icon}
            </div>

            <div>
              <h3 className="text-[17px] font-bold text-[#244c6a] mb-1 leading-tight">
                {step.title}
              </h3>
              <p className="text-[12px] text-[#7190a6] leading-[1.4]">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
