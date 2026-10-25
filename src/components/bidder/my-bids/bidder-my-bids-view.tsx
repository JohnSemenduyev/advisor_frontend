"use client";

import React from "react";
import { BidderTopbar } from "../navigation/bidder-topbar";
import { MyBidsTable } from "./my-bids-table";

export function BidderMyBidsView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar userName="Mike A." avatarLetter="M" />

      {/* Main Brushed Silver Shell Canvas - full available space matching client reference */}
      <main className="flex-1 px-3 sm:px-4 py-4 w-full">
        <div className="maximal-shell p-3 sm:p-4 w-full">
          <MyBidsTable />
        </div>
      </main>
    </div>
  );
}
