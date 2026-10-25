"use client";

import React from "react";
import { FileText, Users, BarChart3 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "Post",
      description: "Share your project details",
      icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.4} />,
      iconClass: "ba-step-icon-1",
    },
    {
      title: "Connect",
      description: "Get bids from qualified businesses",
      icon: <Users className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.4} />,
      iconClass: "ba-step-icon-2",
    },
    {
      title: "Grow",
      description: "Turn opportunities into success",
      icon: <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.6} />,
      iconClass: "ba-step-icon-3",
    },
  ];

  return (
    <section className="w-full max-w-[960px] mx-auto px-4 mt-7 sm:mt-9">
      <div className="ba-divider flex items-center justify-center gap-6 text-center text-[#265c91] font-extrabold tracking-[0.26em] text-xs sm:text-sm uppercase mb-4 sm:mb-6">
        <span>HOW IT WORKS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-left">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="ba-step-card flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl"
          >
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 flex-none rounded-xl flex items-center justify-center ${step.iconClass}`}
            >
              {step.icon}
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#244c6a] mb-0.5">
                {step.title}
              </h3>
              <p className="text-xs text-[#7190a6] leading-snug">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
