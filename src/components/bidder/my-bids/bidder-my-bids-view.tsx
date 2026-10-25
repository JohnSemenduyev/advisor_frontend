"use client";

import React from "react";
import { BidderTopbar } from "../navigation/bidder-topbar";
import { MyBidsTable } from "./my-bids-table";

export function BidderMyBidsView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e1e4e5] via-[#f2f3f2] to-[#d8dcde] flex flex-col font-sans">
      {/* Top Navigation Bar with Interlocking Domino Tabs matching reference */}
      <BidderTopbar userName="Mike A." avatarLetter="M" />

      {/* Main Brushed Silver Shell Canvas */}
      <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1480px] w-full mx-auto">
        <div className="maximal-shell p-5 sm:p-7 lg:p-8">
          <MyBidsTable />
        </div>
      </main>
    </div>
  );
}
