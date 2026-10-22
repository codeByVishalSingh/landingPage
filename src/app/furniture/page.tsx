import type { Metadata } from "next";
import { CategoryLandingTemplate } from "@/components/CategoryLandingTemplate";

export const metadata: Metadata = {
  title: "All Luxury Furniture in Kurnool | Complete Home Catalogue — Casablanca Sofas",
  description:
    "Explore the complete catalogue of luxury living room, bedroom, and dining furniture at Casablanca Sofas in Kurnool. 15-year Burma teakwood guarantee.",
};

export default function AllFurniturePage() {
  const tiles: any[] = [];

  return (
    <CategoryLandingTemplate
      categorySlug="furniture"
      categoryName="All Furniture"
      subheading="CATALOGUE · THE COMPLETE ARCHIVE"
      heading="Discover Furniture for Every Room"
      introduction="Explore our comprehensive collection of handcrafted Burma teakwood beds, cloud-comfort sofas, motorized zero-gravity recliners, and monolithic Italian marble dining suites. Every creation is backed by genuine warranties and personalized showroom assistance in Kurnool."
      categoryTiles={tiles}
    />
  );
}
