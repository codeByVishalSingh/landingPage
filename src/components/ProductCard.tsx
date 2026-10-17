"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { CURRENCIES } from "@/data/products";

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, finish: ProductFinish) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const curr = CURRENCIES[currency];
  const convertedPrice = Math.round(product.priceUSD * curr.rate);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedAnimation(true);
    onAddToCart(product, selectedFinish);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <article
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--color-card)",
        border: "1px solid var(--color-card-border)",
        transition: "all var(--transition-normal)",
        position: "relative",
        boxShadow: isHovered ? "var(--shadow-hover)" : "var(--shadow-sm)",
      }}
    >
      {/* Visual Canvas Container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "115%", // Luxury portrait/square ratio
          overflow: "hidden",
          backgroundColor: "#F6F3EE",
          cursor: "pointer",
        }}
        onClick={() => onQuickView(product)}
      >
        {/* Main Image with Zoom on Hover */}
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : product.primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "transform var(--transition-slow), opacity var(--transition-normal)",
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Tag Badge */}
        {product.tag && (
          <span
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              background: "rgba(22, 21, 20, 0.88)",
              backdropFilter: "blur(4px)",
              color: "#FFFFFF",
              fontSize: "0.625rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "0.3rem 0.65rem",
              fontWeight: 500,
              zIndex: 2,
            }}
          >
            {product.tag}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(6px)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 2,
            transition: "all var(--transition-fast)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "#A46955" : "none"}
            stroke={isWishlisted ? "#A46955" : "var(--color-text-main)"}
            strokeWidth="1.8"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        {/* Quick View Button (Reveals on Hover) */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            right: "1rem",
            display: "flex",
            gap: "0.5rem",
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? "translateY(0)" : "translateY(8px)",
            transition: "all var(--transition-normal)",
            zIndex: 2,
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            style={{
              flex: 1,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(8px)",
              color: "var(--color-text-main)",
              border: "1px solid rgba(28, 26, 24, 0.15)",
              padding: "0.6rem 0",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background var(--transition-fast)",
            }}
          >
            QUICK VIEW
          </button>

          <button
            onClick={handleAdd}
            style={{
              flex: 1.2,
              background: addedAnimation ? "var(--color-brass)" : "var(--color-dark)",
              color: "#FFFFFF",
              border: "none",
              padding: "0.6rem 0",
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background var(--transition-fast)",
            }}
          >
            {addedAnimation ? "ADDED TO BAG ✓" : "ADD TO BAG"}
          </button>
        </div>
      </div>

      {/* Product Meta Section */}
      <div
        style={{
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Designer & Category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.6875rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            marginBottom: "0.4rem",
          }}
        >
          <span>{product.designer}</span>
          <span>{product.year}</span>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onQuickView(product)}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.375rem",
            lineHeight: 1.25,
            fontWeight: 400,
            color: "var(--color-text-main)",
            marginBottom: "0.35rem",
            cursor: "pointer",
            transition: "color var(--transition-fast)",
          }}
        >
          {product.name}
        </h3>

        {/* Short Subtitle */}
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
            marginBottom: "1rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontWeight: 300,
          }}
        >
          {product.subtitle}
        </p>

        {/* Finish Swatches */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          {product.finishes.map((f) => {
            const isSelected = selectedFinish.id === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFinish(f)}
                title={f.name}
                aria-label={`Select finish ${f.name}`}
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: f.colorHex,
                  border: isSelected ? "2px solid var(--color-dark)" : "1px solid rgba(0,0,0,0.15)",
                  padding: 0,
                  cursor: "pointer",
                  outline: isSelected ? "2px solid #FFFFFF" : "none",
                  outlineOffset: "-3px",
                  transition: "transform var(--transition-fast)",
                  transform: isSelected ? "scale(1.2)" : "scale(1)",
                }}
              />
            );
          })}
          <span
            style={{
              fontSize: "0.6875rem",
              color: "var(--color-text-muted)",
              marginLeft: "0.25rem",
            }}
          >
            {selectedFinish.name}
          </span>
        </div>

        {/* Price & Rating Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "0.75rem",
            borderTop: "1px solid rgba(28, 26, 24, 0.06)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--color-text-main)",
              letterSpacing: "0.02em",
            }}
          >
            {curr.symbol}
            {convertedPrice.toLocaleString()}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              fontSize: "0.75rem",
              color: "var(--color-text-secondary)",
            }}
          >
            <span style={{ color: "var(--color-brass)" }}>★</span>
            <span style={{ fontWeight: 600 }}>{product.rating.toFixed(1)}</span>
            <span style={{ color: "var(--color-text-muted)" }}>({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </article>
  );
};
