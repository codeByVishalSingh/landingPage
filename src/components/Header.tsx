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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [navSearchQuery, setNavSearchQuery] = useState("");
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInSuccess, setSignInSuccess] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenSearch();
  };

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

  return (
    <>
      {/* Top Utility / Announcement Marquee */}
      <div
        id="announcement-bar"
        style={{
          background: "#161514",
          color: "#FAF8F5",
          fontSize: "0.6875rem",
          letterSpacing: "0.16em",
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
          <span>EXPERIENCE THE AUDO HOUSE COPENHAGEN IN NORDHAVN</span>
          <span>•</span>
          <span>FSC® CERTIFIED SUSTAINABLE TIMBERS & NATURAL STONE</span>
          <span>•</span>
          <span>COMPLIMENTARY WHITE GLOVE DELIVERY ON ORDERS OVER $1,500</span>
          <span>•</span>
          <span>ROOTED IN DANISH SOFT MINIMALISM & ARCHITECTURAL PURSUIT</span>
        </div>
      </div>

      {/* Main Reference-Style Navigation Bar */}
      <header
        id="main-navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "#FFFFFF",
          borderBottom: "1px solid #EBEBEB",
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.06)" : "none",
          transition: "box-shadow 0.25s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1860px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.25rem",
          }}
          ref={dropdownRef}
        >
          {/* LEFT GROUP: Logo + Menu Items */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexShrink: 0 }}>
            {/* Logo */}
            <a
              href="/"
              style={{
                textDecoration: "none",
                color: "#191919",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.45rem",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "#191919",
                }}
              >
                AUDO
              </span>
              <span
                style={{
                  fontSize: "0.5625rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: "#757575",
                  marginTop: "2px",
                }}
              >
                CPH
              </span>
            </a>

            {/* Desktop Menu Links */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
              className="desktop-menu"
            >
              <a
                href="#collection"
                style={{
                  color: "#191919",
                  textDecoration: "none",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  transition: "color 0.2s ease",
                }}
              >
                Explore
              </a>

              <a
                href="#lookbook"
                style={{
                  color: "#191919",
                  textDecoration: "none",
                  fontSize: "0.9375rem",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  transition: "color 0.2s ease",
                }}
              >
                Spaces
              </a>

              {/* Dropdown: Materials */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "materials" ? null : "materials")}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#191919",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.4rem 0",
                  }}
                >
                  <span>Materials</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {activeDropdown === "materials" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "0",
                      width: "280px",
                      background: "#FFFFFF",
                      borderRadius: "6px",
                      boxShadow: "0 12px 36px rgba(0, 0, 0, 0.12)",
                      border: "1px solid #E8E8E8",
                      padding: "0.75rem 0",
                      zIndex: 60,
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    {[
                      { name: "Kunis Breccia Travertine", desc: "Porous natural limestone" },
                      { name: "Smoked European Oak", desc: "FSC® certified timber" },
                      { name: "Heavy Italian Bouclé", desc: "50,000+ Martindale wool" },
                      { name: "Solid Cast Brass", desc: "Living, oxidizing patina" },
                    ].map((item) => (
                      <a
                        key={item.name}
                        href="#materiality"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: "block",
                          padding: "0.6rem 1.25rem",
                          textDecoration: "none",
                          color: "#191919",
                          transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F7F7")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#757575" }}>{item.desc}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown: Studio & Arch */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === "studio" ? null : "studio")}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#191919",
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.4rem 0",
                  }}
                >
                  <span>Studio</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {activeDropdown === "studio" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      left: "0",
                      width: "290px",
                      background: "#FFFFFF",
                      borderRadius: "6px",
                      boxShadow: "0 12px 36px rgba(0, 0, 0, 0.12)",
                      border: "1px solid #E8E8E8",
                      padding: "0.75rem 0",
                      zIndex: 60,
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
                    {[
                      { name: "3D Configurator Lab", desc: "Interactive 360° orbit viewer", href: "#3d-studio" },
                      { name: "Cinematography Film", desc: "The Audo documentary", href: "#film" },
                      { name: "The Audo House", desc: "Nordhavn boutique hotel", href: "#lookbook" },
                      { name: "Architectural Concierge", desc: "Trade & hospitality spec", href: "#pillars" },
                    ].map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: "block",
                          padding: "0.6rem 1.25rem",
                          textDecoration: "none",
                          color: "#191919",
                          transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F7F7F7")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{item.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "#757575" }}>{item.desc}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Subtle Vertical Divider */}
            <div
              style={{
                width: "1px",
                height: "22px",
                backgroundColor: "#E0E0E0",
              }}
              className="desktop-divider"
            />
          </div>

          {/* CENTER GROUP: Pill-Shaped Search Bar */}
          <div style={{ flex: 1, maxWidth: "560px", margin: "0 1rem" }} className="search-bar-container">
            <form onSubmit={handleSearchSubmit} style={{ position: "relative", width: "100%" }}>
              <div
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none",
                  color: "#757575",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>

              <input
                type="text"
                placeholder="Search..."
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                onClick={onOpenSearch}
                style={{
                  width: "100%",
                  height: "38px",
                  padding: "0 1rem 0 2.5rem",
                  background: "#F5F5F5",
                  border: "1px solid transparent",
                  borderRadius: "999px",
                  fontSize: "0.875rem",
                  color: "#191919",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                  transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.background = "#FFFFFF";
                  e.currentTarget.style.borderColor = "#0057FF";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 87, 255, 0.15)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.background = "#F5F5F5";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </form>
          </div>

          {/* RIGHT GROUP: Action Buttons Matching Reference */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            {/* Currency Selector Pill */}
            <div style={{ position: "relative" }} className="desktop-only">
              <select
                id="currency-select"
                aria-label="Select currency"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                style={{
                  background: "#F5F5F5",
                  border: "none",
                  borderRadius: "999px",
                  padding: "0.45rem 0.8rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#191919",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
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

            {/* Wishlist Heart Icon */}
            <button
              onClick={onOpenWishlist}
              aria-label="View saved creations"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#F5F5F5",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#191919",
                position: "relative",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    background: "#0057FF",
                    color: "#FFFFFF",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Primary Blue Button ("Start Free Trial" Style -> Explore Collection) */}
            <a
              href="#collection"
              className="primary-blue-pill"
              style={{
                background: "#0057FF",
                color: "#FFFFFF",
                borderRadius: "999px",
                padding: "0.5rem 1.15rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "-0.01em",
                transition: "background 0.2s ease, transform 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0047D4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#0057FF";
              }}
            >
              Explore Collection
            </a>

            {/* Secondary Soft Grey Pill Button ("Sign In") */}
            <button
              onClick={() => setSignInOpen(true)}
              style={{
                background: "#EBEBEB",
                color: "#0057FF",
                border: "none",
                borderRadius: "999px",
                padding: "0.5rem 1.1rem",
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s ease",
                whiteSpace: "nowrap",
              }}
              className="desktop-only"
              onMouseEnter={(e) => (e.currentTarget.style.background = "#E0E0E0")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#EBEBEB")}
            >
              Sign In
            </button>

            {/* Shopping Bag Button (Adobe-like position) */}
            <button
              id="cart-btn"
              onClick={onOpenCart}
              aria-label="View shopping bag"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "#191919",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "999px",
                padding: "0.5rem 0.95rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>{cartCount}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="mobile-hamburger"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.4rem",
                color: "#191919",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-panel"
            style={{
              padding: "1.5rem 1.5rem 2rem",
              background: "#FFFFFF",
              borderTop: "1px solid #EBEBEB",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            }}
          >
            {/* Search inside Mobile Menu */}
            <form onSubmit={handleSearchSubmit} style={{ position: "relative", width: "100%" }}>
              <input
                type="text"
                placeholder="Search creations, spaces..."
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                onClick={onOpenSearch}
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "0 1rem 0 2.5rem",
                  background: "#F5F5F5",
                  border: "1px solid #E0E0E0",
                  borderRadius: "999px",
                  fontSize: "0.875rem",
                  color: "#191919",
                  outline: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#757575",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </form>

            <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { label: "Explore Collection", href: "#collection" },
                { label: "Architectural Spaces", href: "#lookbook" },
                { label: "3D Configurator Studio", href: "#3d-studio" },
                { label: "Cinematography Film", href: "#film" },
                { label: "Materiality & Tactile Truth", href: "#materiality" },
                { label: "Designers & Architects", href: "#designers" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 600,
                    color: "#191919",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.5rem" }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSignInOpen(true);
                }}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "#F0F0F0",
                  color: "#0057FF",
                  borderRadius: "999px",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Collector Sign In Dialog */}
      {signInOpen && (
        <div
          id="signin-modal-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
          onClick={() => setSignInOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              padding: "2.5rem 2rem",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSignInOpen(false)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "transparent",
                border: "none",
                fontSize: "1.25rem",
                cursor: "pointer",
                color: "#757575",
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <span style={{ fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.04em", display: "block" }}>
                AUDO
              </span>
              <span style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", color: "#757575", textTransform: "uppercase" }}>
                COLLECTOR PORTAL
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginTop: "1rem", fontWeight: 400 }}>
                Sign In to Your Space
              </h3>
            </div>

            {signInSuccess ? (
              <div
                style={{
                  padding: "1.25rem",
                  background: "#E8F5E9",
                  color: "#2E7D32",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                ✓ Welcome back. Session restored.
              </div>
            ) : (
              <form onSubmit={handleSignInSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#191919", display: "block", marginBottom: "0.4rem" }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="architect@studio.com"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "4px",
                      border: "1px solid #D0D0D0",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "#0057FF",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "999px",
                    padding: "0.85rem",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: "0.5rem",
                  }}
                >
                  Continue to Audo
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style jsx>{`
        .desktop-menu {
          display: flex;
        }
        .desktop-divider {
          display: block;
        }
        .desktop-only {
          display: block;
        }
        .mobile-hamburger {
          display: none;
        }

        @media (max-width: 1024px) {
          .search-bar-container {
            max-width: 320px !important;
          }
          .desktop-menu {
            gap: 1rem !important;
          }
        }

        @media (max-width: 820px) {
          .desktop-menu {
            display: none !important;
          }
          .desktop-divider {
            display: none !important;
          }
          .desktop-only {
            display: none !important;
          }
          .mobile-hamburger {
            display: flex !important;
          }
          .primary-blue-pill {
            display: none !important;
          }
          .search-bar-container {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
