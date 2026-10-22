"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { PromotionsSection } from "@/components/PromotionsSection";
import { WhatsAppCTABanner } from "@/components/WhatsAppCTABanner";
import { WishlistDrawer } from "@/components/WishlistDrawer";
import { SearchModal } from "@/components/SearchModal";
import { CartDrawer } from "@/components/CartDrawer";
import { Toast } from "@/components/Toast";
import { CurrencyCode } from "@/types";

export const OffersPageClient: React.FC = () => {
  const [currency, setCurrency] = useState<CurrencyCode>("INR");
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--color-canvas)" }}>
      {/* Header */}
      <Header
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={0}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {/* Hero Banner */}
        <section
          style={{
            padding: "7.5rem 0 3.5rem",
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid rgba(16, 43, 70, 0.08)",
            textAlign: "center",
          }}
        >
          <div className="container" style={{ maxWidth: "780px", margin: "0 auto" }}>
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--color-gold)",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              SEASONAL PRIVILEGES & INCENTIVES
            </span>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
                fontWeight: 300,
                color: "var(--color-navy)",
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Exclusive Kurnool Showroom <span style={{ fontStyle: "italic", color: "var(--color-gold)" }}>Offers</span>
            </h1>
            <p
              style={{
                color: "var(--color-text-secondary)",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                fontWeight: 300,
              }}
            >
              Furnish your entire home with authentic Burma teakwood and Italian marble while enjoying bundled showroom savings, complimentary delivery, and zero-interest EMI options.
            </p>
          </div>
        </section>

        {/* Promotions Grid */}
        <PromotionsSection />

        {/* Consultation Banner */}
        <WhatsAppCTABanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Modals & Drawers */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        currency={currency}
        onSelectProduct={() => {}}
        onRemoveWishlist={() => {}}
        onMoveToCart={() => {}}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        currency={currency}
        onSelectProduct={() => {}}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={[]}
        currency={currency}
        onUpdateQuantity={() => {}}
        onRemoveItem={() => {}}
        onClearCart={() => {}}
      />

      <Toast message={toastMessage} />
    </div>
  );
};
