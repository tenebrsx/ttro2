import SEO from "../components/SEO";
import Hero from "../components/Hero";
import FeaturedDesserts from "../components/FeaturedDesserts";
import EmotionalStorySection from "../components/EmotionalStorySection";
import AboutPreview from "../components/AboutPreview";
import OrderingProcess from "../components/OrderingProcess";
import TestimonialsPreview from "../components/TestimonialsPreview";

import FAQ from "../components/FAQ";
import HomeContactSection from "../components/HomeContactSection";

const Home = () => {
  return (
    <>
      <SEO
        title="Cucinanostrard | Postres Artesanales Santo Domingo | Repostería Francesa República Dominicana"
        description="🍰 Los mejores postres artesanales en Santo Domingo, RD. Macarons franceses auténticos, tartas personalizadas, cupcakes gourmet. Ingredientes premium importados de Francia. Entrega en DN, Santiago, Punta Cana. Pedidos WhatsApp +1-809-XXX-XXXX"
        keywords={[
          "postres artesanales santo domingo",
          "repostería dominicana",
          "macarons república dominicana",
          "tartas personalizadas RD",
          "cupcakes santo domingo",
          "postres franceses dominicana",
          "repostería francesa santo domingo",
          "macarons auténticos RD",
          "dulces artesanales república dominicana",
          "postres gourmet santo domingo",
          "repostería zona colonial",
          "tartas bodas dominicana",
          "cupcakes eventos RD",
          "postres entrega domicilio santo domingo",
          "repostería piantini",
          "macarons franceses entrega RD",
        ]}
        image="/images/cucinanostrard-postres-santo-domingo.jpg"
        type="website"
        price={1500}
        currency="DOP"
      />
      <Hero />
      <FeaturedDesserts />
      <EmotionalStorySection />
      <AboutPreview />
      <OrderingProcess />
      <TestimonialsPreview />
      <FAQ />
      <HomeContactSection />
    </>
  );
};

export default Home;
