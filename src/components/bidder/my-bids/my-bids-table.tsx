"use client";

import React, { useState, useMemo } from "react";
import {
  Eye,
  Trash2,
  Flag,
  X,
  AlertTriangle,
  Info,
} from "lucide-react";

export interface MyBidRecord {
  id: string;
  companyName: string;
  requestTitle: string;
  city: string;
  state: string;
  bidStartDate: string;
  bidEndDate: string;
  status: "Open" | "Closed" | string;
}

// Exact submitted bids from client reference HTML (Maximal_Homepage_Lighter_Done_Readonly_Profile.html)
const SEED_MY_BIDS: MyBidRecord[] = [
  {
    id: "RFQ-2026-1042",
    companyName: "Atlantic Distribution Group",
    requestTitle: "Unarmed Security Services",
    city: "Newark",
    state: "NJ",
    bidStartDate: "2026-10-01",
    bidEndDate: "2026-10-28",
    status: "Open",
  },
  {
    id: "RFP-2026-0817",
    companyName: "Metro Logistics Partners",
    requestTitle: "Warehouse Security Guard Coverage",
    city: "Allentown",
    state: "PA",
    bidStartDate: "2026-09-18",
    bidEndDate: "2026-10-30",
    status: "Open",
  },
  {
    id: "RFQ-2026-1165",
    companyName: "Capital Property Management",
    requestTitle: "Lobby and Access Control Security",
    city: "Arlington",
    state: "VA",
    bidStartDate: "2026-10-05",
    bidEndDate: "2026-11-06",
    status: "Open",
  },
  {
    id: "RFQ-2026-1088",
    companyName: "Coastal Freight Services",
    requestTitle: "Gatehouse and Yard Patrol",
    city: "Norfolk",
    state: "VA",
    bidStartDate: "2026-10-03",
    bidEndDate: "2026-11-02",
    status: "Open",
  },
  {
    id: "RFQ-2026-1210",
    companyName: "Piedmont Commerce Group",
    requestTitle: "Commercial Building Security",
    city: "Charlotte",
    state: "NC",
    bidStartDate: "2026-10-12",
    bidEndDate: "2026-11-12",
    status: "Open",
  },
  {
    id: "RFQ-2026-1148",
    companyName: "Bay State Office Partners",
    requestTitle: "Reception and Visitor Screening",
    city: "Boston",
    state: "MA",
    bidStartDate: "2026-10-07",
    bidEndDate: "2026-11-04",
    status: "Open",
  },
  {
    id: "RFP-2026-1033",
    companyName: "Sunrise Cold Storage",
    requestTitle: "Refrigerated Warehouse Guard Services",
    city: "Miami",
    state: "FL",
    bidStartDate: "2026-10-01",
    bidEndDate: "2026-10-31",
    status: "Open",
  },
  {
    id: "RFP-2026-1184",
    companyName: "Peachtree Business Centers",
    requestTitle: "Multi-Site Security Officer Services",
    city: "Atlanta",
    state: "GA",
    bidStartDate: "2026-10-09",
    bidEndDate: "2026-11-16",
    status: "Open",
  },
  {
    id: "RFP-2026-0924",
    companyName: "Hudson Industrial Holdings",
    requestTitle: "24/7 Facility Protection Services",
    city: "Jersey City",
    state: "NJ",
    bidStartDate: "2026-09-11",
    bidEndDate: "2026-10-12",
    status: "Closed",
  },
  {
    id: "RFP-2026-0761",
    companyName: "Empire Retail Properties",
    requestTitle: "Shopping Center Security Patrol",
    city: "Brooklyn",
    state: "NY",
    bidStartDate: "2026-08-20",
    bidEndDate: "2026-09-30",
    status: "Closed",
  },
  {
    id: "RFP-2026-0991",
    companyName: "Lone Star Warehousing",
    requestTitle: "Distribution Center Security",
    city: "Dallas",
    state: "TX",
    bidStartDate: "2026-09-24",
    bidEndDate: "2026-10-17",
    status: "Closed",
  },
  {
    id: "RFQ-2026-0862",
    companyName: "Delaware Valley Transport",
    requestTitle: "Truck Terminal Gate Security",
    city: "Philadelphia",
    state: "PA",
    bidStartDate: "2026-09-03",
    bidEndDate: "2026-10-03",
    status: "Closed",
  },
  {
    id: "RFQ-2026-1250",
    companyName: "Tri-State Logistics Partners",
    requestTitle: "Cargo Escort & Depot Access Watch",
    city: "Newark",
    state: "NJ",
    bidStartDate: "2026-10-15",
    bidEndDate: "2026-11-20",
    status: "Open",
  },
  {
    id: "RFP-2026-1290",
    companyName: "Keystone Commercial Properties",
    requestTitle: "Office Park After-Hours Rover",
    city: "Pittsburgh",
    state: "PA",
    bidStartDate: "2026-10-18",
    bidEndDate: "2026-11-25",
    status: "Open",
  },
  {
    id: "RFQ-2026-1310",
    companyName: "Silicon Valley Tech Campus",
    requestTitle: "Biometric Lab Screening & Reception",
    city: "San Jose",
    state: "CA",
    bidStartDate: "2026-10-20",
    bidEndDate: "2026-11-30",
    status: "Open",
  },
  {
    id: "RFP-2026-1340",
    companyName: "Lone Star Logistics Center",
    requestTitle: "Freight Gate Verification & Patrol",
    city: "Houston",
    state: "TX",
    bidStartDate: "2026-10-22",
    bidEndDate: "2026-12-05",
    status: "Open",
  },
  {
    id: "RFQ-2026-1375",
    companyName: "Empire State Commerce Tower",
    requestTitle: "Executive Lobby Security Staffing",
    city: "New York",
    state: "NY",
    bidStartDate: "2026-10-25",
    bidEndDate: "2026-12-10",
    status: "Open",
  },
  {
    id: "RFP-2026-1390",
    companyName: "Chesapeake Marine Terminal",
    requestTitle: "TWIC Bonded Freight Guard Staff",
    city: "Norfolk",
    state: "VA",
    bidStartDate: "2026-10-28",
    bidEndDate: "2026-12-15",
    status: "Open",
  },
  {
    id: "RFQ-2026-1410",
    companyName: "Allegheny Medical Center",
    requestTitle: "Emergency Wing Access Monitoring",
    city: "Allentown",
    state: "PA",
    bidStartDate: "2026-11-01",
    bidEndDate: "2026-12-20",
    status: "Open",
  },
  {
    id: "RFP-2026-1435",
    companyName: "Austin Innovation Yards",
    requestTitle: "Perimeter Drone & CCTV Surveillance",
    city: "Austin",
    state: "TX",
    bidStartDate: "2026-11-05",
    bidEndDate: "2026-12-28",
    status: "Open",
  },
];

