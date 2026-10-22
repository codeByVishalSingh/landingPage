import Image from "next/image";
import Link from "next/link";
import { SHOWROOM_INFO } from "@/data/products";

const cards = [
  {
    heading: "About",
    image: "/images/mf-showroom-grand-hall.jpg",
    alt: "Inside the Casablanca Sofas showroom",
    title: "Kurnool's furniture showroom since 1998",
    text: "Casablanca Sofas brings sofas, recliners, beds, dining sets, mattresses and curtains under one roof, so you can see, sit and compare before you buy.",
    cta: "Read More",
    href: "/furniture-showroom-kurnool",
    external: false,
  },
  {
    heading: "Our Collection",
    image: "/images/mf-showroom-warehouse.jpg",
    alt: "Sofas and living room sets on display",
    title: "Hundreds of designs, ready to see in person.",
    text: "From compact sofas to full living, bedroom and dining sets, our team helps you choose the right size, fabric and finish for your home.",
    cta: "Explore Collection",
    href: "/furniture",
    external: false,
  },
  {
    heading: "Visit Us",
    image: "/images/showroom-kurnool-main.jpg",
    alt: "Casablanca Sofas showroom in Kurnool",
    title: "Our Kurnool Showroom",
    text: `${SHOWROOM_INFO.address}. ${SHOWROOM_INFO.timing}.`,
    cta: "Get Directions",
    href: SHOWROOM_INFO.googleMapsUrl,
    external: true,
  },
];

export const StoryCards: React.FC = () => (
  <section className="story" aria-label="About Casablanca Sofas">
    <div className="story-grid">
      {cards.map((c) => (
        <article key={c.heading} className="story-card">
          <h2 className="story-heading">{c.heading}</h2>
          <div className="story-img">
            <Image src={c.image} alt={c.alt} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
          </div>
          <h3 className="story-title">{c.title}</h3>
          <p className="story-text">{c.text}</p>
          {c.external ? (
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="story-link">
              {c.cta} <span aria-hidden="true">→</span>
            </a>
          ) : (
            <Link href={c.href} className="story-link">
              {c.cta} <span aria-hidden="true">→</span>
            </Link>
          )}
        </article>
      ))}
    </div>
  </section>
);
