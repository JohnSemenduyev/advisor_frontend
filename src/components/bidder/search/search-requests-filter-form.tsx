"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  getIndustrySuggestions,
  getLocationSuggestions,
} from "@/lib/constants/search-options";
import { TagSelectionModal } from "@/components/shared/tag-selection-modal";

export interface SearchFilterState {
  locations: string[];
  industry: string;
  industries?: string[];
  country?: string;
  state?: string;
  zipCode?: string;
  distance?: string;
}

interface SearchRequestsFilterFormProps {
  onSearch: (filters: SearchFilterState) => void;
  initialFilters?: SearchFilterState;
}

export function SearchRequestsFilterForm({
  onSearch,
  initialFilters = {
    locations: [],
    industry: "",
  },
}: SearchRequestsFilterFormProps) {
  // Location States
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialFilters.locations || []);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [saveLocations, setSaveLocations] = useState(false);
  const locationTriggerInputRef = useRef<HTMLInputElement>(null);

  // Industry States (matching exact method as Location)
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(() => {
    if (initialFilters.industries && initialFilters.industries.length > 0) {
      return initialFilters.industries;
    }
    if (initialFilters.industry) {
      return initialFilters.industry.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [];
  });
  const [isIndustryModalOpen, setIsIndustryModalOpen] = useState(false);
  const [saveIndustries, setSaveIndustries] = useState(false);
  const industryTriggerInputRef = useRef<HTMLInputElement>(null);

  // Load saved locations & industries from localStorage on mount
  useEffect(() => {
    try {
      const savedLocs = localStorage.getItem("ba-saved-locations");
      if (savedLocs) {
        const parsed = JSON.parse(savedLocs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedLocations((prev) => (prev.length === 0 ? parsed : prev));
          setSaveLocations(true);
        }
      }
      const savedInds = localStorage.getItem("ba-saved-industries");
      if (savedInds) {
        const parsed = JSON.parse(savedInds);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedIndustries((prev) => (prev.length === 0 ? parsed : prev));
          setSaveIndustries(true);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Location Handlers
  const handleOpenLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  const handleCloseLocationModal = () => {
    setIsLocationModalOpen(false);
    locationTriggerInputRef.current?.focus();
  };

  const handleAddLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.some((item) => item.toLowerCase() === loc.toLowerCase())
        ? prev
        : [...prev, loc]
    );
  };

  const handleRemoveLocation = (loc: string) => {
    setSelectedLocations((prev) => prev.filter((item) => item !== loc));
  };

  const handleLocationDone = () => {
    if (saveLocations) {
      try {
        localStorage.setItem("ba-saved-locations", JSON.stringify(selectedLocations));
      } catch {
        // Ignore
      }
    } else {
      try {
        localStorage.removeItem("ba-saved-locations");
      } catch {
        // Ignore
      }
    }
    handleCloseLocationModal();
  };

  // Industry Handlers (exact same method as Location)
  const handleOpenIndustryModal = () => {
    setIsIndustryModalOpen(true);
  };

  const handleCloseIndustryModal = () => {
    setIsIndustryModalOpen(false);
    industryTriggerInputRef.current?.focus();
  };

  const handleAddIndustry = (ind: string) => {
    setSelectedIndustries((prev) =>
      prev.some((item) => item.toLowerCase() === ind.toLowerCase())
        ? prev
        : [...prev, ind]
    );
  };

  const handleRemoveIndustry = (ind: string) => {
    setSelectedIndustries((prev) => prev.filter((item) => item !== ind));
  };

  const handleIndustryDone = () => {
    if (saveIndustries) {
      try {
        localStorage.setItem("ba-saved-industries", JSON.stringify(selectedIndustries));
      } catch {
        // Ignore
      }
    } else {
      try {
        localStorage.removeItem("ba-saved-industries");
      } catch {
        // Ignore
      }
    }
    handleCloseIndustryModal();
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      locations: selectedLocations,
      industry: selectedIndustries.join(", "),
      industries: selectedIndustries,
      state: selectedLocations[0] || "",
    });
  };

  const locationPlaceholder = selectedLocations.length
    ? `${selectedLocations.length} ${selectedLocations.length === 1 ? "location" : "locations"} selected — click to edit`
    : "Enter states or cities";

  const industryPlaceholder = selectedIndustries.length
    ? `${selectedIndustries.length} ${selectedIndustries.length === 1 ? "industry" : "industries"} selected — click to edit`
    : "Enter industries";

  return (
    <div className="ba-home">
      {/* Centered BusinessAdviser Branding & Tagline matching reference HTML */}
      <div className="ba-logo">
        <Image
          src="/images/business-adviser-logo.png"
          alt="BusinessAdviser Logo"
          width={500}
          height={178}
          className="brand-reference-logo block mx-auto w-[min(500px,75vw)] h-auto"
          priority
        />
      </div>

      <div className="ba-tagline">
        CONNECTING BUSINESSES WITH OPPORTUNITIES
      </div>

      {/* Main Service Request 2-Field Search Panel */}
      <section className="ba-search-panel">
        <form onSubmit={handleSubmit}>
          <div className="ba-fields">
            {/* Field 1: Enter Locations */}
            <label>
              <span>Enter Locations</span>
              <input
                ref={locationTriggerInputRef}
                id="ba-location"
                type="text"
                readOnly
                placeholder={locationPlaceholder}
                onClick={handleOpenLocationModal}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenLocationModal();
                  }
                }}
                aria-haspopup="dialog"
                aria-label="Enter Locations"
              />
            </label>

            {/* Field 2: Enter Industries (Matching Popup Method) */}
            <label>
              <span>Enter Industries</span>
              <input
                ref={industryTriggerInputRef}
                id="ba-industries"
                type="text"
                readOnly
                placeholder={industryPlaceholder}
                onClick={handleOpenIndustryModal}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenIndustryModal();
                  }
                }}
                aria-haspopup="dialog"
                aria-label="Enter Industries"
              />
            </label>
          </div>

          {/* Centered Search Button matching reference HTML */}
          <button
            type="submit"
            id="ba-search-action"
            className="ba-search-btn"
          >
            <span>⌕</span>
            <span>Search</span>
          </button>
        </form>
      </section>

      {/* 1. Location Modal Dialog matching Reference HTML lines 5075-5190 */}
      {isLocationModalOpen && (
        <TagSelectionModal
          modalId="ba-location-modal"
          titleId="lm-location-title"
          title="Enter Locations"
          inputId="lm-query"
          placeholder="Enter states or cities"
          selectedItems={selectedLocations}
          getSuggestions={getLocationSuggestions}
          onAdd={handleAddLocation}
          onRemove={handleRemoveLocation}
          onClose={handleCloseLocationModal}
          onDone={handleLocationDone}
          footerStartContent={
            <label className="lm-save-label">
              <input
                type="checkbox"
                id="lm-save-locations"
                checked={saveLocations}
                onChange={(e) => setSaveLocations(e.target.checked)}
              />
              <span>Save Locations</span>
            </label>
          }
        />
      )}

      {/* 2. Industry Modal Dialog (Using the exact same popup method as Locations) */}
      {isIndustryModalOpen && (
        <TagSelectionModal
          modalId="ba-industry-modal"
          titleId="lm-industry-title"
          title="Enter Industries"
          inputId="lm-industry-query"
          placeholder="Enter industries"
          selectedItems={selectedIndustries}
          getSuggestions={getIndustrySuggestions}
          onAdd={handleAddIndustry}
          onRemove={handleRemoveIndustry}
          onClose={handleCloseIndustryModal}
          onDone={handleIndustryDone}
          footerStartContent={
            <label className="lm-save-label">
              <input
                type="checkbox"
                id="lm-save-industries"
                checked={saveIndustries}
                onChange={(e) => setSaveIndustries(e.target.checked)}
              />
              <span>Save Industries</span>
            </label>
          }
        />
      )}
    </div>
  );
}
