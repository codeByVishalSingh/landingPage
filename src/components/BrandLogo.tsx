"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  isScrolled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  height?: number;
  inverted?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  isScrolled = false,
  size = "lg",
  height: customHeight,
  inverted = false,
}) => {
  const heights: Record<string, number> = {
    sm: 52,
    md: 68,
    lg: isScrolled ? 76 : 90,
    xl: 104,
  };

  const defaultHeight = heights[size] || 90;
  const height = customHeight ?? defaultHeight;
  const width = Math.round(height * (1400 / 696)); // ~2.01:1 aspect ratio

  const inkColor = inverted ? "#1c1b19" : "#FFFFFF";

  return (
    <div
      className={`brand-logo-container brand-logo-${size} ${isScrolled ? "is-scrolled" : ""} ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: `var(--brand-logo-width, ${width}px)`,
        height: `var(--brand-logo-height, ${height}px)`,
        userSelect: "none",
        transition: "opacity 0.25s ease, transform 0.25s ease, width 0.25s ease, height 0.25s ease",
      }}
      aria-label="Casablanca Sofas"
      role="img"
    >
      {/* 1. Ring & Medallion in authentic warm champagne gold (#c8b89a) */}
      <span
        className="brand-logo__ring"
        style={{
          position: "absolute",
          inset: 0,
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
          maskRepeat: "no-repeat",
          display: "block",
        }}
      />

      {/* 2. Wordmark ink text in white/cream on dark nav, dark on light nav */}
      <span
        className="brand-logo__ink"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: inkColor,
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "center",
          maskRepeat: "no-repeat",
          display: "block",
        }}
      />
    </div>
  );
};

