"use client";

import React from "react";
import Link from "next/link";
import { SHOWROOM_INFO } from "@/data/products";
import { BrandLogo } from "@/components/BrandLogo";

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="ft">
      <div className="ft-container">
        {/* Main Tier: Brand Column on Left + Navigation Columns Adjacent on Right */}
        <div className="ft-main-tier">
          {/* Left Side: Logo & Content */}
          <div className="ft-brand-col">
            <BrandLogo height={88} inverted={false} className="ft-brand-logo" />
            <p className="ft-brand-desc">
              Casablanca Sofas · Kurnool&apos;s premier luxury furniture destination since 1998 with a 15,000+ sq. ft. showroom experience.
            </p>
          </div>

          {/* Right Side: Collections, Showroom, Visit & Contact Adjacent */}
          <div className="ft-nav-cols">
            {/* Column 1: Collections */}
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
              </ul>
            </div>

            {/* Column 2: Showroom */}
            <div className="ft-col">
              <h4 className="ft-col-title">
                <span className="ft-title-accent" />
                Showroom
              </h4>
              <ul className="ft-list">
                <li><Link href="/furniture-showroom-kurnool" className="ft-link">15,000 Sq. Ft. Gallery</Link></li>
                <li><a href="#craftsmanship" className="ft-link">15-Year Teakwood Guarantee</a></li>
                <li><Link href="/offers" className="ft-link">Festive Packages & Offers</Link></li>
                <li><Link href="/furniture-showroom-kurnool" className="ft-link">Plan Showroom Visit</Link></li>
                <li className="ft-plain-highlight">✦ Free White-Glove Setup across AP</li>
              </ul>
            </div>

            {/* Column 3: Visit & Contact */}
            <div className="ft-col ft-col-contact">
              <h4 className="ft-col-title">
                <span className="ft-title-accent" />
                Visit & Contact
              </h4>
              <div className="ft-contact-box">
                <div className="ft-contact-row">
                  <span className="ft-contact-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <div>
                    <strong className="ft-contact-label">Showroom Address</strong>
                    <p className="ft-contact-value">{SHOWROOM_INFO.address}</p>
                    <p className="ft-contact-landmark">Landmark: {SHOWROOM_INFO.landmark}</p>
                  </div>
                </div>

                <div className="ft-contact-row">
                  <span className="ft-contact-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <div>
                    <strong className="ft-contact-label">Showroom Hours</strong>
                    <p className="ft-contact-value">{SHOWROOM_INFO.timing}</p>
                  </div>
                </div>

                <div className="ft-contact-row">
                  <span className="ft-contact-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
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
