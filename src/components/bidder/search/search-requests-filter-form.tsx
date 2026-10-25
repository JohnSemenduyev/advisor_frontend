"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileText,
  Globe,
  MapPin,
  Store,
  Radio,
  LayoutGrid,
  Search,
} from "lucide-react";

export interface SearchFilterState {
  country: string;
  state: string;
  zipCode: string;
  distance: string;
  industry: string;
}

interface SearchRequestsFilterFormProps {
  onSearch: (filters: SearchFilterState) => void;
  initialFilters?: SearchFilterState;
}

export function SearchRequestsFilterForm({
  onSearch,
  initialFilters = {
    country: "",
    state: "",
    zipCode: "",
    distance: "",
    industry: "",
  },
}: SearchRequestsFilterFormProps) {
  const [filters, setFilters] = useState<SearchFilterState>(initialFilters);

  const handleChange = (field: keyof SearchFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="w-full space-y-7">
      {/* Centered BusinessAdviser Branding & Tagline from Image 1 */}
      <div className="text-center pt-2 pb-2">
        <div className="inline-block relative w-[290px] sm:w-[360px] h-[75px] sm:h-[90px] mx-auto">
          <Image
            src="/images/business-adviser-logo.png"
            alt="BusinessAdviser Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <p className="text-[11px] sm:text-[13px] font-bold tracking-[0.22em] text-[#146497] uppercase mt-2">
          Connecting Businesses with Opportunities
        </p>
      </div>

      {/* Main Service Request Search Card */}
      <form
        onSubmit={handleSubmit}
        className="maximal-card p-5 sm:p-7 rounded-2xl border border-white shadow-xl space-y-6"
      >

        {/* 5 Filter Fields in Responsive Horizontal Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
          {/* Choose Country */}
          <div>
            <label className="block text-xs font-bold text-[#1f4a6b] mb-1.5">
              Choose Country
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#467393]">
                <Globe className="w-4 h-4" />
              </div>
              <select
                value={filters.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="maximal-input text-xs sm:text-[13px] pl-9 pr-7 py-2.5 w-full appearance-none font-medium cursor-pointer"
              >
                <option value="">Select country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="All Countries">All Countries</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#688292] text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Select State(s) */}
          <div>
            <label className="block text-xs font-bold text-[#1f4a6b] mb-1.5">
              Select State(s)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#467393]">
                <MapPin className="w-4 h-4" />
              </div>
              <select
                value={filters.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="maximal-input text-xs sm:text-[13px] pl-9 pr-7 py-2.5 w-full appearance-none font-medium cursor-pointer"
              >
                <option value="">Select state(s)</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New York">New York</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Virginia">Virginia</option>
                <option value="Connecticut">Connecticut</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#688292] text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Enter Zip Code(s) */}
          <div>
            <label className="block text-xs font-bold text-[#1f4a6b] mb-1.5">
              Enter Zip Code(s)
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#467393]">
                <Store className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Enter zip codes"
                value={filters.zipCode}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                className="maximal-input text-xs sm:text-[13px] pl-9 pr-3 py-2.5 w-full font-medium"
              />
            </div>
          </div>

          {/* Distance */}
          <div>
            <label className="block text-xs font-bold text-[#1f4a6b] mb-1.5">
              Distance
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#467393]">
                <Radio className="w-4 h-4" />
              </div>
              <select
                value={filters.distance}
                onChange={(e) => handleChange("distance", e.target.value)}
                className="maximal-input text-xs sm:text-[13px] pl-9 pr-7 py-2.5 w-full appearance-none font-medium cursor-pointer"
              >
                <option value="">Select distance</option>
                <option value="Exact Location">Exact Location</option>
                <option value="Within 25 miles">Within 25 miles</option>
                <option value="Within 50 miles">Within 50 miles</option>
                <option value="Within 100 miles">Within 100 miles</option>
                <option value="Nationwide">Nationwide</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#688292] text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Choose Industries */}
          <div>
            <label className="block text-xs font-bold text-[#1f4a6b] mb-1.5">
              Choose Industries
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#467393]">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <select
                value={filters.industry}
                onChange={(e) => handleChange("industry", e.target.value)}
                className="maximal-input text-xs sm:text-[13px] pl-9 pr-7 py-2.5 w-full appearance-none font-medium cursor-pointer"
              >
                <option value="">Select industries</option>
                <option value="Security Guard Services">Security Guard Services</option>
                <option value="Security Technology">Security Technology</option>
                <option value="Surveillance Monitoring">Surveillance Monitoring</option>
                <option value="Access Control Systems">Access Control Systems</option>
                <option value="Facility Management">Facility Management</option>
                <option value="All Industries">All Industries</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#688292] text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Centered Search Button matching Image 1 */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-full sm:w-60 h-11 rounded-xl bg-gradient-to-r from-[#0066c0] via-[#0055a5] to-[#00478a] hover:from-[#0074d9] hover:to-[#0055a5] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-[#00478a]/30 transition-all duration-150 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}
