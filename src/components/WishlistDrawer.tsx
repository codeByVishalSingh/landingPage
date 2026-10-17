"use client";

import React from "react";
import Image from "next/image";
import { CurrencyCode, Product } from "@/types";
import { CURRENCIES, PRODUCTS } from "@/data/products";

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

  const curr = CURRENCIES[currency];
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      id="wishlist-drawer-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(22, 21, 20, 0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 50,
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
          maxWidth: "460px",
          height: "100%",
          backgroundColor: "var(--color-canvas)",
          boxShadow: "var(--shadow-drawer)",
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
            borderBottom: "1px solid var(--color-card-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.5rem",
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              Saved Creations
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              {wishlistedProducts.length} {wishlistedProducts.length === 1 ? "saved piece" : "saved pieces"}
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
              color: "var(--color-text-main)",
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
                  background: "var(--color-canvas-alt)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.25rem",
                  color: "var(--color-text-muted)",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                No favorites saved yet.
              </h4>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginBottom: "1.75rem" }}>
                Tap the heart on any creation to save it to your personal architectural archive.
              </p>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "0.75rem 1.5rem" }}>
                BROWSE ARCHIVE
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {wishlistedProducts.map((p) => {
                const itemPrice = Math.round(p.priceUSD * curr.rate);
                return (
                  <div
                    key={p.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "75px 1fr auto",
                      gap: "1rem",
                      paddingBottom: "1.25rem",
                      borderBottom: "1px solid rgba(28, 26, 24, 0.08)",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "75px",
                        height: "85px",
                        backgroundColor: "#EFECE6",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        onSelectProduct(p);
                        onClose();
                      }}
                    >
                      <Image src={p.primaryImage} alt={p.name} fill style={{ objectFit: "cover" }} />
                    </div>

                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.0625rem",
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
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.4rem" }}>
                        {p.designer}
                      </div>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                        {curr.symbol}
                        {itemPrice.toLocaleString()}
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <button
                        onClick={() => onMoveToCart(p)}
                        className="btn-primary"
                        style={{
                          padding: "0.45rem 0.8rem",
                          fontSize: "0.6875rem",
                        }}
                      >
                        ADD TO BAG
                      </button>
                      <button
                        onClick={() => onRemoveWishlist(p)}
                        style={{
                          background: "transparent",
                          border: "none",
                          fontSize: "0.6875rem",
                          color: "var(--color-text-muted)",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
