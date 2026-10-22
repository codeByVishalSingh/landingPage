import type { Metadata } from "next";
import { ShowroomPageClient } from "@/components/ShowroomPageClient";

export const metadata: Metadata = {
  title: "Visit Our Furniture Showroom in Kurnool | Bellary Road — Casablanca Sofas",
  description:
    "Visit Casablanca Sofas's 15,000+ sq. ft. multi-floor luxury furniture showroom on Bellary Road, Kurnool. Explore sofas, recliners, teakwood beds & marble dining suites in person.",
};

export default function FurnitureShowroomKurnoolPage() {
  return <ShowroomPageClient />;
}
