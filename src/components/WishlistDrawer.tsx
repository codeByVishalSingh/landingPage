"use client";

import React from "react";
import Image from "next/image";
import { CurrencyCode, Product } from "@/types";
import { PRODUCTS, formatPriceWithCurrency, SHOWROOM_INFO } from "@/data/products";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  currency: CurrencyCode;
  onSelectProduct: (p: Product) => void;
  onRemoveWishlist: (p: Product) => void;
  onMoveToCart: (p: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  currency,
  onSelectProduct,
  onRemoveWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleEnquireAllWhatsApp = () => {
    if (wishlistedProducts.length === 0) return;
    const names = wishlistedProducts.map((p, i) => `${i + 1}. ${p.name} (${formatPriceWithCurrency(p.priceUSD, currency, p.priceINR)})`).join("\n");
    const msg = `Hello Casablanca Sofas Kurnool,\nI have shortlisted these ${wishlistedProducts.length} favourite piece(s) from your catalogue:\n\n${names}\n\nPlease share availability, catalogue brochures and showroom visit timing on Bellary Road.`;
    const url = `https://wa.me/${SHOWROOM_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handleEnquireSingleWhatsApp = (p: Product) => {
    const priceText = p.priceOnEnquiry ? "Price on enquiry" : formatPriceWithCurrency(p.priceUSD, currency, p.priceINR);
    const msg = `Hello Casablanca Sofas Kurnool,\nI am interested in this shortlisted piece:\nProduct: ${p.name}\nPrice Guidance: ${priceText}\n\nPlease confirm availability and showroom display details.`;
    const url = `https://wa.me/${SHOWROOM_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      id="wishlist-drawer-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(16, 43, 70, 0.65)",
        backdropFilter: "blur(6px)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeIn 0.25s ease",
      }}
      onClick={onClose}
    >
      <div
        id="wishlist-drawer-panel"
        style={{
          width: "100%",
          maxWidth: "480px",
          height: "100%",
          backgroundColor: "#F7F3EA",
          boxShadow: "-8px 0 32px rgba(16, 43, 70, 0.2)",
          display: "flex",
          flexDirection: "column",
          animation: "slideLeft 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.75rem 2rem",
            borderBottom: "1px solid rgba(16, 43, 70, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#FFFFFF",
          }}
        >
          <div>
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
              CASABLANCA SHORTLIST
            </span>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                color: "var(--color-navy)",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              Shortlisted Favourites
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--color-charcoal)", opacity: 0.75 }}>
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? "design saved" : "designs saved"}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close wishlist"
            style={{
              background: "transparent",
              border: "none",
              fontSize: "1.25rem",
              cursor: "pointer",
              padding: "0.5rem",
              color: "var(--color-navy)",
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "1.5rem 2rem", overflowY: "auto" }}>
          {wishlistedProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(16, 43, 70, 0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  color: "var(--color-gold)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--color-navy)", marginBottom: "0.5rem" }}>
                No favourites shortlisted yet.
              </h4>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-charcoal)", opacity: 0.8, marginBottom: "1.75rem", lineHeight: 1.6 }}>
                Tap the heart on any sofa, recliner or cot to save it to your personal Kurnool showroom shortlist.
              </p>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "0.75rem 1.5rem" }}>
                BROWSE CATALOGUE
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {wishlistedProducts.map((p) => {
                const formattedPrice = p.priceOnEnquiry
                  ? "Price on enquiry"
                  : formatPriceWithCurrency(p.priceUSD, currency, p.priceINR);

                return (
                  <div
                    key={p.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr",
                      gap: "1.1rem",
                      padding: "1rem",
                      background: "#FFFFFF",
                      borderRadius: "8px",
                      border: "1px solid rgba(16, 43, 70, 0.08)",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "80px",
                        height: "90px",
                        backgroundColor: "#EFECE6",
                        borderRadius: "4px",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                    >
                      <Image src={p.primaryImage} alt={p.name} fill style={{ objectFit: "cover" }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <h4
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "1.0625rem",
                              color: "var(--color-navy)",
                              lineHeight: 1.25,
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              onSelectProduct(p);
                              onClose();
                            }}
                          >
                            {p.name}
                          </h4>
                          <button
                            onClick={() => onRemoveWishlist(p)}
                            aria-label="Remove item"
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "#888",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                              padding: "0 0.25rem",
                            }}
                          >
                            ✕
                          </button>
                        </div>
                        <div style={{ fontSize: "0.71875rem", color: "var(--color-gold)", fontWeight: 600, marginTop: "0.2rem" }}>
                          {p.badge || p.tag || "Kurnool Showroom"}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--color-navy)", marginTop: "0.35rem" }}>
                          {formattedPrice}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                        <button
                          onClick={() => handleEnquireSingleWhatsApp(p)}
                          className="btn-whatsapp"
                          style={{
                            padding: "0.4rem 0.75rem",
                            fontSize: "0.6875rem",
                            borderRadius: "4px",
                          }}
                        >
                          ENQUIRE ON WHATSAPP
                        </button>
                        <button
                          onClick={() => {
                            onSelectProduct(p);
                            onClose();
                          }}
                          className="btn-secondary"
                          style={{
                            padding: "0.4rem 0.65rem",
                            fontSize: "0.6875rem",
                            borderRadius: "4px",
                          }}
                        >
                          DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {wishlistedProducts.length > 0 && (
          <div
            style={{
              padding: "1.5rem 2rem",
              borderTop: "1px solid rgba(16, 43, 70, 0.1)",
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <button
              onClick={handleEnquireAllWhatsApp}
              className="btn-whatsapp"
              style={{
                width: "100%",
                padding: "0.95rem",
                borderRadius: "6px",
                fontSize: "0.8125rem",
                letterSpacing: "0.08em",
                justifyContent: "center",
              }}
            >
              ENQUIRE ALL {wishlistedProducts.length} ITEMS ON WHATSAPP
            </button>
            <p style={{ textAlign: "center", fontSize: "0.6875rem", color: "var(--color-charcoal)", opacity: 0.7 }}>
              Our Kurnool sales executive will reply on WhatsApp with dimensions, discounts & live photos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
