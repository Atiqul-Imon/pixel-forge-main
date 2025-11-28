export default function POSStructuredData() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Multi-Store POS & Inventory Management System",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, PWA",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "BDT",
      "availability": "https://schema.org/InStock",
      "url": "https://pixelforgebd.com/pos"
    },
    "description": "Complete cloud-based POS & Inventory Management system designed for brands with multiple stores or outlets. Manage all locations, sales, and inventory from one centralized system.",
    "url": "https://pixelforgebd.com/pos",
    "provider": {
      "@type": "Organization",
      "name": "Pixel Forge",
      "url": "https://pixelforgebd.com"
    },
    "featureList": [
      "Multi-Store Management",
      "Real-Time Inventory Tracking",
      "Point of Sale (POS)",
      "Customer Management",
      "Loyalty Program",
      "Advanced Reporting & Analytics",
      "Offline Capability",
      "Progressive Web App (PWA)"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema),
      }}
    />
  );
}

