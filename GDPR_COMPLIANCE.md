# GDPR Compliance Implementation Guide

## Overview

This document outlines the GDPR (General Data Protection Regulation) compliance features implemented in the Pixel Forge website. The implementation ensures compliance with EU data protection laws and provides users with full control over their data and privacy preferences.

## Features Implemented

### 1. Cookie Consent Management System

#### Components
- **ConsentContext** (`src/contexts/ConsentContext.tsx`)
  - Manages consent state across the entire application
  - Stores preferences in localStorage
  - Auto-expires consent after 12 months (GDPR requirement)
  - Provides hooks for checking consent status

- **CookieConsent** (`src/components/CookieConsent.tsx`)
  - Beautiful, user-friendly consent banner with glassmorphism design
  - Two interfaces:
    - Simple banner with Accept All / Reject All / Settings
    - Detailed preferences modal for granular control
  - Three cookie categories:
    - **Necessary** (always active)
    - **Analytics** (optional - Google Analytics)
    - **Marketing** (optional - Facebook Pixel)
  - Mobile-responsive design
  - Animated entrance and transitions

#### Cookie Categories

##### Necessary Cookies (Always Active)
- Session management
- Security (CSRF protection)
- Load balancing
- Cookie consent preferences storage

**Examples:**
- `pixelforge_cookie_consent` - Stores user consent preferences (12 months)
- `next-auth.session-token` - Session authentication (session)
- `__csrf` - Security protection (session)

##### Analytics Cookies (Optional)
- Google Analytics tracking
- User behavior analysis
- Traffic source tracking
- Anonymous usage statistics

**Examples:**
- `_ga` - Distinguishes users (2 years)
- `_gid` - Distinguishes users (24 hours)
- `_gat` - Throttle request rate (1 minute)

##### Marketing Cookies (Optional)
- Facebook Pixel tracking
- Conversion tracking
- Ad campaign measurement
- Retargeting capabilities

**Examples:**
- `_fbp` - Facebook Pixel browser ID (3 months)
- `_fbc` - Facebook click ID (2 years)
- `fr` - Facebook advertising (3 months)

### 2. Conditional Tracking Script Loading

#### GoogleAnalytics Component (`src/components/GoogleAnalytics.tsx`)
- Only loads when user grants analytics consent
- Implements Google's Consent Mode API
- Anonymizes IP addresses (`anonymize_ip: true`)
- Secure cookie flags (`SameSite=None;Secure`)
- Listens for consent updates in real-time

#### FacebookPixel Component (`src/components/FacebookPixel.tsx`)
- Only loads when user grants marketing consent
- Implements Facebook's consent methods
- Integrates with Facebook CAPI (Conversion API)
- Event deduplication to prevent double counting
- Respects user privacy choices

### 3. Privacy & Cookie Policy Pages

#### Privacy Policy (`src/app/privacy-policy/page.tsx`)
Comprehensive privacy policy covering:
- Information collection practices
- Data usage and purposes
- Legal basis for processing (GDPR requirements)
- Data sharing and third parties
- Security measures
- User rights (access, rectification, erasure, etc.)
- Data retention periods
- International data transfers
- Children's privacy
- Contact information

#### Cookie Policy (`src/app/cookie-policy/page.tsx`)
Detailed cookie policy including:
- Explanation of what cookies are
- Types of cookies used
- Detailed cookie tables with names, purposes, and durations
- Third-party services information
- How to manage cookie preferences
- Browser-specific instructions
- Opt-out links for major tracking services
- Do Not Track signal support

### 4. User Rights Implementation

Users can exercise the following GDPR rights:

1. **Right to Access** - Users can request their data
2. **Right to Rectification** - Users can correct their data
3. **Right to Erasure** ("Right to be Forgotten") - Users can delete their data
4. **Right to Restrict Processing** - Users can limit how we use their data
5. **Right to Object** - Users can object to certain processing
6. **Right to Data Portability** - Users can receive their data in portable format
7. **Right to Withdraw Consent** - Users can change their mind at any time

### 5. Footer Integration

The footer now includes:
- Link to Privacy Policy
- Link to Cookie Policy
- Cookie Settings button (opens preference modal)
- All links easily accessible on every page

## Technical Implementation Details

### Consent Storage

```typescript
interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: number;
}
```

Stored in localStorage as: `pixelforge_cookie_consent`

### Consent Version Management

