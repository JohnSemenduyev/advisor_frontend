"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  History,
  Filter,
  Calendar,
  Eye,
  Star,
  Check,
  RotateCcw,
  CheckCircle2,
  X,
  Building2,
  MapPin,
  CalendarDays,
  Users,
  Award,
} from "lucide-react";
import { RequestorTopbar } from "../navigation/requestor-topbar";
import { LeaveReviewModal } from "../dashboard/leave-review-modal";

export interface HistoryServiceRequestRecord {
  id: string;
  title: string;
  state: string;
  city: string;
  bidStartDate: string;
  bidEndDate: string;
  bidCount: number;
  selectedVendor: string;
  contractAmount?: string;
  rating?: number;
  reviewComment?: string;
  description?: string;
}

const INITIAL_HISTORY_RECORDS: HistoryServiceRequestRecord[] = [
  {
    id: "10001",
    title: "Norfolk Guard Services",
    state: "New Jersey",
    city: "Edison",
    bidStartDate: "05/10/2026",
    bidEndDate: "07/10/2026",
    bidCount: 11,
    selectedVendor: "Creative Logistics",
    contractAmount: "$48,500",
    rating: 5,
    reviewComment: "Outstanding security officer coverage and strict gate compliance.",
    description: "24/7 armed and unarmed patrol for commercial industrial complex.",
  },
  {
    id: "10002",
    title: "Commercial Maintenance & HVAC",
    state: "New Jersey",
    city: "Paramus",
    bidStartDate: "05/12/2026",
    bidEndDate: "07/15/2026",
    bidCount: 10,
    selectedVendor: "Apex Facility Solutions",
    contractAmount: "$32,000",
    rating: 4,
    reviewComment: "On-time maintenance response and thorough duct cleaning.",
    description: "Preventative quarterly HVAC inspection and on-call facility repairs.",
  },
  {
    id: "10003",
    title: "Guard Services",
    state: "New York",
    city: "Manhattan",
    bidStartDate: "04/01/2026",
    bidEndDate: "05/15/2026",
    bidCount: 11,
    selectedVendor: "Maximal Security Services",
    contractAmount: "$65,000",
    description: "High-rise executive protection, lobby screening, and visitor badge issuance.",
  },
  {
    id: "10004",
    title: "Maintenance",
    state: "Pennsylvania",
    city: "Philadelphia",
    bidStartDate: "03/15/2026",
    bidEndDate: "05/01/2026",
    bidCount: 10,
    selectedVendor: "Maximal Security Services",
    contractAmount: "$28,400",
    rating: 5,
    reviewComment: "Fast service response and excellent communication across all shifts.",
    description: "Multi-facility access repair, overhead door servicing, and gate motor maintenance.",
  },
  {
    id: "10005",
    title: "Janitorial & Deep Sanitization",
    state: "Massachusetts",
    city: "Boston",
    bidStartDate: "02/10/2026",
    bidEndDate: "03/25/2026",
    bidCount: 8,
    selectedVendor: "CleanPro Commercial",
    contractAmount: "$19,800",
    description: "After-hours deep cleaning, medical-grade sanitization, and green waste recycling.",
  },
  {
    id: "10006",
    title: "Armed Courier & Logistics Escort",
    state: "Virginia",
    city: "Norfolk",
    bidStartDate: "01/15/2026",
    bidEndDate: "03/01/2026",
    bidCount: 14,
    selectedVendor: "Vanguard Armored Transit",
    contractAmount: "$54,200",
    rating: 5,
    reviewComment: "Impeccable timing and high-security protocol adherence during harbor transshipment.",
    description: "Armed escort for high-value container cargo transit between seaport and regional fulfillment center.",
  },
  {
    id: "10007",
    title: "Biotech Laboratory Access Control",
    state: "New York",
    city: "White Plains",
    bidStartDate: "01/05/2026",
    bidEndDate: "02/20/2026",
    bidCount: 9,
    selectedVendor: "SafeGuard Access Inc.",
    contractAmount: "$41,000",
    rating: 5,
    reviewComment: "Seamless biometric scanner deployment and zero disruption to daily lab operations.",
    description: "Multi-factor authentication turnstiles and cleanroom airlock security interlocks.",
  },
];

