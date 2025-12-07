'use client';

import React, { useState } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import { Cookie, Shield, TrendingUp, X, Settings, Check } from 'lucide-react';
import Link from 'next/link';

const CookieConsent = () => {
  const { showBanner, updateConsent, showPreferences, openPreferences, closePreferences } = useConsent();
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  if (!showBanner && !showPreferences) return null;

  const handleAcceptAll = () => {
    updateConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    updateConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    updateConsent(preferences);
  };

  const togglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Preferences Modal
  if (showPreferences) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl flex justify-between items-center">
            <div className="flex items-center">
              <Settings className="w-6 h-6 mr-3" />
              <h2 className="text-2xl font-bold">Cookie Preferences</h2>
            </div>
            <button
              onClick={closePreferences}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close preferences"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <p className="text-gray-600 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              You can choose which types of cookies to allow below.
            </p>

            {/* Necessary Cookies */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Necessary Cookies</h3>
                    <span className="text-sm text-gray-500">Always Active</span>
                  </div>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                These cookies are essential for the website to function properly. They enable core functionality such as 
                security, network management, and accessibility. You cannot disable these cookies.
              </p>
              <div className="mt-3 text-xs text-gray-500">
                <strong>Examples:</strong> Session cookies, security cookies, load balancing cookies
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                    <span className="text-sm text-gray-500">Optional</span>
                  </div>
                </div>
                <button
                  onClick={() => togglePreference('analytics')}
                  className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                    preferences.analytics ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle analytics cookies"
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      preferences.analytics ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                These cookies help us understand how visitors interact with our website by collecting and reporting 
                information anonymously. This helps us improve our website and services.
              </p>
              <div className="mt-3 text-xs text-gray-500">
                <strong>Examples:</strong> Google Analytics (_ga, _gid, _gat)
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <Cookie className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                    <span className="text-sm text-gray-500">Optional</span>
                  </div>
                </div>
                <button
                  onClick={() => togglePreference('marketing')}
                  className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${
                    preferences.marketing ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                  aria-label="Toggle marketing cookies"
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      preferences.marketing ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  ></div>
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                These cookies are used to track visitors across websites to display relevant advertisements. 
                They help us measure the effectiveness of our marketing campaigns.
              </p>
              <div className="mt-3 text-xs text-gray-500">
                <strong>Examples:</strong> Facebook Pixel (_fbp, _fbc), Google Ads
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Your Privacy Matters:</strong> You can change your preferences at any time by clicking 
                &quot;Cookie Settings&quot; in the footer. Learn more in our{' '}
                <Link href="/privacy-policy" className="underline hover:text-blue-900">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/cookie-policy" className="underline hover:text-blue-900">
                  Cookie Policy
                </Link>.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRejectAll}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Reject All
            </button>
            <button
              onClick={handleSavePreferences}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"
            >
              <Check className="w-5 h-5 mr-2" />
              Save Preferences
            </button>
            <button
              onClick={handleAcceptAll}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Banner - Slim and Sleek Design
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9998] animate-slideUp">
      {/* Mobile: Floating design with spacing and rounded corners */}
      <div className="md:hidden pb-4 px-3">
        <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          <div className="px-4 py-4">
            <div className="flex flex-col items-start gap-4">
              {/* Icon & Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">We Value Your Privacy</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                  <Shield className="w-3 h-3" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 leading-relaxed">
                We use cookies to enhance your experience. By clicking &quot;Accept&quot;, you consent to cookies.{' '}
                <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                  Privacy
                </Link>
                {' '}&{' '}
                <Link href="/cookie-policy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                  Cookies
                </Link>
              </p>
            </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 w-full">
                <button
                  onClick={openPreferences}
                  className="flex-1 px-4 py-2 text-sm text-gray-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg font-medium transition-all hover:bg-white/5 flex items-center justify-center gap-1.5"
                  aria-label="Open cookie settings"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-4 py-2 text-sm text-gray-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg font-medium transition-all hover:bg-white/5"
                >
                  Reject
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-5 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Full-width banner */}
      <div className="hidden md:block bg-slate-900/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
            {/* Icon & Title */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-base">We Value Your Privacy</h3>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                  <Shield className="w-3 h-3" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 leading-relaxed">
                We use cookies to enhance your experience. By clicking &quot;Accept&quot;, you consent to cookies.{' '}
                <Link href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                  Privacy
                </Link>
                {' '}&{' '}
                <Link href="/cookie-policy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                  Cookies
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0 w-full lg:w-auto">
              <button
                onClick={openPreferences}
                className="flex-1 lg:flex-none px-4 py-2 text-sm text-gray-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg font-medium transition-all hover:bg-white/5 flex items-center justify-center gap-1.5"
                aria-label="Open cookie settings"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 lg:flex-none px-4 py-2 text-sm text-gray-300 hover:text-white border border-white/20 hover:border-white/40 rounded-lg font-medium transition-all hover:bg-white/5"
              >
                Reject
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 lg:flex-none px-5 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

