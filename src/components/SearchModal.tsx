"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { CurrencyCode, Product } from "@/types";
import { CURRENCIES, PRODUCTS } from "@/data/products";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
  onSelectProduct: (p: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const curr = CURRENCIES[currency];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return PRODUCTS.slice(0, 4);
    const q = searchTerm.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.designer.toLowerCase().includes(q) ||
        p.materials.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      id="search-modal-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(22, 21, 20, 0.7)",
        backdropFilter: "blur(8px)",
        zIndex: 60,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "5rem 1.5rem 2rem",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        style={{
          width: "100%",
          maxWidth: "760px",
          backgroundColor: "var(--color-canvas)",
          border: "1px solid var(--color-card-border)",
          boxShadow: "var(--shadow-lg)",
          padding: "2rem",
          borderRadius: "2px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            paddingBottom: "1.25rem",
            borderBottom: "1px solid var(--color-card-border)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            id="search-input-field"
            type="text"
            autoFocus
            placeholder="Search by piece, designer, material (e.g. Plinth, Bouclé, Travertine)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              fontSize: "1.125rem",
              fontFamily: "var(--font-sans)",
              color: "var(--color-text-main)",
              outline: "none",
            }}
          />

          <button
            onClick={onClose}
            aria-label="Close search"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "1.25rem",
              color: "var(--color-text-secondary)",
            }}
          >
            ✕
          </button>
        </div>

        {/* Quick Search Suggestions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            flexWrap: "wrap",
            margin: "1.25rem 0 1.75rem",
          }}
        >
          <span style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
            POPULAR INQUIRIES:
          </span>
          {["Plinth Table", "Hashira Lamp", "Bouclé", "Norm Architects", "Travertine"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              style={{
                background: "rgba(28, 26, 24, 0.05)",
                border: "none",
                padding: "0.3rem 0.65rem",
                borderRadius: "2px",
                fontSize: "0.75rem",
                color: "var(--color-text-secondary)",
                cursor: "pointer",
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div>
          <div
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: "1rem",
            }}
          >
            {searchTerm ? `RESULTS (${filteredProducts.length})` : "RECOMMENDED CREATIONS"}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxHeight: "360px",
              overflowY: "auto",
            }}
          >
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr auto",
                  gap: "1rem",
                  alignItems: "center",
                  padding: "0.75rem",
                  background: "var(--color-card)",
                  border: "1px solid var(--color-card-border)",
                  cursor: "pointer",
                  transition: "background var(--transition-fast)",
                }}
              >
                <div style={{ position: "relative", width: "60px", height: "60px", backgroundColor: "#EFECE6" }}>
                  <Image src={p.primaryImage} alt={p.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.0625rem", color: "var(--color-text-main)" }}>
                    {p.name}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    {p.designer} • {p.materials.split(",")[0]}
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                  {curr.symbol}
                  {Math.round(p.priceUSD * curr.rate).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
