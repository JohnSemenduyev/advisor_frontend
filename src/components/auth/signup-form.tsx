"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Users,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { AuthInput } from "./auth-input";
import { AuthSelect } from "./auth-select";

interface SignupFormProps {
  initialRole?: "requestor" | "bidder";
  onSuccess?: (role: "requestor" | "bidder") => void;
  onSwitchToLogin?: () => void;
}

export function SignupForm({
  initialRole = "bidder",
  onSuccess,
  onSwitchToLogin,
}: SignupFormProps) {
  const router = useRouter();
  const [role, setRole] = useState<"requestor" | "bidder">(initialRole);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    title: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "userType") {
      setRole(value as "requestor" | "bidder");
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      if (onSuccess) {
        onSuccess(role);
      } else {
        if (role === "bidder") {
          router.push("/bidder/profile");
        } else {
          router.push(`/${role}/dashboard`);
        }
      }
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AuthInput
          label="First Name"
          name="firstName"
          placeholder="Enter first name"
          icon={<User className="h-4 w-4" />}
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <AuthInput
          label="Last Name"
          name="lastName"
          placeholder="Enter last name"
          icon={<User className="h-4 w-4" />}
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email Address */}
      <AuthInput
        label="Email Address"
        name="email"
        type="email"
        placeholder="Enter your email address"
        icon={<Mail className="h-4 w-4" />}
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Phone Number */}
      <AuthInput
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="Enter your phone number"
        icon={<Phone className="h-4 w-4" />}
        value={formData.phone}
        onChange={handleChange}
        required
      />

      {/* Company Name */}
      <AuthInput
        label="Company Name"
        name="companyName"
        placeholder="Enter your company name"
        icon={<Building2 className="h-4 w-4" />}
        value={formData.companyName}
        onChange={handleChange}
        required
      />

      {/* Job Title */}
      <AuthInput
        label="Title"
        name="title"
        placeholder="Enter your job title"
        icon={<Briefcase className="h-4 w-4" />}
        value={formData.title}
        onChange={handleChange}
        required
      />

      {/* Primary User Type Dropdown */}
      <AuthSelect
        label="Primary User Type"
        name="userType"
        icon={<Users className="h-4 w-4" />}
        value={role}
        onChange={handleChange}
        options={[
          { value: "bidder", label: "Bidder (Contractor / Service Provider)" },
          { value: "requestor", label: "Requestor (Client / Post Projects)" },
        ]}
      />

      {/* Register Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="ba-submit-btn w-full mt-4 py-3 px-4 rounded-xl text-white font-bold text-sm tracking-wide cursor-pointer shadow-md flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-emerald-300 animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <span>Register</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Switch to login */}
      {onSwitchToLogin && (
        <div className="pt-2 text-center text-xs text-[#6d8a9a]">
          <span>Already have an account? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-bold text-[#1c669e] hover:underline cursor-pointer"
          >
            Log in
          </button>
        </div>
      )}
    </form>
  );
}
