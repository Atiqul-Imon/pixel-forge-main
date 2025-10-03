'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';

interface WhatsAppWidgetProps {
  phoneNumber: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showOnMobile?: boolean;
  showOnDesktop?: boolean;
}

export default function WhatsAppWidget({
  phoneNumber,
  message = "Hello! I'm interested in your web development services. Can you help me?",
  position = 'bottom-right',
  showOnMobile = true,
  showOnDesktop = true
}: WhatsAppWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [customMessage, setCustomMessage] = useState(message);

  // Show widget immediately for better visibility
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Format phone number for WhatsApp (remove spaces, dashes, etc.)
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/[\s\-\(\)]/g, '');
  };

  // Generate WhatsApp URL
  const getWhatsAppUrl = () => {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    const encodedMessage = encodeURIComponent(customMessage);
    return `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
  };

  // Handle click to open WhatsApp
  const handleWhatsAppClick = () => {
    window.open(getWhatsAppUrl(), '_blank');
    setIsOpen(false);
  };

  // Handle direct call
  const handleCallClick = () => {
    window.open(`tel:${phoneNumber}`, '_self');
    setIsOpen(false);
  };

  // Handle email
  const handleEmailClick = () => {
    window.open(`mailto:hello@pixelforge.com?subject=Web Development Inquiry`, '_self');
    setIsOpen(false);
  };

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      default:
        return 'bottom-6 right-6';
    }
  };

  // Don't render if not visible
  if (!isVisible) return null;

  return (
    <div className={`fixed ${getPositionClasses()} z-50`}>
      {/* Chat Options Panel */}
      {isOpen && (
        <div className="mb-4 animate-slideUp">
          <div className="glassmorphism-card bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-6 w-80 max-w-[calc(100vw-2rem)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Get in Touch</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Custom Message Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/90 mb-2">
                Your Message
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Type your message here..."
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/25"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </button>

              {/* Call Button */}
              <button
                onClick={handleCallClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </button>

              {/* Email Button */}
              <button
                onClick={handleEmailClick}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/25"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-white/70 text-center">
                We typically respond within 1 hour
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
        aria-label="Open WhatsApp chat"
      >
        {/* WhatsApp Icon */}
        <MessageCircle className="w-6 h-6" />
        
        {/* Notification Badge */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">!</span>
        </div>

        {/* Hover Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Chat with us on WhatsApp
        </div>
      </button>
    </div>
  );
}
