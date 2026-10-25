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
    country: "",
    state: "",
    zipCode: "",
    distance: "",
    industry: "",
  });

  const handleExecuteSearch = (filters: SearchFilterState) => {
    setActiveFilters(filters);
    setViewState("results");
  };

  const handleBackToSearch = () => {
    setViewState("search");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar userName="Mike A." avatarLetter="M" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1480px] w-full mx-auto">
        <div className="maximal-shell p-5 sm:p-7 lg:p-8">
          {viewState === "search" ? (
            <SearchRequestsFilterForm
              onSearch={handleExecuteSearch}
              initialFilters={activeFilters}
            />
          ) : (
            <OpenProjectsTable onBackToFilter={handleBackToSearch} />
          )}
        </div>
      </main>
    </div>
  );
}
