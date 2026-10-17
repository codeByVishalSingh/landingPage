"use client";

import React from "react";

export type FilterCategory = "all" | "furniture" | "lighting" | "objects" | "featured";
export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

interface CategoryFilterProps {
  activeCategory: FilterCategory;
  onSelectCategory: (cat: FilterCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  counts: Record<FilterCategory, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  counts,
}) => {
  const tabs: { key: FilterCategory; label: string }[] = [
    { key: "all", label: "All Creations" },
    { key: "furniture", label: "Furniture" },
    { key: "lighting", label: "Architectural Lighting" },
    { key: "objects", label: "Objects & Vessels" },
    { key: "featured", label: "Iconic Designs" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.5rem",
        padding: "1.75rem 0",
        borderBottom: "1px solid var(--color-card-border)",
        marginBottom: "3rem",
      }}
    >
      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeCategory === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectCategory(tab.key)}
              id={`filter-${tab.key}`}
              style={{
                background: isActive ? "var(--color-dark)" : "transparent",
                color: isActive ? "var(--color-canvas)" : "var(--color-text-secondary)",
                border: "1px solid",
                borderColor: isActive ? "var(--color-dark)" : "rgba(28, 26, 24, 0.12)",
                padding: "0.55rem 1.1rem",
                borderRadius: "2px",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all var(--transition-fast)",
              }}
            >
              <span>{tab.label}</span>
              <span
                style={{
                  fontSize: "0.6875rem",
                  opacity: isActive ? 0.8 : 0.6,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                ({counts[tab.key] ?? 0})
              </span>
            </button>
          );
        })}
      </div>

      {/* Sort By Selector */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            fontWeight: 500,
          }}
        >
          SORT BY:
        </span>
        <select
          id="sort-select"
          aria-label="Sort products by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          style={{
            background: "transparent",
            border: "1px solid var(--color-card-border)",
            borderRadius: "2px",
            padding: "0.45rem 0.85rem",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: "var(--color-text-main)",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            outline: "none",
          }}
        >
          <option value="featured">Featured Archive</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>
    </div>
  );
};
