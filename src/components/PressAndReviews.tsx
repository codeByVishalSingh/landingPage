"use client";

import React from "react";
import { PRESS_QUOTES, REVIEWS } from "@/data/products";

export const PressAndReviews: React.FC = () => {
  return (
    <section
      id="reviews"
      style={{
        padding: "6.5rem 0",
        backgroundColor: "var(--color-canvas)",
      }}
    >
      <div className="container">
        {/* Press Quotes Carousel / Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            marginBottom: "5rem",
            paddingBottom: "4rem",
            borderBottom: "1px solid var(--color-card-border)",
          }}
        >
          {PRESS_QUOTES.map((pq, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "3rem",
                  lineHeight: 0.8,
                  color: "var(--color-brass)",
                  opacity: 0.6,
                  marginBottom: "0.5rem",
                }}
              >
                “
              </div>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  lineHeight: 1.5,
                  color: "var(--color-text-main)",
                  fontStyle: "italic",
                  marginBottom: "1.5rem",
                  flex: 1,
                }}
              >
                {pq.quote}
              </p>
              <div>
                <strong
                  style={{
                    display: "block",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-text-main)",
                  }}
                >
                  {pq.publication}
                </strong>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  {pq.authorOrIssue}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Client Testimonials */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: "var(--color-brass)",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            VERIFIED COLLECTOR REVIEWS
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 300,
            }}
          >
            Living With AUDO In Thoughtful Spaces
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-card-border)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              {/* Stars & Date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div style={{ color: "var(--color-brass)", fontSize: "0.875rem", letterSpacing: "2px" }}>
                  {"★".repeat(rev.rating)}
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  {rev.date}
                </span>
              </div>

              {/* Review Text */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "1.5rem",
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                "{rev.comment}"
              </p>

              {/* Review Author */}
              <div style={{ borderTop: "1px solid rgba(28, 26, 24, 0.06)", paddingTop: "1rem" }}>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-main)" }}>
                  {rev.author}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                  {rev.role} • {rev.location}
                </div>
                <div style={{ fontSize: "0.6875rem", color: "var(--color-brass)", marginTop: "0.25rem", letterSpacing: "0.06em" }}>
                  Verified Purchase: {rev.productName}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
