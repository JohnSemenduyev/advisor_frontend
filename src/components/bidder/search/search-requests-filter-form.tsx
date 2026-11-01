"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

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

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
  "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
  "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const STATE_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
  "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT",
  "VA", "WA", "WV", "WI", "WY"
];

const POPULAR_CITIES = [
  "Edison, NJ", "Newark, NJ", "Jersey City, NJ", "New Brunswick, NJ", "Trenton, NJ", "Princeton, NJ",
  "Elizabeth, NJ", "Paterson, NJ", "Woodbridge, NJ", "Freehold, NJ", "New York, NY", "Albany, NY",
  "Buffalo, NY", "Rochester, NY", "Yonkers, NY", "Brooklyn, NY", "Queens, NY", "Philadelphia, PA",
  "Pittsburgh, PA", "Allentown, PA", "Harrisburg, PA", "Los Angeles, CA", "San Francisco, CA",
  "San Diego, CA", "Sacramento, CA", "San Jose, CA", "Chicago, IL", "Springfield, IL", "Houston, TX",
  "Dallas, TX", "Austin, TX", "San Antonio, TX", "Miami, FL", "Orlando, FL", "Tampa, FL",
  "Jacksonville, FL", "Boston, MA", "Cambridge, MA", "Washington, DC", "Seattle, WA", "Portland, OR",
  "Atlanta, GA", "Savannah, GA", "Norfolk, VA", "Virginia Beach, VA", "Richmond, VA", "Charlotte, NC",
  "Raleigh, NC", "Denver, CO", "Phoenix, AZ", "Las Vegas, NV", "Nashville, TN", "Detroit, MI",
  "Minneapolis, MN", "New Orleans, LA"
];

