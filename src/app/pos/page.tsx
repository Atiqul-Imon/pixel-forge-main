'use client';

import { useState } from 'react';
import { 
  Store, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone, 
  CheckCircle,
  ArrowRight,
  Zap,
  Database,
  TrendingUp,
  CreditCard,
  Receipt,
  FileText,
  Settings,
  Globe,
  Download,
  Cloud,
  Lock,
  Star,
  Award,
  Target,
  RefreshCw,
  UserCheck,
  Gift,
  PieChart,
  LineChart,
  Activity,
  Building2,
  Boxes,
  Tag,
  AlertCircle,
  ArrowLeftRight,
  ClipboardList,
  History,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Minus,
  X,
  Palette
} from 'lucide-react';

export default function POSPage() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const handleDemoRequest = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in the Multi-Store POS & Inventory Management System. My brand operates multiple stores/outlets. Please provide more information and pricing details.`
    );
    window.open(`https://wa.me/8801714918360?text=${message}`, '_blank');
  };

  const features = [
    {
      icon: <Store className="w-8 h-8" />,
      title: 'Multi-Store Management',
      description: 'The core feature - Manage unlimited store locations from one centralized system. Perfect for brands with multiple outlets.',
      details: [
        'Manage unlimited stores, outlets, or branches from one dashboard',
        'Each store maintains its own inventory levels independently',
        'Compare sales and performance across all stores in real-time',
        'Transfer products between stores with complete audit trail',
        'Maintain detailed store profile information and settings',
        'Assign staff and user roles per store with granular permissions',
        'Generate store-specific sales and inventory reports',
        'Track store opening dates, operational status, and metrics',
        'Centralized brand-level oversight with store-level independence',
        'No per-store fees - add as many stores as you need'
      ]
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: 'Product Management',
      description: 'Complete product catalog management with advanced features',
      details: [
        'Product name, SKU, barcode, category, brand, images, and descriptions',
        'Manage selling price, cost price, and margins',
        'Configure tax for individual products',
        'Support multiple units (pieces, kilograms, liters, packs, etc.)',
        'Activate or deactivate products',
        'Bulk import and export product data',
        'Search and filter products easily',
        'Support for product variants and attributes',
        'Price history tracking'
      ]
    },
    {
      icon: <Boxes className="w-8 h-8" />,
      title: 'Inventory Management',
      description: 'Real-time inventory tracking with automated alerts',
      details: [
        'Real-time stock levels per store',
        'Automatic low stock alerts',
        'Configure reorder points',
        'Record stock adjustments, damages, and returns to supplier',
        'Transfer stock between stores with audit trail',
        'Record supplier deliveries and stock-in entries',
        'Track reserved stock for pending orders',
        'Organize stock by shelf or storage area',
        'Maintain full stock movement history',
        'Inventory valuation and reporting'
      ]
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Point of Sale (POS)',
      description: 'Complete sales processing with multiple payment options',
      details: [
        'Search products by name, SKU, or barcode',
        'Supports barcode scanner',
        'Add, remove, and modify items in cart',
        'Supports cash, card, mobile payment, partial and split payments',
        'Apply discounts per item or entire bill',
        'Automatic tax calculation',
        'Generate printed or digital receipts',
        'Link sales to customer profiles',
        'Automatic loyalty point calculation',
        'Process returns and refunds',
        'Cash drawer integration',
        'View and reprint past receipts'
      ]
    },
    {
      icon: <Receipt className="w-8 h-8" />,
      title: 'Transaction Management',
      description: 'Complete transaction history and management',
      details: [
        'Record all sales transactions in detail',
        'Process return and refund transactions',
        'Track payments by method',
        'Full transaction history with search filters',
        'Unique transaction numbers',
        'Add notes to transactions',
        'Cancel or modify transactions with permission',
        'Daily transaction summary reports'
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer Management',
      description: 'Comprehensive customer database and relationship management',
      details: [
        'Create and maintain customer profiles',
        'Store contact information and demographic details',
        'Track complete purchase history',
        'Store and update loyalty point balances',
        'Categorize customers (Regular, VIP, Corporate)',
        'Track total spending and visit frequency',
        'Search customers by name, phone, or email',
        'Add notes for personalized service',
        'Centralized customer management at brand level',
        'Purchase history and loyalty points shared across all stores'
      ]
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: 'Loyalty Program',
      description: 'Automated loyalty points system to reward customers',
      details: [
        'Automatically earn points on purchases',
        'Redeem points during checkout',
        'Provide welcome bonus points for new customers',
        'Maintain complete loyalty history',
        'Fully customizable loyalty rules',
        'Display real-time loyalty balance',
        'Points synchronized across all stores'
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Reporting & Analytics',
      description: 'Advanced reporting and business intelligence',
      details: [
        'Daily, weekly, monthly, and yearly sales summaries',
        'Identify top-selling and slow-moving products',
        'Real-time stock and inventory status reports',
        'Inventory valuation reports',
        'Customer purchase behavior insights',
        'Store performance comparison reports',
        'Revenue, profit, and expense reporting',
        'Custom date range support',
        'Real-time dashboard overview with charts and summaries'
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'User Management & Security',
      description: 'Role-based access control with secure authentication',
      details: [
        'Role-based access control (RBAC)',
        'Assign users to specific stores',
        'Secure authentication and password management',
        'Track user login activity and audit trails',
        'Admin role: Full access to all stores and reports',
        'Manager role: Manage store inventory, sales, and store staff',
        'Cashier role: Conduct sales transactions',
        'Staff role: Limited view access'
      ]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: 'Offline Capability',
      description: 'Continue operations even without internet connection',
      details: [
        'Continue selling without internet connection',
        'Local offline storage for temporary transaction data',
        'Automatic data synchronization when connection restores',
        'Offline access to products and customer records',
        'Offline transaction queue to prevent data loss'
      ]
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Progressive Web App (PWA)',
      description: 'Installable app-like experience on any device',
      details: [
        'Installable on desktop or mobile device like an app',
        'Works offline',
        'Fast performance and smooth navigation',
        'Fully mobile responsive',
        'Works on Windows, Mac, Android, and iOS'
      ]
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      text: 'Unlimited Stores'
    },
    {
      icon: <Database className="w-6 h-6" />,
      text: 'Unlimited Products'
    },
    {
      icon: <Users className="w-6 h-6" />,
      text: 'Unlimited Users'
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      text: 'Cloud-Based'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      text: 'Access Anywhere'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      text: 'Secure & Encrypted'
    }
  ];

  const includedFeatures = [
    'Complete POS System Setup',
    'Multi-Store Management',
    'Unlimited Products & Users',
    'Inventory Management',
    'Customer Loyalty Program',
    'Advanced Reporting',
    'Offline Capability',
    'PWA Support',
    'Training & Documentation',
    '6 Months Free Support',
    'Regular Updates',
    'Cloud Hosting Included'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Designed for Multi-Store Brands & Outlets
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
              Multi-Store POS & Inventory Management System
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Complete Point of Sale and Inventory Management solution for brands with multiple stores or outlets. Manage all your locations from one centralized system.
            </p>
            
            <p className="text-lg text-gray-500 mb-4 max-w-2xl mx-auto">
              Whether you have 2 stores or 200, our POS system gives you complete control over inventory, sales, and operations across all your outlets.
            </p>
            <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
              ✨ Fully customizable - Tailor it to your brand and business needs
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">Unlimited</div>
                <div className="text-gray-600">Stores, Products & Users</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
                  {benefit.icon}
                  <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://pos.pixelforgebd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                View Live Demo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <button
                onClick={handleDemoRequest}
                className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-500 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <Globe className="w-5 h-5" />
                Contact for More Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Store Focus Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium mb-6">
              <Building2 className="w-4 h-4" />
              Built for Multi-Store Operations
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Perfect for Brands with Multiple Stores & Outlets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our POS & Inventory Management system is specifically designed for businesses that operate multiple locations. 
              Manage all your stores, outlets, or branches from one powerful dashboard with complete inventory control.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-600 text-white rounded-xl">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Centralized Control</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Monitor and manage all your stores from one dashboard. View real-time sales, inventory, 
                and performance metrics across all locations.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Unified dashboard for all stores</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Compare performance across outlets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Brand-level customer management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-600 text-white rounded-xl">
                  <ArrowLeftRight className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Store Independence</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Each store operates independently with its own inventory, staff, and operations, 
                while maintaining centralized oversight and reporting.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                  <span>Independent inventory per store</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                  <span>Store-to-store stock transfers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                  <span>Store-specific staff management</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-green-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-600 text-white rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Scalable Growth</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Start with 2 stores and scale to 200+ without any additional per-store fees. 
                Unlimited stores, products, and users included.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>No per-store charges</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Easy store addition</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Grows with your business</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ideal For:</h3>
              <p className="text-gray-600">Businesses operating multiple locations</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Retail Chains',
                'Franchise Businesses',
                'Multi-Outlet Brands',
                'Department Stores',
                'Supermarket Chains',
                'Fashion Brands',
                'Electronics Stores',
                'Pharmacy Chains'
              ].map((business, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{business}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Complete POS & Inventory Management Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for sales and inventory management across multiple stores from one system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedFeature(selectedFeature === feature.title ? null : feature.title)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>

                {selectedFeature === feature.title && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedFeature !== feature.title && (
                  <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Try Our Live Demo
            </h2>
            <p className="text-xl text-gray-600">
              Experience the complete POS & Inventory Management System. Explore all features and see how it works for your business.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-blue-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                Live Demo Available
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Access the Full System
              </h3>
              <p className="text-gray-700 max-w-2xl mx-auto mb-6">
                Complete multi-store POS & Inventory Management system with all features included. Perfect for brands with multiple outlets. 
                Unlimited stores, products, and users. Explore the demo to see all capabilities.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {includedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-gray-200">
              <a
                href="https://pos.pixelforgebd.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5" />
                View Live Demo
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <button
                onClick={handleDemoRequest}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-500 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Globe className="w-5 h-5" />
                Contact for More Info
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <Settings className="w-4 h-4" />
              Full Customization Available
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Customize According to Your Brand & Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              Our POS system is fully customizable. We can tailor it to match your brand identity, 
              integrate with your preferred payment gateways, add VAT compliance, and implement any 
              features specific to your business requirements.
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Start with our powerful core system, then customize it exactly how you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-purple-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Payment Gateway Integration</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Integrate with popular payment gateways used in Bangladesh
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>bKash Integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Nagad Integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Rocket Integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>SSL Commerz</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Bank Payment Gateways</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-purple-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">VAT Compliance</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                NBR-compliant invoices and VAT reporting for registered businesses
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>NBR-Compliant Invoices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>VAT Calculation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>BIN Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>VAT Return Reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Tax Invoice Format</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-purple-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Language Support</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Add Bangla language support when requested by your team
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Bangla Interface</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Bangla Receipts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Bangla Reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Product Names in Bangla</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-purple-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Brand Customization</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Customize the system to match your brand identity
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Custom Logo & Branding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Color Scheme Customization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Custom Receipt Design</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Branded Reports</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-purple-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Accounting Integration</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Connect with accounting software and export financial data
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0" />
                  <span>Accounting Software Integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0" />
                  <span>General Ledger Export</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0" />
                  <span>Financial Statement Generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0" />
                  <span>Excel/CSV Export</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-purple-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Additional Features</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Add any features specific to your business needs
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Purchase Order Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Supplier Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Employee Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>Custom Reports & Analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span>E-commerce Integration</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Need Something Specific?</h3>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
              We can customize the system to match your exact business requirements. 
              Whether it's payment gateways, VAT compliance, brand customization, or unique features - 
              we'll tailor it to your needs.
            </p>
            <button
              onClick={handleDemoRequest}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              <Settings className="w-5 h-5" />
              Discuss Customization Options
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              System Architecture
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designed for scalability and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-600 text-white rounded-xl">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Brand Level</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Centralized customer management where customer records exist at the brand level. 
                Any store can look up and serve a customer.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Shared customer database</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Unified loyalty points</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Cross-store purchase history</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-600 text-white rounded-xl">
                  <Store className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Store Level</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Each store maintains separate inventory levels, stock movements, and sales records. 
                Independent operations with centralized monitoring.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                  <span>Independent inventory</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                  <span>Store-specific reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                  <span>Role-based access</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-600 text-white rounded-xl">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Role-Based Access</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Different access levels for different roles. Secure, organized, and efficient 
                operations management.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Admin: Full access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Manager: Store operations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Cashier: Sales only</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Manage All Your Stores & Inventory from One System?
          </h2>
          <p className="text-xl text-blue-100 mb-4 max-w-2xl mx-auto">
            Complete POS & Inventory Management solution perfect for brands with multiple stores or outlets. 
            Centralized control, independent operations, and unlimited scalability.
          </p>
          <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
            Try our live demo to see all features in action, or contact us for more information and pricing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://pos.pixelforgebd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              View Live Demo
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <button
              onClick={handleDemoRequest}
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <Globe className="w-5 h-5" />
              Contact for More Info
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

