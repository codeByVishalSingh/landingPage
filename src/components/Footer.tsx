"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SHOWROOM_INFO, getWhatsAppEnquiryUrl } from "@/data/products";
import { BrandLogo } from "@/components/BrandLogo";

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
        backgroundColor: "var(--color-navy)",
        color: "var(--color-ivory)",
        padding: "3rem 0 1.5rem",
        borderTop: "1px solid rgba(197, 164, 93, 0.2)",
      }}
    >
      <div className="container">
        {/* Top Newsletter & Brand Overview Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "2.25rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            marginBottom: "2rem",
            alignItems: "center",
          }}
          className="footer-top-grid"
        >
          {/* Brand Info */}
          <div>
            <div style={{ marginBottom: "1rem" }}>
              <BrandLogo height={48} inverted={false} />
            </div>
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                display: "block",
                marginBottom: "0.45rem",
                fontWeight: 700,
              }}
            >
              CASABLANCA SOFAS · LUXURY LIVING
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.65rem, 2.8vw, 2.25rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                marginBottom: "0.75rem",
              }}
            >
              Comfort. Quality. <br />
              <span style={{ fontStyle: "italic", color: "var(--color-gold)" }}>Timeless Living.</span>
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(247, 243, 234, 0.8)",
                maxWidth: "520px",
                lineHeight: 1.55,
                fontWeight: 300,
                margin: 0,
              }}
            >
              Visit our 15,000+ sq. ft. showroom on Bellary Road or connect on WhatsApp to receive catalogue updates,
              custom dimensions, and seasonal promotion announcements.
            </p>
          </div>

          {/* Newsletter Box */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(197, 164, 93, 0.2)",
              borderRadius: "6px",
              padding: "1.75rem",
            }}
            className="footer-newsletter-card"
          >
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                fontWeight: 700,
                marginBottom: "0.35rem",
                display: "block",
              }}
            >
              STAY CONNECTED
            </span>
            <h4
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "var(--color-ivory)",
                marginBottom: "0.4rem",
                lineHeight: 1.3,
              }}
            >
              Join The Casablanca Circle
            </h4>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "rgba(247, 243, 234, 0.72)",
                lineHeight: 1.5,
                marginBottom: "1rem",
                fontWeight: 300,
              }}
            >
              Receive early catalogue releases, showroom festive packages, and design consultation updates.
            </p>

            {subscribed ? (
              <div
                style={{
                  padding: "0.875rem 1rem",
                  border: "1px solid var(--color-gold)",
                  background: "rgba(197, 164, 93, 0.15)",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.02em",
                  color: "var(--color-ivory)",
                  lineHeight: 1.5,
                }}
              >
                ✦ Thank you. Our Kurnool showroom team has sent catalogue information to your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    borderBottom: "1px solid rgba(197, 164, 93, 0.4)",
                    paddingBottom: "0.2rem",
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for catalogue updates..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      color: "#FFFFFF",
                      padding: "0.6rem 0",
                      fontSize: "0.875rem",
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
                      color: "var(--color-gold)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      padding: "0.4rem 0.5rem",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      transition: "color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                  >
                    JOIN →
                  </button>
                </div>
                <span style={{ fontSize: "0.6875rem", color: "rgba(247, 243, 234, 0.55)", marginTop: "0.25rem" }}>
                  Direct showroom notifications. No spam, only authentic furniture updates.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Multi-Column Navigation Links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "2rem 1.5rem",
            marginBottom: "1.75rem",
          }}
          className="footer-nav-grid"
        >
          {/* Col 1 */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "1rem",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              FURNITURE CATEGORIES
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem", padding: 0, margin: 0 }}>
              {[
                { name: "Sofas & Couches", href: "/sofas-kurnool" },
                { name: "Motorized Recliners", href: "/recliners-kurnool" },
                { name: "Teakwood Beds & Cots", href: "/beds-cots-kurnool" },
                { name: "Orthopedic Mattresses", href: "/mattresses-kurnool" },
                { name: "Italian Marble Dining", href: "/dining-tables-kurnool" },
                { name: "Bespoke Curtains & Blinds", href: "/curtains-blinds-kurnool" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    style={{
                      fontSize: "0.8125rem",
                      color: "rgba(247, 243, 234, 0.75)",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "color var(--transition-fast), transform var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-gold)";
                      e.currentTarget.style.transform = "translateX(2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(247, 243, 234, 0.75)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "1rem",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              KURNOOL SHOWROOM
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem", padding: 0, margin: 0 }}>
              {[
                { name: "15,000 Sq. Ft. Gallery Tour", href: "/furniture-showroom-kurnool" },
                { name: "Festive Packages & Offers", href: "/offers" },
                { name: "15-Year Teakwood Guarantee", href: "#craftsmanship" },
                { name: "Plan Showroom Visit", href: "/furniture-showroom-kurnool" },
                { name: "Customer Testimonials", href: "#reviews" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: "0.8125rem",
                      color: "rgba(247, 243, 234, 0.75)",
                      textDecoration: "none",
                      display: "inline-block",
                      transition: "color var(--transition-fast), transform var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-gold)";
                      e.currentTarget.style.transform = "translateX(2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(247, 243, 234, 0.75)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "1rem",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              REGIONAL COVERAGE
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem", padding: 0, margin: 0 }}>
              {[
                "Kurnool Town & Bellary Bypass",
                "Nandyal & Allagadda Villas",
                "Dhone & Gooty Residences",
                "Adoni & Yemmiganur Deliveries",
                "Free White-Glove Setup",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: "0.8125rem",
                    color: "rgba(247, 243, 234, 0.75)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                  }}
                >
                  <span style={{ color: "var(--color-gold)", fontSize: "0.65rem", opacity: 0.75 }}>✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4
              style={{
                fontSize: "0.75rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                marginBottom: "1rem",
                fontWeight: 700,
                lineHeight: 1.3,
              }}
            >
              LOCATION & CONTACT
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.7rem",
                fontSize: "0.8125rem",
                color: "rgba(247, 243, 234, 0.75)",
                lineHeight: 1.45,
              }}
            >
              <div>
                <strong style={{ color: "var(--color-ivory)", display: "block", fontSize: "0.75rem", letterSpacing: "0.03em", marginBottom: "0.1rem" }}>
                  Showroom Address
                </strong>
                <span>{SHOWROOM_INFO.address}</span>
              </div>
              <div>
                <strong style={{ color: "var(--color-ivory)", display: "block", fontSize: "0.75rem", letterSpacing: "0.03em", marginBottom: "0.1rem" }}>
                  Landmark
                </strong>
                <span>{SHOWROOM_INFO.landmark}</span>
              </div>
              <div>
                <strong style={{ color: "var(--color-ivory)", display: "block", fontSize: "0.75rem", letterSpacing: "0.03em", marginBottom: "0.1rem" }}>
                  Timings & Contact
                </strong>
                <span>{SHOWROOM_INFO.timing}</span>
                <div style={{ marginTop: "0.2rem" }}>
                  <a
                    href={`tel:${SHOWROOM_INFO.phone}`}
                    style={{
                      color: "var(--color-gold)",
                      textDecoration: "none",
                      fontWeight: 600,
                      transition: "color var(--transition-fast)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                  >
                    📞 {SHOWROOM_INFO.displayPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem 1.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            fontSize: "0.75rem",
            color: "rgba(247, 243, 234, 0.65)",
            lineHeight: 1.5,
          }}
          className="footer-bottom-bar"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <span>© 2026 Casablanca Sofas. All rights reserved.</span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span style={{ color: "rgba(247, 243, 234, 0.5)" }}>Kurnool, AP</span>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              href="/furniture"
              style={{ color: "rgba(247, 243, 234, 0.75)", textDecoration: "none", transition: "color var(--transition-fast)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247, 243, 234, 0.75)")}
            >
              Shop
            </Link>
            <span style={{ color: "rgba(247, 243, 234, 0.3)" }}>·</span>
            <Link
              href="/furniture-showroom-kurnool"
              style={{ color: "rgba(247, 243, 234, 0.75)", textDecoration: "none", transition: "color var(--transition-fast)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247, 243, 234, 0.75)")}
            >
              Showroom
            </Link>
            <span style={{ color: "rgba(247, 243, 234, 0.3)" }}>·</span>
            <a
              href={`tel:${SHOWROOM_INFO.phone}`}
              style={{ color: "rgba(247, 243, 234, 0.75)", textDecoration: "none", transition: "color var(--transition-fast)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(247, 243, 234, 0.75)")}
            >
              Contact
            </a>
            <span style={{ color: "rgba(247, 243, 234, 0.3)" }}>·</span>
            <span style={{ color: "rgba(247, 243, 234, 0.5)" }}>Privacy</span>
            <span style={{ color: "rgba(247, 243, 234, 0.3)" }}>·</span>
            <span style={{ color: "rgba(247, 243, 234, 0.5)" }}>Terms</span>
            <a
              href={getWhatsAppEnquiryUrl("Footer Inquiry")}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--color-gold)",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                paddingLeft: "0.75rem",
                borderLeft: "1px solid rgba(255, 255, 255, 0.15)",
                transition: "color var(--transition-fast)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
            >
              WhatsApp Assistance →
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .footer-top-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            padding-bottom: 2rem !important;
            margin-bottom: 2rem !important;
          }
          .footer-newsletter-card {
            padding: 1.5rem !important;
          }
          .footer-nav-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 2rem 1.5rem !important;
          }
        }

        @media (max-width: 600px) {
          .footer-nav-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.85rem !important;
          }
        }
      `}</style>
    </footer>
  );
};
