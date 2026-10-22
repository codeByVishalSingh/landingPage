"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CartItem, CurrencyCode } from "@/types";
import { CURRENCIES, SHOWROOM_INFO, formatPriceWithCurrency, formatNumberDeterministic } from "@/data/products";

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

  const subtotal = items.reduce((sum, item) => {
    const unitPrice =
      currency === "INR"
        ? item.product.priceINR || Math.round(item.product.priceUSD * 83.5)
        : Math.round(item.product.priceUSD * curr.rate);
    return sum + unitPrice * item.quantity;
  }, 0);

  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  // Free delivery threshold (₹50,000 for Kurnool & Rayalaseema)
  const freeShippingThreshold = currency === "INR" ? 50000 : Math.round(1500 * curr.rate);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === "KURNOOL10" || code === "CASA10" || code === "MF10") {
      setDiscountPercent(10);
      setPromoMessage("10% Casablanca Showroom Privilege Applied!");
    } else if (code === "WEDDING15" || code === "CASA15" || code === "MF15") {
      setDiscountPercent(15);
      setPromoMessage("15% Complete Home Suite Special Privilege Applied!");
    } else {
      setPromoMessage("Invalid code. Try using code 'CASA10'");
    }
  };

  const handleWhatsAppEnquiry = () => {
    if (items.length === 0) return;
    const itemList = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.product.name} (${it.finish.name}) x ${it.quantity} = ${formatPriceWithCurrency(
            it.product.priceUSD * it.quantity,
            currency,
            (it.product.priceINR || Math.round(it.product.priceUSD * 83.5)) * it.quantity
          )}`
      )
      .join("\n");

    const totalText = formatPriceWithCurrency(
      Math.round(finalTotal / (currency === "INR" ? 83.5 : curr.rate)),
      currency,
      currency === "INR" ? finalTotal : undefined
    );

    const msg = `Hello Casablanca Sofas Kurnool,\nI would like to enquire about this order list:\n\n${itemList}\n\nEstimated Total: ${totalText}${
      discountPercent > 0 ? ` (Includes ${discountPercent}% privilege code: ${promoCode})` : ""
    }\n\nPlease verify availability, showroom display status on Bellary Road, and delivery schedule.`;

    const url = `https://wa.me/${SHOWROOM_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
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
      }, 3000);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      id="cart-drawer-backdrop"
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
        id="cart-drawer-panel"
        style={{
          width: "100%",
          maxWidth: "490px",
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
        {/* Drawer Header */}
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
              CASABLANCA SOFAS
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
              Enquiry & Order List
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--color-charcoal)", opacity: 0.75 }}>
              {items.length} {items.length === 1 ? "furniture piece" : "furniture pieces"} selected
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
              color: "var(--color-navy)",
            }}
          >
            ✕
          </button>
        </div>

        {/* Delivery Privilege Indicator */}
        <div
          style={{
            padding: "0.9rem 2rem",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid rgba(16, 43, 70, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.75rem",
              marginBottom: "0.4rem",
              fontWeight: 500,
              color: "var(--color-charcoal)",
            }}
          >
            <span suppressHydrationWarning>
              {remainingForFree > 0
                ? `Add ${curr.symbol}${formatNumberDeterministic(remainingForFree)} for Free Kurnool Delivery`
                : "✦ You have unlocked Free Kurnool & Rayalaseema Delivery & Setup"}
            </span>
            <span style={{ color: "var(--color-gold)", fontWeight: 700 }}>{progressPercent}%</span>
          </div>
          <div
            style={{
              width: "100%",
              height: "4px",
              backgroundColor: "rgba(16, 43, 70, 0.08)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                backgroundColor: "var(--color-gold)",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, padding: "1.5rem 2rem", overflowY: "auto" }}>
          {items.length === 0 ? (
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
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                </svg>
              </div>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", color: "var(--color-navy)", marginBottom: "0.5rem" }}>
                Your enquiry list is empty.
              </h4>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-charcoal)", opacity: 0.8, marginBottom: "1.75rem" }}>
                Explore our curated sofas, recliners, teakwood beds and marble dining sets.
              </p>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "0.75rem 1.5rem" }}>
                EXPLORE CATALOGUE
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {items.map((item, index) => {
                const itemPrice =
                  currency === "INR"
                    ? item.product.priceINR || Math.round(item.product.priceUSD * 83.5)
                    : Math.round(item.product.priceUSD * curr.rate);

                return (
                  <div
                    key={`${item.product.id}-${item.finish.id}-${index}`}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr auto",
                      gap: "1.1rem",
                      padding: "1rem",
                      background: "#FFFFFF",
                      borderRadius: "6px",
                      border: "1px solid rgba(16, 43, 70, 0.08)",
                      alignItems: "center",
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
                      }}
                    >
                      <Image
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>

                    <div>
                      <h4
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "1.0625rem",
                          color: "var(--color-navy)",
                          lineHeight: 1.25,
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.product.name}
                      </h4>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-charcoal)",
                          opacity: 0.8,
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
                          border: "1px solid rgba(16, 43, 70, 0.2)",
                          borderRadius: "4px",
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
                            color: "var(--color-navy)",
                          }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: "0.75rem", padding: "0 0.5rem", fontWeight: 700, color: "var(--color-navy)" }}>
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
                            color: "var(--color-navy)",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div suppressHydrationWarning style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-navy)", marginBottom: "0.5rem" }}>
                        {curr.symbol}
                        {formatNumberDeterministic(itemPrice * item.quantity)}
                      </div>
                      <button
                        onClick={() => onRemoveItem(index)}
                        style={{
                          background: "transparent",
                          border: "none",
                          fontSize: "0.6875rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "#888",
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

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: "1.5rem 2rem",
              borderTop: "1px solid rgba(16, 43, 70, 0.1)",
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* Promo Code Input */}
            <form onSubmit={applyPromo} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="PROMO CODE (e.g. KURNOOL10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "0.55rem 0.8rem",
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                  border: "1px solid rgba(16, 43, 70, 0.2)",
                  borderRadius: "4px",
                  fontFamily: "var(--font-sans)",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.55rem 1rem",
                  background: "var(--color-navy)",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "4px",
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
                  color: discountPercent > 0 ? "var(--color-gold)" : "#C0392B",
                  marginBottom: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {promoMessage}
              </div>
            )}

            {/* Calculations */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--color-charcoal)" }}>
                <span>Subtotal</span>
                <span suppressHydrationWarning>{curr.symbol}{formatNumberDeterministic(subtotal)}</span>
              </div>

              {discountPercent > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--color-gold)" }}>
                  <span>Showroom Privilege ({discountPercent}%)</span>
                  <span suppressHydrationWarning>-{curr.symbol}{formatNumberDeterministic(discountAmount)}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--color-charcoal)" }}>
                <span>Delivery & Professional Installation</span>
                <span>{remainingForFree === 0 ? "FREE (Kurnool & Area)" : "Complimentary on ₹50k+"}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.125rem",
                  fontWeight: 700,
                  color: "var(--color-navy)",
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(16, 43, 70, 0.1)",
                }}
              >
                <span>Estimated Price Guidance</span>
                <span suppressHydrationWarning>{curr.symbol}{formatNumberDeterministic(finalTotal)}</span>
              </div>
            </div>

            {/* Conversion Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <button
                onClick={handleWhatsAppEnquiry}
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
                SEND ENQUIRY ON WHATSAPP
              </button>

              {orderComplete ? (
                <div
                  style={{
                    padding: "0.85rem",
                    background: "#F7F3EA",
                    border: "1px solid var(--color-gold)",
                    borderRadius: "6px",
                    textAlign: "center",
                    fontSize: "0.8125rem",
                    color: "var(--color-navy)",
                    fontWeight: 600,
                  }}
                >
                  ✓ Enquiry Registered! Our Kurnool sales team will reach out.
                </div>
              ) : (
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="btn-primary"
                  style={{ width: "100%", padding: "0.85rem", borderRadius: "6px", fontSize: "0.75rem" }}
                >
                  {isCheckingOut ? (
                    <span>CONFIRMING SHOWROOM ENQUIRY...</span>
                  ) : (
                    <span>REQUEST SHOWROOM VISIT & QUOTE</span>
                  )}
                </button>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                marginTop: "1rem",
                fontSize: "0.6875rem",
                color: "var(--color-charcoal)",
                opacity: 0.75,
              }}
            >
              <span>✦ 15-Yr Teakwood Warranty</span>
              <span>✦ Zero-Sag Foam</span>
              <span>✦ Kurnool Showroom Visit</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
