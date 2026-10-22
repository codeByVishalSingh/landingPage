"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { formatPriceWithCurrency, getProductPDPWhatsAppUrl, SHOWROOM_INFO } from "@/data/products";

interface QuickViewModalProps {
  product: Product | null;
  currency: CurrencyCode;
  onClose: () => void;
  onAddToCart?: (p: Product, finish: ProductFinish, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  currency,
  onClose,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedConfig, setSelectedConfig] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [openSection, setOpenSection] = useState<string>("overview");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.primaryImage);
      setSelectedConfig(product.configurations ? product.configurations[0] : "Standard");
      setSelectedColor(product.colors ? product.colors[0].name : (product.finishes[0]?.name || "Natural"));
      setSelectedBudget(product.budgetRanges ? product.budgetRanges[1] || product.budgetRanges[0] : "₹30,000–₹60,000");
      setOpenSection("overview");
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const formattedPrice = product.priceOnEnquiry
    ? "Price on enquiry"
    : formatPriceWithCurrency(product.priceUSD, currency, product.priceINR);

  const galleryImages = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.primaryImage, product.hoverImage || product.primaryImage];

  const whatsappUrl = getProductPDPWhatsAppUrl(
    product,
    selectedConfig,
    selectedColor,
    selectedBudget
  );

  return (
    <div
      id="quick-view-backdrop"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(16, 43, 70, 0.75)",
        backdropFilter: "blur(8px)",
        zIndex: 55,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        id="quick-view-modal"
        style={{
          width: "100%",
          maxWidth: "1080px",
          maxHeight: "92vh",
          backgroundColor: "#FFFFFF",
          borderRadius: "6px",
          border: "1px solid rgba(16, 43, 70, 0.12)",
          boxShadow: "0 25px 60px rgba(16, 43, 70, 0.35)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
            background: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(16, 43, 70, 0.15)",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            color: "var(--color-navy)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "all 0.2s ease",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* LEFT COLUMN: Visual Media Gallery */}
        <div
          style={{
            background: "#F7F3EA",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            borderRight: "1px solid rgba(16, 43, 70, 0.08)",
          }}
        >
          {/* Main Visual */}
          <div
            style={{
              position: "relative",
              flex: 1,
              minHeight: "360px",
              maxHeight: "520px",
              width: "100%",
            }}
          >
            <Image
              src={selectedImage || product.primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
              priority
            />

            {/* Badge */}
            {product.badge && (
              <span
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  left: "1.25rem",
                  background: "var(--color-navy)",
                  color: "#FFFFFF",
                  padding: "0.35rem 0.75rem",
                  fontSize: "0.625rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  borderRadius: "2px",
                  border: "1px solid rgba(197, 164, 93, 0.4)",
                }}
              >
                {product.badge}
              </span>
            )}

            {/* Shortlist heart */}
            <button
              onClick={() => onToggleWishlist(product)}
              aria-label="Save to shortlist"
              style={{
                position: "absolute",
                bottom: "1.25rem",
                right: "1.25rem",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.95)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={isWishlisted ? "var(--color-gold)" : "none"}
                stroke={isWishlisted ? "var(--color-gold)" : "var(--color-navy)"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                padding: "1rem 1.25rem",
                background: "#FFFFFF",
                borderTop: "1px solid rgba(16, 43, 70, 0.08)",
                overflowX: "auto",
              }}
            >
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    position: "relative",
                    width: "60px",
                    height: "60px",
                    borderRadius: "3px",
                    overflow: "hidden",
                    border: selectedImage === img ? "2px solid var(--color-gold)" : "1px solid rgba(16, 43, 70, 0.12)",
                    padding: 0,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <Image src={img} alt="" fill style={{ objectFit: "cover" }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Product Details & WhatsApp Configuration Form */}
        <div
          style={{
            padding: "2.25rem",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            maxHeight: "92vh",
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            HOME / {product.category.toUpperCase()} / {product.name.toUpperCase()}
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 2.5vw, 2.25rem)",
              lineHeight: 1.15,
              fontWeight: 400,
              color: "var(--color-navy)",
              marginBottom: "0.4rem",
            }}
          >
            {product.name}
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.55,
              marginBottom: "1rem",
              fontWeight: 300,
            }}
          >
            {product.subtitle}
          </p>

          {/* Price guidance */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
              paddingBottom: "1.25rem",
              borderBottom: "1px solid rgba(16, 43, 70, 0.08)",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.65rem",
                fontWeight: 700,
                color: "var(--color-navy)",
              }}
            >
              {formattedPrice}
            </div>

            <span
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-muted)",
              }}
            >
              {product.priceOnEnquiry ? "Customizable configurations" : "Starting price · Kurnool Showroom"}
            </span>
          </div>

          {/* INTERACTIVE CONFIGURATION FORM (Section 5 of Brief) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginBottom: "1.75rem" }}>
            {/* 1. Configuration Selection */}
            {product.configurations && product.configurations.length > 0 && (
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--color-navy)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Choose Your Configuration:
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {product.configurations.map((cfg) => {
                    const isSelected = selectedConfig === cfg;
                    return (
                      <button
                        key={cfg}
                        onClick={() => setSelectedConfig(cfg)}
                        style={{
                          padding: "0.45rem 0.85rem",
                          borderRadius: "3px",
                          border: isSelected ? "1.5px solid var(--color-navy)" : "1px solid rgba(16, 43, 70, 0.15)",
                          background: isSelected ? "var(--color-navy)" : "#FAF8F5",
                          color: isSelected ? "#FFFFFF" : "var(--color-navy)",
                          fontSize: "0.75rem",
                          fontWeight: isSelected ? 600 : 500,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {cfg}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. Preferred Colour Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--color-navy)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Preferred Colour / Finish:
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "30px",
                          border: isSelected ? "1.5px solid var(--color-gold)" : "1px solid rgba(16, 43, 70, 0.15)",
                          background: isSelected ? "rgba(197, 164, 93, 0.1)" : "#FFFFFF",
                          fontSize: "0.75rem",
                          fontWeight: isSelected ? 600 : 500,
                          color: "var(--color-navy)",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: c.hex,
                            border: "1px solid rgba(0,0,0,0.15)",
                            display: "inline-block",
                          }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Budget Range Selection */}
            {product.budgetRanges && product.budgetRanges.length > 0 && (
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.6875rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--color-navy)",
                    marginBottom: "0.4rem",
                  }}
                >
                  Budget Range:
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {product.budgetRanges.map((b) => {
                    const isSelected = selectedBudget === b;
                    return (
                      <button
                        key={b}
                        onClick={() => setSelectedBudget(b)}
                        style={{
                          padding: "0.4rem 0.75rem",
                          borderRadius: "3px",
                          border: isSelected ? "1.5px solid var(--color-gold)" : "1px solid rgba(16, 43, 70, 0.15)",
                          background: isSelected ? "var(--color-gold)" : "#FAF8F5",
                          color: isSelected ? "var(--color-navy)" : "var(--color-navy)",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* PRIMARY CONVERSION CTA: Enquire on WhatsApp */}
          <div style={{ marginBottom: "2rem" }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{
                width: "100%",
                padding: "0.95rem 1.25rem",
                fontSize: "0.875rem",
                letterSpacing: "0.08em",
                justifyContent: "center",
                borderRadius: "4px",
                boxShadow: "0 6px 20px rgba(24, 134, 75, 0.35)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>ENQUIRE ON WHATSAPP NOW</span>
            </a>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-muted)",
                textAlign: "center",
                marginTop: "0.5rem",
              }}
            >
              Prefills product name, configuration & colour directly to our Kurnool showroom sales team.
            </p>
          </div>

          {/* EXPANDABLE INFORMATION ACCORDIONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", borderTop: "1px solid rgba(16, 43, 70, 0.08)", paddingTop: "1rem" }}>
            {/* Overview */}
            <div style={{ borderBottom: "1px solid rgba(16, 43, 70, 0.06)", paddingBottom: "0.5rem" }}>
              <button
                onClick={() => setOpenSection(openSection === "overview" ? "" : "overview")}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  border: "none",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-navy)",
                  cursor: "pointer",
                  padding: "0.4rem 0",
                }}
              >
                <span>Product Overview</span>
                <span>{openSection === "overview" ? "−" : "+"}</span>
              </button>
              {openSection === "overview" && (
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", lineHeight: 1.6, paddingTop: "0.4rem" }}>
                  <p>{product.description}</p>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div style={{ borderBottom: "1px solid rgba(16, 43, 70, 0.06)", paddingBottom: "0.5rem" }}>
              <button
                onClick={() => setOpenSection(openSection === "specs" ? "" : "specs")}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  border: "none",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-navy)",
                  cursor: "pointer",
                  padding: "0.4rem 0",
                }}
              >
                <span>Specifications & Dimensions</span>
                <span>{openSection === "specs" ? "−" : "+"}</span>
              </button>
              {openSection === "specs" && (
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", lineHeight: 1.6, paddingTop: "0.4rem" }}>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <strong>Dimensions:</strong> {product.dimensions}
                  </div>
                  <div style={{ marginBottom: "0.5rem" }}>
                    <strong>Materials:</strong> {product.materials}
                  </div>
                  <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {product.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Warranty & Care */}
            <div style={{ borderBottom: "1px solid rgba(16, 43, 70, 0.06)", paddingBottom: "0.5rem" }}>
              <button
                onClick={() => setOpenSection(openSection === "warranty" ? "" : "warranty")}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  border: "none",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-navy)",
                  cursor: "pointer",
                  padding: "0.4rem 0",
                }}
              >
                <span>Warranty & Quality Guarantee</span>
                <span>{openSection === "warranty" ? "−" : "+"}</span>
              </button>
              {openSection === "warranty" && (
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", lineHeight: 1.6, paddingTop: "0.4rem" }}>
                  <p>
                    {product.warranty || "15-Year Teakwood Termite & Borer Replacement Guarantee."}
                  </p>
                  <p style={{ marginTop: "0.4rem" }}>
                    Every joint, fastener, and cushion foam is inspected in Kurnool before dispatch.
                  </p>
                </div>
              )}
            </div>

            {/* Showroom Availability */}
            <div style={{ paddingBottom: "0.5rem" }}>
              <button
                onClick={() => setOpenSection(openSection === "showroom" ? "" : "showroom")}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "transparent",
                  border: "none",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-navy)",
                  cursor: "pointer",
                  padding: "0.4rem 0",
                }}
              >
                <span>Showroom Display & Delivery</span>
                <span>{openSection === "showroom" ? "−" : "+"}</span>
              </button>
              {openSection === "showroom" && (
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", lineHeight: 1.6, paddingTop: "0.4rem" }}>
                  <p>
                    <strong>Location:</strong> {SHOWROOM_INFO.address}
                  </p>
                  <p style={{ marginTop: "0.25rem" }}>
                    <strong>Hours:</strong> {SHOWROOM_INFO.timing}
                  </p>
                  <p style={{ marginTop: "0.25rem" }}>
                    <strong>Availability:</strong> {product.availability || "On live display for testing in showroom."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
