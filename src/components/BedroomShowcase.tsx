"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { CURRENCIES, PRODUCTS } from "@/data/products";

interface BedroomShowcaseProps {
  currency: CurrencyCode;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, f: ProductFinish) => void;
}

export const BedroomShowcase: React.FC<BedroomShowcaseProps> = ({
  currency,
  onQuickView,
  onAddToCart,
}) => {
  const curr = CURRENCIES[currency];
  const lamp = PRODUCTS.find((p) => p.id === "hashira-lamp") || PRODUCTS[1];
  const lampPrice = Math.round(lamp.priceUSD * curr.rate);

  return (
    <section
      id="bedroom-atmosphere"
      style={{
        padding: "6.5rem 0",
        backgroundColor: "#F7F5F0",
        borderTop: "1px solid var(--color-card-border)",
        borderBottom: "1px solid var(--color-card-border)",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
          className="bedroom-layout"
        >
          {/* LEFT: Atmospheric Photography */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
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
              src="/images/bedroom-space.jpg"
              alt="Audo Copenhagen Minimalist Bedroom Sanctuary"
              fill
              sizes="(max-width: 992px) 100vw, 55vw"
              style={{ objectFit: "cover" }}
            />
            {/* Subtle Pill Tag */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                background: "rgba(255, 255, 255, 0.9)",
                backdropFilter: "blur(10px)",
                padding: "0.4rem 1rem",
                borderRadius: "999px",
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-text-main)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              }}
            >
              BEDROOM SANCTUARY • 2700K ILLUMINATION
            </div>
          </motion.div>

          {/* RIGHT: Editorial Narrative & Featured Product */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
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
              ATMOSPHERIC RESTORATION
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
              The Quiet <span style={{ fontStyle: "italic" }}>Sanctuary.</span>
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
              Conceived as an antidote to urban sensory overstimulation. Low-slung FSC® oak framing,
              unbleached natural linen bedding, and soft translucent washi paper pendants filter
              warm candlelight tones to gently transition the mind into deep restorative rest.
            </p>

            {/* Tactile Material Badges */}
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
                  DIFFUSION
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-main)" }}>
                  Japanese Washi Linen
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  Glare-free warm 2700K glow
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-brass)", fontWeight: 600 }}>
                  STRUCTURE
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-main)" }}>
                  European White Oak
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  Natural organic beeswax finish
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
                    src={lamp.primaryImage}
                    alt={lamp.name}
                    fill
                    sizes="70px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-main)" }}>
                    {lamp.name}
                  </div>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-brass)" }}>
                    {curr.symbol}
                    {lampPrice.toLocaleString()} {currency}
                  </div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}>
                    {lamp.finishes[0].name}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => onAddToCart(lamp, lamp.finishes[0])}
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
                  onClick={() => onQuickView(lamp)}
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
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .bedroom-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
