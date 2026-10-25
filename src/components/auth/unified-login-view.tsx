"use client";

import React, { useState } from "react";
import { AuthHeader } from "./auth-header";
import { HeroBackground } from "./hero-background";
import { BrandLogo } from "./brand-logo";
import { CtaProjectButton } from "./cta-project-button";
import { HowItWorks } from "./how-it-works";
import { UnifiedAuthModal, ModalType } from "./unified-auth-modal";

interface UnifiedLoginViewProps {
  role?: "requestor" | "bidder";
  defaultModal?: ModalType;
}

export function UnifiedLoginView({
  role = "bidder",
  defaultModal = null,
}: UnifiedLoginViewProps) {
  const [modalType, setModalType] = useState<ModalType>(defaultModal);

  return (
    <div className="min-h-screen flex flex-col bg-[#eaf1f5] text-[#1b3447] select-none">
      {/* Top Brushed Graphite Header */}
      <AuthHeader
        role={role}
        onOpenLogin={() => setModalType("login")}
        onOpenSignUp={() => setModalType("signup")}
      />

      {/* Hero Section */}
      <main className="ba-hero flex-1 min-h-[calc(100vh-64px)] relative overflow-hidden flex flex-col justify-center">
        <HeroBackground />

        <div className="relative z-10 w-full max-w-[1150px] mx-auto px-4 py-6 sm:py-10 flex flex-col items-center">
          {/* BusinessAdviser Metallic Logo & Headlines */}
          <BrandLogo />

          {/* Central 'Post a Project Request' CTA */}
          <CtaProjectButton onClick={() => setModalType("project")} />

          {/* How It Works (Post, Connect, Grow) */}
          <HowItWorks />
        </div>
      </main>

      {/* Unified Interactive Auth & Project Modal */}
      <UnifiedAuthModal
        type={modalType}
        role={role}
        onClose={() => setModalType(null)}
        onSwitchType={(next) => setModalType(next)}
      />
    </div>
  );
}
