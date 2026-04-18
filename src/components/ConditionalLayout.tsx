'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsent from './CookieConsent';
import WhatsAppWidget from './WhatsAppWidget';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main
        className={
          isAdminRoute ? 'min-h-screen' : 'min-h-screen bg-background pt-16 text-foreground antialiased'
        }
      >
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <CookieConsent />}
      {!isAdminRoute && (
        <WhatsAppWidget 
          phoneNumber="+8801714918360"
          message="Hello! I'm interested in your web development services. Can you help me with my project?"
          position="bottom-right"
          showOnMobile={true}
          showOnDesktop={true}
        />
      )}
    </>
  );
}

