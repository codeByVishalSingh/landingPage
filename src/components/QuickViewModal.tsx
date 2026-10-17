"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { CURRENCIES } from "@/data/products";

interface QuickViewModalProps {
  product: Product | null;
  currency: CurrencyCode;
  onClose: () => void;
  onAddToCart: (p: Product, finish: ProductFinish, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "dimensions" | "materials">("details");
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedFinish(product.finishes[0]);
      setQuantity(1);
      setAddedNotice(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product || !selectedFinish) return null;

  const curr = CURRENCIES[currency];
  const unitPrice = Math.round(product.priceUSD * curr.rate);

  const handleAdd = () => {
    onAddToCart(product, selectedFinish, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div
      id="quick-view-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(22, 21, 20, 0.7)",
        backdropFilter: "blur(6px)",
        zIndex: 55,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        id="quick-view-modal"
        style={{
          width: "100%",
          maxWidth: "980px",
          maxHeight: "90vh",
          backgroundColor: "var(--color-canvas)",
          border: "1px solid var(--color-card-border)",
          boxShadow: "var(--shadow-lg)",
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          overflow: "hidden",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
        className="modal-grid"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            zIndex: 10,
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(4px)",
            border: "1px solid rgba(28, 26, 24, 0.1)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: "1.125rem",
          }}
        >
          ✕
        </button>

        {/* Left Column: Image Canvas */}
        <div
          style={{
            position: "relative",
            minHeight: "440px",
            backgroundColor: "#F2EFE8",
          }}
        >
          <Image
            src={product.primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 900px) 100vw, 550px"
            style={{ objectFit: "cover" }}
          />
          {product.tag && (
            <span
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                background: "var(--color-dark)",
                color: "#FFFFFF",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "0.35rem 0.75rem",
                fontWeight: 500,
              }}
            >
              {product.tag}
            </span>
          )}
        </div>

        {/* Right Column: Specifications & Purchasing Controls */}
        <div
          style={{
            padding: "2.5rem 2.25rem",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            maxHeight: "85vh",
          }}
        >
          {/* Header & Designer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: "0.5rem",
            }}
          >
            <span>{product.designer}</span>
            <span>Est. {product.year}</span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2rem",
              lineHeight: 1.15,
              marginBottom: "0.5rem",
              color: "var(--color-text-main)",
            }}
          >
            {product.name}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.375rem",
                fontWeight: 600,
                color: "var(--color-text-main)",
              }}
            >
              {curr.symbol}
              {(unitPrice * quantity).toLocaleString()}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
              <span style={{ color: "var(--color-brass)" }}>★</span>
              <strong>{product.rating.toFixed(1)}</strong>
              <span style={{ color: "var(--color-text-muted)" }}>({product.reviewCount} collector reviews)</span>
            </div>
          </div>

          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.65,
              marginBottom: "1.75rem",
              fontWeight: 300,
            }}
          >
            {product.description}
          </p>

          {/* Finish Selector */}
          <div style={{ marginBottom: "1.75rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: "0.75rem",
                color: "var(--color-text-main)",
              }}
            >
              FINISH / MATERIAL: <span style={{ color: "var(--color-brass)" }}>{selectedFinish.name}</span>
            </label>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {product.finishes.map((f) => {
                const isSelected = selectedFinish.id === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinish(f)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.45rem 0.75rem",
                      border: isSelected ? "1.5px solid var(--color-dark)" : "1px solid var(--color-card-border)",
                      background: isSelected ? "#FFFFFF" : "transparent",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        backgroundColor: f.colorHex,
                        display: "inline-block",
                      }}
                    />
                    <span>{f.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Bag Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.75rem",
            }}
          >
            {/* Quantity */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid var(--color-card-border)",
                background: "#FFFFFF",
                height: "46px",
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "36px",
                  height: "100%",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                -
              </button>
              <span style={{ padding: "0 0.8rem", fontWeight: 600, fontSize: "0.875rem" }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: "36px",
                  height: "100%",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                +
              </button>
            </div>

            {/* Add to Bag CTA */}
            <button
              onClick={handleAdd}
              className="btn-primary"
              style={{
                flex: 1,
                height: "46px",
                background: addedNotice ? "var(--color-brass)" : "var(--color-dark)",
              }}
            >
              {addedNotice ? "ADDED TO BAG ✓" : "ADD TO BAG"}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(product)}
              aria-label="Add to wishlist"
              style={{
                width: "46px",
                height: "46px",
                border: "1px solid var(--color-card-border)",
                background: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={isWishlisted ? "#A46955" : "none"}
                stroke={isWishlisted ? "#A46955" : "var(--color-text-main)"}
                strokeWidth="1.8"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* Specifications Accordion / Tabs */}
          <div style={{ borderTop: "1px solid var(--color-card-border)", paddingTop: "1.25rem" }}>
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.85rem" }}>
              {[
                { id: "details", label: "Craftsmanship" },
                { id: "dimensions", label: "Dimensions" },
                { id: "materials", label: "Materiality" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    color: activeTab === tab.id ? "var(--color-text-main)" : "var(--color-text-muted)",
                    cursor: "pointer",
                    borderBottom: activeTab === tab.id ? "1.5px solid var(--color-dark)" : "none",
                    paddingBottom: "0.3rem",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              {activeTab === "details" && (
                <ul style={{ paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {product.details.map((d, idx) => (
                    <li key={idx}>{d}</li>
                  ))}
                </ul>
              )}
              {activeTab === "dimensions" && (
                <p>
                  <strong>Specifications:</strong> {product.dimensions}
                </p>
              )}
              {activeTab === "materials" && (
                <p>
                  <strong>Composition:</strong> {product.materials}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 820px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
            overflow-y: auto !important;
          }
        }
      `}</style>
    </div>
  );
};
