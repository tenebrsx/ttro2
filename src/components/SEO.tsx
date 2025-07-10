import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  category?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Cucinanostrard - Postres Artesanales en Santo Domingo',
  description = 'Descubre los postres más exquisitos de Santo Domingo. Tartas personalizadas, macarons franceses y dulces artesanales que abrazan el alma. Pedidos por WhatsApp.',
  keywords = [
    'postres artesanales',
    'tartas personalizadas',
    'macarons Santo Domingo',
    'dulces dominicanos',
    'repostería artesanal',
    'pedidos WhatsApp',
    'cupcakes personalizados',
    'galletas artesanales'
  ],
  image = '/images/og-default.jpg',
  url = 'https://cucinanostrard.com',
  type = 'website',
  price,
  currency = 'DOP',
  availability = 'InStock',
  brand = 'Cucinanostrard',
  category,
  structuredData
}) => {
  const fullTitle = title.includes('Cucinanostrard') ? title : `${title} | Cucinanostrard`;
  const fullUrl = url.startsWith('http') ? url : `https://cucinanostrard.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://cucinanostrard.com${image}`;

  // Default structured data for the business
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "Cucinanostrard",
    "description": "Postres artesanales y repostería gourmet en Santo Domingo, República Dominicana",
    "url": "https://cucinanostrard.com",
    "logo": "https://cucinanostrard.com/images/logo.png",
    "image": fullImage,
    "telephone": "+1-809-XXX-XXXX",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Santo Domingo",
      "addressLocality": "Santo Domingo",
      "addressCountry": "DO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.4861",
      "longitude": "-69.9312"
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 09:00-15:00"
    ],
    "servesCuisine": "Desserts",
    "priceRange": "$$",
    "paymentAccepted": "WhatsApp Orders",
    "currenciesAccepted": "DOP",
    "hasMenu": "https://cucinanostrard.com/menu",
    "sameAs": [
      "https://instagram.com/cucinanostrard",
      "https://facebook.com/cucinanostrard"
    ]
  };

  // Product structured data for individual products
  const productStructuredData = price ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": title,
    "description": description,
    "image": fullImage,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "category": category || "Desserts",
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": `https://schema.org/${availability}`,
      "url": fullUrl,
      "seller": {
        "@type": "Organization",
        "name": "Cucinanostrard"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "48",
      "bestRating": "5",
      "worstRating": "1"
    }
  } : null;

  const finalStructuredData = structuredData || productStructuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content="Cucinanostrard" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={fullUrl} />

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

      {/* Additional Meta Tags for Local Business */}
      <meta name="geo.region" content="DO-01" />
      <meta name="geo.placename" content="Santo Domingo" />
      <meta name="geo.position" content="18.4861;-69.9312" />
      <meta name="ICBM" content="18.4861, -69.9312" />

      {/* Mobile Specific */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Cucinanostrard" />

      {/* Theme Colors */}
      <meta name="theme-color" content="#D4A574" />
      <meta name="msapplication-navbutton-color" content="#D4A574" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#D4A574" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData, null, 2)}
      </script>

      {/* Additional SEO enhancements */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://images.pexels.com" />

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
};

export default SEO;