export function MyBidsTable() {
  const [bids, setBids] = useState<MyBidRecord[]>(SEED_MY_BIDS);

  // Sorting - null initially to preserve natural order matching Screenshot 1
  const [sortKey, setSortKey] = useState<keyof MyBidRecord | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  // Column filters (default status filter: "All" matching Screenshot 1)
  const [filters, setFilters] = useState({
    id: "",
    companyName: "",
    requestTitle: "",
    city: "",
    state: "",
    bidStartDate: "",
    bidEndDate: "",
    status: "All",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modals state
  const [viewingBid, setViewingBid] = useState<MyBidRecord | null>(null);
  const [deletingBid, setDeletingBid] = useState<MyBidRecord | null>(null);

  const handleSort = (key: keyof MyBidRecord) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return bids
      .filter((item) => {
        if (filters.id && !item.id.toLowerCase().includes(filters.id.toLowerCase())) return false;
        if (filters.companyName && !item.companyName.toLowerCase().includes(filters.companyName.toLowerCase())) return false;
        if (filters.requestTitle && !item.requestTitle.toLowerCase().includes(filters.requestTitle.toLowerCase())) return false;
        if (filters.city && !item.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
        if (filters.state && !item.state.toLowerCase().includes(filters.state.toLowerCase())) return false;
        if (filters.bidStartDate && !item.bidStartDate.includes(filters.bidStartDate)) return false;
        if (filters.bidEndDate && !item.bidEndDate.includes(filters.bidEndDate)) return false;
        if (filters.status && filters.status !== "All" && item.status.toLowerCase() !== filters.status.toLowerCase()) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (!sortKey) return 0;
        const valA = (a[sortKey] || "").toLowerCase();
        const valB = (b[sortKey] || "").toLowerCase();
        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [bids, filters, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const openViewModal = (bid: MyBidRecord) => {
    setViewingBid(bid);
  };

  const openDeleteModal = (bid: MyBidRecord) => {
    setDeletingBid(bid);
  };

  const handleConfirmDelete = () => {
    if (!deletingBid) return;
    setBids((prev) => prev.filter((b) => b.id !== deletingBid.id));
    setDeletingBid(null);
  };

  const handleResetFilters = () => {
    setFilters({
      id: "",
      companyName: "",
      requestTitle: "",
      city: "",
      state: "",
      bidStartDate: "",
      bidEndDate: "",
      status: "All",
    });
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4 my-bids-table">
      {/* Elevated Table Container matching Screenshot 1 */}
      <div className="maximal-tablewrap shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1050px] table-fixed">
            <colgroup>
              <col style={{ width: "12%" }} />
              <col style={{ width: "18%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "6%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "6%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>

            {/* Single Integrated Header Row matching Client's Screenshot 1 */}
            <thead className="maximal-thead">
              <tr className="select-none">
                {/* 1. Request ID */}
                <th>
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

                {/* 2. Company Name */}
                <th>
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

                {/* 3. Request Title */}
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

                {/* 4. City (Note: Comes before State in client reference!) */}
                <th>
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

                {/* 5. State (Compact abbreviation column) */}
                <th style={{ textAlign: "center" }}>
                  <div className="th-title" style={{ justifyContent: "center" }}>
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

                {/* 6. Bid Start Date */}
                <th>
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

                {/* 7. Bid End Date */}
                <th>
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

                {/* 8. Status Dropdown Header */}
                <th style={{ textAlign: "center" }}>
                  <div className="th-title" style={{ justifyContent: "center" }}>
                    <span>Status</span>
                    <button
                      type="button"
                      onClick={() => handleSort("status")}
                      className="sort"
                      title="Sort Status"
                    >
                      {sortKey === "status" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                  <div className="filter-select-wrap">
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange("status", e.target.value)}
                      aria-label="Filter by Status"
                      id="bidStatusFilter"
                      className="maximal-filter-select"
                      style={{ textAlign: "center", textAlignLast: "center" }}
                    >
                      <option value="All">All</option>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </th>

                {/* 9. Actions Header */}
                <th className="actions-header" style={{ textAlign: "center" }}>
                  <div className="th-title" style={{ justifyContent: "center" }}>
                    <span>Actions</span>
                  </div>
                  <div className="actions-flag-filter-slot">
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="actions-flag-filter-button"
                      title="Reset filters"
                      aria-label="Reset filters"
                    >
                      <Flag className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentRecords.map((item) => (
                <tr key={item.id} className="hover:bg-[#e7eef2] transition-colors">
                  {/* Request ID (Underlined clickable link matching client screenshot) */}
                  <td className="truncate">
                    <button
                      type="button"
                      onClick={() => openViewModal(item)}
                      className="font-bold underline text-[#1f2b33] hover:text-[#086ba5] cursor-pointer text-left tracking-tight"
                      title={`View bid details for ${item.id}`}
                    >
                      {item.id}
                    </button>
                  </td>

                  {/* Company Name */}
                  <td className="truncate text-[#1f2b33] font-medium">
                    {item.companyName}
                  </td>

                  {/* Request Title */}
                  <td className="truncate text-[#2d3a43]">
                    {item.requestTitle}
                  </td>

                  {/* City */}
                  <td className="truncate text-[#2d3a43]">
                    {item.city}
                  </td>

                  {/* State */}
                  <td className="text-center font-medium text-[#2d3a43]">
                    {item.state}
                  </td>

                  {/* Bid Start Date */}
                  <td className="text-[#2d3a43]">
                    {item.bidStartDate}
                  </td>

                  {/* Bid End Date */}
                  <td className="text-[#2d3a43]">
                    {item.bidEndDate}
                  </td>

                  {/* Status (Plain clean text matching client screenshot) */}
                  <td className="text-center font-medium text-[#1f2b33]">
                    {item.status}
                  </td>

                  {/* Action Buttons: View (Eye) & Delete (Trash) in silver beveled icons */}
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openViewModal(item)}
                        className="maximal-btn-action-icon"
                        title="View bid"
                        aria-label={`View bid ${item.id}`}
                      >
                        <Eye className="w-3.5 h-3.5 stroke-[1.8]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(item)}
                        className="maximal-btn-action-icon btn-delete"
                        title="Delete bid"
                        aria-label={`Delete bid ${item.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[1.8]" />
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
                    No matching bids found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer with Pagination matching Screenshot 1 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-[#d6dde1] bg-[#f9fafb] text-xs text-[#526673]">
          {/* Record Count */}
          <div className="font-medium text-[#526673]">
            Showing {filteredData.length ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
            {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} records
          </div>

          {/* Page Selector & Arrows - Segmented Capsule matching Screenshot 3 */}
          <div className="page-navigation" aria-label="Pagination">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="pager-arrow"
              title="First Page"
              aria-label="First Page"
            >
              «
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="pager-arrow"
              title="Previous Page"
              aria-label="Previous Page"
            >
              ‹
            </button>

            <span className="page-number-list">
              {(() => {
                const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                const end = Math.min(totalPages, start + 4);
                const pages: number[] = [];
                for (let i = start; i <= end; i++) {
                  pages.push(i);
                }
                return pages.map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`page-number ${currentPage === page ? "current" : ""}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    aria-label={`Page ${page}`}
                  >
                    {page}
                  </button>
                ));
              })()}
            </span>

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="pager-arrow"
              title="Next Page"
              aria-label="Next Page"
            >
              ›
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="pager-arrow"
              title="Last Page"
              aria-label="Last Page"
            >
              »
            </button>
          </div>

          {/* Page Size Native Select */}
          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="maximal-pager-select px-2.5 py-1 text-xs border border-[#bdcbd3] rounded-[7px] bg-linear-to-b from-white to-[#e9edf0] text-[#334e5d] font-medium"
              aria-label="Rows per page"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-xs text-[#526673]">per page</span>
          </div>
        </div>
      </div>

      {/* View Bid Details Modal */}
      {viewingBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[500px] rounded-2xl overflow-hidden border border-white bg-linear-to-br from-[#ffffff] to-[#f0f4f6] shadow-2xl text-left">
            <div className="flex items-center justify-between p-5 border-b border-[#d8e2e7] bg-linear-to-r from-[#2e3c44] to-[#17232a] text-white">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#3b5364] flex items-center justify-center">
                  <Info className="w-4 h-4 text-[#7dd3fc]" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {viewingBid.id}
                  </h3>
                  <p className="text-[11px] text-[#93b3c6]">Submitted Bid Details</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingBid(null)}
                className="text-[#93b3c6] hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs text-[#2e4352]">
              <div className="grid grid-cols-2 gap-3 pb-2 border-b border-[#e2edf3]">
                <div>
                  <span className="text-[11px] font-bold text-[#638092] block">Company Name</span>
                  <strong className="text-sm text-[#182a35]">{viewingBid.companyName}</strong>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#638092] block">Status</span>
                  <span className="inline-block px-2 py-0.5 rounded-md bg-[#edf5fa] text-[#195a86] font-bold border border-[#bad7e8] mt-0.5">
                    {viewingBid.status}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#638092] block">Request Title</span>
                <p className="text-xs font-semibold text-[#182a35] mt-0.5">{viewingBid.requestTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-bold text-[#638092] block">City</span>
                  <span className="text-xs text-[#182a35]">{viewingBid.city}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#638092] block">State</span>
                  <span className="text-xs text-[#182a35]">{viewingBid.state}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[11px] font-bold text-[#638092] block">Bid Start Date</span>
                  <span className="text-xs text-[#182a35]">{viewingBid.bidStartDate}</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#638092] block">Bid End Date</span>
                  <span className="text-xs text-[#182a35]">{viewingBid.bidEndDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-4 border-t border-[#d8e2e7] bg-[#edf2f5]/60">
              <button
                type="button"
                onClick={() => setViewingBid(null)}
                className="px-4 py-2 text-xs font-bold rounded-xl border border-[#b8c6ce] bg-linear-to-b from-[#fff] to-[#e8edf0] text-[#334550] shadow-xs hover:brightness-95 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[420px] rounded-2xl overflow-hidden border border-[#a8b7bf] bg-linear-to-br from-[#ffffff] to-[#f0f4f6] shadow-2xl text-left">
            <div className="flex items-center gap-3.5 p-6 pb-3">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#feebe9] to-[#fbd3cf] border border-[#f3a8a0] flex items-center justify-center text-[#c43224] flex-none">
                <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1f2d36] leading-tight">
                  Delete Bid {deletingBid.id}?
                </h3>
                <p className="text-xs text-[#6e828f] mt-0.5">
                  Confirm retraction
                </p>
              </div>
            </div>

            <p className="px-6 py-2 text-xs text-[#526673] leading-relaxed">
              Are you sure you want to retract and delete your proposal for <strong>{deletingBid.companyName}</strong>? This action cannot be reversed.
            </p>

            <div className="flex items-center justify-end gap-2.5 p-4 px-6 border-t border-[#d8e2e7] bg-[#edf2f5]/60 mt-4">
              <button
                type="button"
                onClick={() => setDeletingBid(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#b8c6ce] bg-linear-to-b from-[#fff] to-[#e8edf0] text-[#334550] shadow-xs hover:brightness-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-linear-to-b from-[#ed3535] to-[#b90011] text-white flex items-center gap-1.5 cursor-pointer shadow-md hover:brightness-105"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Bid</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
