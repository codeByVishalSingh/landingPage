"use client";

import React from "react";
import { motion } from "framer-motion";
import { CURRENT_PROMOTIONS, formatPriceINR, getWhatsAppEnquiryUrl } from "@/data/products";

export const PromotionsSection: React.FC = () => {
  return (
    <section
      id="offers"
      style={{
        padding: "6.5rem 0",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid var(--color-card-border)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 3.5rem" }}>
          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--color-gold)",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            FESTIVE PACKAGES & SPECIAL INCENTIVES
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 3.8vw, 3.25rem)",
              fontWeight: 300,
              color: "var(--color-navy)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Current <span style={{ fontStyle: "italic", color: "var(--color-gold)" }}>Promotions</span>
          </h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            Limited seasonal showroom offers for home upgrades, weddings, and zero-cost EMI assistance in Kurnool.
          </p>
        </div>

        {/* Promotions Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {CURRENT_PROMOTIONS.map((promo, idx) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              style={{
                background: "var(--color-canvas)",
                border: "1.5px solid rgba(197, 164, 93, 0.35)",
                borderRadius: "6px",
                padding: "2.5rem",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "inline-block",
                  alignSelf: "flex-start",
                  background: "var(--color-navy)",
                  color: "var(--color-gold)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  padding: "0.35rem 0.85rem",
                  borderRadius: "2px",
                  marginBottom: "1.25rem",
                }}
              >
                {promo.badge}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  color: "var(--color-navy)",
                  lineHeight: 1.25,
                  marginBottom: "0.75rem",
                }}
              >
                {promo.title}
              </h3>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                  fontWeight: 300,
                  minHeight: "4.8rem",
                }}
              >
                {promo.description}
              </p>

              {/* Price & Savings */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  padding: "1rem 1.25rem",
                  background: "#FFFFFF",
                  borderRadius: "4px",
                  border: "1px solid rgba(16, 43, 70, 0.08)",
                }}
              >
                <div suppressHydrationWarning style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-navy)" }}>
                  {formatPriceINR(promo.offerPriceINR)}
                </div>
                <div suppressHydrationWarning style={{ fontSize: "0.875rem", textDecoration: "line-through", color: "var(--color-text-muted)" }}>
                  {formatPriceINR(promo.originalPriceINR)}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-whatsapp)", marginLeft: "auto" }}>
                  {promo.savingsText}
                </div>
              </div>

              {/* Highlights with flexGrow so button always pins to the exact bottom */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 2rem 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  flexGrow: 1,
                }}
              >
                {promo.highlights.map((h, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8125rem", color: "var(--color-text-main)" }}>
                    <span style={{ color: "var(--color-gold)", fontWeight: 700 }}>✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Perfectly aligned CTA button */}
              <a
                href={getWhatsAppEnquiryUrl(`Festive Promotion Enquiry: ${promo.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "0.85rem",
                  fontSize: "0.8125rem",
                  borderRadius: "4px",
                  marginTop: "auto",
                }}
              >
                Claim Offer on WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
