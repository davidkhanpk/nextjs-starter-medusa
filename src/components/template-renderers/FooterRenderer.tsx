'use client'

import React, { useState } from 'react';
import { FooterTemplate } from '@lib/template/types-advanced';
import Link from 'next/link';
import { cn, colorToTailwind, spacingToTailwind } from '@lib/template/tailwind-mapper';
import { 
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

interface FooterRendererProps {
  template: FooterTemplate | null;
}

/**
 * Footer Renderer
 * Renders customizable footers with columns, social links, newsletter, and payment methods
 */
export function FooterRenderer({ template }: FooterRendererProps) {
  const config = template || getDefaultFooterTemplate();
  const { zones, settings } = config;

  const [email, setEmail] = useState('');

  // Social media icons (would be dynamic in production)
  const socialLinks = [
    { name: 'Facebook', url: '#', icon: '📘' },
    { name: 'Instagram', url: '#', icon: '📷' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'Pinterest', url: '#', icon: '📌' },
  ];

  // Payment methods (would be dynamic in production)
  const paymentMethods = [
    { name: 'Visa', icon: '💳' },
    { name: 'Mastercard', icon: '💳' },
    { name: 'PayPal', icon: '💳' },
    { name: 'Apple Pay', icon: '💳' },
  ];

  // Footer links by category
  const footerLinks = {
    shop: [
      { label: 'New Arrivals', href: '/collections/new' },
      { label: 'Best Sellers', href: '/collections/best' },
      { label: 'Sale', href: '/collections/sale' },
      { label: 'All Products', href: '/store' },
    ],
    customerService: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Shipping & Returns', href: '/shipping' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Size Guide', href: '/size-guide' },
    ],
    about: [
      { label: 'Our Story', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Press', href: '/press' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  // Render a column
  const renderColumn = (column: any, index: number) => {
    switch (column.type) {
      case 'links':
        return (
          <div key={index}>
            <h3 className="font-semibold mb-4 text-lg">{column.title}</h3>
            <ul className="space-y-2">
              {(footerLinks[column.category as keyof typeof footerLinks] || footerLinks.shop).map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="hover:opacity-70 transition-opacity text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'newsletter':
        return (
          <div key={index}>
            <h3 className="font-semibold mb-4 text-lg">{column.title}</h3>
            <p className="text-sm mb-4 opacity-80">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                console.log('Newsletter signup:', email);
                setEmail('');
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'flex-1 px-4 py-2 border rounded-lg text-sm',
                  'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500'
                )}
                style={{
                  borderRadius: settings.borderRadius === 'none' ? '0' : 
                               settings.borderRadius === 'sm' ? '0.25rem' : 
                               settings.borderRadius === 'md' ? '0.5rem' : '0.75rem',
                }}
              />
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium whitespace-nowrap"
                style={{
                  backgroundColor: settings.colors.primary,
                  borderRadius: settings.borderRadius === 'none' ? '0' : 
                               settings.borderRadius === 'sm' ? '0.25rem' : 
                               settings.borderRadius === 'md' ? '0.5rem' : '0.75rem',
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        );

      case 'contact':
        return (
          <div key={index}>
            <h3 className="font-semibold mb-4 text-lg">{column.title}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPinIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>123 Commerce St, Suite 100<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <PhoneIcon className="w-5 h-5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <EnvelopeIcon className="w-5 h-5 flex-shrink-0" />
                <span>support@store.com</span>
              </li>
            </ul>
          </div>
        );

      case 'social':
        return (
          <div key={index}>
            <h3 className="font-semibold mb-4 text-lg">{column.title}</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-10 h-10 flex items-center justify-center text-xl',
                    'hover:opacity-70 transition-opacity rounded-full',
                    'bg-gray-100 dark:bg-gray-800'
                  )}
                  aria-label={social.name}
                  style={{
                    borderRadius: settings.borderRadius === 'none' ? '0' : 
                                 settings.borderRadius === 'sm' ? '0.25rem' : 
                                 settings.borderRadius === 'md' ? '0.5rem' : '9999px',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render top section with columns
  const renderTopSection = () => {
    if (!zones.topSection?.enabled) return null;

    return (
      <div
        className={cn(
          'py-12 border-b',
          zones.topSection.columns === 1 && 'grid-cols-1',
          zones.topSection.columns === 2 && 'grid sm:grid-cols-2 gap-8',
          zones.topSection.columns === 3 && 'grid sm:grid-cols-2 lg:grid-cols-3 gap-8',
          zones.topSection.columns === 4 && 'grid sm:grid-cols-2 lg:grid-cols-4 gap-8'
        )}
        style={{ borderColor: settings.colors.border }}
      >
        {zones.topSection.columnContent?.map((column, index) => renderColumn(column, index))}
      </div>
    );
  };

  // Render middle section
  const renderMiddleSection = () => {
    if (!zones.middleSection?.enabled) return null;

    return (
      <div className="py-8 border-b" style={{ borderColor: settings.colors.border }}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and description */}
          {zones.middleSection.showLogo && (
            <div className="flex-1 max-w-md">
              <div className="text-2xl font-bold mb-2">STORE</div>
              {zones.middleSection.description && (
                <p className="text-sm opacity-70">{zones.middleSection.description}</p>
              )}
            </div>
          )}

          {/* Social links */}
          {zones.middleSection.socialLinks && (
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-xl hover:opacity-70 transition-opacity bg-gray-100 dark:bg-gray-800 rounded-full"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}

          {/* Payment methods */}
          {zones.middleSection.paymentMethods && (
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70 mr-2">We Accept:</span>
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="w-12 h-8 flex items-center justify-center bg-white border border-gray-300 rounded text-xl"
                  title={method.name}
                >
                  {method.icon}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render bottom section
  const renderBottomSection = () => {
    if (!zones.bottomSection?.enabled) return null;

    return (
      <div className="py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm opacity-70">
            {zones.bottomSection.copyright || `© ${new Date().getFullYear()} Store. All rights reserved.`}
          </div>

          {/* Links */}
          {zones.bottomSection.links && zones.bottomSection.links.length > 0 && (
            <div className="flex items-center gap-6">
              {zones.bottomSection.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Language and currency selectors */}
          {(zones.bottomSection.languageSelector || zones.bottomSection.currencySelector) && (
            <div className="flex items-center gap-4">
              {zones.bottomSection.languageSelector && (
                <select className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              )}
              {zones.bottomSection.currencySelector && (
                <select className="text-sm bg-transparent border border-gray-300 dark:border-gray-600 rounded px-3 py-1.5">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: zones.topSection?.backgroundColor || settings.colors.background,
        color: zones.topSection?.textColor || settings.colors.text,
      }}
    >
      <div className={cn(
        'px-4',
        settings.maxWidth === 'container' && 'content-container',
        settings.maxWidth === 'narrow' && 'max-w-5xl mx-auto'
      )}>
        {renderTopSection()}
        {renderMiddleSection()}
        {renderBottomSection()}
      </div>
    </footer>
  );
}

/**
 * Default footer template
 */
function getDefaultFooterTemplate(): FooterTemplate {
  return {
    id: 'default',
    templateName: 'Default Footer',
    category: 'minimal',
    zones: {
      topSection: {
        enabled: true,
        columns: 3,
        backgroundColor: '#f9fafb',
        textColor: '#111827',
        columnContent: [
          {
            type: 'links',
            title: 'Shop',
            category: 'shop',
          },
          {
            type: 'links',
            title: 'Customer Service',
            category: 'customerService',
          },
          {
            type: 'newsletter',
            title: 'Newsletter',
          },
        ],
      },
      bottomSection: {
        enabled: true,
        copyright: `© ${new Date().getFullYear()} Store. All rights reserved.`,
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    },
    settings: {
      colors: {
        primary: '#000000',
        secondary: '#6b7280',
        accent: '#3b82f6',
        background: '#f9fafb',
        text: '#111827',
        border: '#e5e7eb',
      },
      spacing: 'normal',
      borderRadius: 'md',
      breakpoint: 'md',
      maxWidth: 'container',
    },
  };
}
