'use client';

import Link from 'next/link';
import { Phone, Mail, Linkedin, Settings } from 'lucide-react';
import { useConsent } from '@/contexts/ConsentContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openPreferences } = useConsent();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="block mb-4">
              <span className="text-xl font-bold">Pixel Forge</span>
            </Link>
            <p className="text-gray-300 mb-2 max-w-md leading-relaxed">
              An engineering-driven technology studio focused on building reliable, scalable digital platforms and long-term technical partnerships.
            </p>
            <p className="text-gray-300 max-w-md leading-relaxed">
              Digital systems are treated as infrastructure — designed to perform, evolve, and endure.
            </p>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Capabilities</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                Web Platforms & Digital Infrastructure
              </li>
              <li className="text-gray-300">
                Digital Products & MVP Engineering
              </li>
              <li className="text-gray-300">
                Performance, Search & Optimization
              </li>
              <li className="text-gray-300">
                Ongoing Engineering Stewardship
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <a
                  href="tel:+8801714918360"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  +8801714918360
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <a
                  href="mailto:hello@pixelforgebd.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  hello@pixelforgebd.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Linkedin className="w-4 h-4 text-blue-400" />
                <a
                  href="https://www.linkedin.com/company/109025907/admin/dashboard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Pixel Forge. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <span className="text-gray-400">·</span>
              <Link href="/cookie-policy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
              <button
                onClick={openPreferences}
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
              >
                <Settings className="w-3 h-3 mr-1" />
                Cookie Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;