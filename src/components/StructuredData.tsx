export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pixel Forge",
    "alternateName": "Pixel Forge Bangladesh",
    "url": "https://pixelforgebd.com",
    "logo": "https://pixelforgebd.com/logo/pixelforgelogo2.png",
    "description": "An engineering-driven technology studio focused on building reliable, scalable digital platforms and long-term technical partnerships. Digital systems are treated as infrastructure — designed to perform, evolve, and endure.",
    "foundingDate": "2024",
    "knowsAbout": [
      "Web Platform Engineering",
      "System Architecture",
      "Performance Optimization",
      "Scalable Infrastructure",
      "React Server Components",
      "Next.js Development",
      "Technical SEO",
      "Digital Platform Engineering"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD",
      "addressRegion": "Dhaka",
      "addressLocality": "Dhaka"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+880-1714-918360",
      "email": "hello@pixelforgebd.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Bengali"]
    },
    "sameAs": [
      "https://www.facebook.com/pixelforge.official",
      "https://www.linkedin.com/company/109025907"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Engineering Capabilities",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Platforms & Digital Infrastructure",
            "description": "Business-critical web platforms engineered to support operations, growth, and long-term evolution. Architecture decisions prioritize stability, performance, and maintainability."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Products & MVP Engineering",
            "description": "Digital products engineered from concept to production with a focus on technical soundness and scalability. Foundations are structured to evolve beyond MVP phase without costly rewrites."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance, Search & Optimization",
            "description": "Technical optimization applied at the system level to ensure speed, discoverability, and usability. Platforms are tuned to meet modern performance benchmarks and search engine standards."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ongoing Engineering Stewardship",
            "description": "Long-term technical responsibility for platform stability, security, and evolution. Systems remain reliable and adaptable as business requirements change."
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pixel Forge",
    "url": "https://pixelforgebd.com",
    "description": "An engineering-driven technology studio focused on building reliable, scalable digital platforms and long-term technical partnerships.",
    "publisher": {
      "@type": "Organization",
      "name": "Pixel Forge"
    },
    "potentialAction": {
      "@type": "ReadAction",
      "target": "https://pixelforgebd.com"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://pixelforgebd.com/#organization",
    "name": "Pixel Forge",
    "image": "https://pixelforgebd.com/logo/pixelforgelogo2.png",
    "description": "An engineering-driven technology studio focused on building reliable, scalable digital platforms and long-term technical partnerships. Digital systems are treated as infrastructure — designed to perform, evolve, and endure.",
    "url": "https://pixelforgebd.com",
    "telephone": "+8801714918360",
    "email": "hello@pixelforgebd.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BD",
      "addressRegion": "Dhaka",
      "addressLocality": "Dhaka"
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
    "priceRange": "$$$",
    "serviceArea": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "areaServed": {
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
