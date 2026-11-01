"use client";

import React, { useState } from "react";
import { BidderTopbar } from "../navigation/bidder-topbar";
import {
  SearchRequestsFilterForm,
  SearchFilterState,
} from "./search-requests-filter-form";
import { OpenProjectsTable } from "./open-projects-table";

interface BidderSearchViewProps {
  initialView?: "search" | "results";
}

export function BidderSearchView({ initialView = "search" }: BidderSearchViewProps) {
  const [viewState, setViewState] = useState<"search" | "results">(initialView);
  const [activeFilters, setActiveFilters] = useState<SearchFilterState>({
    locations: [],
    industry: "",
    country: "",
    state: "",
    zipCode: "",
    distance: "",
  });

  const handleExecuteSearch = (filters: SearchFilterState) => {
    setActiveFilters(filters);
    setViewState("results");
  };

  const handleBackToSearch = () => {
    setViewState("search");
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar userName="Mike A." avatarLetter="M" />

      {/* Main Brushed Silver Shell Canvas - standardized viewport margins */}
      <main className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 w-full flex flex-col min-h-0 overflow-hidden box-border">
        <div className="maximal-shell p-3 sm:p-4.5 w-full flex-1 flex flex-col min-h-0 overflow-y-auto shadow-lg">
          {viewState === "search" ? (
            <SearchRequestsFilterForm
              onSearch={handleExecuteSearch}
              initialFilters={activeFilters}
            />
          ) : (
            <OpenProjectsTable
              onBackToFilter={handleBackToSearch}
              initialFilters={activeFilters}
            />
          )}
        </div>
      </main>
    </div>
  );
}
