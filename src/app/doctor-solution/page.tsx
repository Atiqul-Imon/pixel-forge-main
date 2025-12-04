'use client';

import {
  Stethoscope,
  CalendarDays,
  ClipboardList,
  Shield,
  FileText,
  BookOpen,
  Activity,
  Users2,
  MessageSquare,
  ArrowRight,
  Globe,
  CheckCircle2,
  Zap,
  Layers,
  HeartPulse,
  Cloud
} from 'lucide-react';
import { useEffect } from 'react';

declare global {
  interface Window {
    fbq: (action: string, event: string, data?: Record<string, unknown>) => void;
  }
}

const whatsappNumber = '8801714918360';

const heroHighlights = [
  'Built with Next.js 15+ App Router',
  'HIPAA-inspired security principles',
  'Optimized for SEO & content marketing',
  'Modular architecture for faster customization'
];

const platformPillars = [
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Patient Management',
    description: 'Securely store, update, and search patient profiles with complete medical data.'
  },
  {
    icon: <CalendarDays className="w-6 h-6" />,
    title: 'Appointments & Scheduling',
    description: 'Smart booking flow with automated confirmations and reminders for patients.'
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Prescription Generator',
    description: 'Generate professional prescriptions with branded layouts and digital signature support.'
  },
  {
    icon: <ClipboardList className="w-6 h-6" />,
    title: 'Medical Records & History',
    description: 'Instant access to visit history, diagnoses, lab reports, and medication history.'
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Integrated Blog System',
    description: 'Publish health tips, clinic updates, and SEO-friendly articles from the same dashboard.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise Security',
    description: 'Role-based access, encrypted storage, and audit-ready logging by design.'
  }
];

const workflowSteps = [
  {
    title: 'Patient Signup & Intake',
    details: 'Patients register, submit health info, and verify contact channels online.'
  },
  {
    title: 'Smart Scheduling',
    details: 'Patients pick available slots, doctors approve, and reminders go out automatically.'
  },
  {
    title: 'Consultation Workspace',
    details: 'Doctors review history, update vitals, and capture clinical notes in real time.'
  },
  {
    title: 'Prescription & Follow-up',
    details: 'Issue digital prescriptions, share follow-up plans, and link next appointments.'
  },
  {
    title: 'Content & Engagement',
    details: 'Publish blog posts, FAQs, and patient education content to grow authority.'
  }
];

const nextJsBenefits = [
  {
    title: 'Speed & Core Web Vitals',
    description: 'Server-side rendering, image optimization, and edge caching make every page blazingly fast.',
    icon: <Zap className="w-5 h-5" />
  },
  {
    title: 'Security by Design',
    description: 'API routes, route protection, and environment isolation keep PHI locked down.',
    icon: <Shield className="w-5 h-5" />
  },
  {
    title: 'Scalable Architecture',
    description: 'Modular components allow us to add telemedicine, billing, or CRM features quickly.',
    icon: <Layers className="w-5 h-5" />
  },
  {
    title: 'SEO-Ready Blog',
    description: 'File-based routing and MDX-ready blog system boost organic reach instantly.',
    icon: <BookOpen className="w-5 h-5" />
  }
];

export default function DoctorSolutionPage() {
  // Track page view when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Doctor Solution Page',
        content_category: 'Product Page',
        content_type: 'service',
        value: 0,
        currency: 'BDT'
      });
    }
  }, []);

  const handleWhatsapp = () => {
    // Track WhatsApp click event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'Doctor Solution - WhatsApp',
        content_category: 'Lead Generation',
        method: 'WhatsApp'
      });
    }

    const message = encodeURIComponent(
      `Hello! I'm interested in the Doctor Website Solution powered by Next.js. Please share the onboarding process and customization details.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    // Track Email click event
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'Doctor Solution - Email',
        content_category: 'Lead Generation',
        method: 'Email'
      });
    }

    window.location.href = 'mailto:hello@pixelforgebd.com?subject=Doctor%20Website%20Solution%20Inquiry';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent" />
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/80 text-blue-700 font-semibold shadow-lg">
            <HeartPulse className="w-4 h-4" />
            Doctor Website Solution • Next.js
          </div>
            <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600 font-semibold">
              🚀 Introducing the Ultimate Doctor Website Solution
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Not Just a Website — A Complete Digital Ecosystem for Modern Healthcare
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Manage patients, appointments, prescriptions, medical history, and content marketing from one secure,
              Next.js-powered platform crafted exclusively for doctors and clinics ready to go digital.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {heroHighlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm text-sm text-gray-700"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {highlight}
              </div>
            ))}
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            If you are a doctor aiming to streamline clinical operations, deliver superb patient experience, and build
            authority online — this is your all-in-one solution.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleWhatsapp}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Message Us to Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleEmail}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Globe className="w-5 h-5" />
              Request a Demo Walkthrough
            </button>
          </div>
        </div>
      </section>

      {/* Platform Pillars */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <p className="text-blue-600 font-semibold uppercase tracking-[0.25em] text-sm">What&apos;s Inside</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">All-In-One Platform Crafted for Doctors</h2>
            <p className="text-lg text-gray-600">
              Patient management, scheduling, prescriptions, medical records, and SEO-ready content tools — unified under
              one modern dashboard.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-gradient-to-br from-slate-50 to-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-4 text-blue-600">{pillar.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <p className="text-purple-600 font-semibold uppercase tracking-[0.25em] text-sm">Doctor-First Workflow</p>
            <h2 className="text-4xl font-bold text-gray-900">From Patient Intake to Digital Prescription</h2>
            <p className="text-lg text-gray-600">
              Every touchpoint is optimized to save time, reduce paperwork, and elevate patient experience.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {workflowSteps.map((step, index) => (
              <div key={step.title} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <Activity className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next.js Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] text-sm">Powered by Next.js</p>
          <h2 className="text-4xl font-bold text-gray-900">
            Built for Speed, Security, and Constant Evolution
          </h2>
          <p className="text-lg text-gray-600">
            Next.js 15+ ensures lightning-fast performance, server-side rendering, and future-proof architecture, so
            your platform feels as premium as the care you deliver.
          </p>
          <div className="space-y-4 text-left">
            {nextJsBenefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4 bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="p-3 rounded-2xl bg-blue-100 text-blue-700">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Cloud className="w-12 h-12 mx-auto text-white/70" />
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Launch Your Doctor Platform?
          </h2>
          <p className="text-lg text-white/80">
            This isn’t a simple portfolio site. It’s a complete digital ecosystem that keeps your clinic organized,
            responsive, and future-ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleWhatsapp}
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-xl flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Talk to Our Product Team
            </button>
            <button
              onClick={handleEmail}
              className="w-full sm:w-auto px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Users2 className="w-5 h-5" />
              Request Case Studies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}


