"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CartItem, CurrencyCode } from "@/types";
import { CURRENCIES } from "@/data/products";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const curr = CURRENCIES[currency];

  const subtotalUSD = items.reduce(
    (sum, item) => sum + item.product.priceUSD * item.quantity,
    0
  );
  const subtotal = Math.round(subtotalUSD * curr.rate);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  // Free delivery threshold ($1,500 USD converted)
  const freeShippingThreshold = Math.round(1500 * curr.rate);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "AUDO10") {
      setDiscountPercent(10);
      setPromoMessage("10% Collector Welcome Privilege Applied!");
    } else if (promoCode.trim().toUpperCase() === "COPENHAGEN") {
      setDiscountPercent(15);
      setPromoMessage("15% Scandinavian VIP Privilege Applied!");
    } else {
      setPromoMessage("Invalid code. Try using code 'AUDO10'");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      setTimeout(() => {
        onClearCart();
        setOrderComplete(false);
        onClose();
      }, 2500);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      id="cart-drawer-backdrop"
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
        id="cart-drawer-panel"
        style={{
          width: "100%",
          maxWidth: "480px",
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
        {/* Drawer Header */}
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
              Your Shopping Bag
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
              {items.length} {items.length === 1 ? "creation" : "creations"}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close bag"
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

        {/* Free Shipping Progress Indicator */}
        <div
          style={{
            padding: "1rem 2rem",
            backgroundColor: "var(--color-canvas-alt)",
            borderBottom: "1px solid var(--color-card-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              marginBottom: "0.4rem",
              fontWeight: 500,
            }}
          >
            <span>
              {remainingForFree > 0
                ? `Add ${curr.symbol}${remainingForFree.toLocaleString()} for White Glove Delivery`
                : "✦ You have unlocked Complimentary White Glove Delivery"}
            </span>
            <span style={{ color: "var(--color-brass)", fontWeight: 600 }}>{progressPercent}%</span>
          </div>
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "rgba(28, 26, 24, 0.1)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: "var(--color-brass)",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Bag Content Body */}
        <div style={{ flex: 1, padding: "1.5rem 2rem", overflowY: "auto" }}>
          {items.length === 0 ? (
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
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                </svg>
              </div>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                Your shopping bag is quiet.
              </h4>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginBottom: "1.75rem" }}>
                Explore our curated architectural furniture and lighting archive.
              </p>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "0.75rem 1.5rem" }}>
                DISCOVER COLLECTION
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {items.map((item, index) => {
                const itemPrice = Math.round(item.product.priceUSD * curr.rate);
                return (
                  <div
                    key={`${item.product.id}-${item.finish.id}-${index}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr auto",
                      gap: "1rem",
                      paddingBottom: "1.25rem",
                      borderBottom: "1px solid rgba(28, 26, 24, 0.08)",
                      alignItems: "center",
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        position: "relative",
                        width: "80px",
                        height: "90px",
                        backgroundColor: "#EFECE6",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    {/* Details */}
                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.0625rem",
                          lineHeight: 1.25,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.product.name}
                      </h4>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-text-muted)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: item.finish.colorHex,
                            display: "inline-block",
                          }}
                        />
                        <span>{item.finish.name}</span>
                      </div>

                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          border: "1px solid var(--color-card-border)",
                          borderRadius: "2px",
                          background: "#FFFFFF",
                        }}
                      >
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          style={{
                            background: "transparent",
                            border: "none",
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: "0.75rem", padding: "0 0.5rem", fontWeight: 600 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          style={{
                            background: "transparent",
                            border: "none",
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Item Total & Remove */}
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.5rem" }}>
                        {curr.symbol}
                        {(itemPrice * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => onRemoveItem(index)}
                        style={{
                          background: "transparent",
                          border: "none",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
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

        {/* Drawer Footer (Subtotal & Checkout) */}
        {items.length > 0 && (
          <div
            style={{
              padding: "1.5rem 2rem",
              borderTop: "1px solid var(--color-card-border)",
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* Promo Code Input */}
            <form onSubmit={applyPromo} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="PROMO CODE (e.g. AUDO10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.55rem 0.8rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  border: "1px solid var(--color-card-border)",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.55rem 1rem",
                  background: "var(--color-dark)",
                  color: "#FFFFFF",
                  border: "none",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.12em",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                APPLY
              </button>
            </form>

            {promoMessage && (
              <div
                style={{
                  fontSize: "0.6875rem",
                  color: discountPercent > 0 ? "var(--color-brass)" : "var(--color-terracotta)",
                  marginBottom: "0.75rem",
                  fontWeight: 500,
                }}
              >
                {promoMessage}
              </div>
            )}

            {/* Calculations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                <span>Subtotal</span>
                <span>{curr.symbol}{subtotal.toLocaleString()}</span>
              </div>

              {discountPercent > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--color-brass)" }}>
                  <span>Privilege ({discountPercent}%)</span>
                  <span>-{curr.symbol}{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                <span>White Glove Delivery</span>
                <span>{remainingForFree === 0 ? "FREE" : "Calculated at next step"}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "var(--color-text-main)",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(28, 26, 24, 0.08)",
                }}
              >
                <span>Estimated Total</span>
                <span>{curr.symbol}{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            {orderComplete ? (
              <div
                style={{
                  padding: "1rem",
                  background: "var(--color-canvas)",
                  border: "1px solid var(--color-brass)",
                  textAlign: "center",
                  fontSize: "0.875rem",
                  color: "var(--color-text-main)",
                  fontWeight: 600,
                }}
              >
                ✓ Order Confirmed! Thank you for choosing AUDO.
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-primary"
                style={{ width: "100%", padding: "1.1rem" }}
              >
                {isCheckingOut ? (
                  <span>CONNECTING TO CONCIERGE CHECKOUT...</span>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>SECURE CONCIERGE CHECKOUT</span>
                  </>
                )}
              </button>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1rem",
                fontSize: "0.6875rem",
                color: "var(--color-text-muted)",
              }}
            >
              <span>✦ 30-Day In-Home Trial</span>
              <span>✦ Insured Global Freight</span>
              <span>✦ 10-Yr Warranty</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
