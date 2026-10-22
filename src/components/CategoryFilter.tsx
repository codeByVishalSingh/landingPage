"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export type FilterCategory = "all" | "sofas" | "recliners" | "beds" | "dining" | "curtains" | "featured";
export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

interface CategoryFilterProps {
  activeCategory: FilterCategory;
  onSelectCategory: (cat: FilterCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  counts: Record<FilterCategory, number>;
}

const tabs: { key: FilterCategory; label: string }[] = [
  { key: "all", label: "All Furniture" },
  { key: "sofas", label: "Sofas & Couches" },
  { key: "recliners", label: "Motorized Recliners" },
  { key: "beds", label: "Beds & Cots" },
  { key: "dining", label: "Dining Tables" },
  { key: "curtains", label: "Curtains & Blinds" },
  { key: "featured", label: "Kurnool Bestsellers" },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  counts,
}) => {
  // A 1px marker just above the bar: once it scrolls under the nav, the bar is floating.
  const markerRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = markerRef.current;
      if (el) setStuck(el.getBoundingClientRect().top < 92);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
  <>
  <div ref={markerRef} aria-hidden="true" style={{ height: 1 }} />
  <div className={`cf-bar${stuck ? " is-stuck" : ""}`}>
    <div className="cf-inner">
    <div className="cf-tabs" role="tablist" aria-label="Filter by category">
      {tabs.map((tab, i) => {
        const isActive = activeCategory === tab.key;
        return (
          <motion.button
            key={tab.key}
            id={`filter-${tab.key}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelectCategory(tab.key)}
            className={`cf-tab ${isActive ? "is-active" : ""}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab.label}
            {isActive && <motion.span layoutId="cf-underline" className="cf-underline" />}
          </motion.button>
        );
      })}
    </div>

    <label className="cf-sort">
      <span>Sort by</span>
      <select
        id="sort-select"
        aria-label="Sort products by"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      >
        <option value="featured">Featured in Kurnool Showroom</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest Rated by Customers</option>
      </select>
    </label>
    </div>
  </div>
  </>
  );
};
