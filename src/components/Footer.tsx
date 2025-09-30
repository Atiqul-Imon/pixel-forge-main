'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Facebook, Linkedin, Settings } from 'lucide-react';
import { useConsent } from '@/contexts/ConsentContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { openPreferences } = useConsent();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/logo/pixelforgelogo2.png"
                alt="Pixel Forge Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold">Pixel Forge</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              We build exceptional websites and digital experiences that drive business growth. 
              From custom web development to digital marketing, we help businesses thrive online.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Support & Maintenance
                </Link>
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
                  href="https://wa.me/8801714918360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  +880 1714 918360
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Facebook className="w-4 h-4 text-blue-400" />
                <a
                  href="https://www.facebook.com/pixelforge.official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  @pixelforge.official
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
                        Pixel Forge
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