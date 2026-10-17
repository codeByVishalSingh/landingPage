"use client";

import React, { useState } from "react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: "var(--color-dark)",
        color: "var(--color-canvas)",
        padding: "6rem 0 3rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div className="container">
        {/* Top Newsletter & Universe Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "3rem",
            paddingBottom: "4.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            marginBottom: "4.5rem",
          }}
          className="footer-top-grid"
        >
          <div>
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-brass)",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              JOIN THE AUDO UNIVERSE
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Invitations to Calm, <br />
              <span style={{ fontStyle: "italic" }}>Private Previews & Stories</span>
            </h3>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "#A9A298",
                maxWidth: "500px",
                lineHeight: 1.6,
              }}
            >
              Subscribe to receive curated invitations to private exhibitions, new architectural releases, and stories from Audo House Copenhagen.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {subscribed ? (
              <div
                style={{
                  padding: "1.25rem",
                  border: "1px solid var(--color-brass)",
                  background: "rgba(182, 146, 105, 0.1)",
                  fontSize: "0.875rem",
                  letterSpacing: "0.04em",
                }}
              >
                ✦ Welcome to the Audo Copenhagen Universe. An invitation has been sent to your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", borderBottom: "1px solid rgba(255, 255, 255, 0.3)" }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      color: "#FFFFFF",
                      padding: "0.85rem 0",
                      fontSize: "0.9375rem",
                      fontFamily: "var(--font-sans)",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    aria-label="Submit newsletter subscription"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--color-brass)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      padding: "0 0.5rem",
                      fontWeight: 600,
                    }}
                  >
                    JOIN →
                  </button>
                </div>
                <span style={{ fontSize: "0.6875rem", color: "#8E8880" }}>
                  By subscribing, you agree to our Privacy Policy and receiving curated correspondence.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Multi-Column Navigation Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "4.5rem",
          }}
        >
          {/* Col 1 */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "1.25rem",
                fontWeight: 600,
              }}
            >
              COLLECTIONS
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", padding: 0 }}>
              {["Architectural Furniture", "Tactile Lighting", "Objects & Vases", "Textiles & Bouclé", "The Plinth Series", "Care & Maintenance"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#collection"
                      style={{
                        fontSize: "0.8125rem",
                        color: "#A9A298",
                        textDecoration: "none",
                        transition: "color var(--transition-fast)",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "1.25rem",
                fontWeight: 600,
              }}
            >
              THE AUDO HOUSE
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", padding: 0 }}>
              {["Nordhavn Flagship Hotel", "Concept Showroom", "Audo Restaurant & Café", "Architectural Residencies", "Private Events & Venue"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#lookbook"
                      style={{
                        fontSize: "0.8125rem",
                        color: "#A9A298",
                        textDecoration: "none",
                        transition: "color var(--transition-fast)",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "1.25rem",
                fontWeight: 600,
              }}
            >
              TRADE & ARCHITECTS
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.65rem", padding: 0 }}>
              {["Trade Portal & Pricing", "Hospitality Specification", "3D / CAD & BIM Library", "Material Sample Kits", "Custom Contract Finishes"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#materiality"
                      style={{
                        fontSize: "0.8125rem",
                        color: "#A9A298",
                        textDecoration: "none",
                        transition: "color var(--transition-fast)",
                      }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#FFFFFF",
                marginBottom: "1.25rem",
                fontWeight: 600,
              }}
            >
              FLAGSHIP HUBS
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.8125rem", color: "#A9A298" }}>
              <div>
                <strong style={{ color: "#FAF8F5", display: "block" }}>Copenhagen</strong>
                Århusgade 130, 2150 Nordhavn
              </div>
              <div>
                <strong style={{ color: "#FAF8F5", display: "block" }}>New York</strong>
                57 Mercer St, SoHo, NY 10013
              </div>
              <div>
                <strong style={{ color: "#FAF8F5", display: "block" }}>Milan & Tokyo</strong>
                Via Solferino 11 & Aoyama Minato
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Brand */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: "0.75rem",
            color: "#7D776F",
          }}
        >
          <div>
            © 2026 AUDO COPENHAGEN. All rights reserved. Danish Architectural Soft Minimalism.
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Privacy Policy</span>
            <span>Terms of Trade</span>
            <span>FSC® Certificate #C144882</span>
            <span>Cookie Settings</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 820px) {
          .footer-top-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
