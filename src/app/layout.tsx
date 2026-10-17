import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://audocph.com"),
  title: "AUDO Copenhagen — Soft Minimalism, Architectural Furniture & Lighting",
  description: "Explore AUDO Copenhagen's iconic Scandinavian furniture, architectural lighting, and tactile design objects. Crafted for quiet luxury, tactile living, and modern spaces.",
  keywords: ["Audo Copenhagen", "Scandinavian design", "luxury furniture", "architectural lighting", "soft minimalism", "Danish modern", "The Tired Man", "Plinth table"],
  openGraph: {
    title: "AUDO Copenhagen — Soft Minimalism & Architectural Design",
    description: "Discover curated Danish furniture, lighting, and home objects crafted to connect people and spaces.",
    url: "https://audocph.com",
    siteName: "AUDO Copenhagen",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1920,
        height: 1080,
        alt: "AUDO Copenhagen Architectural Living Space",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
