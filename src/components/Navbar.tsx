'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAdmin, isAuthenticated } = useAuth();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Set initial state
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Templates', href: '/templates' },
    { name: 'Landing Pages', href: '/landing-pages' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-in-out border-b ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-gray-200/100'
          : 'bg-black/20 backdrop-blur-sm border-gray-200/0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className={`text-xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'
            }`}>
              Pixel Forge
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-200 font-medium hover:text-blue-600 ${
                  scrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white/90 hover:text-white drop-shadow-sm'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin && (
              <Link
                href="/admin"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  scrolled
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-purple-500/80 text-white hover:bg-purple-600/90 backdrop-blur-sm border border-purple-400/30'
                }`}
              >
                <Settings className="w-4 h-4" />
                Admin Panel
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors duration-200 ${
                scrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
                  : 'text-white hover:text-white/80'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 rounded-lg shadow-lg mt-2 transition-all duration-300 ${
              scrolled 
                ? 'bg-white' 
                : 'bg-black/80 backdrop-blur-md border border-white/20'
            }`}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                    scrolled
                      ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      : 'text-white hover:text-white/80 hover:bg-white/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors duration-200 ${
                    scrolled
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-purple-500/80 text-white hover:bg-purple-600/90 border border-purple-400/30'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;