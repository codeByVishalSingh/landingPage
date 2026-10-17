"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CurrencyCode, Product, ProductFinish } from "@/types";
import { CURRENCIES } from "@/data/products";

interface ProductCard3DProps {
  product: Product;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, finish: ProductFinish) => void;
}

export const ProductCard3D: React.FC<ProductCard3DProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for buttery smooth tilt
  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Glare / light reflection position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const curr = CURRENCIES[currency];
  const convertedPrice = Math.round(product.priceUSD * curr.rate);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddedAnimation(true);
    onAddToCart(product, selectedFinish);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <div
      style={{
        perspective: "1200px",
        height: "100%",
      }}
    >
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isMounted && isHovered ? rotateX : 0,
          rotateY: isMounted && isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
          background: "var(--color-card)",
          border: "1px solid var(--color-card-border)",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(28, 26, 24, 0.16), 0 0 0 1px rgba(182, 146, 105, 0.2)"
            : "var(--shadow-sm)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          height: "100%",
        }}
        data-cursor="hover"
      >
        {/* Dynamic Specular Sheen Layer */}
        {isHovered && (
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle 350px at ${glareX} ${glareY}, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 80%)`,
              pointerEvents: "none",
              zIndex: 3,
              borderRadius: "2px",
            }}
          />
        )}

        {/* Visual Canvas Container with 3D Depth */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "115%",
            overflow: "hidden",
            backgroundColor: "#F6F3EE",
            transformStyle: "preserve-3d",
            cursor: "pointer",
          }}
          onClick={() => onQuickView(product)}
        >
          {/* Main Image with Smooth Scaling */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              transform: isHovered ? "scale(1.06) translateZ(20px)" : "scale(1) translateZ(0px)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <Image
              src={isHovered && product.hoverImage ? product.hoverImage : product.primaryImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          {/* Floating Tag Badge on High Z-Plane */}
          {product.tag && (
            <span
              style={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                background: "rgba(22, 21, 20, 0.9)",
                backdropFilter: "blur(6px)",
                color: "#FFFFFF",
                fontSize: "0.625rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "0.3rem 0.65rem",
                fontWeight: 500,
                transform: "translateZ(40px)",
                zIndex: 4,
              }}
            >
              {product.tag}
            </span>
          )}

          {/* Wishlist Button on High Z-Plane */}
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
              background: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(6px)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transform: "translateZ(40px)",
              zIndex: 4,
              transition: "transform 0.2s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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

          {/* Hover Actions Bar Floating in 3D */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              right: "1rem",
              display: "flex",
              gap: "0.5rem",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateZ(50px) translateY(0)" : "translateZ(0px) translateY(10px)",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
              zIndex: 4,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{
                flex: 1,
                background: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(8px)",
                color: "var(--color-text-main)",
                border: "1px solid rgba(28, 26, 24, 0.15)",
                padding: "0.6rem 0",
                fontSize: "0.6875rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer",
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
                transition: "background 0.2s ease",
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
            transform: "translateZ(25px)",
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
                    transition: "transform 0.2s ease",
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
      </motion.article>
    </div>
  );
};
