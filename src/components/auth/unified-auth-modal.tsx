"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, X } from "lucide-react";
import { SignupForm } from "./signup-form";
import { LoginForm } from "./login-form";
import { ProjectForm } from "./project-form";
import { ForgotPasswordForm } from "./forgot-password-form";

export type ModalType = "login" | "signup" | "project" | "forgot-password" | null;

interface UnifiedAuthModalProps {
  type: ModalType;
  role?: "requestor" | "bidder";
  onClose: () => void;
  onSwitchType: (nextType: ModalType) => void;
}

export function UnifiedAuthModal({
  type,
  role = "bidder",
  onClose,
  onSwitchType,
}: UnifiedAuthModalProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (type) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [type, onClose]);

  if (!type) return null;

  const headerInfo = {
    signup: {
      title: "User Registration",
      subtitle: "Create your account to get started.",
      showAvatar: true,
    },
    login: {
      title: "Log In",
      subtitle: "Access your BusinessAdviser account.",
      showAvatar: false,
    },
    project: {
      title: "Post a Project Request",
      subtitle: "Tell qualified businesses what you need.",
      showAvatar: false,
    },
    "forgot-password": {
      title: "",
      subtitle: "",
      showAvatar: false,
    },
  };

  const currentHeader = headerInfo[type];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071d2caa] backdrop-blur-[5px] animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="ba-dialog relative w-full max-w-[500px] max-h-[92vh] overflow-y-auto p-6 sm:p-8 rounded-3xl text-left text-[#26465e] border border-white/80 shadow-2xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 text-2xl text-[#50788c] hover:text-[#1c384e] transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200/50 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header (Only for signup, login, project) */}
        {currentHeader.title ? (
          <div className="mb-5">
            {currentHeader.showAvatar ? (
              <div className="flex items-center gap-3.5 mb-1">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e4f6fc] to-[#b5d9e8] text-[#195a9d] flex items-center justify-center flex-none shadow-sm">
                  <User className="w-6 h-6" strokeWidth={2.2} />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#244c68] leading-tight">
                    {currentHeader.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6d8a9a]">
                    {currentHeader.subtitle}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#244c68] mb-1">
                  {currentHeader.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#6d8a9a]">
                  {currentHeader.subtitle}
                </p>
              </div>
            )}
          </div>
        ) : null}

        {/* Form Body based on Modal Type */}
        {type === "signup" && (
          <SignupForm
            initialRole={role}
            onSuccess={(selectedRole) => {
              onClose();
              if (selectedRole === "bidder") {
                router.push("/bidder/profile");
              } else {
                router.push(`/${selectedRole}/dashboard`);
              }
            }}
            onSwitchToLogin={() => onSwitchType("login")}
          />
        )}

        {type === "login" && (
          <LoginForm
            onSuccess={() => {
              onClose();
              router.push("/bidder/profile");
            }}
            onSwitchToSignup={() => onSwitchType("signup")}
            onSwitchToForgotPassword={() => onSwitchType("forgot-password")}
          />
        )}

        {type === "forgot-password" && (
          <ForgotPasswordForm
            onBackToLogin={() => onSwitchType("login")}
          />
        )}

        {type === "project" && (
          <ProjectForm
            onSuccess={() => {
              onClose();
              router.push("/requestor/requests/new");
            }}
          />
        )}

        <div className="text-[11px] text-[#667e90] bg-[#e7f2f8] p-2.5 rounded-xl mt-4 leading-relaxed text-center">
          Prototype Mode: Fill details to preview dashboard access.
        </div>
      </div>
    </div>
  );
}
