export type CurrencyCode = "USD" | "EUR" | "GBP" | "DKK";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}

export interface ProductFinish {
  id: string;
  name: string;
  colorHex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: "furniture" | "lighting" | "objects";
  priceUSD: number;
  designer: string;
  year: number;
  description: string;
  details: string[];
  dimensions: string;
  materials: string;
  primaryImage: string;
  hoverImage?: string;
  tag?: string;
  finishes: ProductFinish[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  finish: ProductFinish;
  quantity: number;
}

export interface Hotspot {
  id: string;
  xPercent: number; // percentage from left
  yPercent: number; // percentage from top
  productId: string;
  title: string;
  category: string;
  priceUSD: number;
}

export interface LookbookRoom {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  hotspots: Hotspot[];
}

export interface MaterialSpotlight {
  id: string;
  name: string;
  origin: string;
  tagline: string;
  description: string;
  tactileCharacteristics: string[];
  accentColor: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
}

export interface PressQuote {
  publication: string;
  quote: string;
  authorOrIssue: string;
}
