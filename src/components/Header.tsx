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

  const mainMenuItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/furniture", isDropdown: true },
    { label: "Collections", href: "/#collection" },
    { label: "Our Showroom", href: "/furniture-showroom-kurnool" },
    { label: "Offers", href: "/offers" },
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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          background: isScrolled
            ? "rgba(16, 43, 70, 0.98)"
            : "linear-gradient(180deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.12) 65%, transparent 100%)",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(197, 164, 93, 0.25)"
            : "none",
          boxShadow: isScrolled ? "0 4px 24px rgba(0, 0, 0, 0.35)" : "none",
        }}
      >
        <div
          className="header-inner"
          style={{
            maxWidth: "1820px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* LEFT: BRAND LOGO */}
          <div className="header-brand-wrap">
            <Link
              href="/"
              aria-label="Casablanca Sofas - Home"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <BrandLogo size="lg" isScrolled={isScrolled} />
            </Link>
          </div>

          {/* CENTER: Main Menu (HOME · SHOP · COLLECTIONS · OUR SHOWROOM · OFFERS · CONTACT) */}
          <nav
            aria-label="Primary navigation"
            className="desktop-nav-links"
          >
              {mainMenuItems.map((item, idx) => {
                if (item.isDropdown) {
                  return (
                    <div
                      key={idx}
                      style={{ position: "relative" }}
                      onMouseEnter={() => setShopDropdownOpen(true)}
                      onMouseLeave={() => setShopDropdownOpen(false)}
                    >
                      <Link
                        href={item.href}
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.125rem",
                          color: shopDropdownOpen ? "var(--color-gold)" : "#FAF8F5",
                          textDecoration: "none",
                          fontWeight: 400,
                          letterSpacing: "0.02em",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          transition: "color 0.2s ease",
                        }}
                      >
                        <span>{item.label}</span>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          style={{
                            transition: "transform 0.2s ease",
                            transform: shopDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                            opacity: 0.85,
                          }}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </Link>

                      {/* Dropdown Menu */}
                      {shopDropdownOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            paddingTop: "0.75rem",
                            zIndex: 100,
                          }}
                        >
                          <div
                            style={{
                              background: "rgba(16, 43, 70, 0.98)",
                              backdropFilter: "blur(20px)",
                              border: "1px solid rgba(197, 164, 93, 0.25)",
                              borderRadius: "8px",
                              padding: "1.25rem 1.5rem",
                              minWidth: "260px",
                              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
                              display: "flex",
                              flexDirection: "column",
                              gap: "0.6rem",
                              animation: "fadeIn 0.2s ease",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.625rem",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                color: "var(--color-gold)",
                                fontWeight: 700,
                                marginBottom: "0.2rem",
                                paddingBottom: "0.35rem",
                                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                              }}
                            >
                              SHOP BY CATEGORY
                            </span>

                            {shopCategories.map((cat, i) => (
                              <Link
                                key={i}
                                href={cat.href}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  textDecoration: "none",
                                  color: "#FAF8F5",
                                  fontSize: "0.875rem",
                                  padding: "0.3rem 0",
                                  transition: "all 0.15s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = "var(--color-gold)";
                                  e.currentTarget.style.transform = "translateX(4px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = "#FAF8F5";
                                  e.currentTarget.style.transform = "translateX(0)";
                                }}
                              >
                                <span>{cat.label}</span>
                                <span
                                  style={{
                                    fontSize: "0.6875rem",
                                    color: "rgba(247, 243, 234, 0.5)",
                                    fontWeight: 500,
                                  }}
                                >
                                  {cat.count}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={idx}
                    href={item.href}
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.125rem",
                      color: "#FAF8F5",
                      textDecoration: "none",
                      fontWeight: 400,
                      letterSpacing: "0.02em",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#FAF8F5")}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Contact Link */}
              <button
                onClick={() => setContactModalOpen(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.125rem",
                  color: "#FAF8F5",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  padding: 0,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#FAF8F5")}
              >
                Contact
              </button>
            </nav>

          {/* RIGHT: Search icon + Wishlist Bookmark + Visible WhatsApp Enquiry Action */}
          <div className="header-actions">
            {/* 1. Search Icon */}
            <button
              onClick={onOpenSearch}
              aria-label="Search collection"
              className="nav-icon-btn"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.35rem",
                color: "#FAF8F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-gold)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#FAF8F5";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7.5"></circle>
                <line x1="21" y1="21" x2="16.5" y2="16.5"></line>
              </svg>
            </button>

            {/* 2. Bookmark / Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              aria-label="Saved favourites and shortlist"
              className="nav-icon-btn"
              style={{
                position: "relative",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.35rem",
                color: "#FAF8F5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-gold)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#FAF8F5";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-4.5L5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span
                  suppressHydrationWarning
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-3px",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    background: "var(--color-gold)",
                    color: "var(--color-navy)",
                    fontSize: "0.625rem",
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

            {/* 3. VISIBLE WHATSAPP ENQUIRY ACTION BUTTON (Desktop only) */}
            <a
              id="header-whatsapp-cta"
              href={getWhatsAppEnquiryUrl("Direct Showroom Enquiry")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enquire on WhatsApp"
              className="btn-whatsapp desktop-whatsapp-action"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WHATSAPP ENQUIRY</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-nav-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="mobile-hamburger"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.35rem",
                color: "#FAF8F5",
              }}
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

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            style={{
              padding: "1.75rem 2rem",
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
