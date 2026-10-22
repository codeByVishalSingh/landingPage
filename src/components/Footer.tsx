"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SHOWROOM_INFO, getWhatsAppEnquiryUrl } from "@/data/products";
import { BrandLogo } from "@/components/BrandLogo";

const columns: { title: string; links: { name: string; href?: string; internal?: boolean }[] }[] = [
  {
    title: "Furniture Categories",
    links: [
      { name: "Sofas & Couches", href: "/sofas-kurnool", internal: true },
      { name: "Motorized Recliners", href: "/recliners-kurnool", internal: true },
      { name: "Teakwood Beds & Cots", href: "/beds-cots-kurnool", internal: true },
      { name: "Orthopedic Mattresses", href: "/mattresses-kurnool", internal: true },
      { name: "Italian Marble Dining", href: "/dining-tables-kurnool", internal: true },
      { name: "Bespoke Curtains & Blinds", href: "/curtains-blinds-kurnool", internal: true },
    ],
  },
  {
    title: "Kurnool Showroom",
    links: [
      { name: "15,000 Sq. Ft. Gallery Tour", href: "/furniture-showroom-kurnool" },
      { name: "Festive Packages & Offers", href: "/offers" },
      { name: "15-Year Teakwood Guarantee", href: "#craftsmanship" },
      { name: "Plan Showroom Visit", href: "/furniture-showroom-kurnool" },
      { name: "Customer Testimonials", href: "#reviews" },
    ],
  },
  {
    title: "Regional Coverage",
    links: [
      { name: "Kurnool Town & Bellary Bypass" },
      { name: "Nandyal & Allagadda Villas" },
      { name: "Dhone & Gooty Residences" },
      { name: "Adoni & Yemmiganur Deliveries" },
      { name: "Free White-Glove Setup" },
    ],
  },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer id="footer" className="ft">
      <div className="ft-container">
        <div className="ft-top">
          {/* Brand, intro and newsletter */}
          <div className="ft-brand">
            <BrandLogo height={84} inverted={false} />
            <span className="ft-eyebrow">CASABLANCA SOFAS · LUXURY LIVING</span>
            <h3 className="ft-tagline">
              Comfort. Quality. <span>Timeless Living.</span>
            </h3>
            <p className="ft-text">
              Visit our 15,000+ sq. ft. showroom on Bellary Road or connect on WhatsApp to receive catalogue updates,
              custom dimensions, and seasonal promotion announcements.
            </p>

            <div className="ft-newsletter">
              <span className="ft-eyebrow">STAY CONNECTED</span>
              <h4 className="ft-newsletter-title">Join The Casablanca Circle</h4>
              <p className="ft-text">
                Receive early catalogue releases, showroom festive packages, and design consultation updates.
              </p>

              {subscribed ? (
                <div className="ft-thanks">
                  ✦ Thank you. Our Kurnool showroom team has sent catalogue information to your inbox.
                </div>
              ) : (
                <form className="ft-form" onSubmit={handleSubscribe}>
                  <label htmlFor="footer-email" className="ft-sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email for catalogue updates..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ft-input"
                  />
                  <button type="submit" aria-label="Submit newsletter subscription" className="ft-submit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}
              <span className="ft-note">Direct showroom notifications. No spam, only authentic furniture updates.</span>
            </div>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="ft-nav">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="ft-col-title">{col.title}</h4>
                <ul className="ft-list">
                  {col.links.map((l) => (
                    <li key={l.name}>
                      {l.href ? (
                        l.internal ? (
                          <Link href={l.href} className="ft-link">
                            {l.name}
                          </Link>
                        ) : (
                          <a href={l.href} className="ft-link">
                            {l.name}
                          </a>
                        )
                      ) : (
                        <span className="ft-plain">{l.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="ft-col-title">Location & Contact</h4>
              <ul className="ft-list">
                <li className="ft-plain">
                  <strong>Showroom Address</strong>
                  {SHOWROOM_INFO.address}
                </li>
                <li className="ft-plain">
                  <strong>Landmark</strong>
                  {SHOWROOM_INFO.landmark}
                </li>
                <li className="ft-plain">
                  <strong>Timings & Contact</strong>
                  {SHOWROOM_INFO.timing}
                  <a href={`tel:${SHOWROOM_INFO.phone}`} className="ft-link ft-phone">
                    📞 {SHOWROOM_INFO.displayPhone}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="ft-bottom">
          <div className="ft-bottom-left">
            <span>© 2026 Casablanca Sofas. All rights reserved.</span>
            <span>Kurnool, AP</span>
            <a
              href={getWhatsAppEnquiryUrl("Footer Inquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="ft-link ft-live"
            >
              <span className="ft-dot" aria-hidden="true">
                <span className="ft-dot__halo" />
                <span className="ft-dot__core" />
              </span>
              WhatsApp Assistance →
            </a>
          </div>
          <div className="ft-bottom-links">
            <Link href="/furniture" className="ft-link">
              Shop
            </Link>
            <Link href="/furniture-showroom-kurnool" className="ft-link">
              Showroom
            </Link>
            <a href={`tel:${SHOWROOM_INFO.phone}`} className="ft-link">
              Contact
            </a>
            <span className="ft-muted">Privacy</span>
            <span className="ft-muted">Terms</span>
          </div>
        </div>
      </div>

      {/* Oversized faded wordmark */}
      <div className="ft-container ft-wordmark-wrap" aria-hidden="true">
        <p className="ft-wordmark">Casablanca</p>
      </div>
    </footer>
  );
};
