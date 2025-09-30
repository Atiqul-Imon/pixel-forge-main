'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: number;
}

interface ConsentContextType {
  consent: ConsentPreferences | null;
  updateConsent: (preferences: ConsentPreferences) => void;
  showBanner: boolean;
  hideBanner: () => void;
  openPreferences: () => void;
  showPreferences: boolean;
  closePreferences: () => void;
  hasConsent: (type: keyof ConsentPreferences) => boolean;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = 'pixelforge_cookie_consent';
const CONSENT_VERSION = '1.0';

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState<ConsentPreferences | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    // Load consent from localStorage
    const loadConsent = () => {
      try {
        const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Check if consent is still valid (e.g., less than 12 months old)
          const consentAge = Date.now() - (parsed.timestamp || 0);
          const oneYear = 365 * 24 * 60 * 60 * 1000;
          
          if (consentAge < oneYear && parsed.version === CONSENT_VERSION) {
            setConsent(parsed);
            setShowBanner(false);
            return;
          }
        }
        // No valid consent found, show banner
        setShowBanner(true);
      } catch (error) {
        console.error('Error loading consent:', error);
        setShowBanner(true);
      }
    };

    loadConsent();
  }, []);

  const updateConsent = (preferences: ConsentPreferences) => {
    const consentData = {
      ...preferences,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    
    setConsent(consentData);
    
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
    } catch (error) {
      console.error('Error saving consent:', error);
    }
    
    setShowBanner(false);
    setShowPreferences(false);

    // Trigger consent update event for tracking scripts
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('consentUpdated', { detail: preferences }));
    }
  };

  const hideBanner = () => {
    setShowBanner(false);
  };

  const openPreferences = () => {
    setShowPreferences(true);
  };

  const closePreferences = () => {
    setShowPreferences(false);
  };

  const hasConsent = (type: keyof ConsentPreferences): boolean => {
    if (!consent) return false;
    return consent[type] === true;
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        updateConsent,
        showBanner,
        hideBanner,
        openPreferences,
        showPreferences,
        closePreferences,
        hasConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
};