type HistorySortKey =
  | "id"
  | "title"
  | "state"
  | "city"
  | "bidStartDate"
  | "bidEndDate"
  | "bidCount"
  | "selectedVendor"
  | "rating";

export function ServiceRequestHistoryView() {
  const [records, setRecords] = useState<HistoryServiceRequestRecord[]>(
    INITIAL_HISTORY_RECORDS
  );

  // Filters State
  const [filters, setFilters] = useState({
    id: "",
    title: "",
    state: "",
    city: "",
    bidStartDate: "",
    bidEndDate: "",
    selectedVendor: "",
  });

  // Sorting State
  const [sortKey, setSortKey] = useState<HistorySortKey>("id");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // Modal States
  const [selectedReviewRecord, setSelectedReviewRecord] =
    useState<HistoryServiceRequestRecord | null>(null);
  const [selectedDetailRecord, setSelectedDetailRecord] =
    useState<HistoryServiceRequestRecord | null>(null);

  const handleSort = (key: HistorySortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      id: "",
      title: "",
      state: "",
      city: "",
      bidStartDate: "",
      bidEndDate: "",
      selectedVendor: "",
    });
  };

  const isFiltered = Object.values(filters).some((val) => val.trim() !== "");

  // Review Submitted Handler
  const handleReviewSubmitted = (
    requestId: string,
    rating: number,
    comment: string
  ) => {
    setRecords((prev) =>
      prev.map((item) =>
        item.id === requestId
          ? { ...item, rating, reviewComment: comment }
          : item
      )
    );
    setSelectedReviewRecord(null);
  };

  // Filtered and Sorted Records
  const filteredData = useMemo(() => {
    return records.filter((item) => {
      if (
        filters.id &&
        !item.id.toLowerCase().includes(filters.id.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        filters.title &&
        !item.title.toLowerCase().includes(filters.title.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        filters.state &&
        !item.state.toLowerCase().includes(filters.state.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        filters.city &&
        !item.city.toLowerCase().includes(filters.city.trim().toLowerCase())
      ) {
        return false;
      }
      if (
        filters.bidStartDate &&
        !item.bidStartDate.includes(filters.bidStartDate.trim())
      ) {
        return false;
      }
      if (
        filters.bidEndDate &&
        !item.bidEndDate.includes(filters.bidEndDate.trim())
      ) {
        return false;
      }
      if (
        filters.selectedVendor &&
        !item.selectedVendor
          .toLowerCase()
          .includes(filters.selectedVendor.trim().toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [records, filters]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortAsc ? valA - valB : valB - valA;
      }

      const strA = String(valA || "").toLowerCase();
      const strB = String(valB || "").toLowerCase();

      if (strA < strB) return sortAsc ? -1 : 1;
      if (strA > strB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortAsc]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs */}
      <RequestorTopbar userName="John Semenduyev" avatarLetter="J" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 px-3 sm:px-4 py-4 w-full">
        <div className="maximal-shell p-3 sm:p-5 w-full space-y-5">


          {/* Table Container Card */}
          <section className="profile-panel !p-0 overflow-hidden shadow-md">
            <div className="maximal-tablewrap border-0 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[960px]">
                  <thead className="maximal-thead">
                    <tr className="select-none">
                      {/* 1. Request ID */}
                      <th className="w-[115px]">
                        <div className="th-title">
                          <span>Request ID</span>
                          <button
                            type="button"
                            onClick={() => handleSort("id")}
                            className="sort"
                            title="Sort by Request ID"
                          >
                            {sortKey === "id" ? (sortAsc ? "↑" : "↓") : "⇅"}
                          </button>
                        </div>
                        <div className="filter-wrap no-icon relative">
                          <input
                            type="text"
                            placeholder="Search by ID..."
                            aria-label="Filter by Request ID"
                            value={filters.id}
                            onChange={(e) =>
                              handleFilterChange("id", e.target.value)
                            }
                            className="!pl-2 !pr-7"
                          />
                          <Filter className="w-3 h-3 text-[#7b92a1] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </th>

                      {/* 2. Request Title */}
                      <th className="min-w-[180px]">
                        <div className="th-title">
                          <span>Request Title</span>
                          <button
                            type="button"
                            onClick={() => handleSort("title")}
                            className="sort"
                            title="Sort by Request Title"
                          >
                            {sortKey === "title" ? (sortAsc ? "↑" : "↓") : "⇅"}
                          </button>
                        </div>
                        <div className="filter-wrap no-icon relative">
                          <input
                            type="text"
                            placeholder="Search by title..."
                            aria-label="Filter by Request Title"
                            value={filters.title}
                            onChange={(e) =>
                              handleFilterChange("title", e.target.value)
                            }
                            className="!pl-2 !pr-7"
                          />
                          <Filter className="w-3 h-3 text-[#7b92a1] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </th>

                      {/* 3. State */}
                      <th className="w-[125px]">
                        <div className="th-title">
                          <span>State</span>
                          <button
                            type="button"
                            onClick={() => handleSort("state")}
                            className="sort"
                            title="Sort by State"
                          >
                            {sortKey === "state" ? (sortAsc ? "↑" : "↓") : "⇅"}
                          </button>
                        </div>
                        <div className="filter-wrap no-icon relative">
                          <input
                            type="text"
                            placeholder="Search by state..."
                            aria-label="Filter by State"
                            value={filters.state}
                            onChange={(e) =>
                              handleFilterChange("state", e.target.value)
                            }
                            className="!pl-2 !pr-7"
                          />
                          <Filter className="w-3 h-3 text-[#7b92a1] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </th>

                      {/* 4. City */}
                      <th className="w-[125px]">
                        <div className="th-title">
                          <span>City</span>
                          <button
                            type="button"
                            onClick={() => handleSort("city")}
                            className="sort"
                            title="Sort by City"
                          >
                            {sortKey === "city" ? (sortAsc ? "↑" : "↓") : "⇅"}
                          </button>
                        </div>
                        <div className="filter-wrap no-icon relative">
                          <input
                            type="text"
                            placeholder="Search by city..."
                            aria-label="Filter by City"
                            value={filters.city}
                            onChange={(e) =>
                              handleFilterChange("city", e.target.value)
                            }
                            className="!pl-2 !pr-7"
                          />
                          <Filter className="w-3 h-3 text-[#7b92a1] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </th>

                      {/* 5. Bid Start Date */}
                      <th className="w-[130px]">
                        <div className="th-title">
                          <span>Bid Start Date</span>
                          <button
                            type="button"
                            onClick={() => handleSort("bidStartDate")}
                            className="sort"
                            title="Sort by Bid Start Date"
                          >
                            {sortKey === "bidStartDate"
                              ? sortAsc
                                ? "↑"
                                : "↓"
                              : "⇅"}
                          </button>
                        </div>
                        <div className="filter-wrap no-icon relative">
                          <input
                            type="text"
                            placeholder="Select date..."
                            aria-label="Filter by Bid Start Date"
                            value={filters.bidStartDate}
                            onChange={(e) =>
                              handleFilterChange("bidStartDate", e.target.value)
                            }
                            className="!pl-2 !pr-7 font-mono text-[11px]"
                          />
                          <Calendar className="w-3 h-3 text-[#7b92a1] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </th>

                      {/* 6. Bid End Date */}
                      <th className="w-[130px]">
                        <div className="th-title">
                          <span>Bid End Date</span>
                          <button
                            type="button"
                            onClick={() => handleSort("bidEndDate")}
                            className="sort"
                            title="Sort by Bid End Date"
                          >
                            {sortKey === "bidEndDate"
                              ? sortAsc
                                ? "↑"
                                : "↓"
                              : "⇅"}
                          </button>
                        </div>
                        <div className="filter-wrap no-icon relative">
                          <input
                            type="text"
                            placeholder="Select date..."
                            aria-label="Filter by Bid End Date"
                            value={filters.bidEndDate}
                            onChange={(e) =>
                              handleFilterChange("bidEndDate", e.target.value)
                            }
                            className="!pl-2 !pr-7 font-mono text-[11px]"
                          />
                          <Calendar className="w-3 h-3 text-[#7b92a1] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </th>

                      {/* 7. Bid Count */}
                      <th className="w-[95px] text-center">
                        <div className="th-title justify-center">
                          <span>Bid Count</span>
                          <button
                            type="button"
                            onClick={() => handleSort("bidCount")}
                            className="sort"
                            title="Sort by Bid Count"
                          >
                            {sortKey === "bidCount"
                              ? sortAsc
                                ? "↑"
                                : "↓"
                              : "⇅"}
                          </button>
                        </div>
                        <div className="h-[25.27px]" />
                      </th>

                      {/* 8. Selected Vendor */}
                      <th className="min-w-[175px]">
                        <div className="th-title">
                          <span>Selected Vendor</span>
                          <button
                            type="button"
                            onClick={() => handleSort("selectedVendor")}
                            className="sort"
                            title="Sort by Selected Vendor"
                          >
                            {sortKey === "selectedVendor"
                              ? sortAsc
                                ? "↑"
                                : "↓"
                              : "⇅"}
                          </button>
                        </div>
                        <div className="filter-wrap no-icon relative">
                          <input
                            type="text"
                            placeholder="Search by vendor..."
                            aria-label="Filter by Selected Vendor"
                            value={filters.selectedVendor}
                            onChange={(e) =>
                              handleFilterChange("selectedVendor", e.target.value)
                            }
                            className="!pl-2 !pr-7"
                          />
                          <Filter className="w-3 h-3 text-[#7b92a1] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </th>

                      {/* 9. Leave Review / Rating */}
                      <th className="w-[145px] text-center">
                        <div className="th-title justify-center">
                          <span>Leave Review</span>
                        </div>
                        <div className="h-[25.27px]" />
                      </th>

                      {/* 10. Actions */}
                      <th className="actions-header w-[80px] text-center">
                        <div className="th-title justify-center">
                          <span>Actions</span>
                        </div>
                        <div className="h-[25.27px]" />
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedData.length > 0 ? (
                      sortedData.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-[#ebf3f7] transition-colors"
                        >
                          {/* Request ID (Clickable Link) */}
                          <td>
                            <button
                              type="button"
                              onClick={() => setSelectedDetailRecord(item)}
                              className="font-bold text-[#185a86] hover:underline cursor-pointer"
                              title={`View Tender #${item.id}`}
                            >
                              {item.id}
                            </button>
                          </td>

                          {/* Request Title */}
                          <td className="font-semibold text-[#1e3444]">
                            {item.title}
                          </td>

                          {/* State */}
                          <td className="text-[#324b5c]">{item.state}</td>

                          {/* City */}
                          <td className="text-[#324b5c]">{item.city}</td>

                          {/* Bid Start Date */}
                          <td className="font-mono text-xs text-[#405969]">
                            {item.bidStartDate}
                          </td>

                          {/* Bid End Date */}
                          <td className="font-mono text-xs text-[#405969]">
                            {item.bidEndDate}
                          </td>

                          {/* Bid Count */}
                          <td className="text-center">
                            <span className="inline-flex items-center justify-center min-w-[26px] h-6 px-1.5 rounded-full font-bold text-xs bg-[#e8f7ee] text-[#117a3f] border border-[#a4e6be] shadow-xs">
                              {item.bidCount}
                            </span>
                          </td>

                          {/* Selected Vendor */}
                          <td className="font-medium text-[#112d40]">
                            {item.selectedVendor}
                          </td>

                          {/* Leave Review / Stars */}
                          <td className="text-center">
                            {item.rating ? (
                              <div
                                className="flex items-center justify-center gap-1"
                                title={item.reviewComment || `${item.rating} Stars`}
                              >
                                <div className="flex text-[#f59e0b]">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3.5 h-3.5 ${
                                        i < (item.rating || 0)
                                          ? "fill-[#f59e0b] text-[#f59e0b]"
                                          : "text-[#d1d5db]"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-[11px] font-bold text-[#166534] flex items-center ml-0.5">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-1.5">
                                <div className="flex text-[#cbd5e1]">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} className="w-3 h-3" />
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setSelectedReviewRecord(item)}
                                  className="maximal-btn-secondary px-2.5 py-0.5 text-xs font-semibold cursor-pointer"
                                >
                                  Review
                                </button>
                              </div>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="text-center">
                            <div className="flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => setSelectedDetailRecord(item)}
                                className="maximal-btn-action-icon"
                                title="View Contract Details & Scope"
                                aria-label="View Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={10}
                          className="py-12 text-center text-[#6e8594]"
                        >
                          <div className="max-w-xs mx-auto space-y-2">
                            <p className="font-semibold text-sm text-[#314a5b]">
                              No matching historical requests found
                            </p>
                            <p className="text-xs text-[#6e8594]">
                              Adjust or clear your search filters to view archived records.
                            </p>
                            {isFiltered && (
                              <button
                                type="button"
                                onClick={handleResetFilters}
                                className="maximal-btn-secondary mt-2 px-3 py-1.5 text-xs font-semibold"
                              >
                                Clear All Filters
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Summary */}
              <div className="px-4 py-3 bg-[#e8eef1] border-t border-[#c6d3dc] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#526a79]">
                <span>
                  Showing{" "}
                  <strong className="text-[#1a384c]">
                    {sortedData.length}
                  </strong>{" "}
                  of{" "}
                  <strong className="text-[#1a384c]">{records.length}</strong>{" "}
                  archived service tenders
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#185a86]" />
                  <span className="font-medium text-[#2d4354]">
                    Historical records permanently stored & contracted
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Review Modal Dialog */}
      {selectedReviewRecord && (
        <LeaveReviewModal
          isOpen={true}
          onClose={() => setSelectedReviewRecord(null)}
          requestId={selectedReviewRecord.id}
          providerName={selectedReviewRecord.selectedVendor}
          onReviewSubmitted={handleReviewSubmitted}
        />
      )}

      {/* Quick Contract Details Modal */}
      {selectedDetailRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-lg p-6 sm:p-7 rounded-2xl border border-white shadow-2xl relative text-left space-y-4">
            <button
              onClick={() => setSelectedDetailRecord(null)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86]">
                <History className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#185a86] uppercase tracking-wider">
                  Contract Archive #{selectedDetailRecord.id}
                </span>
                <h3 className="text-xl font-bold text-[#1a4463] leading-snug">
                  {selectedDetailRecord.title}
                </h3>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 py-2 text-xs">
              <div className="p-3 rounded-xl bg-[#ffffff] border border-[#d2dde3]">
                <span className="text-[#647f90] block mb-0.5">Location</span>
                <span className="font-bold text-[#1a3b50] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#185a86]" />
                  {selectedDetailRecord.city}, {selectedDetailRecord.state}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#ffffff] border border-[#d2dde3]">
                <span className="text-[#647f90] block mb-0.5">Awarded Vendor</span>
                <span className="font-bold text-[#1a3b50] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#185a86]" />
                  {selectedDetailRecord.selectedVendor}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#ffffff] border border-[#d2dde3]">
                <span className="text-[#647f90] block mb-0.5">Contract Value</span>
                <span className="font-bold text-[#117a3f] flex items-center gap-1 font-mono">
                  {selectedDetailRecord.contractAmount || "$45,000"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#ffffff] border border-[#d2dde3]">
                <span className="text-[#647f90] block mb-0.5">Tender Bids</span>
                <span className="font-bold text-[#1a3b50] flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#185a86]" />
                  {selectedDetailRecord.bidCount} Bids Received
                </span>
              </div>
            </div>

            {/* Scope */}
            <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#f8fafb] to-[#f0f4f7] border border-[#d4e0e7] text-xs text-[#314a5b]">
              <span className="font-bold block text-[#1e3b4e] mb-1">
                Completed Scope of Work:
              </span>
              <p className="leading-relaxed">
                {selectedDetailRecord.description ||
                  "Contracted deliverables fulfilled according to specifications."}
              </p>
            </div>

            {/* Rating / Review if present */}
            {selectedDetailRecord.rating && (
              <div className="p-3 rounded-xl bg-[#f0f9f3] border border-[#c3ead2] text-xs">
                <span className="font-bold text-[#14703a] block mb-1">
                  Vendor Review on Record:
                </span>
                <div className="flex text-[#f59e0b] mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (selectedDetailRecord.rating || 0)
                          ? "fill-[#f59e0b] text-[#f59e0b]"
                          : "text-[#d1d5db]"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[#1e442c] italic">
                  "{selectedDetailRecord.reviewComment}"
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedDetailRecord(null)}
                className="maximal-btn-secondary px-4 py-2 text-xs font-semibold"
              >
                Close Archive
              </button>
              {!selectedDetailRecord.rating && (
                <button
                  type="button"
                  onClick={() => {
                    const rec = selectedDetailRecord;
                    setSelectedDetailRecord(null);
                    setSelectedReviewRecord(rec);
                  }}
                  className="maximal-btn-primary px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5" />
                  <span>Leave Review</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
