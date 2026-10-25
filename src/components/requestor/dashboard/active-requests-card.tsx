"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Eye, ArrowUpDown } from "lucide-react";

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
    <div className="maximal-card overflow-hidden rounded-2xl border border-white shadow-md">
      {/* Card Brushed Header Bar */}
      <div className="bg-gradient-to-r from-[#2c3c46] to-[#18252d] px-5 py-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#7dc0df]">
            <FileText className="w-4 h-4" />
          </div>
          <h2 className="text-sm sm:text-base font-bold tracking-tight text-[#f1f6fa]">
            Active Service Requests
          </h2>
        </div>

        <Link
          href="/requestor/requests/new"
          className="text-xs font-semibold text-[#8fc8e6] hover:text-white transition-colors"
        >
          + Post New Request
        </Link>
      </div>

      {/* Table Wrapped in reference styling */}
      <div className="maximal-tablewrap border-t border-[#d6dde1]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="maximal-thead maximal-thead-compact">
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
                <th className="w-[180px] text-center">
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
                <th className="actions-header w-[100px]">
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
                      className="hover:underline"
                    >
                      {item.id}
                    </Link>
                  </td>

                  {/* Request Title */}
                  <td>{item.title}</td>

                  {/* Bids Received Badge */}
                  <td className="text-center">
                    <Link
                      href={`/requestor/requests/${item.id}/bids`}
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-bold transition-all shadow-xs ${
                        item.bidsReceived > 10
                          ? "bg-[#e8f7ee] text-[#117a3f] border border-[#a6e6bf] hover:brightness-105"
                          : "bg-[#eaf4fb] text-[#146ba3] border border-[#badbef] hover:brightness-105"
                      }`}
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
    </div>
  );
}
