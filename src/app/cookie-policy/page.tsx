import { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, Shield, TrendingUp, Settings, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | Pixel Forge - How We Use Cookies & Tracking Technologies',
  description: 'Learn about the cookies and tracking technologies Pixel Forge uses, how to manage your preferences, and your choices regarding data collection.',
  openGraph: {
    title: 'Cookie Policy | Pixel Forge',
    description: 'Learn about how Pixel Forge uses cookies and tracking technologies.',
    type: 'website',
  },
};

export default function CookiePolicy() {
  const lastUpdated = 'September 30, 2025';
  
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6">
              <Cookie className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Cookie Policy</h1>
          </div>
          <p className="text-xl text-purple-100 mb-4">
            This policy explains how and why we use cookies and similar technologies on our website.
          </p>
          <p className="text-sm text-purple-200">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and provide information to website owners.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Cookies can be &quot;persistent&quot; or &quot;session&quot; cookies. Persistent cookies remain on your device after you close your browser, while session cookies are deleted when you close your browser.
          </p>
        </section>

        {/* How We Use Cookies */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Cookies</h2>
          <p className="text-gray-700 mb-6">
            We use cookies and similar tracking technologies to track activity on our website and store certain information. The tracking technologies we use include:
          </p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li>• <strong>Cookies:</strong> Small data files stored on your device</li>
            <li>• <strong>Web Beacons:</strong> Small electronic files (also called clear gifs, pixel tags, and single-pixel gifs)</li>
            <li>• <strong>Local Storage:</strong> Data storage in your browser for improved performance</li>
            <li>• <strong>Analytics Tools:</strong> Third-party services that help us understand how users interact with our site</li>
          </ul>
        </section>

        {/* Types of Cookies */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Types of Cookies We Use</h2>

          {/* Necessary Cookies */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">3.1 Necessary Cookies</h3>
                <span className="text-sm text-gray-500">Always Active - Cannot Be Disabled</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.
            </p>
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Examples:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• <strong>Session Management:</strong> Keeps you logged in during your visit</li>
                <li>• <strong>Security:</strong> Protects against cross-site request forgery (CSRF)</li>
                <li>• <strong>Load Balancing:</strong> Distributes traffic efficiently across servers</li>
                <li>• <strong>Cookie Consent:</strong> Remembers your cookie preferences</li>
              </ul>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Cookie Name</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-gray-700 font-mono">pixelforge_cookie_consent</td>
                    <td className="px-4 py-2 text-gray-700">Stores your cookie preferences</td>
                    <td className="px-4 py-2 text-gray-700">12 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-700 font-mono">next-auth.session-token</td>
                    <td className="px-4 py-2 text-gray-700">Session authentication</td>
                    <td className="px-4 py-2 text-gray-700">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-700 font-mono">__csrf</td>
                    <td className="px-4 py-2 text-gray-700">Security protection</td>
                    <td className="px-4 py-2 text-gray-700">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Analytics Cookies */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">3.2 Analytics Cookies</h3>
                <span className="text-sm text-gray-500">Optional - Requires Your Consent</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
            </p>
            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">What We Track:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Pages visited and time spent on each page</li>
                <li>• How users navigate through our site</li>
                <li>• Which links and buttons are clicked</li>
                <li>• Technical information (browser, device, screen size)</li>
                <li>• Traffic sources and referral URLs</li>
              </ul>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Cookie Name</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Provider</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-gray-700 font-mono">_ga</td>
                    <td className="px-4 py-2 text-gray-700">Google Analytics</td>
                    <td className="px-4 py-2 text-gray-700">Distinguishes users</td>
                    <td className="px-4 py-2 text-gray-700">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-700 font-mono">_gid</td>
                    <td className="px-4 py-2 text-gray-700">Google Analytics</td>
                    <td className="px-4 py-2 text-gray-700">Distinguishes users</td>
                    <td className="px-4 py-2 text-gray-700">24 hours</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-700 font-mono">_gat</td>
                    <td className="px-4 py-2 text-gray-700">Google Analytics</td>
                    <td className="px-4 py-2 text-gray-700">Throttle request rate</td>
                    <td className="px-4 py-2 text-gray-700">1 minute</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Marketing Cookies */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <Cookie className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">3.3 Marketing Cookies</h3>
                <span className="text-sm text-gray-500">Optional - Requires Your Consent</span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              These cookies are used to track visitors across websites to display relevant advertisements. They help us measure the effectiveness of our marketing campaigns and deliver personalized content.
            </p>
            <div className="bg-purple-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">What We Do:</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Show relevant ads on other platforms</li>
                <li>• Measure ad campaign performance</li>
                <li>• Retarget website visitors</li>
                <li>• Build custom audiences for advertising</li>
                <li>• Track conversions from ads</li>
              </ul>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Cookie Name</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Provider</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-gray-700 font-mono">_fbp</td>
                    <td className="px-4 py-2 text-gray-700">Facebook Pixel</td>
                    <td className="px-4 py-2 text-gray-700">Track conversions</td>
                    <td className="px-4 py-2 text-gray-700">3 months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-700 font-mono">_fbc</td>
                    <td className="px-4 py-2 text-gray-700">Facebook Pixel</td>
                    <td className="px-4 py-2 text-gray-700">Store click information</td>
                    <td className="px-4 py-2 text-gray-700">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-gray-700 font-mono">fr</td>
                    <td className="px-4 py-2 text-gray-700">Facebook</td>
                    <td className="px-4 py-2 text-gray-700">Deliver advertising</td>
                    <td className="px-4 py-2 text-gray-700">3 months</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Third-Party Cookies */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
          <p className="text-gray-700 mb-4">
            We use the following third-party services that may set cookies on your device:
          </p>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Google Analytics</h3>
              <p className="text-sm text-gray-700 mb-2">
                Provides website analytics and insights. Data is anonymized and aggregated.
              </p>
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View Google Privacy Policy →
              </a>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Facebook Pixel</h3>
              <p className="text-sm text-gray-700 mb-2">
                Tracks conversions from Facebook ads and enables retargeting.
              </p>
              <a 
                href="https://www.facebook.com/privacy/explanation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                View Facebook Privacy Policy →
              </a>
            </div>
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
              <Settings className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">5. Managing Your Cookie Preferences</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5.1 Our Cookie Settings</h3>
              <p className="text-gray-700 mb-4">
                You can manage your cookie preferences at any time by clicking the &quot;Cookie Settings&quot; button in the footer of our website. You can:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• Accept all cookies</li>
                <li>• Reject all non-essential cookies</li>
                <li>• Choose which types of cookies to allow</li>
                <li>• Update your preferences at any time</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5.2 Browser Settings</h3>
              <p className="text-gray-700 mb-4">
                You can also control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>• View what cookies are stored and delete them individually</li>
                <li>• Block third-party cookies</li>
                <li>• Block cookies from specific websites</li>
                <li>• Block all cookies from being set</li>
                <li>• Delete all cookies when you close your browser</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Please note that blocking all cookies may impact your experience on our website and prevent you from accessing certain features.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5.3 Browser-Specific Instructions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="border border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-1">Google Chrome</h4>
                  <p className="text-sm text-blue-600">Manage cookies in Chrome →</p>
                </a>
                <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="border border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-1">Mozilla Firefox</h4>
                  <p className="text-sm text-blue-600">Manage cookies in Firefox →</p>
                </a>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="border border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-1">Safari</h4>
                  <p className="text-sm text-blue-600">Manage cookies in Safari →</p>
                </a>
                <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="border border-gray-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-1">Microsoft Edge</h4>
                  <p className="text-sm text-blue-600">Manage cookies in Edge →</p>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">5.4 Opt-Out Links</h3>
              <p className="text-gray-700 mb-3">You can also opt out of specific tracking services:</p>
              <ul className="space-y-2 text-gray-700 ml-4">
                <li>
                  • <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
                <li>
                  • <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Facebook Ad Preferences
                  </a>
                </li>
                <li>
                  • <a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Your Online Choices (EU)
                  </a>
                </li>
                <li>
                  • <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Digital Advertising Alliance Opt-out (US)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Do Not Track */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Do Not Track Signals</h2>
          <p className="text-gray-700">
            Some browsers have a &quot;Do Not Track&quot; feature that signals to websites that you do not want your online activities tracked. We honor Do Not Track signals and will not track, plant cookies, or use advertising when a Do Not Track browser mechanism is in place.
          </p>
        </section>

        {/* Updates */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Updates to This Cookie Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
          </p>
          <p className="text-gray-700">
            We encourage you to review this Cookie Policy periodically. The &quot;Last Updated&quot; date at the top of this page indicates when this policy was last revised.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">8. Questions About Cookies?</h2>
          <p className="text-purple-100 mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
          </p>
          <div className="space-y-2 text-purple-100">
            <p><strong className="text-white">Email:</strong>{' '}
              <a href="mailto:hello@pixelforgebd.com" className="text-white hover:underline">
                hello@pixelforgebd.com
              </a>
            </p>
            <p><strong className="text-white">Privacy Policy:</strong>{' '}
              <Link href="/privacy-policy" className="text-white hover:underline">
                View our Privacy Policy
              </Link>
            </p>
          </div>
        </section>

        {/* Compliance Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center bg-green-50 px-6 py-3 rounded-full border border-green-200">
            <Shield className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-semibold">GDPR & ePrivacy Directive Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}

