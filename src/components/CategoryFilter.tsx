"use client";

import React from "react";

export type FilterCategory = "all" | "sofas" | "recliners" | "beds" | "dining" | "curtains" | "featured";
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
    { key: "all", label: "All Furniture" },
    { key: "sofas", label: "Sofas & Couches" },
    { key: "recliners", label: "Motorized Recliners" },
    { key: "beds", label: "Beds & Cots" },
    { key: "dining", label: "Dining Tables" },
    { key: "curtains", label: "Curtains & Blinds" },
    { key: "featured", label: "Kurnool Bestsellers" },
  ];

  return (
    <div
      className="catalogue-filter-bar"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1.25rem",
        padding: "1.25rem 0",
        borderBottom: "1px solid var(--color-card-border)",
        marginBottom: "2.5rem",
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
                background: isActive ? "var(--color-navy)" : "transparent",
                color: isActive ? "var(--color-ivory)" : "var(--color-text-main)",
                border: "1px solid",
                borderColor: isActive ? "var(--color-navy)" : "rgba(16, 43, 70, 0.14)",
                padding: "0.5rem 1rem",
                borderRadius: "3px",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                transition: "all var(--transition-fast)",
              }}
            >
              <span>{tab.label}</span>
              <span
                suppressHydrationWarning
                style={{
                  fontSize: "0.6875rem",
                  color: isActive ? "var(--color-gold)" : "var(--color-text-muted)",
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 700,
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
            fontWeight: 600,
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
            background: "#FFFFFF",
            border: "1px solid var(--color-card-border)",
            borderRadius: "3px",
            padding: "0.45rem 0.85rem",
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            color: "var(--color-navy)",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            outline: "none",
          }}
        >
          <option value="featured">Featured in Kurnool Showroom</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated by Customers</option>
        </select>
      </div>
    </div>
  );
};
