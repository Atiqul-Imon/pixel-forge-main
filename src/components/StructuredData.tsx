export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pixel Forge BD",
    "alternateName": "Pixel Forge Bangladesh",
    "url": "https://pixelforgebd.com",
    "logo": "https://pixelforgebd.com/logo/pixelforgelogo2.png",
    "description": "Leading web development agency in Bangladesh specializing in custom websites, e-commerce solutions, and digital marketing services.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD",
      "addressRegion": "Dhaka",
      "addressLocality": "Dhaka"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+880-1714-918360",
      "contactType": "customer service",
      "availableLanguage": ["English", "Bengali"]
    },
    "sameAs": [
      "https://www.facebook.com/pixelforge.official"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development",
            "description": "Custom websites and web applications built with modern technologies"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Development",
            "description": "Online stores and e-commerce solutions for businesses"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing",
            "description": "SEO, social media marketing, and online advertising services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Landing Page Design",
            "description": "High-converting landing pages for marketing campaigns"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pixel Forge BD",
    "url": "https://pixelforgebd.com",
    "description": "Professional web development, e-commerce solutions, and digital marketing services in Bangladesh",
    "publisher": {
      "@type": "Organization",
      "name": "Pixel Forge BD"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://pixelforgebd.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://pixelforgebd.com/#organization",
    "name": "Pixel Forge BD",
    "image": "https://pixelforgebd.com/logo/pixelforgelogo2.png",
    "description": "Web development agency in Bangladesh providing custom websites, e-commerce solutions, and digital marketing services",
    "url": "https://pixelforgebd.com",
    "telephone": "+880-1714-918360",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD",
      "addressRegion": "Dhaka"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.8103",
      "longitude": "90.4125"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "serviceArea": {
      "@type": "Country",
      "name": "Bangladesh"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </>
  );
}
