"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CurrencyCode } from "@/types";
import { SHOWROOM_INFO, getWhatsAppEnquiryUrl, getShowroomBookingWhatsAppUrl } from "@/data/products";
import { BrandLogo } from "@/components/BrandLogo";

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  cartCount?: number;
  wishlistCount: number;
  onOpenCart?: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shopCategories = [
    { label: "Sofas & Couches", href: "/sofas-kurnool", count: "24 Designs" },
    { label: "Motorized Recliners", href: "/recliners-kurnool", count: "16 Models" },
    { label: "Beds & Cots", href: "/beds-cots-kurnool", count: "28 Cots" },
    { label: "Dining Tables", href: "/dining-tables-kurnool", count: "18 Sets" },
    { label: "Curtains & Blinds", href: "/curtains-blinds-kurnool", count: "12 Styles" },
    { label: "Mattresses & Spine Care", href: "/mattresses-kurnool", count: "Orthopedic" },
    { label: "All Furniture Catalogue", href: "/furniture", count: "View All" },
  ];

  return (
    <>
      {/* 
        COMPACT LUXURY NAVBAR - Section 2 of Brief:
        Left: Circular CB medallion + CASABLANCA SOFAS
        Center: HOME · SHOP · COLLECTIONS · OUR SHOWROOM · OFFERS · CONTACT
        Right: Search Icon · Shortlist Bookmark Icon · Visible WhatsApp Enquiry Button
      */}
      <header
        id="main-navigation"
        className={`main-header ${isScrolled ? "is-scrolled" : ""}`}
      >
        <div className="header-inner">
          {/* LEFT: primary links */}
          <nav aria-label="Primary navigation" className="desktop-nav-links nav-left">
            <Link href="/" className="nav-link">
              Home
            </Link>

            <div
              className="nav-dropdown-wrap"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <Link href="/furniture" className="nav-link">
                <span>Shop</span>
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  style={{
                    transition: "transform 0.2s ease",
                    transform: shopDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    marginLeft: "0.4rem",
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </Link>

              {shopDropdownOpen && (
                <div className="nav-dropdown-panel">
                  <div className="nav-dropdown-card">
                    <span className="nav-dropdown-eyebrow">SHOP BY CATEGORY</span>
                    {shopCategories.map((cat, i) => (
                      <Link key={i} href={cat.href} className="nav-dropdown-item">
                        <span>{cat.label}</span>
                        <span className="nav-dropdown-count">{cat.count}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/#collection" className="nav-link">
              Collections
            </Link>
          </nav>

          {/* CENTER: brand logo */}
          <div className="header-brand-wrap">
            <Link
              href="/"
              aria-label="Casablanca Sofas - Home"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}
            >
              <BrandLogo size="lg" isScrolled={isScrolled} />
            </Link>
          </div>

          {/* RIGHT: secondary links + actions */}
          <div className="nav-right-group">
            <nav aria-label="Secondary navigation" className="desktop-nav-links nav-right">
              <Link href="/furniture-showroom-kurnool" className="nav-link">
                Our Showroom
              </Link>
              <Link href="/offers" className="nav-link">
                Offers
              </Link>
              <button type="button" onClick={() => setContactModalOpen(true)} className="nav-link">
                Contact
              </button>
            </nav>

            <div className="header-actions">
              <button type="button" onClick={onOpenSearch} aria-label="Search collection" className="nav-link nav-action">
                Search
              </button>

              <button
                type="button"
                onClick={onOpenWishlist}
                aria-label="Saved favourites and shortlist"
                className="nav-link nav-action"
              >
                Shortlist (<span suppressHydrationWarning>{wishlistCount}</span>)
              </button>


              <button
                id="mobile-nav-toggle"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile navigation menu"
                className="mobile-hamburger"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  {mobileMenuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="7" x2="21" y2="7"></line>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="17" x2="21" y2="17"></line>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            style={{
              padding: "1.75rem 2rem",
              borderRadius: "0 0 16px 16px",
              background: "rgba(16, 43, 70, 0.98)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  color: "#FAF8F5",
                  textDecoration: "none",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                Home
              </Link>
              <Link
                href="/furniture"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  color: "#FAF8F5",
                  textDecoration: "none",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                Shop
              </Link>
              <Link
                href="/#collection"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  color: "#FAF8F5",
                  textDecoration: "none",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                Collections
              </Link>
              <Link
                href="/furniture-showroom-kurnool"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  color: "#FAF8F5",
                  textDecoration: "none",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                Our Showroom
              </Link>
              <Link
                href="/offers"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  color: "var(--color-gold)",
                  textDecoration: "none",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                Offers
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactModalOpen(true);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  textAlign: "left",
                  padding: 0,
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  color: "#FAF8F5",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  cursor: "pointer",
                }}
              >
                Contact
              </button>
            </div>

            <div style={{ paddingTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href={getWhatsAppEnquiryUrl("Mobile Menu Direct Enquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ textAlign: "center", width: "100%", justifyContent: "center" }}
              >
                Chat on WhatsApp (+91 98490 12345)
              </a>
              <a
                href={`tel:${SHOWROOM_INFO.phone}`}
                className="btn-secondary"
                style={{
                  textAlign: "center",
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#FAF8F5",
                }}
              >
                Call Bellary Road Showroom
              </a>
            </div>
          </div>
        )}
      </header>

      {/* CONTACT / SHOWROOM DETAILS MODAL */}
      {contactModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(16, 43, 70, 0.75)",
            backdropFilter: "blur(8px)",
            zIndex: 1100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
            animation: "fadeIn 0.25s ease",
          }}
          onClick={() => setContactModalOpen(false)}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "8px",
              padding: "2.5rem",
              maxWidth: "480px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setContactModalOpen(false)}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                background: "transparent",
                border: "none",
                fontSize: "1.25rem",
                cursor: "pointer",
                color: "var(--color-navy)",
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "rgba(16, 43, 70, 0.06)",
                  border: "1px solid var(--color-gold)",
                  color: "var(--color-gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                📍
              </div>

              <span
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-gold)",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "0.25rem",
                }}
              >
                CASABLANCA SOFAS
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.65rem",
                  color: "var(--color-navy)",
                  marginBottom: "0.5rem",
                }}
              >
                Contact & Showroom Visit
              </h3>

              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                {SHOWROOM_INFO.address}
              </p>
              <div style={{ fontSize: "0.8125rem", color: "var(--color-gold)", fontWeight: 600, marginTop: "0.4rem" }}>
                🕒 {SHOWROOM_INFO.timing}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a
                href={getWhatsAppEnquiryUrl("Contact Modal Inquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ width: "100%", padding: "0.85rem", justifyContent: "center", borderRadius: "6px" }}
              >
                <span>CHAT ON WHATSAPP: {SHOWROOM_INFO.displayWhatsApp}</span>
              </a>

              <a
                href={`tel:${SHOWROOM_INFO.phone}`}
                className="btn-secondary"
                style={{ width: "100%", padding: "0.85rem", justifyContent: "center", borderRadius: "6px" }}
              >
                <span>CALL SHOWROOM: {SHOWROOM_INFO.displayPhone}</span>
              </a>

              <a
                href={SHOWROOM_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: "100%", padding: "0.85rem", justifyContent: "center", borderRadius: "6px", fontSize: "0.75rem" }}
              >
                <span>GET GOOGLE MAP DIRECTIONS</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Responsive styles handled globally in globals.css */}
    </>
  );
};
