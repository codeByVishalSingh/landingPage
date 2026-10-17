"use client";

import React, { useState } from "react";
import { MATERIAL_SPOTLIGHTS } from "@/data/products";

export const MaterialitySection: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_SPOTLIGHTS[0]);

  return (
    <section
      id="materiality"
      style={{
        padding: "6.5rem 0",
        backgroundColor: "var(--color-canvas)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 3.5rem" }}>
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
            MATERIAL INTEGRITY & CRAFTSMANSHIP
          </span>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 300,
              color: "var(--color-text-main)",
              marginBottom: "1rem",
              lineHeight: 1.15,
            }}
          >
            The Poetry of <span style={{ fontStyle: "italic" }}>Raw Materials</span>
          </h2>

          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            We believe that true luxury lies in tactile honesty. Every piece is shaped from natural materials selected for their longevity, sensory warmth, and ability to age with profound grace.
          </p>
        </div>

        {/* 4 Material Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.75rem",
            marginBottom: "3rem",
          }}
        >
          {MATERIAL_SPOTLIGHTS.map((mat) => {
            const isSelected = selectedMaterial.id === mat.id;
            return (
              <div
                key={mat.id}
                onClick={() => setSelectedMaterial(mat)}
                style={{
                  background: isSelected ? "var(--color-dark)" : "var(--color-card)",
                  color: isSelected ? "var(--color-canvas)" : "var(--color-text-main)",
                  border: "1px solid",
                  borderColor: isSelected ? "var(--color-dark)" : "var(--color-card-border)",
                  padding: "2rem",
                  cursor: "pointer",
                  transition: "all var(--transition-normal)",
                  boxShadow: isSelected ? "var(--shadow-lg)" : "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transform: isSelected ? "translateY(-4px)" : "none",
                }}
              >
                {/* Visual Swatch Pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: mat.accentColor,
                      border: "2px solid rgba(255, 255, 255, 0.4)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.625rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: isSelected ? "var(--color-brass)" : "var(--color-text-muted)",
                      fontWeight: 600,
                    }}
                  >
                    {mat.origin}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.375rem",
                    marginBottom: "0.5rem",
                    lineHeight: 1.25,
                  }}
                >
                  {mat.name}
                </h3>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: isSelected ? "#C8C2B7" : "var(--color-text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "1.5rem",
                  }}
                >
                  {mat.tagline}
                </p>

                {/* Tactile Points */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    marginTop: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  {mat.tactileCharacteristics.map((char, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "0.75rem",
                        color: isSelected ? "#FAF8F5" : "var(--color-text-secondary)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--color-brass)", fontSize: "0.7rem" }}>✦</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Selected Material Deep Note */}
        <div
          style={{
            background: "var(--color-card)",
            border: "1px solid var(--color-card-border)",
            padding: "2rem 2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div style={{ maxWidth: "700px" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-brass)",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.25rem",
              }}
            >
              FOCUS: {selectedMaterial.name.toUpperCase()}
            </span>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              {selectedMaterial.description}
            </p>
          </div>

          <a
            href="#collection"
            className="btn-secondary"
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "0.75rem",
            }}
          >
            VIEW PIECES IN THIS MATERIAL →
          </a>
        </div>
      </div>
    </section>
  );
};
