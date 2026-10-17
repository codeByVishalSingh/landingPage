"use client";

import React from "react";
import { DESIGNERS } from "@/data/products";

export const DesignerSpotlight: React.FC = () => {
  return (
    <section
      id="designers"
      style={{
        padding: "6rem 0",
        backgroundColor: "var(--color-canvas-alt)",
        borderTop: "1px solid var(--color-card-border)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 3.5rem" }}>
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
            DESIGN ARCHITECTURE
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
            Visionary Minds, <span style={{ fontStyle: "italic" }}>Enduring Legacy</span>
          </h2>

          <p
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            We collaborate with leading Nordic architects and visionaries who share our deep reverence for light, proportion, and quiet human spaces.
          </p>
        </div>

        {/* Designers Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {DESIGNERS.map((d, idx) => (
            <div
              key={idx}
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-card-border)",
                padding: "2.25rem 2rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-sm)",
                transition: "transform var(--transition-normal), box-shadow var(--transition-normal)",
              }}
            >
              <div
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                {d.role}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.625rem",
                  color: "var(--color-text-main)",
                  marginBottom: "0.25rem",
                  lineHeight: 1.2,
                }}
              >
                {d.name}
              </h3>

              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "1.25rem",
                }}
              >
                {d.base}
              </div>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "1.75rem",
                }}
              >
                {d.bio}
              </p>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(28, 26, 24, 0.08)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.625rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    display: "block",
                    marginBottom: "0.2rem",
                  }}
                >
                  SIGNATURE PIECES:
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--color-text-main)",
                    fontWeight: 500,
                  }}
                >
                  {d.signature}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
