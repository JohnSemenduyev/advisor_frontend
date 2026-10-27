"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Eye, PlusCircle } from "lucide-react";

export interface ActiveRequestItem {
  id: string;
  title: string;
  bidsReceived: number;
  status: "Active" | "Pending Review";
}

interface ActiveRequestsCardProps {
  requests?: ActiveRequestItem[];
}

export function ActiveRequestsCard({
  requests = [
    { id: "10001", title: "Guard Services", bidsReceived: 11, status: "Active" },
    { id: "10002", title: "Maintenance", bidsReceived: 10, status: "Active" },
  ],
}: ActiveRequestsCardProps) {
  const [data] = useState<ActiveRequestItem[]>(requests);
  const [sortKey, setSortKey] = useState<keyof ActiveRequestItem>("id");
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (key: keyof ActiveRequestItem) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <section className="profile-panel">
      {/* Panel Header matching Bidder theme */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2eaf0]">
        <h2 className="profile-heading mb-0">
          <span className="profile-heading-icon" aria-hidden="true">
            <FileText className="w-4 h-4 text-[#24475a]" />
          </span>
          <span>Active Service Requests</span>
        </h2>

        <Link
          href="/requestor/requests/new"
          className="maximal-btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>+ Post New Request</span>
        </Link>
      </div>

      {/* Table Wrapped in theme styling */}
      <div className="maximal-tablewrap shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="maximal-thead">
              <tr className="select-none">
                {/* Service Request ID */}
                <th className="w-[180px]">
                  <div className="th-title">
                    <span>Service Request ID</span>
                    <button
                      type="button"
                      onClick={() => handleSort("id")}
                      className="sort"
                      title="Sort by ID"
                    >
                      {sortKey === "id" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                </th>

                {/* Request Title */}
                <th>
                  <div className="th-title">
                    <span>Request Title</span>
                    <button
                      type="button"
                      onClick={() => handleSort("title")}
                      className="sort"
                      title="Sort by Title"
                    >
                      {sortKey === "title" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                </th>

                {/* Bids Received */}
                <th className="w-[160px] text-center">
                  <div className="th-title justify-center">
                    <span>Bids Received</span>
                    <button
                      type="button"
                      onClick={() => handleSort("bidsReceived")}
                      className="sort"
                      title="Sort by Bids"
                    >
                      {sortKey === "bidsReceived" ? (sortAsc ? "↑" : "↓") : "↕"}
                    </button>
                  </div>
                </th>

                {/* Actions */}
                <th className="actions-header w-[95px] text-center">
                  <div className="th-title justify-center">
                    <span>Actions</span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {sortedData.map((item) => (
                <tr key={item.id}>
                  {/* Service Request ID */}
                  <td>
                    <Link
                      href={`/requestor/requests/${item.id}`}
                      scroll={true}
                      className="font-semibold text-[#185a86] hover:underline"
                    >
                      {item.id}
                    </Link>
                  </td>

                  {/* Request Title */}
                  <td className="font-medium text-[#2d3e4b]">{item.title}</td>

                  {/* Bids Received Badge */}
                  <td className="text-center">
                    <Link
                      href={`/requestor/requests/${item.id}/bids`}
                      scroll={true}
                      className="inline-flex items-center justify-center min-w-[28px] h-6 px-2.5 rounded-full text-xs font-bold bg-[#e8f7ee] text-[#117a3f] border border-[#a4e6be] shadow-xs hover:brightness-105 transition-all"
                      title={`View ${item.bidsReceived} submitted bids`}
                    >
                      {item.bidsReceived}
                    </Link>
                  </td>

                  {/* Actions */}
                  <td className="text-center">
                    <div className="flex items-center justify-center">
                      <Link
                        href={`/requestor/requests/${item.id}`}
                        scroll={true}
                        className="maximal-btn-action-icon"
                        title="View Request Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {sortedData.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-xs text-[#708593]">
                    No active service requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
