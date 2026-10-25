"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Gavel,
  ArrowUpDown,
  Filter,
  Calendar,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  CheckCircle2,
  AlertTriangle,
  Save,
} from "lucide-react";

export interface MyBidRecord {
  id: string;
  companyName: string;
  requestTitle: string;
  state: string;
  city: string;
  bidStartDate: string;
  bidEndDate: string;
  status: "Open" | "Accepted" | "Pending" | "Rejected";
  bidAmount?: string;
  notes?: string;
}

const SEED_MY_BIDS: MyBidRecord[] = [
  {
    id: "10001",
    companyName: "Creative Logistics",
    requestTitle: "Norfolk Guard Services",
    state: "New Jersey",
    city: "Edison",
    bidStartDate: "05/10/2026",
    bidEndDate: "07/10/2026",
    status: "Open",
    bidAmount: "$52,000",
    notes: "Turnkey patrol schedule with certified supervisors.",
  },
  {
    id: "10002",
    companyName: "Pinnacle Security Solutions",
    requestTitle: "Access Control & Gate Automation",
    state: "New York",
    city: "Buffalo",
    bidStartDate: "05/18/2026",
    bidEndDate: "07/25/2026",
    status: "Accepted",
    bidAmount: "$95,000",
    notes: "Complete optical barrier installation with warranty.",
  },
  {
    id: "10003",
    companyName: "Apex Metro Infrastructure",
    requestTitle: "Commercial Facility Patrol 24/7",
    state: "Texas",
    city: "Dallas",
    bidStartDate: "06/01/2026",
    bidEndDate: "08/15/2026",
    status: "Pending",
    bidAmount: "$135,000",
    notes: "24/7 continuous guard roster across three shifts.",
  },
  {
    id: "10004",
    companyName: "Vanguard Defense & Surveillance",
    requestTitle: "Perimeter CCTV System Overhaul",
    state: "California",
    city: "San Jose",
    bidStartDate: "06/10/2026",
    bidEndDate: "08/30/2026",
    status: "Rejected",
    bidAmount: "$72,000",
    notes: "High-definition AI optical sensors along fence line.",
  },
];

