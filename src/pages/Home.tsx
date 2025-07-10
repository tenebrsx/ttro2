import React from "react";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import FeaturedDesserts from "../components/FeaturedDesserts";
import EmotionalStorySection from "../components/EmotionalStorySection";
import AboutPreview from "../components/AboutPreview";
import OrderingProcess from "../components/OrderingProcess";
import TestimonialsPreview from "../components/TestimonialsPreview";
import InstagramCarousel from "../components/InstagramCarousel";
import FAQ from "../components/FAQ";
import HomeContactSection from "../components/HomeContactSection";

const Home = () => {
  return (
    <>
      <SEO
        title="Cucinanostrard - Postres Artesanales Hechos con Amor"
        description="Descubre postres únicos y personalizados, elaborados con ingredientes de temporada y técnicas artesanales. Cada dulce cuenta una historia especial."
        keywords={[
          "postres artesanales",
          "repostería personalizada",
          "dulces caseros",
          "postres de temporada",
          "repostería artística",
        ]}
        ogImage="/images/og-image.jpg"
      />
      <Hero />
      <FeaturedDesserts />
      <EmotionalStorySection />
      <AboutPreview />
      <OrderingProcess />
      <TestimonialsPreview />
      <InstagramCarousel />
      <FAQ />
      <HomeContactSection />
    </>
  );
};

export default Home;