const COMMON_INDUSTRIES = [
  "Security Guard Services",
  "Commercial Facility Patrol 24/7",
  "Access Control & Gate Automation",
  "CCTV & Video Surveillance",
  "Alarm & Detection Systems",
  "Facility Management & Maintenance",
  "Cleaning & Janitorial Services",
  "Logistics & Freight Supervision",
  "Warehouse & Distribution Security",
  "Armed & Executive Protection",
  "Biotech & Laboratory Security",
  "Construction Site Security",
  "Cybersecurity & IT Infrastructure",
  "Maritime Security & Cargo Escort",
  "Event Security & Crowd Control",
  "Healthcare & Hospital Safety",
  "Fire Protection & Life Safety",
  "HVAC & Mechanical Maintenance",
  "Landscaping & Groundskeeping",
  "Waste Management & Recycling",
  "Accounting & Financial Advisory",
  "Legal & Compliance Services"
];

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
  const [locationQuery, setLocationQuery] = useState("");
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const locationModalInputRef = useRef<HTMLInputElement>(null);
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
  const [industryQuery, setIndustryQuery] = useState("");
  const [activeIndustryIndex, setActiveIndustryIndex] = useState(0);
  const industryModalInputRef = useRef<HTMLInputElement>(null);
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

  // Focus modal inputs on open
  useEffect(() => {
    if (isLocationModalOpen) {
      setLocationQuery("");
      setActiveLocationIndex(0);
      setTimeout(() => {
        locationModalInputRef.current?.focus();
      }, 50);
    }
  }, [isLocationModalOpen]);

  useEffect(() => {
    if (isIndustryModalOpen) {
      setIndustryQuery("");
      setActiveIndustryIndex(0);
      setTimeout(() => {
        industryModalInputRef.current?.focus();
      }, 50);
    }
  }, [isIndustryModalOpen]);

  // Location suggestions computation
  const locationSuggestions = useMemo(() => {
    const q = locationQuery.trim().toLowerCase();
    if (!q) return [];

    const matchedStates = US_STATES.filter((stateName, idx) => {
      if (selectedLocations.includes(stateName)) return false;
      return (
        stateName.toLowerCase().includes(q) ||
        STATE_CODES[idx].toLowerCase().startsWith(q)
      );
    });

    const matchedCities = POPULAR_CITIES.filter((city) => {
      if (selectedLocations.includes(city)) return false;
      return city.toLowerCase().includes(q);
    });

    const merged = Array.from(new Set([...matchedStates, ...matchedCities]));
    return merged.slice(0, 12);
  }, [locationQuery, selectedLocations]);

  // Industry suggestions computation
  const industrySuggestions = useMemo(() => {
    const q = industryQuery.trim().toLowerCase();
    if (!q) {
      return COMMON_INDUSTRIES.filter((ind) => !selectedIndustries.includes(ind)).slice(0, 10);
    }

    const matched = COMMON_INDUSTRIES.filter((ind) => {
      if (selectedIndustries.includes(ind)) return false;
      return ind.toLowerCase().includes(q);
    });

    const custom = industryQuery.trim();
    if (
      custom &&
      !matched.some((m) => m.toLowerCase() === custom.toLowerCase()) &&
      !selectedIndustries.some((s) => s.toLowerCase() === custom.toLowerCase())
    ) {
      return [custom, ...matched].slice(0, 12);
    }

    return matched.slice(0, 12);
  }, [industryQuery, selectedIndustries]);

  // Location Handlers
  const handleOpenLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  const handleCloseLocationModal = () => {
    setIsLocationModalOpen(false);
    locationTriggerInputRef.current?.focus();
  };

  const handleAddLocation = (loc: string) => {
    if (!selectedLocations.includes(loc)) {
      setSelectedLocations((prev) => [...prev, loc]);
    }
    setLocationQuery("");
    setActiveLocationIndex(0);
    locationModalInputRef.current?.focus();
  };

  const handleRemoveLocation = (loc: string) => {
    setSelectedLocations((prev) => prev.filter((item) => item !== loc));
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && locationSuggestions.length > 0) {
      e.preventDefault();
      handleAddLocation(locationSuggestions[activeLocationIndex] || locationSuggestions[0]);
    } else if (e.key === "ArrowDown" && locationSuggestions.length > 0) {
      e.preventDefault();
      setActiveLocationIndex((prev) => (prev + 1) % locationSuggestions.length);
    } else if (e.key === "ArrowUp" && locationSuggestions.length > 0) {
      e.preventDefault();
      setActiveLocationIndex((prev) => (prev - 1 + locationSuggestions.length) % locationSuggestions.length);
    } else if (e.key === "Escape") {
      handleCloseLocationModal();
    }
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
    if (!selectedIndustries.includes(ind)) {
      setSelectedIndustries((prev) => [...prev, ind]);
    }
    setIndustryQuery("");
    setActiveIndustryIndex(0);
    industryModalInputRef.current?.focus();
  };

  const handleRemoveIndustry = (ind: string) => {
    setSelectedIndustries((prev) => prev.filter((item) => item !== ind));
  };

  const handleIndustryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && industrySuggestions.length > 0) {
      e.preventDefault();
      handleAddIndustry(industrySuggestions[activeIndustryIndex] || industrySuggestions[0]);
    } else if (e.key === "ArrowDown" && industrySuggestions.length > 0) {
      e.preventDefault();
      setActiveIndustryIndex((prev) => (prev + 1) % industrySuggestions.length);
    } else if (e.key === "ArrowUp" && industrySuggestions.length > 0) {
      e.preventDefault();
      setActiveIndustryIndex((prev) => (prev - 1 + industrySuggestions.length) % industrySuggestions.length);
    } else if (e.key === "Escape") {
      handleCloseIndustryModal();
    }
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
        <div className="inline-block relative w-[310px] sm:w-[410px] h-[80px] sm:h-[102px] mx-auto">
          <Image
            src="/images/business-adviser-logo.png"
            alt="BusinessAdviser Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
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
        <div
          id="ba-location-modal"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleCloseLocationModal();
          }}
        >
          <div
            className="lm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lm-location-title"
          >
            {/* Header: Title and Close button */}
            <div className="lm-head">
              <span id="lm-location-title" className="lm-label">
                Enter Locations
              </span>
              <button
                type="button"
                className="lm-close"
                onClick={handleCloseLocationModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Modal Search Input */}
            <input
              ref={locationModalInputRef}
              id="lm-query"
              className="lm-input"
              type="text"
              autoComplete="off"
              placeholder="Enter states or cities"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onKeyDown={handleLocationKeyDown}
            />

            {/* Autocomplete Suggestions Dropdown */}
            {locationSuggestions.length > 0 && (
              <div className="lm-results">
                {locationSuggestions.map((item, idx) => (
                  <button
                    key={item}
                    type="button"
                    className={idx === activeLocationIndex ? "active" : ""}
                    onClick={() => handleAddLocation(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {/* Selected Location Chips Container */}
            <div className="lm-chips">
              {selectedLocations.map((loc) => (
                <span key={loc} className="lm-chip">
                  <span>{loc}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLocation(loc)}
                    aria-label={`Remove ${loc}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Modal Footer with Save Locations Checkbox and Done Button */}
            <div className="lm-footer">
              <label className="lm-save-label">
                <input
                  type="checkbox"
                  id="lm-save-locations"
                  checked={saveLocations}
                  onChange={(e) => setSaveLocations(e.target.checked)}
                />
                <span>Save Locations</span>
              </label>
              <button
                type="button"
                className="lm-done"
                onClick={handleLocationDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Industry Modal Dialog (Using the exact same popup method as Locations) */}
      {isIndustryModalOpen && (
        <div
          id="ba-industry-modal"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) handleCloseIndustryModal();
          }}
        >
          <div
            className="lm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lm-industry-title"
          >
            {/* Header: Title and Close button */}
            <div className="lm-head">
              <span id="lm-industry-title" className="lm-label">
                Enter Industries
              </span>
              <button
                type="button"
                className="lm-close"
                onClick={handleCloseIndustryModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Modal Search Input */}
            <input
              ref={industryModalInputRef}
              id="lm-industry-query"
              className="lm-input"
              type="text"
              autoComplete="off"
              placeholder="Enter industries"
              value={industryQuery}
              onChange={(e) => setIndustryQuery(e.target.value)}
              onKeyDown={handleIndustryKeyDown}
            />

            {/* Autocomplete Suggestions Dropdown */}
            {industrySuggestions.length > 0 && (
              <div className="lm-results">
                {industrySuggestions.map((item, idx) => (
                  <button
                    key={item}
                    type="button"
                    className={idx === activeIndustryIndex ? "active" : ""}
                    onClick={() => handleAddIndustry(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}

            {/* Selected Industry Chips Container */}
            <div className="lm-chips">
              {selectedIndustries.map((ind) => (
                <span key={ind} className="lm-chip">
                  <span>{ind}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveIndustry(ind)}
                    aria-label={`Remove ${ind}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Modal Footer with Save Industries Checkbox and Done Button */}
            <div className="lm-footer">
              <label className="lm-save-label">
                <input
                  type="checkbox"
                  id="lm-save-industries"
                  checked={saveIndustries}
                  onChange={(e) => setSaveIndustries(e.target.checked)}
                />
                <span>Save Industries</span>
              </label>
              <button
                type="button"
                className="lm-done"
                onClick={handleIndustryDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