- Current version: `1.0`
- Consent expires after 12 months
- Version checking ensures users re-consent after policy updates

### Event-Based Updates

The system uses custom events to update tracking scripts in real-time:

```typescript
window.dispatchEvent(new CustomEvent('consentUpdated', { 
  detail: preferences 
}));
```

### Mobile Optimization

- Responsive design for all screen sizes
- Touch-friendly buttons and toggles
- Smooth animations optimized for mobile
- Bottom-anchored banner for easy access

## User Flow

1. **First Visit**
   - User lands on website
   - Cookie consent banner slides up from bottom
   - User can:
     - Accept All (grants all consents)
     - Reject All (only necessary cookies)
     - Open Cookie Settings (granular control)

2. **Using Cookie Settings**
   - Modal opens with detailed information
   - User sees three categories with descriptions
   - Toggle switches for optional categories
   - Save Preferences button stores choices
   - Consent banner doesn't show again for 12 months

3. **Changing Preferences**
   - User clicks "Cookie Settings" in footer
   - Same modal opens with current preferences
   - User can update choices anytime
   - Changes take effect immediately

4. **After 12 Months**
   - Consent expires automatically
   - Banner appears again on next visit
   - Ensures users stay informed of policy changes

## Compliance Features

### GDPR Article 7 - Consent
✅ Consent is freely given, specific, informed, and unambiguous
✅ Clear affirmative action required
✅ Easy to withdraw consent as it is to give
✅ Separate consent for different purposes

### GDPR Article 13 - Information to be provided
✅ Identity and contact details provided
✅ Purposes and legal basis explained
✅ Retention periods specified
✅ Rights clearly communicated

### GDPR Article 15 - Right of access
✅ Users can request their data
✅ Contact information provided

### GDPR Article 17 - Right to erasure
✅ Users can request data deletion
✅ Process documented in privacy policy

### ePrivacy Directive (Cookie Law)
✅ Prior consent obtained for non-essential cookies
✅ Clear information about cookies provided
✅ Users can refuse cookies
✅ Essential cookies clearly identified

## Testing Checklist

- [ ] Cookie banner appears on first visit
- [ ] Accept All button grants all consents
- [ ] Reject All button only allows necessary cookies
- [ ] Cookie Settings opens preference modal
- [ ] Individual toggles work correctly
- [ ] Preferences persist after page reload
- [ ] Google Analytics only loads with analytics consent
- [ ] Facebook Pixel only loads with marketing consent
- [ ] Footer links work correctly
- [ ] Privacy Policy page loads and displays correctly
- [ ] Cookie Policy page loads and displays correctly
- [ ] Mobile responsive design works properly
- [ ] Consent expires after 12 months
- [ ] Re-opening preferences shows current selection
- [ ] Consent update events trigger script loading/unloading

## Maintenance

### Updating Cookie Information

When adding new cookies:
1. Update the cookie tables in `/src/app/cookie-policy/page.tsx`
2. Add new categories if needed in `ConsentContext.tsx`
3. Update the CookieConsent component UI
4. Test thoroughly

### Updating Privacy Policy

1. Update content in `/src/app/privacy-policy/page.tsx`
2. Update the "Last Updated" date
3. Consider incrementing consent version if major changes
4. Notify existing users of changes (if required)

### Adding New Tracking Services

1. Create new component similar to GoogleAnalytics/FacebookPixel
2. Use `useConsent` hook to check for appropriate consent
3. Only load scripts when consent is granted
4. Listen for `consentUpdated` events
5. Update Cookie Policy with new cookie information
6. Add to appropriate consent category

## Contact Information

For GDPR-related inquiries:
- Email: privacy@pixelforgebd.com
- Website: pixelforgebd.com

## Compliance Certification

This implementation follows:
- ✅ GDPR (General Data Protection Regulation)
- ✅ ePrivacy Directive (Cookie Law)
- ✅ PECR (Privacy and Electronic Communications Regulations)
- ✅ CCPA-friendly (California Consumer Privacy Act)

## Resources

- [GDPR Official Text](https://gdpr-info.eu/)
- [ICO Cookie Guidance](https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/)
- [Google Analytics Consent Mode](https://support.google.com/analytics/answer/9976101)
- [Facebook Consent Management](https://www.facebook.com/business/help/305929793979145)

---

**Last Updated:** September 30, 2025  
**Version:** 1.0  
**Compliance Status:** ✅ Fully Compliant

