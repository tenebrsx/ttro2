import React from "react";

// SEO and Layout Components
import SEO from "../components/SEO";

// Page Section Components
import Hero from "../components/Hero";
import FeaturedDesserts from "../components/FeaturedDesserts";
import EmotionalStorySection from "../components/EmotionalStorySection";
import AboutPreview from "../components/AboutPreview";
import TestimonialsPreview from "../components/TestimonialsPreview";
import FAQ from "../components/FAQ";
import HomeContactSection from "../components/HomeContactSection";

// Constants
const SEO_CONFIG = {
  title: "Cucina | Repostería Artesanal Casera | Postres Hechos con Amor",
  description:
    "Cucina - Postres artesanales hechos con amor y tradición casera. Ingredientes premium, técnicas artesanales, sabores auténticos. Creamos momentos memorables para tus celebraciones especiales. Pedidos personalizados.",
  image: "/images/cucina-postres-artesanales.jpg",
  type: "website" as const,
  price: 1500,
  currency: "DOP" as const,
} as const;

const SEO_KEYWORDS = [
  // Brand keywords
  "cucina postres artesanales",
  "repostería casera",
  "postres hechos con amor",
  "dulces artesanales",

  // Product-specific keywords
  "postres artesanales",
  "repostería tradicional",
  "tartas personalizadas",
  "cupcakes artesanales",
  "postres para eventos",
  "dulces caseros",

  // Style and technique keywords
  "repostería artesanal",
  "postres tradicionales",
  "ingredientes premium",
  "técnicas caseras",

  // Service keywords
  "postres personalizados",
  "repostería para eventos",
  "dulces para celebraciones",
  "postres hechos a mano",
] as const;

// Page section components in order
const PAGE_SECTIONS = [
  Hero,
  FeaturedDesserts,
  EmotionalStorySection,
  AboutPreview,
  TestimonialsPreview,
  FAQ,
  HomeContactSection,
] as const;

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title={SEO_CONFIG.title}
        description={SEO_CONFIG.description}
        keywords={SEO_KEYWORDS}
        image={SEO_CONFIG.image}
        type={SEO_CONFIG.type}
        price={SEO_CONFIG.price}
        currency={SEO_CONFIG.currency}
      />

      {/* Main page content */}
      <main>
        {PAGE_SECTIONS.map((SectionComponent, index) => (
          <SectionComponent key={index} />
        ))}
      </main>
    </>
  );
};

export default Home;
