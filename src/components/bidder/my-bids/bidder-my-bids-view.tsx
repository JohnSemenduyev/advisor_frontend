"use client";

import React from "react";
import { BidderTopbar } from "../navigation/bidder-topbar";
import { MyBidsTable } from "./my-bids-table";

export function BidderMyBidsView() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar userName="Mike A." avatarLetter="M" />

      {/* Main Brushed Silver Shell Canvas - standardized viewport margins */}
      <main className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 w-full flex flex-col min-h-0 overflow-hidden box-border">
        <div className="maximal-shell p-3 sm:p-4.5 w-full flex-1 flex flex-col min-h-0 overflow-hidden shadow-lg">
          <MyBidsTable />
        </div>
      </main>
    </div>
  );
}