export function MyBidsTable() {
  const [bids, setBids] = useState<MyBidRecord[]>(SEED_MY_BIDS);

  // Sorting
  const [sortKey, setSortKey] = useState<keyof MyBidRecord>("id");
  const [sortAsc, setSortAsc] = useState(true);

  // Column filters
  const [filters, setFilters] = useState({
    id: "",
    companyName: "",
    requestTitle: "",
    state: "",
    city: "",
    bidStartDate: "",
    bidEndDate: "",
    status: "",
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modals state
  const [editingBid, setEditingBid] = useState<MyBidRecord | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editSaved, setEditSaved] = useState(false);

  const [deletingBid, setDeletingBid] = useState<MyBidRecord | null>(null);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

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
        if (filters.state && !item.state.toLowerCase().includes(filters.state.toLowerCase())) return false;
        if (filters.city && !item.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
        if (filters.bidStartDate && !item.bidStartDate.includes(filters.bidStartDate)) return false;
        if (filters.bidEndDate && !item.bidEndDate.includes(filters.bidEndDate)) return false;
        if (filters.status && item.status.toLowerCase() !== filters.status.toLowerCase()) return false;
        return true;
      })
      .sort((a, b) => {
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

  const openEditModal = (bid: MyBidRecord) => {
    setEditingBid(bid);
    setEditAmount(bid.bidAmount || "");
    setEditNotes(bid.notes || "");
    setEditSaved(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBid) return;

    setBids((prev) =>
      prev.map((b) =>
        b.id === editingBid.id ? { ...b, bidAmount: editAmount, notes: editNotes } : b
      )
    );
    setEditSaved(true);
    setTimeout(() => {
      setEditSaved(false);
      setEditingBid(null);
    }, 1200);
  };

  const openDeleteModal = (bid: MyBidRecord) => {
    setDeletingBid(bid);
    setDeleteConfirmed(false);
  };

  const handleConfirmDelete = () => {
    if (!deletingBid) return;
    setDeleteConfirmed(true);
    setTimeout(() => {
      setBids((prev) => prev.filter((b) => b.id !== deletingBid.id));
      setDeletingBid(null);
      setDeleteConfirmed(false);
    }, 900);
  };

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">


      {/* Elevated Table Container matching screenshot */}
      <div className="maximal-tablewrap shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1050px]">
            {/* Header Columns */}
            <thead className="maximal-thead">
              <tr className="text-xs font-bold tracking-tight select-none">
                <th
                  onClick={() => handleSort("id")}
                  className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors w-[110px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Request ID</span>
                    <ArrowUpDown className="w-3 h-3 text-white/70" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("companyName")}
                  className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors w-[180px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Company Name</span>
                    <ArrowUpDown className="w-3 h-3 text-white/70" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("requestTitle")}
                  className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Request Title</span>
                    <ArrowUpDown className="w-3 h-3 text-white/70" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("state")}
                  className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors w-[130px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>State</span>
                    <ArrowUpDown className="w-3 h-3 text-white/70" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("city")}
                  className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors w-[120px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>City</span>
                    <ArrowUpDown className="w-3 h-3 text-white/70" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("bidStartDate")}
                  className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors w-[130px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Bid Start Date</span>
                    <ArrowUpDown className="w-3 h-3 text-white/70" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("bidEndDate")}
                  className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors w-[130px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Bid End Date</span>
                    <ArrowUpDown className="w-3 h-3 text-white/70" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-4 py-3.5 cursor-pointer hover:bg-white/10 transition-colors w-[110px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 text-white/70" />
                  </div>
                </th>
                <th className="px-4 py-3.5 text-center w-[110px]">
                  <span>Action</span>
                </th>
              </tr>

              {/* Second Row: Filters underneath each column */}
              <tr className="maximal-th-filter">
                <th className="p-2">
                  <div className="relative">
                    <Filter className="w-3.5 h-3.5 text-[#587c94] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by ID..."
                      value={filters.id}
                      onChange={(e) => handleFilterChange("id", e.target.value)}
                      className="maximal-filter-input"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="relative">
                    <Filter className="w-3.5 h-3.5 text-[#587c94] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by company..."
                      value={filters.companyName}
                      onChange={(e) => handleFilterChange("companyName", e.target.value)}
                      className="maximal-filter-input"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="relative">
                    <Filter className="w-3.5 h-3.5 text-[#587c94] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by title..."
                      value={filters.requestTitle}
                      onChange={(e) => handleFilterChange("requestTitle", e.target.value)}
                      className="maximal-filter-input"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="relative">
                    <Filter className="w-3.5 h-3.5 text-[#587c94] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by state..."
                      value={filters.state}
                      onChange={(e) => handleFilterChange("state", e.target.value)}
                      className="maximal-filter-input"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="relative">
                    <Filter className="w-3.5 h-3.5 text-[#587c94] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by city..."
                      value={filters.city}
                      onChange={(e) => handleFilterChange("city", e.target.value)}
                      className="maximal-filter-input"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#587c94] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Select date..."
                      value={filters.bidStartDate}
                      onChange={(e) => handleFilterChange("bidStartDate", e.target.value)}
                      className="maximal-filter-input"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#587c94] absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Select date..."
                      value={filters.bidEndDate}
                      onChange={(e) => handleFilterChange("bidEndDate", e.target.value)}
                      className="maximal-filter-input"
                    />
                  </div>
                </th>
                <th className="p-2">
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="maximal-filter-input px-2 text-xs cursor-pointer"
                  >
                    <option value="">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </th>
                <th className="p-2"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#e2edf4] text-xs font-medium text-[#253d4e]">
              {currentRecords.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f2f8fc] transition-colors"
                >
                  {/* Request ID */}
                  <td className="px-4 py-3.5 font-bold text-[#0066c0] hover:underline cursor-pointer">
                    <Link href={`/bidder/submit-bid/${item.id}`}>
                      {item.id}
                    </Link>
                  </td>

                  {/* Company Name */}
                  <td className="px-4 py-3.5 font-semibold text-[#1f3544]">
                    {item.companyName}
                  </td>

                  {/* Request Title */}
                  <td className="px-4 py-3.5 text-[#2b4455]">
                    {item.requestTitle}
                  </td>

                  {/* State */}
                  <td className="px-4 py-3.5 text-[#324a5b]">
                    {item.state}
                  </td>

                  {/* City */}
                  <td className="px-4 py-3.5 text-[#324a5b]">
                    {item.city}
                  </td>

                  {/* Bid Start Date */}
                  <td className="px-4 py-3.5 font-semibold text-[#18557e]">
                    {item.bidStartDate}
                  </td>

                  {/* Bid End Date */}
                  <td className="px-4 py-3.5 font-semibold text-[#18557e]">
                    {item.bidEndDate}
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        item.status === "Accepted"
                          ? "bg-[#e8f7ee] text-[#0f693b] border border-[#94deb5]"
                          : item.status === "Open"
                          ? "bg-[#e5f1fb] text-[#115b8b] border border-[#a8d1ed]"
                          : item.status === "Pending"
                          ? "bg-[#fff8e6] text-[#975a16] border border-[#f5d794]"
                          : "bg-[#feebe9] text-[#b91c1c] border border-[#fca5a5]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Action Buttons: Blue Edit & Red Delete matching screenshot */}
                  <td className="px-4 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="maximal-btn-edit-action"
                        title="Edit bid proposal"
                      >
                        <Edit2 className="w-3.5 h-3.5 stroke-[2.2]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(item)}
                        className="maximal-btn-delete-action"
                        title="Retract/Delete bid"
                      >
                        <Trash2 className="w-3.5 h-3.5 stroke-[2.2]" />
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
                    No submitted bids match the specified filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Maximal Segmented Pagination Footer */}
        <div className="px-4 py-3.5 bg-gradient-to-r from-[#f7fafd] to-[#edf4f8] border-t border-[#d8e5ee] flex flex-wrap items-center justify-between gap-4 text-xs text-[#526d7e]">
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
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-[#c1d3df] bg-white disabled:opacity-35 hover:bg-[#e4eff6] text-[#2c4759] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronsLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-7 h-7 rounded-lg border border-[#c1d3df] bg-white disabled:opacity-35 hover:bg-[#e4eff6] text-[#2c4759] flex items-center justify-center transition-colors cursor-pointer"
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
                    ? "bg-gradient-to-b from-[#243a49] to-[#121f28] text-white shadow-xs"
                    : "border border-[#c1d3df] bg-white text-[#2c4759] hover:bg-[#e4eff6]"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg border border-[#c1d3df] bg-white disabled:opacity-35 hover:bg-[#e4eff6] text-[#2c4759] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="w-7 h-7 rounded-lg border border-[#c1d3df] bg-white disabled:opacity-35 hover:bg-[#e4eff6] text-[#2c4759] flex items-center justify-center transition-colors cursor-pointer"
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

      {/* Edit Bid Modal */}
      {editingBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="maximal-card w-full max-w-lg p-6 rounded-2xl border border-white shadow-2xl relative text-left">
            <button
              onClick={() => setEditingBid(null)}
              className="absolute right-4 top-4 text-[#6e8594] hover:text-[#253946] p-1 rounded-lg"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e5f1fc] to-[#cae3f8] border border-[#aed3f3] flex items-center justify-center text-[#156cb8]">
                <Edit2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#203440]">
                  Edit Bid #{editingBid.id}
                </h3>
                <p className="text-xs text-[#6e8492]">
                  {editingBid.companyName} • {editingBid.requestTitle}
                </p>
              </div>
            </div>

            {editSaved ? (
              <div className="p-4 rounded-xl bg-[#eaf7ee] border border-[#a8e2bc] text-[#136838] flex items-center gap-3 my-4">
                <CheckCircle2 className="w-6 h-6 flex-none" />
                <span className="text-xs font-semibold">
                  Bid proposal updated successfully!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#233d4e] mb-1">
                    Submitted Amount
                  </label>
                  <input
                    type="text"
                    required
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="maximal-input w-full px-3 py-2 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#233d4e] mb-1">
                    Proposal Notes & Adjustments
                  </label>
                  <textarea
                    rows={3}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    className="maximal-input w-full px-3 py-2 text-xs resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingBid(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-xl text-[#597180] hover:bg-[#e6eff4]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="maximal-btn-primary px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete / Retract Confirmation Dialog */}
      {deletingBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a161faa]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-[430px] rounded-2xl overflow-hidden border border-[#a8b7bf] bg-gradient-to-br from-[#ffffff] to-[#f0f4f6] shadow-2xl text-left">
            <div className="flex items-center gap-3.5 p-6 pb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#feebe9] to-[#fbd3cf] border border-[#f3a8a0] flex items-center justify-center text-[#c43224] flex-none">
                <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1f2d36] leading-tight">
                  Retract Submitted Bid?
                </h3>
                <p className="text-xs text-[#6e828f] mt-0.5">
                  Requisition #{deletingBid.id}
                </p>
              </div>
            </div>

            <p className="px-6 py-2 text-xs text-[#526673] leading-relaxed">
              Are you sure you want to retract your bid for{" "}
              <strong className="text-[#1a384c]">{deletingBid.requestTitle}</strong> ({deletingBid.companyName})? This action cannot be reversed.
            </p>

            <div className="flex items-center justify-end gap-2.5 p-4 px-6 border-t border-[#d8e2e7] bg-[#edf2f5]/60 mt-4">
              <button
                type="button"
                disabled={deleteConfirmed}
                onClick={() => setDeletingBid(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-[#b8c6ce] bg-gradient-to-b from-[#fff] to-[#e8edf0] text-[#334550] shadow-xs hover:brightness-95 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmed}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-semibold rounded-xl maximal-btn-danger flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{deleteConfirmed ? "Retracting..." : "Retract Bid"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
