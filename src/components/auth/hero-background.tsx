"use client";

import React from "react";

export function HeroBackground() {
  return (
    <>
      {/* Subtle blueprint grid overlay */}
      <div className="ba-hero-grid absolute inset-0 pointer-events-none z-0" />

      {/* Architectural building silhouette */}
      <div
        className="ba-building absolute -right-[4%] top-[6%] w-[32%] h-[68%] pointer-events-none z-0 hidden sm:block"
        aria-hidden="true"
      >
        <div
          className="ba-building-wing absolute -left-[48%] -bottom-[10%] w-[75%] h-[68%]"
          aria-hidden="true"
        />
      </div>

      {/* Metallic bottom curved swoosh */}
      <div
        className="ba-swoosh absolute -left-[12%] -bottom-[12%] w-[135%] h-[43%] pointer-events-none z-0"
        aria-hidden="true"
      />
    </>
  );
}
