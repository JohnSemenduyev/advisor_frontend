"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  FileSearch,
  ArrowUpDown,
  Filter,
  Calendar,
  Gavel,
  Mail,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
  X,
  Send,
  CheckCircle2,
  Flag,
} from "lucide-react";

export interface ProjectRecord {
  id: string;
  companyName: string;
  requestTitle: string;
  state: string;
  city: string;
  bidStartDate: string;
  bidEndDate: string;
  budgetEstimate?: string;
  description?: string;
}

const SEED_PROJECTS: ProjectRecord[] = [
  {
    id: "10001",
    companyName: "Creative Logistics",
    requestTitle: "Norfolk Guard Services",
    state: "New Jersey",
    city: "Edison",
    bidStartDate: "05/10/2026",
    bidEndDate: "07/10/2026",
    budgetEstimate: "$45,000 - $60,000",
    description: "Multi-point perimeter patrol and entry point access supervision for commercial fulfillment facility in Edison.",
  },
  {
    id: "10002",
    companyName: "Pinnacle Security Solutions",
    requestTitle: "Access Control & Gate Automation",
    state: "New York",
    city: "Buffalo",
    bidStartDate: "05/18/2026",
    bidEndDate: "07/25/2026",
    budgetEstimate: "$80,000 - $110,000",
    description: "Installation and turnkey integration of biometric vehicle gates and optical turnstiles.",
  },
  {
    id: "10003",
    companyName: "Apex Metro Infrastructure",
    requestTitle: "Commercial Facility Patrol 24/7",
    state: "Texas",
    city: "Dallas",
    bidStartDate: "06/01/2026",
    bidEndDate: "08/15/2026",
    budgetEstimate: "$120,000 - $150,000",
    description: "Round-the-clock unarmed security personnel for four industrial distribution warehouses.",
  },
  {
    id: "10004",
    companyName: "Vanguard Defense & Surveillance",
    requestTitle: "Perimeter CCTV System Overhaul",
    state: "California",
    city: "San Jose",
    bidStartDate: "06/10/2026",
    bidEndDate: "08/30/2026",
    budgetEstimate: "$65,000 - $85,000",
    description: "High-definition thermal camera arrays with AI intrusion tracking along campus perimeter.",
  },
  {
    id: "10005",
    companyName: "Keystone Property Logistics",
    requestTitle: "Warehouse Armed Guard Services",
    state: "Pennsylvania",
    city: "Philadelphia",
    bidStartDate: "06/15/2026",
    bidEndDate: "09/01/2026",
    budgetEstimate: "$95,000 - $130,000",
    description: "Licensed armed response team for high-value logistics inventory transfer depot.",
  },
  {
    id: "10006",
    companyName: "Tri-State Retail Network",
    requestTitle: "Loss Prevention Specialist Team",
    state: "New Jersey",
    city: "Newark",
    bidStartDate: "06/20/2026",
    bidEndDate: "09/10/2026",
    budgetEstimate: "$50,000 - $70,000",
    description: "Plainclothes asset protection and inventory shrinkage control across regional retail centers.",
  },
  {
    id: "10007",
    companyName: "Harbor Point Logistics",
    requestTitle: "Maritime Security & Cargo Escort",
    state: "Virginia",
    city: "Norfolk",
    bidStartDate: "07/01/2026",
    bidEndDate: "09/20/2026",
    budgetEstimate: "$140,000 - $180,000",
    description: "TWIC-credentialed security personnel for container freight inspection and bonded escort.",
  },
];

interface OpenProjectsTableProps {
  onBackToFilter?: () => void;
}

