'use client';

import Link from 'next/link';
import { Phone, Mail, Linkedin, Settings } from 'lucide-react';
import { useConsent } from '@/contexts/ConsentContext';
import { BrandLogo } from '@/components/BrandLogo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openPreferences } = useConsent();

  const companyLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ];

  const resourceLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
  ];

  return (
    <footer className="border-t border-slate-800/90 bg-[#0a1628] text-white">
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 text-white">
              <span className="sr-only">Pixel Forge — Home</span>
              <BrandLogo inverted />
            </Link>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400">
              Engineering-driven technology studio building reliable, scalable digital platforms and
              long-term partnerships.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Company</h3>
              <ul className="mt-4 space-y-3">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-300 transition-interactive hover:text-primary-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Resources</h3>
              <ul className="mt-4 space-y-3">
                {resourceLinks.map((l) => (
                  <li key={`${l.href}-${l.label}`}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-300 transition-interactive hover:text-primary-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={openPreferences}
                    className="text-left text-sm text-zinc-300 transition-interactive hover:text-primary-300"
                  >
                    Cookie settings
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1 lg:col-span-1">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Contact</h3>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" aria-hidden />
                  <a href="tel:+8801714918360" className="transition-interactive hover:text-white">
                    +880 1714 918360
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" aria-hidden />
                  <a href="mailto:hello@pixelforgebd.com" className="transition-interactive hover:text-white">
                    hello@pixelforgebd.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-zinc-300">
                  <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-primary-400" aria-hidden />
                  <a
                    href="https://www.linkedin.com/company/109025907/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-interactive hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-800 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-500">© {currentYear} Pixel Forge. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            <span className="hidden sm:inline">UTC+6 · English-first delivery</span>
            <Link href="/contact" className="transition-interactive hover:text-primary-300">
              Start a project
            </Link>
            <span className="flex items-center gap-1.5 text-zinc-600">
              <Settings className="h-3.5 w-3.5" aria-hidden />
              <button
                type="button"
                onClick={openPreferences}
                className="transition-interactive hover:text-primary-300"
              >
                Cookies
              </button>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
