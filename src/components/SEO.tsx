import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  price?: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  brand?: string;
  category?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "Cucinanostrard - Postres Artesanales Santo Domingo | Repostería Dominicana | Pedidos WhatsApp",
  description = "🍰 Postres artesanales premium en Santo Domingo, República Dominicana. Tartas personalizadas, macarons franceses, cupcakes y dulces gourmet. Ingredientes frescos, decoración artística. Pedidos por WhatsApp. Entregas en DN y Santiago. ¡Hecho con amor desde 2020!",
  keywords = [
    // Core business terms
    "postres artesanales santo domingo",
    "repostería dominicana",
    "tartas personalizadas republica dominicana",
    "cupcakes santo domingo",
    "macarons republica dominicana",
    "dulces artesanales dominicanos",
    "pastelería gourmet santo domingo",
    "repostería artesanal rd",

    // Local SEO terms
    "postres santo domingo zona colonial",
    "repostería piantini",
    "dulces naco santo domingo",
    "tartas bella vista",
    "postres gazcue",
    "repostería ensanche ozama",
    "dulces los cacicazgos",
    "postres malecón santo domingo",

    // Service-specific terms
    "pedidos postres whatsapp",
    "tartas cumpleaños santo domingo",
    "postres bodas republica dominicana",
    "cupcakes eventos dominicanos",
    "dulces fiestas santo domingo",
    "postres personalizados rd",
    "decoración tortas artesanal",
    "repostería eventos corporativos",

    // Product-specific terms
    "tres leches artesanal",
    "quesillo dominicano gourmet",
    "majarete premium",
    "dulce de leche casero",
    "postres sin gluten santo domingo",
    "tartas veganas republica dominicana",
    "postres keto dominicanos",
    "dulces tradicionales modernos",

    // Competition and trending terms
    "mejor repostería santo domingo",
    "postres instagram dominicanos",
    "dulces viral republica dominicana",
    "repostería tendencia 2024",
    "postres artesanales delivery",
    "tartas personalizadas a domicilio",
    "cupcakes premium santo domingo",
    "dulces gourmet dominicanos",
  ],
  image = "/images/og-default.jpg",
  url = "https://cucinanostrard.com",
  type = "website",
  price,
  currency = "DOP",
  availability = "InStock",
  brand = "Cucinanostrard",
  category,
  structuredData,
}) => {
  const fullTitle = title.includes("Cucinanostrard")
    ? title
    : `${title} | Cucinanostrard`;
  const fullUrl = url.startsWith("http")
    ? url
    : `https://cucinanostrard.com${url}`;
  const fullImage = image.startsWith("http")
    ? image
    : `https://cucinanostrard.com${image}`;

  // Enhanced structured data for Dominican Republic bakery
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "LocalBusiness", "FoodEstablishment"],
    name: "Cucinanostrard",
    alternateName: "Cucinanostrard Postres Artesanales",
    description:
      "Repostería artesanal premium en Santo Domingo, República Dominicana. Especialistas en tartas personalizadas, macarons franceses, cupcakes gourmet y dulces tradicionales dominicanos con un toque moderno. Ingredientes frescos, decoración artística y sabores únicos.",
    url: "https://cucinanostrard.com",
    logo: "https://cucinanostrard.com/images/logo.png",
    image: [
      fullImage,
      "https://cucinanostrard.com/images/featured-desserts.jpg",
      "https://cucinanostrard.com/images/instagram-gallery.jpg",
    ],
    telephone: "+18096581245",
    email: "info@cucinanostrard.com",
    foundingDate: "2020",
    founder: {
      "@type": "Person",
      name: "Chef Cucinanostrard",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Santo Domingo Este",
      addressLocality: "Santo Domingo",
      addressRegion: "Distrito Nacional",
      postalCode: "11101",
      addressCountry: "DO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "18.4861",
      longitude: "-69.9312",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Santo Domingo",
      },
      {
        "@type": "City",
        name: "Santiago de los Caballeros",
      },
      {
        "@type": "State",
        name: "Distrito Nacional",
      },
      {
        "@type": "Country",
        name: "República Dominicana",
      },
    ],
    openingHours: ["Mo-Fr 08:00-19:00", "Sa 09:00-17:00", "Su 10:00-15:00"],
    servesCuisine: [
      "Desserts",
      "French Pastries",
      "Dominican Sweets",
      "Artisanal Cakes",
      "Gourmet Cupcakes",
    ],
    priceRange: "$$-$$$",
    paymentAccepted: [
      "WhatsApp Orders",
      "Cash",
      "Bank Transfer",
      "Mobile Payment",
    ],
    currenciesAccepted: "DOP",
    hasMenu: "https://cucinanostrard.com/menu",
    orderUrl: "https://cucinanostrard.com/contact",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "María González",
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
        },
        reviewBody:
          "Los mejores postres artesanales de Santo Domingo. La atención personalizada y la calidad de los ingredientes son excepcionales.",
      },
    ],
    offers: {
      "@type": "Offer",
      description: "Postres artesanales personalizados para eventos especiales",
      priceRange: "$$-$$$",
      availability: "https://schema.org/InStock",
    },
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Tartas Personalizadas",
          description:
            "Tartas artesanales personalizadas para cualquier ocasión",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Macarons Franceses",
          description:
            "Macarons artesanales con sabores únicos y presentación elegante",
        },
      },
    ],
    sameAs: [
      "https://instagram.com/cucinanostrard",
      "https://facebook.com/cucinanostrard",
      "https://wa.me/18096581245",
    ],
    keywords:
      "postres artesanales, repostería dominicana, tartas personalizadas, macarons, cupcakes, Santo Domingo, República Dominicana",
  };

  // Product structured data for individual products
  const productStructuredData = price
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        description: description,
        image: fullImage,
        brand: {
          "@type": "Brand",
          name: brand,
        },
        category: category || "Desserts",
        offers: {
          "@type": "Offer",
          price: price,
          priceCurrency: currency,
          availability: `https://schema.org/${availability}`,
          url: fullUrl,
          seller: {
            "@type": "Organization",
            name: "Cucinanostrard",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          reviewCount: "48",
          bestRating: "5",
          worstRating: "1",
        },
      }
    : null;

  const finalStructuredData =
    structuredData || productStructuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta
        name="author"
        content="Cucinanostrard - Postres Artesanales Santo Domingo"
      />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={fullUrl} />

      {/* Enhanced SEO Meta Tags */}
      <meta name="language" content="es-DO" />
      <meta name="country" content="DO" />
      <meta name="target_country" content="DO" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="3 days" />
      <meta name="category" content="Food & Dining, Bakery, Desserts" />
      <meta name="classification" content="Artisanal Bakery" />
      <meta name="subject" content="Postres Artesanales República Dominicana" />
      <meta
        name="copyright"
        content="© 2024 Titirosa. Todos los derechos reservados."
      />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="expires" content="never" />
      <meta name="pragma" content="no-cache" />
      <meta name="cache-control" content="no-cache" />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Cucinanostrard" />
      <meta property="og:locale" content="es_DO" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@cucinanostrard" />

      {/* Enhanced Local Business & Geo Tags */}
      <meta name="geo.region" content="DO-01" />
      <meta
        name="geo.placename"
        content="Santo Domingo, República Dominicana"
      />
      <meta name="geo.position" content="18.4861;-69.9312" />
      <meta name="ICBM" content="18.4861, -69.9312" />
      <meta name="geo.country" content="DO" />
      <meta name="geo.a1" content="Distrito Nacional" />
      <meta name="geo.a2" content="Santo Domingo" />
      <meta name="geo.a3" content="Santo Domingo Este" />
      <meta name="locality" content="Santo Domingo" />
      <meta name="region" content="Distrito Nacional" />
      <meta name="country-name" content="República Dominicana" />

      {/* Local Business Schema */}
      <meta
        name="business:contact_data:street_address"
        content="Santo Domingo Este"
      />
      <meta name="business:contact_data:locality" content="Santo Domingo" />
      <meta name="business:contact_data:region" content="Distrito Nacional" />
      <meta name="business:contact_data:postal_code" content="11101" />
      <meta
        name="business:contact_data:country_name"
        content="República Dominicana"
      />
      <meta name="business:contact_data:phone_number" content="+18096581245" />
      <meta
        name="business:contact_data:email"
        content="info@cucinanostrard.com"
      />

      {/* Restaurant/Food Business Specific */}
      <meta name="restaurant:menu" content="https://cucinanostrard.com/menu" />
      <meta name="restaurant:section" content="Desserts" />
      <meta name="restaurant:section" content="Artisanal Cakes" />
      <meta name="restaurant:section" content="French Pastries" />
      <meta name="restaurant:section" content="Dominican Sweets" />
      <meta name="restaurant:price_range" content="$$-$$$" />
      <meta name="restaurant:serves" content="Desserts" />
      <meta name="restaurant:accepts_reservations" content="false" />
      <meta name="restaurant:delivery" content="true" />
      <meta name="restaurant:takeout" content="true" />

      {/* Mobile Specific */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Cucinanostrard" />

      {/* Theme Colors */}
      <meta name="theme-color" content="#c78787" />
      <meta name="msapplication-navbutton-color" content="#c78787" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#c78787" />

      {/* Multiple Structured Data Types */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData, null, 2)}
      </script>

      {/* Additional Local Business Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Cucinanostrard",
            url: "https://cucinanostrard.com",
            logo: "https://cucinanostrard.com/images/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+18096581245",
              contactType: "customer service",
              areaServed: "DO",
              availableLanguage: "Spanish",
            },
            sameAs: [
              "https://instagram.com/cucinanostrard",
              "https://facebook.com/cucinanostrard",
            ],
          },
          null,
          2,
        )}
      </script>

      {/* Website Navigation Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Cucinanostrard",
            url: "https://cucinanostrard.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://cucinanostrard.com/menu?search={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          null,
          2,
        )}
      </script>

      {/* Enhanced Mobile and Device Detection */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="format-detection" content="address=yes" />
      <meta name="format-detection" content="email=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://images.pexels.com" />

      {/* Enhanced Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-touch-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-touch-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/apple-touch-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/apple-touch-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/apple-touch-icon-57x57.png"
      />
      <link rel="manifest" href="/manifest.json" />

      {/* DNS Prefetch for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//images.pexels.com" />
      <link rel="dns-prefetch" href="//api.whatsapp.com" />
      <link rel="dns-prefetch" href="//wa.me" />
      <link rel="dns-prefetch" href="//instagram.com" />
      <link rel="dns-prefetch" href="//facebook.com" />

      {/* Dominican Republic Specific Meta */}
      <meta
        name="google-site-verification"
        content="YOUR_GOOGLE_VERIFICATION_CODE"
      />
      <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
      <meta
        name="yandex-verification"
        content="YOUR_YANDEX_VERIFICATION_CODE"
      />

      {/* Dominican Market Specific */}
      <meta name="target_market" content="dominican_republic" />
      <meta name="primary_language" content="spanish" />
      <meta name="service_type" content="artisanal_desserts" />
      <meta name="business_model" content="b2c_catering" />
    </Helmet>
  );
};

export default SEO;
