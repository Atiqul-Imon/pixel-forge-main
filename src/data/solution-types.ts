import type { LucideIcon } from 'lucide-react';
import {
  ShoppingCart,
  Building2,
  LayoutDashboard,
  Globe,
  Database,
  Shield,
  Megaphone,
  Cpu,
} from 'lucide-react';

export type SolutionType = {
  id: string;
  title: string;
  summary: string;
  examples: string[];
  Icon: LucideIcon;
};

/**
 * Generic categories of websites and software we build (no client-specific project references).
 */
export const solutionTypes: SolutionType[] = [
  {
    id: 'ecommerce',
    title: 'E‑commerce & online retail',
    summary: 'Storefronts, catalogs, checkout, and integrations with payments, inventory, and fulfillment.',
    examples: ['B2C and B2B commerce', 'Subscriptions and memberships', 'Marketplace-style flows'],
    Icon: ShoppingCart,
  },
  {
    id: 'erp-operations',
    title: 'ERP, CRM & internal operations',
    summary: 'Tools that run the business—workflows, approvals, reporting, and role-based access.',
    examples: ['Operational dashboards', 'Field and office workflows', 'Legacy-friendly integrations'],
    Icon: Building2,
  },
  {
    id: 'saas-b2b',
    title: 'SaaS, dashboards & B2B products',
    summary: 'Multi-tenant apps, admin consoles, analytics, and APIs your customers rely on.',
    examples: ['Productized web apps', 'Customer portals', 'Usage and billing-aware UIs'],
    Icon: LayoutDashboard,
  },
  {
    id: 'marketing-web',
    title: 'Marketing sites, landing pages & content',
    summary: 'Fast, SEO-ready front doors—editorial content, campaigns, and conversion-focused pages.',
    examples: ['Brand and campaign sites', 'Docs and resource hubs', 'Performance-led landing pages'],
    Icon: Megaphone,
  },
  {
    id: 'integrations',
    title: 'Integrations, APIs & data',
    summary: 'Connect systems—REST/GraphQL, webhooks, ETL-friendly exports, and third-party services.',
    examples: ['Payment and auth providers', 'CRM and marketing tools', 'Reporting pipelines'],
    Icon: Database,
  },
  {
    id: 'custom-platforms',
    title: 'Custom platforms & line-of-business software',
    summary: 'Purpose-built software when off-the-shelf products do not fit your process or scale.',
    examples: ['Industry-specific workflows', 'Internal tools and portals', 'Compliance-aware features'],
    Icon: Cpu,
  },
  {
    id: 'trust-sectors',
    title: 'Healthcare, nonprofit & trust-first sectors',
    summary: 'Clear UX, accessibility, and careful handling of sensitive or regulated contexts.',
    examples: ['Patient- and member-facing sites', 'Program and donation flows', 'Content-heavy organizations'],
    Icon: Shield,
  },
  {
    id: 'global-web',
    title: 'Global web presence & localization',
    summary: 'Sites engineered for performance worldwide—caching, edge-friendly assets, and maintainable content.',
    examples: ['Multi-language-ready structures', 'Fast global delivery', 'Analytics and consent patterns'],
    Icon: Globe,
  },
];
