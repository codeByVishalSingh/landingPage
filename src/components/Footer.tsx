"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SHOWROOM_INFO, getWhatsAppEnquiryUrl } from "@/data/products";
import { BrandLogo } from "@/components/BrandLogo";

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
        {/* Top Tier: Brand Statement on Left + Luxury Newsletter on Right */}
        <div className="ft-hero-tier">
          <div className="ft-hero-brand">
            <BrandLogo height={92} inverted={false} />
            <p className="ft-hero-subtitle">
              Casablanca Sofas · Kurnool&apos;s premier luxury furniture destination since 1998 with a 15,000+ sq. ft. showroom experience.
            </p>
          </div>

          <div className="ft-hero-newsletter">
            <span className="ft-eyebrow">✦ THE CASABLANCA CIRCLE</span>
            <h4 className="ft-newsletter-title">Stay Connected With Curated Design</h4>
            <p className="ft-newsletter-sub">
              Receive private lookbooks, seasonal festive packages, and design consultation updates.
            </p>

            {subscribed ? (
              <div className="ft-thanks">
                ✦ Thank you. Our showroom team has sent catalogue information to your inbox.
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
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ft-input"
                />
                <button type="submit" aria-label="Subscribe to Casablanca Circle" className="ft-submit">
                  <span>Join</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            )}
            <span className="ft-note">Direct Kurnool showroom notifications. No spam, only genuine updates.</span>
          </div>
        </div>

        {/* Middle Tier: 5 Balanced, Evenly Aligned Columns */}
        <div className="ft-nav-tier">
          {/* Column 1: Heritage & Assurance */}
          <div className="ft-col">
            <h4 className="ft-col-title">
              <span className="ft-title-accent" />
              Our Heritage
            </h4>
            <p className="ft-col-desc">
              Curating heirloom teakwood, Italian marble, and motorized luxury seating in Kurnool for over 28 years.
            </p>
          </div>

          {/* Column 2: Collections */}
          <div className="ft-col">
            <h4 className="ft-col-title">
              <span className="ft-title-accent" />
              Collections
            </h4>
            <ul className="ft-list">
              <li><Link href="/sofas-kurnool" className="ft-link">Sofas & Couches</Link></li>
              <li><Link href="/recliners-kurnool" className="ft-link">Motorized Recliners</Link></li>
              <li><Link href="/beds-cots-kurnool" className="ft-link">Teakwood Beds & Cots</Link></li>
              <li><Link href="/dining-tables-kurnool" className="ft-link">Italian Marble Dining</Link></li>
              <li><Link href="/mattresses-kurnool" className="ft-link">Orthopedic Mattresses</Link></li>
              <li><Link href="/curtains-blinds-kurnool" className="ft-link">Bespoke Curtains & Blinds</Link></li>
            </ul>
          </div>

          {/* Column 3: Showroom Experience */}
          <div className="ft-col">
            <h4 className="ft-col-title">
              <span className="ft-title-accent" />
              Showroom
            </h4>
            <ul className="ft-list">
              <li><Link href="/furniture-showroom-kurnool" className="ft-link">15,000 Sq. Ft. Gallery</Link></li>
              <li><Link href="/offers" className="ft-link">Festive Packages & Offers</Link></li>
              <li><a href="#craftsmanship" className="ft-link">15-Year Teakwood Guarantee</a></li>
              <li><Link href="/furniture-showroom-kurnool" className="ft-link">Plan Showroom Visit</Link></li>
              <li><a href="#reviews" className="ft-link">Customer Testimonials</a></li>
              <li><Link href="/furniture" className="ft-link">Browse All Designs</Link></li>
            </ul>
          </div>

          {/* Column 4: Regional Coverage */}
          <div className="ft-col">
            <h4 className="ft-col-title">
              <span className="ft-title-accent" />
              Delivery Areas
            </h4>
            <ul className="ft-list">
              <li className="ft-plain">Kurnool Town & Bellary Bypass</li>
              <li className="ft-plain">Nandyal & Allagadda Villas</li>
              <li className="ft-plain">Dhone & Gooty Residences</li>
              <li className="ft-plain">Adoni & Yemmiganur Deliveries</li>
              <li className="ft-plain">Anantapur & Regional AP</li>
              <li className="ft-plain-highlight">✦ Free White-Glove Setup</li>
            </ul>
          </div>

          {/* Column 5: Location & Contact */}
          <div className="ft-col ft-col-contact">
            <h4 className="ft-col-title">
              <span className="ft-title-accent" />
              Visit & Contact
            </h4>
            <div className="ft-contact-box">
              <div className="ft-contact-row">
                <span className="ft-contact-icon">📍</span>
                <div>
                  <strong className="ft-contact-label">Showroom Address</strong>
                  <p className="ft-contact-value">{SHOWROOM_INFO.address}</p>
                  <p className="ft-contact-landmark">Landmark: {SHOWROOM_INFO.landmark}</p>
                </div>
              </div>

              <div className="ft-contact-row">
                <span className="ft-contact-icon">🕒</span>
                <div>
                  <strong className="ft-contact-label">Showroom Hours</strong>
                  <p className="ft-contact-value">{SHOWROOM_INFO.timing}</p>
                </div>
              </div>

              <div className="ft-contact-row">
                <span className="ft-contact-icon">📞</span>
                <div>
                  <strong className="ft-contact-label">Direct Phone</strong>
                  <a href={`tel:${SHOWROOM_INFO.phone}`} className="ft-contact-link">
                    {SHOWROOM_INFO.displayPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Sleek Copyright, Live Status & Legal Links */}
        <div className="ft-bottom">
          <div className="ft-bottom-left">
            <span>© 2026 Casablanca Sofas. All rights reserved.</span>
            <span className="ft-sep">•</span>
            <span>Bellary Road, Kurnool, AP</span>
            <span className="ft-sep">•</span>
            <span className="ft-live-indicator">
              <span className="ft-dot">
                <span className="ft-dot__halo" />
                <span className="ft-dot__core" />
              </span>
              Showroom Open Today
            </span>
          </div>
          <div className="ft-bottom-links">
            <Link href="/furniture" className="ft-link">Catalogue</Link>
            <Link href="/furniture-showroom-kurnool" className="ft-link">Showroom</Link>
            <a href={`tel:${SHOWROOM_INFO.phone}`} className="ft-link">Contact</a>
            <span className="ft-muted">Privacy</span>
            <span className="ft-muted">Terms</span>
          </div>
        </div>
      </div>

      {/* Ambient background watermark - positioned cleanly in background */}
      <div className="ft-wordmark-wrap" aria-hidden="true">
        <p className="ft-wordmark">Casablanca</p>
      </div>
    </footer>
  );
};
