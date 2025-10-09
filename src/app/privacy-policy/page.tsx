import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, UserCheck, Mail, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pixel Forge - Your Data Protection & Privacy Rights',
  description: 'Learn how Pixel Forge collects, uses, and protects your personal information. We are committed to transparency and compliance with GDPR and international data protection laws.',
  openGraph: {
    title: 'Privacy Policy | Pixel Forge',
    description: 'Learn how Pixel Forge protects your privacy and personal data.',
    type: 'website',
  },
};

export default function PrivacyPolicy() {
  const lastUpdated = 'September 30, 2025';
  
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-blue-100 mb-4">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-blue-200">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to Pixel Forge (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal data and respecting your privacy rights. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website{' '}
            <Link href="/" className="text-blue-600 hover:underline">pixelforgebd.com</Link>, use our services, or interact with us.
          </p>
          <p className="text-gray-700 leading-relaxed">
            This policy applies to all visitors, users, and others who access or use our services. By using our website, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2.1 Personal Information You Provide</h3>
              <p className="text-gray-700 mb-3">When you interact with our services, we may collect:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
                <li><strong>Project Information:</strong> Details about your project requirements, budget, timeline</li>
                <li><strong>Communication Data:</strong> Messages, inquiries, feedback you send to us</li>
                <li><strong>Account Information:</strong> Username, password (encrypted), profile information if you create an account</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2.2 Information Collected Automatically</h3>
              <p className="text-gray-700 mb-3">When you visit our website, we automatically collect:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on pages, links clicked, referring URLs</li>
                <li><strong>Location Data:</strong> General geographic location based on IP address</li>
                <li><strong>Cookies and Similar Technologies:</strong> See our <Link href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</Link> for details</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">2.3 Information from Third Parties</h3>
              <p className="text-gray-700 mb-3">We may receive information about you from:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Social media platforms (if you interact with our social media profiles)</li>
                <li>Analytics providers (Google Analytics, Facebook Pixel)</li>
                <li>Advertising networks</li>
                <li>Business partners and referrers</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
          </div>

          <p className="text-gray-700 mb-4">We use the collected information for the following purposes:</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Service Delivery:</strong> To provide, maintain, and improve our web development services</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Communication:</strong> To respond to inquiries, send updates, and provide customer support</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Marketing:</strong> To send promotional materials, newsletters, and relevant offers (with your consent)</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Analytics:</strong> To understand how users interact with our website and improve user experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Security:</strong> To detect, prevent, and address fraud, security breaches, and technical issues</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms and policies</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Business Operations:</strong> For internal record-keeping, accounting, and business development</span>
            </li>
          </ul>
        </section>

        {/* Legal Basis for Processing */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Legal Basis for Processing (GDPR)</h2>
          <p className="text-gray-700 mb-4">
            If you are from the European Economic Area (EEA), our legal basis for collecting and using your personal information depends on the data concerned and the context in which we collect it:
          </p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li><strong>Consent:</strong> You have given us explicit consent to process your data</li>
            <li><strong>Contract:</strong> Processing is necessary for a contract we have with you</li>
            <li><strong>Legal Obligation:</strong> We need to comply with the law</li>
            <li><strong>Legitimate Interests:</strong> Processing is in our legitimate interests and doesn&apos;t override your rights</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. How We Share Your Information</h2>
          <p className="text-gray-700 mb-4">We may share your information with:</p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span><strong>Service Providers:</strong> Third-party vendors who assist us (hosting, analytics, payment processing, email services)</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span><strong>Business Partners:</strong> When you request specific services requiring partner collaboration</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span><strong>Legal Authorities:</strong> When required by law or to protect our rights</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</span>
            </li>
          </ul>
          <p className="text-gray-700 mt-4">
            We do not sell your personal information to third parties.
          </p>
        </section>

        {/* Data Security */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">6. Data Security</h2>
          </div>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction:
          </p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li>• SSL/TLS encryption for data transmission</li>
            <li>• Encrypted storage of sensitive information</li>
            <li>• Regular security audits and updates</li>
            <li>• Access controls and authentication measures</li>
            <li>• Employee training on data protection</li>
          </ul>
          <p className="text-gray-700 mt-4">
            However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
          </p>
        </section>

        {/* Your Rights */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights</h2>
          <p className="text-gray-700 mb-4">Depending on your location, you may have the following rights:</p>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Access & Portability</h3>
              <p className="text-gray-700 text-sm">Request a copy of your personal data in a portable format</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Rectification</h3>
              <p className="text-gray-700 text-sm">Request correction of inaccurate or incomplete data</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Erasure (&quot;Right to be Forgotten&quot;)</h3>
              <p className="text-gray-700 text-sm">Request deletion of your personal data under certain conditions</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Restriction</h3>
              <p className="text-gray-700 text-sm">Request restriction of processing your data</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Objection</h3>
              <p className="text-gray-700 text-sm">Object to processing of your data for specific purposes</p>
            </div>
            <div className="bg-cyan-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Withdraw Consent</h3>
              <p className="text-gray-700 text-sm">Withdraw consent at any time where we rely on consent</p>
            </div>
          </div>
          <p className="text-gray-700 mt-4">
            To exercise these rights, please contact us at{' '}
            <a href="mailto:hello@pixelforgebd.com" className="text-blue-600 hover:underline">
              hello@pixelforgebd.com
            </a>
          </p>
        </section>

        {/* Data Retention */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
          <p className="text-gray-700 mb-4">
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>
          <ul className="space-y-2 text-gray-700 ml-4">
            <li>• <strong>Contact inquiries:</strong> Retained for 2 years after last contact</li>
            <li>• <strong>Project data:</strong> Retained for duration of project plus 3 years</li>
            <li>• <strong>Marketing data:</strong> Retained until consent is withdrawn</li>
            <li>• <strong>Analytics data:</strong> Anonymized and retained for 26 months (Google Analytics default)</li>
          </ul>
        </section>

        {/* International Transfers */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
          <p className="text-gray-700 mb-4">
            Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws different from those in your country.
          </p>
          <p className="text-gray-700">
            We ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission, to protect your information during international transfers.
          </p>
        </section>

        {/* Children&apos;s Privacy */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
          <p className="text-gray-700">
            Our services are not intended for individuals under the age of 16. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us so we can delete it.
          </p>
        </section>

        {/* Changes to Policy */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>
          <p className="text-gray-700">
            You are advised to review this Privacy Policy periodically for any changes. Changes are effective when posted on this page.
          </p>
        </section>

        {/* Contact Us */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">12. Contact Us</h2>
          </div>
          <p className="text-blue-100 mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="space-y-3 text-blue-100">
            <p><strong className="text-white">Company:</strong> Pixel Forge</p>
            <p><strong className="text-white">Email:</strong>{' '}
              <a href="mailto:hello@pixelforgebd.com" className="text-white hover:underline">
                hello@pixelforgebd.com
              </a>
            </p>
            <p><strong className="text-white">Website:</strong>{' '}
              <Link href="/" className="text-white hover:underline">
                pixelforgebd.com
              </Link>
            </p>
            <p><strong className="text-white">WhatsApp:</strong>{' '}
              <a href="https://wa.me/8801714918360" className="text-white hover:underline">
                +880 1714 918360
              </a>
            </p>
          </div>
        </section>

        {/* GDPR Compliance Badge */}
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

