"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  Filter,
  Calendar,
  Eye,
  PlusCircle,
  X,
  RotateCcw,
  CheckCircle2,
  Building2,
  MapPin,
  CalendarDays,
  Users,
} from "lucide-react";
import { RequestorTopbar } from "../navigation/requestor-topbar";

export interface ActiveServiceRequestRecord {
  id: string;
  title: string;
  state: string;
  city: string;
  bidStartDate: string;
  bidEndDate: string;
  bidCount: number;
  status: "Active" | "Pending Review";
  industry?: string;
  description?: string;
}

const INITIAL_REQUESTS: ActiveServiceRequestRecord[] = [
  {
    id: "10001",
    title: "Norfolk Guard Services",
    state: "New Jersey",
    city: "Edison",
    bidStartDate: "05/10/2026",
    bidEndDate: "07/10/2026",
    bidCount: 11,
    status: "Active",
    industry: "Security Guard Services",
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
    status: "Active",
    industry: "Facility Management & Maintenance",
    description: "Preventative quarterly HVAC inspection and on-call facility repairs.",
  },
  {
    id: "10003",
    title: "Biotech Laboratory Access Control",
    state: "New York",
    city: "Manhattan",
    bidStartDate: "05/15/2026",
    bidEndDate: "08/01/2026",
    bidCount: 8,
    status: "Active",
    industry: "Access Control & Gate Automation",
    description: "Biometric security installation and badge reader maintenance.",
  },
  {
    id: "10004",
    title: "Maritime Cargo & Yard Patrol",
    state: "Pennsylvania",
    city: "Philadelphia",
    bidStartDate: "05/18/2026",
    bidEndDate: "08/05/2026",
    bidCount: 14,
    status: "Active",
    industry: "Logistics & Freight Supervision",
    description: "Port container yard supervision and freight escort services.",
  },
  {
    id: "10005",
    title: "Janitorial & Deep Sanitization",
    state: "Massachusetts",
    city: "Boston",
    bidStartDate: "05/20/2026",
    bidEndDate: "08/10/2026",
    bidCount: 6,
    status: "Active",
    industry: "Cleaning & Janitorial Services",
    description: "After-hours commercial office sanitization and green waste disposal.",
  },
  {
    id: "10006",
    title: "Armed Courier & Logistics Escort",
    state: "Virginia",
    city: "Norfolk",
    bidStartDate: "05/22/2026",
    bidEndDate: "08/15/2026",
    bidCount: 9,
    status: "Active",
    industry: "Security Guard Services",
    description: "High-value transit security and vault surveillance checks.",
  },
  {
    id: "10007",
    title: "Corporate Headquarters Front Desk",
    state: "New York",
    city: "White Plains",
    bidStartDate: "05/25/2026",
    bidEndDate: "08/20/2026",
    bidCount: 12,
    status: "Active",
    industry: "Commercial Facility Patrol",
    description: "Visitor screening, digital badging, and lobby concierge security.",
  },
];

type SortKey =
  | "id"
  | "title"
  | "state"
  | "city"
  | "bidStartDate"
  | "bidEndDate"
  | "bidCount";

export function ActiveServiceRequestsView() {
  const [requests] = useState<ActiveServiceRequestRecord[]>(INITIAL_REQUESTS);

  // Filters State
  const [filters, setFilters] = useState({
    id: "",
    title: "",
    state: "",
    city: "",
    bidStartDate: "",
    bidEndDate: "",
  });

  // Sorting State
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortAsc, setSortAsc] = useState<boolean>(true);


  const handleSort = (key: SortKey) => {
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
    });
  };

  const isFiltered = Object.values(filters).some((val) => val.trim() !== "");

  // Filtered and Sorted Records
  const filteredData = useMemo(() => {
    return requests.filter((item) => {
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
      return true;
    });
  }, [requests, filters]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === "number" && typeof valB === "number") {
        return sortAsc ? valA - valB : valB - valA;
      }

      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();

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
                <table className="w-full text-left border-collapse min-w-[860px]">
                  <thead className="maximal-thead">
                    <tr className="select-none">
                      {/* 1. Request ID */}
                      <th className="w-[125px]">
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
                      <th className="min-w-[200px]">
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
                      <th className="w-[140px]">
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
                      <th className="w-[140px]">
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
                      <th className="w-[145px]">
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
                      <th className="w-[145px]">
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
                      <th className="w-[105px] text-center">
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
                        {/* Empty filter slot for visual alignment */}
                        <div className="h-[25.27px]" />
                      </th>

                      {/* 8. Actions */}
                      <th className="actions-header w-[90px] text-center">
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
                            <Link
                              href={`/requestor/requests/${item.id}`}
                              scroll={true}
                              className="font-bold text-[#185a86] hover:underline cursor-pointer"
                              title={`View Request #${item.id}`}
                            >
                              {item.id}
                            </Link>
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
                            <span className="inline-flex items-center justify-center min-w-[28px] h-6 px-2 rounded-full font-bold text-xs bg-[#e8f7ee] text-[#117a3f] border border-[#a4e6be] shadow-xs">
                              {item.bidCount}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="text-center">
                            <div className="flex items-center justify-center">
                              <Link
                                href={`/requestor/requests/${item.id}`}
                                scroll={true}
                                className="maximal-btn-action-icon"
                                title="View Request Details & Proposals"
                                aria-label="View Request Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </td>
                        </tr>

                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={8}
                          className="py-12 text-center text-[#6e8594]"
                        >
                          <div className="max-w-xs mx-auto space-y-2">
                            <p className="font-semibold text-sm text-[#314a5b]">
                              No matching service requests found
                            </p>
                            <p className="text-xs text-[#6e8594]">
                              Try adjusting or clearing your search filters to find what you are looking for.
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
                  <strong className="text-[#1a384c]">{requests.length}</strong>{" "}
                  active service requests
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2ea858]" />
                  <span className="font-medium text-[#2d4e38]">
                    All tenders active and accepting bids
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

