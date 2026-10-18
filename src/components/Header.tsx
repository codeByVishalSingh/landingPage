"use client";

import React, { useState, useEffect, useRef } from "react";
import { CurrencyCode } from "@/types";
import { CURRENCIES } from "@/data/products";

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currency,
  onCurrencyChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInSuccess, setSignInSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signInEmail) {
      setSignInSuccess(true);
      setTimeout(() => {
        setSignInSuccess(false);
        setSignInOpen(false);
        setSignInEmail("");
      }, 1800);
    }
  };

  const leftNavItems = [
    { label: "LIVING", href: "#spaces" },
    { label: "DINING", href: "#dining-dialogue" },
    { label: "BEDROOM", href: "#bedroom-atmosphere" },
    { label: "OUTDOOR", href: "#collection" },
    { label: "OFFICE", href: "#collection" },
    { label: "STORAGE", href: "#collection" },
  ];

  const rightNavItems = [
    { label: "LIGHTING", href: "#collection" },
    { label: "ACCESSORIES", href: "#collection" },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div
        id="announcement-bar"
        style={{
          background: "#161514",
          color: "#FAF8F5",
          fontSize: "0.6875rem",
          letterSpacing: "0.18em",
          padding: "0.5rem 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="animate-marquee" style={{ display: "flex", gap: "3rem" }}>
          <span>COMPLIMENTARY WHITE GLOVE DELIVERY ON ORDERS OVER $1,500</span>
          <span>•</span>
          <span>ROOTED IN DANISH SOFT MINIMALISM & ARCHITECTURAL PURSUIT</span>
          <span>•</span>
          <span>VISIT THE AUDO CONCEPT RESIDENCE IN NORDHAVN, COPENHAGEN</span>
          <span>•</span>
          <span>100% FSC® CERTIFIED SUSTAINABLE TIMBERS & NATURAL STONE</span>
          <span>•</span>
          <span>COMPLIMENTARY WHITE GLOVE DELIVERY ON ORDERS OVER $1,500</span>
          <span>•</span>
          <span>ROOTED IN DANISH SOFT MINIMALISM & ARCHITECTURAL PURSUIT</span>
        </div>
      </div>

      {/* Main Navigation Bar (Exact Behance AUDO Layout) */}
      <header
        id="main-navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: isScrolled ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(28, 26, 24, 0.08)",
          boxShadow: isScrolled ? "0 4px 25px rgba(0, 0, 0, 0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1860px",
            margin: "0 auto",
            padding: "0 2rem",
            height: "72px",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
          className="nav-container"
        >
          {/* LEFT: Category Navigation (Desktop) */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} className="desktop-left-nav">
            {leftNavItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  color: "#191919",
                  textDecoration: "none",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#191919")}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger (Only visible on small screens) */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="mobile-only-btn"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: "#191919",
              display: "none",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>

          {/* CENTER: Iconic AUDO Serif Logo */}
          <div style={{ textAlign: "center" }}>
            <a
              href="/"
              style={{
                textDecoration: "none",
                display: "inline-block",
                color: "#161514",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3vw, 2.5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                  display: "block",
                }}
              >
                Audo
              </span>
            </a>
          </div>

          {/* RIGHT: Categories + Utility Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "1.5rem",
            }}
          >
            {/* Right Desktop Nav Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} className="desktop-right-nav">
              {rightNavItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    color: "#191919",
                    textDecoration: "none",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#191919")}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Subtle Divider */}
            <div
              style={{ width: "1px", height: "20px", background: "rgba(28, 26, 24, 0.12)" }}
              className="desktop-divider"
            />

            {/* SEARCH Action Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#191919",
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.4rem 0",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#191919")}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span className="desktop-label">SEARCH</span>
            </button>

            {/* Currency Selector */}
            <div className="desktop-only">
              <select
                id="currency-select"
                aria-label="Select currency"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                style={{
                  background: "#F5F3EF",
                  border: "none",
                  borderRadius: "999px",
                  padding: "0.4rem 0.75rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#191919",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>
                    {c} ({CURRENCIES[c as CurrencyCode].symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Wishlist Heart Button */}
            <button
              onClick={onOpenWishlist}
              aria-label="Saved items"
              style={{
                position: "relative",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
                color: "#191919",
                display: "flex",
                alignItems: "center",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-brass)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#191919")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "0px",
                    right: "-2px",
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: "var(--color-brass)",
                    color: "#FFFFFF",
                    fontSize: "0.5625rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* CART (count) Button - Exact Behance Style */}
            <button
              id="cart-btn"
              onClick={onOpenCart}
              aria-label="View shopping bag"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "#161514",
                color: "#FAF8F5",
                border: "none",
                borderRadius: "999px",
                padding: "0.5rem 1.05rem",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-brass)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#161514")}
            >
              <span>CART ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            style={{
              padding: "2rem",
              background: "#FFFFFF",
              borderTop: "1px solid #EBEBEB",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "0 16px 36px rgba(0,0,0,0.12)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[...leftNavItems, ...rightNavItems].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#161514",
                    textDecoration: "none",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid #F0ECE1",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
              <select
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "999px",
                  border: "1px solid #E0E0E0",
                  background: "#FAF8F5",
                  fontWeight: 600,
                  fontSize: "0.8125rem",
                }}
              >
                {Object.keys(CURRENCIES).map((c) => (
                  <option key={c} value={c}>
                    {c} ({CURRENCIES[c as CurrencyCode].symbol})
                  </option>
                ))}
              </select>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSignInOpen(true);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-brass)",
                  cursor: "pointer",
                }}
              >
                Collector Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Collector Sign In Dialog Modal */}
      {signInOpen && (
        <div
          id="signin-modal-backdrop"
          onClick={() => setSignInOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(22, 21, 20, 0.7)",
            backdropFilter: "blur(8px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FFFFFF",
              borderRadius: "8px",
              padding: "2.5rem",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSignInOpen(false)}
              aria-label="Close dialog"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#757575",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--color-brass)",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              THE AUDO COLLECTOR CIRCLE
            </span>

            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.875rem",
                fontWeight: 400,
                color: "#191919",
                marginBottom: "0.5rem",
              }}
            >
              Welcome Back
            </h3>

            <p style={{ fontSize: "0.875rem", color: "#757575", marginBottom: "1.75rem", lineHeight: 1.5 }}>
              Access your saved favorites, bespoke architectural trade quotes, and private collection previews.
            </p>

            {signInSuccess ? (
              <div
                style={{
                  padding: "1rem",
                  background: "#F0F9F0",
                  border: "1px solid #A8D8A8",
                  borderRadius: "6px",
                  color: "#2D682D",
                  fontSize: "0.875rem",
                  textAlign: "center",
                }}
              >
                ✓ Secure link sent. Check your inbox to sign in.
              </div>
            ) : (
              <form onSubmit={handleSignInSubmit}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <label
                    htmlFor="signin-email"
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#191919",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    id="signin-email"
                    type="email"
                    required
                    placeholder="architect@studio.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      border: "1px solid #E0E0E0",
                      borderRadius: "4px",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    background: "var(--color-dark)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "999px",
                    fontSize: "0.8125rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-brass)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-dark)")}
                >
                  Continue with Email
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1180px) {
          .desktop-left-nav,
          .desktop-right-nav,
          .desktop-divider,
          .desktop-label {
            display: none !important;
          }
          .mobile-only-btn {
            display: block !important;
          }
          .nav-container {
            grid-template-columns: auto 1fr auto !important;
          }
        }
      `}</style>
    </>
  );
};
