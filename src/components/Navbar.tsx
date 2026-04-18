'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Menu, Settings, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { BrandLogo } from '@/components/BrandLogo';
import { config } from '@/lib/config';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin } = useAuth();
  const isHome = pathname === '/';
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Solutions', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full border-b backdrop-blur-xl transition-[box-shadow,background-color,border-color] duration-300',
        isHome
          ? 'border-white/10 bg-[#0a1628]/95 supports-[backdrop-filter]:bg-[#0a1628]/88'
          : 'border-slate-200/70 bg-white/80 supports-[backdrop-filter]:bg-white/70',
        scrolled && (isHome ? 'shadow-lg shadow-black/25' : 'shadow-float'),
        !scrolled && 'shadow-none'
      )}
    >
      <div className="mx-auto flex h-16 max-w-content items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="sr-only">Pixel Forge — Home</span>
          <BrandLogo inverted={isHome} />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-interactive',
                  isHome
                    ? active
                      ? 'bg-white/10 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    : active
                      ? 'bg-primary-50 text-primary-900'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isHome ? (
            <div className="mr-1 hidden items-center text-xs text-slate-300 xl:flex">
              <a
                href={`mailto:${config.contact.email}`}
                className="flex items-center gap-1.5 transition-interactive hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                <span className="max-w-[11rem] truncate">{config.contact.email}</span>
              </a>
            </div>
          ) : null}
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-interactive',
                isHome
                  ? 'border-white/15 bg-white/5 text-slate-200 hover:bg-white/10'
                  : 'border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
              )}
            >
              <Settings className="h-4 w-4" />
              Admin
            </Link>
          )}
          <Link
            href="/contact"
            className={cn(
              'px-4 py-2 text-sm font-semibold shadow-sm transition-interactive',
              isHome
                ? 'rounded-full bg-white text-slate-900 hover:bg-slate-100'
                : 'rounded-lg bg-primary-600 text-white hover:bg-primary-700'
            )}
          >
            Contact
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <Link
            href="/contact"
            className={cn(
              'px-3 py-2 text-sm font-semibold',
              isHome ? 'rounded-full bg-white text-slate-900' : 'rounded-lg bg-primary-600 text-white'
            )}
          >
            Contact
          </Link>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'rounded-lg p-2',
              isHome ? 'text-white hover:bg-white/10' : 'text-zinc-700 hover:bg-zinc-100'
            )}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-40 flex flex-row justify-end pt-16 lg:hidden"
          id="mobile-nav"
        >
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 flex h-[calc(100dvh-4rem)] w-full max-w-sm flex-col border-l border-zinc-200 bg-white shadow-elevated">
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
              {navItems.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname === item.href || pathname?.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'rounded-xl px-4 py-3.5 text-base font-medium',
                      active ? 'bg-primary-50 text-primary-800' : 'text-zinc-800 hover:bg-zinc-50'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              {isAdmin ? (
                <Link
                  href="/admin"
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-3.5 text-sm font-medium text-zinc-700"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Admin
                </Link>
              ) : null}
            </div>
            <div className="border-t border-zinc-100 p-4">
              <Link
                href="/contact"
                className="flex w-full items-center justify-center rounded-xl bg-primary-600 py-3.5 text-sm font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Book a strategy call
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
