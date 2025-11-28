export default function DoctorSolutionStructuredData() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Doctor Website Solution - Complete Digital Ecosystem",
    "applicationCategory": "HealthcareApplication",
    "operatingSystem": "Web, Next.js 15+",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": "https://pixelforgebd.com/doctor-solution"
    },
    "description": "Complete digital ecosystem for modern healthcare professionals. Manage patients, appointments, prescriptions, medical history, and content marketing from one secure, Next.js-powered platform.",
    "url": "https://pixelforgebd.com/doctor-solution",
    "provider": {
      "@type": "Organization",
      "name": "Pixel Forge",
      "url": "https://pixelforgebd.com"
    },
    "featureList": [
      "Patient Management",
      "Appointment & Booking Management",
      "Prescription Generator",
      "Patient History & Medical Records",
      "Integrated Blog System",
      "Enterprise Security"
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

