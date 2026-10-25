"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, FileText, CheckCircle2 } from "lucide-react";
import { AuthInput } from "./auth-input";

interface ProjectFormProps {
  onSuccess?: () => void;
}

export function ProjectForm({ onSuccess }: ProjectFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/requestor/requests/new");
      }
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5">
      <AuthInput
        label="Your Name"
        name="name"
        placeholder="Enter your name"
        icon={<User className="h-4 w-4" />}
        value={formData.name}
        onChange={handleChange}
        required
      />

      <AuthInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your business email"
        icon={<Mail className="h-4 w-4" />}
        value={formData.email}
        onChange={handleChange}
        required
      />

      <AuthInput
        label="Project Title"
        name="title"
        placeholder="e.g. Next.js SaaS Web App Development"
        icon={<FileText className="h-4 w-4" />}
        value={formData.title}
        onChange={handleChange}
        required
      />

      <div className="space-y-1 text-left">
        <label className="block text-xs font-bold text-[#244c68] tracking-wide">
          Project Description *
        </label>
        <textarea
          name="description"
          rows={3}
          required
          placeholder="Briefly describe what you need, deliverables, and estimated timeline..."
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-xl border border-[#b9d5e3] bg-white p-3 text-sm text-[#203b4e] placeholder:text-[#8ba2b2] focus:border-[#25678b] focus:outline-none focus:ring-2 focus:ring-[#3a9dbd]/30"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="ba-submit-btn w-full mt-4 py-3 px-4 rounded-xl text-white font-bold text-sm tracking-wide cursor-pointer shadow-md flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-emerald-300 animate-spin" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <span>Submit Project Request</span>
        )}
      </button>
    </form>
  );
}
