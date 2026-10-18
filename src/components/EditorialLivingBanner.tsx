"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { PRODUCTS } from "@/data/products";

interface EditorialLivingBannerProps {
  onQuickView: (product: Product) => void;
}

export const EditorialLivingBanner: React.FC<EditorialLivingBannerProps> = ({ onQuickView }) => {
  const [pinActive, setPinActive] = useState(false);
  const eaveSofa = PRODUCTS.find((p) => p.id === "eave-sofa") || PRODUCTS[0];

  return (
    <section
      id="living-concept"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "75vh",
        maxHeight: "920px",
        overflow: "hidden",
        backgroundColor: "#161514",
        color: "#FAF8F5",
      }}
    >
      {/* Immersive Background Image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/banner-living.jpg"
          alt="Audo Concept Residence Architectural Living Space"
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center 45%",
            filter: "brightness(0.92) contrast(1.03)",
          }}
        />
        {/* Soft Vignette and Warm Atmospheric Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(22, 21, 20, 0.25) 0%, rgba(22, 21, 20, 0.1) 40%, rgba(22, 21, 20, 0.75) 100%)",
          }}
        />
      </div>

      {/* Interactive Pulsing Hotspot on Sofa */}
      <div
        style={{
          position: "absolute",
          top: "68%",
          left: "52%",
          zIndex: 10,
          transform: "translate(-50%, -50%)",
        }}
      >
        <button
          onClick={() => setPinActive(!pinActive)}
          onMouseEnter={() => setPinActive(true)}
          aria-label="View featured sofa"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.95)",
            border: "2px solid var(--color-brass)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--color-dark)",
            }}
          />
          {/* Subtle Pulse Ring */}
          <span
            style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
        </button>

        {/* Hotspot Card Tooltip */}
        {pinActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 14px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(22, 21, 20, 0.95)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "6px",
              padding: "1rem 1.25rem",
              width: "260px",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4)",
              color: "#FAF8F5",
            }}
          >
            <div
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-brass)",
                fontWeight: 600,
                marginBottom: "0.25rem",
              }}
            >
              FEATURED IN SCENE
            </div>
            <div style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.25rem" }}>
              {eaveSofa.name}
            </div>
            <div style={{ fontSize: "0.8125rem", color: "#A8A298", marginBottom: "0.85rem" }}>
              From ${eaveSofa.priceUSD.toLocaleString()} USD
            </div>
            <button
              onClick={() => {
                setPinActive(false);
                onQuickView(eaveSofa);
              }}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem",
                background: "#FAF8F5",
                color: "#161514",
                border: "none",
                borderRadius: "3px",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                fontWeight: 700,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Quick View Piece
            </button>
          </motion.div>
        )}
      </div>

      {/* Editorial Content Overlay at Bottom */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "4.5rem",
          paddingTop: "6rem",
        }}
      >
        <div style={{ maxWidth: "760px" }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--color-brass)",
              display: "inline-block",
              marginBottom: "0.75rem",
              background: "rgba(22, 21, 20, 0.75)",
              backdropFilter: "blur(8px)",
              padding: "0.3rem 0.85rem",
              borderRadius: "30px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            THE AUDO CONCEPT RESIDENCE • COPENHAGEN
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4.2vw, 3.75rem)",
              fontWeight: 300,
              lineHeight: 1.12,
              marginBottom: "1rem",
              letterSpacing: "-0.02em",
              color: "#FAF8F5",
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.4)",
            }}
          >
            Harmonious Architecture & <span style={{ fontStyle: "italic" }}>Tactile Living.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "clamp(0.9375rem, 1.4vw, 1.125rem)",
              lineHeight: 1.65,
              color: "rgba(250, 248, 245, 0.88)",
              maxWidth: "640px",
              marginBottom: "2rem",
              fontWeight: 300,
            }}
          >
            Conceived by Norm Architects as an experimental dialogue between historic timber structures,
            matte plaster surfaces, and sculptural furniture that celebrates quiet domestic sanctuaries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
          >
            <a
              href="#collection"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.85rem",
                background: "#FAF8F5",
                color: "#161514",
                borderRadius: "999px",
                textDecoration: "none",
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                fontWeight: 700,
                textTransform: "uppercase",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-brass)";
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#FAF8F5";
                e.currentTarget.style.color = "#161514";
              }}
            >
              <span>Explore The Living Room</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <button
              onClick={() => onQuickView(eaveSofa)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.75rem",
                background: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                color: "#FAF8F5",
                borderRadius: "999px",
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                fontWeight: 600,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)")}
            >
              Shop Eave Sofa
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