export function OpenProjectsTable({ onBackToFilter }: OpenProjectsTableProps) {
  // Sort state
  const [sortKey, setSortKey] = useState<keyof ProjectRecord>("id");
  const [sortAsc, setSortAsc] = useState(true);

  // Column search filters
  const [filters, setFilters] = useState({
    id: "",
    companyName: "",
    requestTitle: "",
    state: "",
    city: "",
    bidStartDate: "",
    bidEndDate: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Active Modals
  const [selectedBidProject, setSelectedBidProject] = useState<ProjectRecord | null>(null);
  const [selectedContactProject, setSelectedContactProject] = useState<ProjectRecord | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidNote, setBidNote] = useState("");
  const [bidSubmitted, setBidSubmitted] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [contactSent, setContactSent] = useState(false);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleSort = (key: keyof ProjectRecord) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  // Filtered and Sorted Data
  const filteredData = useMemo(() => {
    return SEED_PROJECTS.filter((item) => {
      if (filters.id && !item.id.toLowerCase().includes(filters.id.toLowerCase())) return false;
      if (filters.companyName && !item.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) return false;
      if (filters.requestTitle && !item.requestTitle.toLowerCase().includes(filters.requestTitle.toLowerCase())) return false;
      if (filters.state && !item.state.toLowerCase().includes(filters.state.toLowerCase())) return false;
      if (filters.city && !item.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
      if (filters.bidStartDate && !item.bidStartDate.includes(filters.bidStartDate)) return false;
      if (filters.bidEndDate && !item.bidEndDate.includes(filters.bidEndDate)) return false;
      return true;
    }).sort((a, b) => {
      const valA = (a[sortKey] || "").toLowerCase();
      const valB = (b[sortKey] || "").toLowerCase();
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filters, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleMakeBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBidSubmitted(true);
    setTimeout(() => {
      setBidSubmitted(false);
      setSelectedBidProject(null);
      setBidAmount("");
      setBidNote("");
    }, 1800);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setSelectedContactProject(null);
      setContactMessage("");
    }, 1800);
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">
      {/* Top Header: Open Projects and action back to filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#e4f2f8] to-[#c7e0ed] border border-[#b4d2e3] flex items-center justify-center text-[#185a86] flex-none shadow-xs">
            <FileSearch className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a4463] tracking-tight">
              Open Projects
            </h1>
            <p className="text-xs sm:text-sm text-[#5d7c8e] mt-0.5">
              Browse and bid on available projects. Find the right opportunities for your business.
            </p>
          </div>
        </div>

        {onBackToFilter && (
          <button
            type="button"
            onClick={onBackToFilter}
            className="maximal-btn-secondary inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Modify Search Filters</span>
          </button>
        )}
      </div>

      {/* Maximal Elevated Table Wrap matching Image 2 */}
      <div className="maximal-tablewrap shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1050px]">
            {/* Single Integrated Header Row matching Reference */}
            <thead className="maximal-thead">
              <tr className="select-none">
                {/* Request ID */}
                <th className="w-[105px]">
                  <div className="th-title">
                    <span>Request ID</span>
                    <button
                      type="button"
                      onClick={() => handleSort("id")}
                      className="sort"
                      title="Sort Request ID"
                    >
                      {sortKey === "id" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                  <div className="filter-wrap">
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Filter by Request ID"
                      value={filters.id}
                      onChange={(e) => handleFilterChange("id", e.target.value)}
                    />
                  </div>
                </th>

                {/* Company Name */}
                <th className="w-[185px]">
                  <div className="th-title">
                    <span>Company Name</span>
                    <button
                      type="button"
                      onClick={() => handleSort("companyName")}
                      className="sort"
                      title="Sort Company Name"
                    >
                      {sortKey === "companyName" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                  <div className="filter-wrap">
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Filter by Company Name"
                      value={filters.companyName}
                      onChange={(e) => handleFilterChange("companyName", e.target.value)}
                    />
                  </div>
                </th>

                {/* Request Title */}
                <th>
                  <div className="th-title">
                    <span>Request Title</span>
                    <button
                      type="button"
                      onClick={() => handleSort("requestTitle")}
                      className="sort"
                      title="Sort Request Title"
                    >
                      {sortKey === "requestTitle" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                  <div className="filter-wrap">
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Filter by Request Title"
                      value={filters.requestTitle}
                      onChange={(e) => handleFilterChange("requestTitle", e.target.value)}
                    />
                  </div>
                </th>

                {/* State */}
                <th className="w-[125px]">
                  <div className="th-title">
                    <span>State</span>
                    <button
                      type="button"
                      onClick={() => handleSort("state")}
                      className="sort"
                      title="Sort State"
                    >
                      {sortKey === "state" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                  <div className="filter-wrap">
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Filter by State"
                      value={filters.state}
                      onChange={(e) => handleFilterChange("state", e.target.value)}
                    />
                  </div>
                </th>

                {/* City */}
                <th className="w-[125px]">
                  <div className="th-title">
                    <span>City</span>
                    <button
                      type="button"
                      onClick={() => handleSort("city")}
                      className="sort"
                      title="Sort City"
                    >
                      {sortKey === "city" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                  <div className="filter-wrap">
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Filter by City"
                      value={filters.city}
                      onChange={(e) => handleFilterChange("city", e.target.value)}
                    />
                  </div>
                </th>

                {/* Bid Start Date */}
                <th className="w-[130px]">
                  <div className="th-title">
                    <span>Bid Start Date</span>
                    <button
                      type="button"
                      onClick={() => handleSort("bidStartDate")}
                      className="sort"
                      title="Sort Bid Start Date"
                    >
                      {sortKey === "bidStartDate" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                  <div className="filter-wrap">
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Filter by Bid Start Date"
                      value={filters.bidStartDate}
                      onChange={(e) => handleFilterChange("bidStartDate", e.target.value)}
                    />
                  </div>
                </th>

                {/* Bid End Date */}
                <th className="w-[130px]">
                  <div className="th-title">
                    <span>Bid End Date</span>
                    <button
                      type="button"
                      onClick={() => handleSort("bidEndDate")}
                      className="sort"
                      title="Sort Bid End Date"
                    >
                      {sortKey === "bidEndDate" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                  <div className="filter-wrap">
                    <input
                      type="text"
                      placeholder="Search"
                      aria-label="Filter by Bid End Date"
                      value={filters.bidEndDate}
                      onChange={(e) => handleFilterChange("bidEndDate", e.target.value)}
                    />
                  </div>
                </th>

                {/* Actions Header */}
                <th className="actions-header w-[95px]">
                  <div className="th-title">
                    <span>Actions</span>
                  </div>
                  <div className="actions-flag-filter-slot">
                    <button
                      type="button"
                      onClick={() => {
                        setFilters({
                          id: "",
                          companyName: "",
                          requestTitle: "",
                          state: "",
                          city: "",
                          bidStartDate: "",
                          bidEndDate: "",
                        });
                        setCurrentPage(1);
                      }}
                      className="actions-flag-filter-button"
                      title="Reset filters"
                      aria-label="Reset filters"
                    >
                      <Flag className="w-[14.4px] h-[14.4px]" />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentRecords.map((item) => (
                <tr key={item.id}>
                  {/* Request ID */}
                  <td>
                    <Link
                      href={`/bidder/submit-bid/${item.id}`}
                      className="hover:underline"
                    >
                      {item.id}
                    </Link>
                  </td>

                  {/* Company Name */}
                  <td>{item.companyName}</td>

                  {/* Request Title */}
                  <td>{item.requestTitle}</td>

                  {/* State */}
                  <td>{item.state}</td>

                  {/* City */}
                  <td>{item.city}</td>

                  {/* Bid Start Date */}
                  <td>{item.bidStartDate}</td>

                  {/* Bid End Date */}
                  <td>{item.bidEndDate}</td>

                  {/* Actions (Make Bid & Contact) */}
                  <td className="text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <Link
                        href={`/bidder/submit-bid/${item.id}`}
                        className="maximal-btn-action-icon"
                        title="Make Bid"
                      >
                        <Gavel className="w-[14.4px] h-[14.4px]" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setSelectedContactProject(item)}
                        className="maximal-btn-action-icon"
                        title={`Contact ${item.companyName}`}
                      >
                        <Mail className="w-[14.4px] h-[14.4px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {currentRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-12 text-center text-sm text-[#668090]"
                  >
                    No open service requests match the specified search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Maximal Segmented Pagination Footer matching reference */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-[#f8fafb] to-[#edf2f5] border-t border-[#d8e2e7] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5f707b]">
          <div>
            Showing{" "}
            <span className="font-bold text-[#1f384a]">
              {filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-[#1f384a]">
              {Math.min(currentPage * pageSize, filteredData.length)}
            </span>{" "}
            of{" "}
            <span className="font-bold text-[#1f384a]">
              {filteredData.length}
            </span>{" "}
            records
          </div>

          {/* Segmented Page Buttons */}
          <div className="maximal-pager-container p-1 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg text-[#344650] hover:bg-white/80 disabled:opacity-30 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg text-[#344650] hover:bg-white/80 disabled:opacity-30 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setCurrentPage(num)}
                className={`w-7 h-7 rounded-lg font-bold text-xs flex items-center justify-center transition-colors cursor-pointer ${
                  currentPage === num
                    ? "maximal-page-active text-white shadow-xs"
                    : "text-[#344650] hover:bg-white/80"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg text-[#344650] hover:bg-white/80 disabled:opacity-30 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg text-[#344650] hover:bg-white/80 disabled:opacity-30 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronsRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Rows Per Page */}
          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="maximal-input px-2.5 py-1 text-xs rounded-lg bg-white border-[#c1d3df] cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>per page</span>
          </div>
        </div>
      </div>

      {/* Make Bid Dialog */}
      {selectedBidProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-lg p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedBidProject(null)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e6f7ec] to-[#c7eed6] border border-[#a2e0b7] flex items-center justify-center text-[#18753a]">
                <Gavel className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#203440]">
                  Submit Bid Proposal
                </h3>
                <p className="text-xs text-[#6e8492]">
                  Request #{selectedBidProject.id} • {selectedBidProject.companyName}
                </p>
              </div>
            </div>

            {bidSubmitted ? (
              <div className="p-4 rounded-xl bg-[#eaf7ee] border border-[#a8e2bc] text-[#136838] flex items-center gap-3 my-4">
                <CheckCircle2 className="w-6 h-6 flex-none" />
                <span className="text-xs font-semibold">
                  Your bid proposal of ${bidAmount} has been registered and sent to {selectedBidProject.companyName}!
                </span>
              </div>
            ) : (
              <form onSubmit={handleMakeBidSubmit} className="space-y-4">
                <div className="p-3 rounded-xl bg-[#f2f7fa] border border-[#d5e2ea] text-xs space-y-1">
                  <p className="font-bold text-[#1f3747]">{selectedBidProject.requestTitle}</p>
                  <p className="text-[#597383]">{selectedBidProject.description}</p>
                  <p className="text-[11px] text-[#185e8a] font-semibold pt-1">
                    Budget Guidance: {selectedBidProject.budgetEstimate}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#233d4e] mb-1">
                    Your Bid Amount ($ USD)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 52000"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="maximal-input w-full px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#233d4e] mb-1">
                    Proposal Notes / Qualifications
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your capabilities, response readiness, and certified staff..."
                    value={bidNote}
                    onChange={(e) => setBidNote(e.target.value)}
                    className="maximal-input w-full px-3 py-2 text-xs resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBidProject(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-[#597180] hover:bg-[#e6eff4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="maximal-btn-primary px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>Submit Bid</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Contact Dialog */}
      {selectedContactProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-lg p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            <button
              onClick={() => setSelectedContactProject(null)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5f1fc] to-[#cae3f8] border border-[#aed3f3] flex items-center justify-center text-[#156cb8]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#203440]">
                  Contact Requestor
                </h3>
                <p className="text-xs text-[#6e8492]">
                  {selectedContactProject.companyName} • Request #{selectedContactProject.id}
                </p>
              </div>
            </div>

            {contactSent ? (
              <div className="p-4 rounded-xl bg-[#eaf7ee] border border-[#a8e2bc] text-[#136838] flex items-center gap-3 my-4">
                <CheckCircle2 className="w-6 h-6 flex-none" />
                <span className="text-xs font-semibold">
                  Your message has been dispatched to {selectedContactProject.companyName}.
                </span>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#233d4e] mb-1">
                    Direct Inquiry Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter your inquiry or request for clarification regarding post orders..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="maximal-input w-full px-3 py-2 text-xs resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedContactProject(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-[#597180] hover:bg-[#e6eff4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="maximal-btn-primary px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
