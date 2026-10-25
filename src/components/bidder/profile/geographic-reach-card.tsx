"use client";

import React, { useState } from "react";
import { MapPin, X, Plus, Info } from "lucide-react";

interface GeographicReachCardProps {
  locations: string[];
  isEditing: boolean;
  onRemoveLocation: (loc: string) => void;
  onAddLocation: (loc: string) => void;
}

const COMMON_STATES = [
  "New Jersey",
  "New York",
  "California",
  "Texas",
  "Florida",
  "Pennsylvania",
  "Illinois",
  "Ohio",
  "Georgia",
  "Virginia",
  "Washington",
  "Massachusetts",
];

export function GeographicReachCard({
  locations,
  isEditing,
  onRemoveLocation,
  onAddLocation,
}: GeographicReachCardProps) {
  const [newLocation, setNewLocation] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);

  const handleAdd = () => {
    const trimmed = newLocation.trim();
    if (trimmed && !locations.includes(trimmed)) {
      onAddLocation(trimmed);
      setNewLocation("");
      setShowAddInput(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="maximal-card p-5 sm:p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#dce6ed] to-[#cad7df] border border-[#b8c9d4] flex items-center justify-center text-[#273d4c] shadow-xs">
          <MapPin className="w-4 h-4" />
        </div>
        <h2 className="text-base font-bold text-[#203440] tracking-tight">
          Geographic Reach
        </h2>
      </div>

      {/* Subtitle / Add Trigger */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#48606f]">
          Add Locations
        </span>

        {isEditing && !showAddInput && (
          <button
            type="button"
            onClick={() => setShowAddInput(true)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1e6189] hover:text-[#0b486c] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add State or City</span>
          </button>
        )}
      </div>

      {/* Optional Add Input when editing */}
      {isEditing && showAddInput && (
        <div className="flex items-center gap-2 mb-3 max-w-sm animate-in fade-in duration-150">
          <input
            type="text"
            placeholder="Type state or city name..."
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            className="maximal-input text-xs px-3 py-1.5 flex-1"
            autoFocus
          />
          <button
            type="button"
            onClick={handleAdd}
            className="px-3 py-1.5 rounded-lg maximal-btn-primary text-xs font-semibold cursor-pointer"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setShowAddInput(false)}
            className="px-2 py-1.5 text-xs text-[#6e8594] hover:text-[#253946] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Chips Container */}
      <div className="flex flex-wrap items-center gap-2 mb-4 min-h-[38px]">
        {locations.map((loc) => (
          <span
            key={loc}
            className="maximal-tag inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium transition-all group"
          >
            <span className="font-semibold text-[#223947]">{loc}</span>
            {isEditing ? (
              <button
                type="button"
                onClick={() => onRemoveLocation(loc)}
                className="w-4 h-4 rounded-full flex items-center justify-center text-[#5c7382] hover:text-[#9b2a2a] hover:bg-[#b0c4cf]/30 transition-colors cursor-pointer"
                title={`Remove ${loc}`}
              >
                <X className="w-3 h-3 stroke-[2.2]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onRemoveLocation(loc)}
                className="w-4 h-4 rounded-full flex items-center justify-center text-[#6e8492] hover:text-[#9b2a2a] hover:bg-[#b0c4cf]/30 transition-colors cursor-pointer"
                title={`Remove ${loc}`}
              >
                <X className="w-3 h-3 stroke-[2.2]" />
              </button>
            )}
          </span>
        ))}

        {locations.length === 0 && (
          <span className="text-xs text-[#8095a3] italic">
            No locations selected yet. Click Edit to add geographic coverage.
          </span>
        )}
      </div>

      {/* Information Note */}
      <div className="maximal-note rounded-xl p-3 flex items-start gap-2.5 text-xs leading-relaxed">
        <Info className="w-4 h-4 text-[#4f7085] flex-none mt-0.5" />
        <p className="text-[#4e6675]">
          Newly chosen cities you add nearby for this requisition will be favored on your directory and geographic reach.
        </p>
      </div>
    </div>
  );
}
