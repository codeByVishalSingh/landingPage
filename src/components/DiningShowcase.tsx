"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { CURRENCIES, PRODUCTS } from "@/data/products";

interface DiningShowcaseProps {
  currency: CurrencyCode;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, f: ProductFinish) => void;
}

export const DiningShowcase: React.FC<DiningShowcaseProps> = ({
  currency,
  onQuickView,
  onAddToCart,
}) => {
  const curr = CURRENCIES[currency];
  const table = PRODUCTS.find((p) => p.id === "androgyne-dining-table") || PRODUCTS[2];
  const tablePrice = Math.round(table.priceUSD * curr.rate);

  return (
    <section
      id="dining-dialogue"
      style={{
        padding: "6.5rem 0",
        backgroundColor: "var(--color-canvas)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="dining-layout"
        >
          {/* LEFT: Editorial Story & Specifications */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-brass)",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              HOSPITALITY & GATHERING
            </span>

            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "var(--color-text-main)",
                marginBottom: "1.25rem",
              }}
            >
              Spatial Dialogues & <span style={{ fontStyle: "italic" }}>Shared Rituals.</span>
            </h2>

            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--color-text-secondary)",
                marginBottom: "1.5rem",
                fontWeight: 300,
              }}
            >
              Where the culinary arts intersect with architectural permanence. Solid smoked oak,
              sculptural Italian saddle leather, and the focused golden aura of spun brass pendants
              frame intimate conversations and long evening gatherings.
            </p>

            {/* Design Spec Highlights */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "2rem",
                padding: "1.25rem",
                background: "#FFFFFF",
                borderRadius: "4px",
                border: "1px solid var(--color-card-border)",
              }}
            >
              <div>
                <div style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-brass)", fontWeight: 600 }}>
                  MATERIALITY
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-main)" }}>
                  Smoked European Oak
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  Sustainably harvested FSC® timber
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-brass)", fontWeight: 600 }}>
                  ERGONOMICS
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-main)" }}>
                  Curved Shell Seating
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  Engineered for hours of comfort
                </div>
              </div>
            </div>

            {/* Featured Product Card */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid var(--color-card-border)",
                borderRadius: "4px",
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1.25rem",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    position: "relative",
                    width: "70px",
                    height: "70px",
                    borderRadius: "3px",
                    overflow: "hidden",
                    background: "#F6F3EE",
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={table.primaryImage}
                    alt={table.name}
                    fill
                    sizes="70px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-main)" }}>
                    {table.name}
                  </div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-brass)" }}>
                    {curr.symbol}
                    {tablePrice.toLocaleString()} {currency}
                  </div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>
                    {table.finishes[0].name}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => onAddToCart(table, table.finishes[0])}
                  style={{
                    padding: "0.55rem 1.15rem",
                    background: "var(--color-dark)",
                    color: "#FAF8F5",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-brass)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-dark)")}
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => onQuickView(table)}
                  style={{
                    padding: "0.55rem 0.95rem",
                    background: "transparent",
                    color: "var(--color-text-main)",
                    border: "1px solid var(--color-card-border)",
                    borderRadius: "999px",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  View
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Dining Scene Photography */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              position: "relative",
              height: "560px",
              borderRadius: "4px",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              border: "1px solid rgba(28, 26, 24, 0.08)",
            }}
          >
            <Image
              src="/images/dining-space.jpg"
              alt="Audo Copenhagen Architectural Dining & Hospitality"
              fill
              sizes="(max-width: 992px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
            {/* Subtle Tag */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "rgba(22, 21, 20, 0.82)",
                backdropFilter: "blur(10px)",
                padding: "0.4rem 1rem",
                borderRadius: "999px",
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "#FAF8F5",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              THE AUDO RESTAURANT & SALON • NORDHAVN
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .dining-layout {
            grid-template-columns: 1fr !important;
          }
          .dining-layout > div:first-child {
            order: 2;
          }
          .dining-layout > div:last-child {
            order: 1;
          }
        }
      `}</style>
    </section>
  );
};
