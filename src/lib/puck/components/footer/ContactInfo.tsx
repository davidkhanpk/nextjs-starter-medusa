'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export interface ContactInfoProps {
  showAddress: boolean;
  address?: string;
  showPhone: boolean;
  phone?: string;
  showEmail: boolean;
  email?: string;
  showHours: boolean;
  hours?: string;
  showIcons: boolean;
  layout: "stacked" | "grid";
  textColor: string;
  iconColor: string;
  fontSize: "sm" | "base";
  gap: "sm" | "md" | "lg";
}

export const ContactInfo: ComponentConfig<ContactInfoProps> = {
  label: "Contact Info",
  
  fields: {
    showAddress: {
      type: "radio",
      label: "Show Address",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    address: {
      type: "textarea",
      label: "Address",
    },
    showPhone: {
      type: "radio",
      label: "Show Phone",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    phone: {
      type: "text",
      label: "Phone Number",
    },
    showEmail: {
      type: "radio",
      label: "Show Email",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    email: {
      type: "text",
      label: "Email Address",
    },
    showHours: {
      type: "radio",
      label: "Show Business Hours",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    hours: {
      type: "textarea",
      label: "Business Hours",
    },
    showIcons: {
      type: "radio",
      label: "Show Icons",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { label: "Stacked", value: "stacked" },
        { label: "Grid", value: "grid" },
      ],
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
    iconColor: {
      type: "text",
      label: "Icon Color",
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Base", value: "base" },
      ],
    },
    gap: {
      type: "select",
      label: "Spacing",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  },

  defaultProps: {
    showAddress: true,
    address: "123 Main Street\nCity, State 12345\nCountry",
    showPhone: true,
    phone: "+1 (555) 123-4567",
    showEmail: true,
    email: "contact@example.com",
    showHours: true,
    hours: "Mon-Fri: 9:00 AM - 6:00 PM\nSat-Sun: 10:00 AM - 4:00 PM",
    showIcons: true,
    layout: "stacked",
    textColor: "#6b7280",
    iconColor: "#9ca3af",
    fontSize: "sm",
    gap: "md",
  },

  render: ({
    showAddress,
    address,
    showPhone,
    phone,
    showEmail,
    email,
    showHours,
    hours,
    showIcons,
    layout,
    textColor,
    iconColor,
    fontSize,
    gap,
  }) => {
    const contactItems = [];

    if (showAddress && address) {
      contactItems.push({
        icon: MapPin,
        content: address,
        href: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
      });
    }

    if (showPhone && phone) {
      contactItems.push({
        icon: Phone,
        content: phone,
        href: `tel:${phone.replace(/\s/g, '')}`,
      });
    }

    if (showEmail && email) {
      contactItems.push({
        icon: Mail,
        content: email,
        href: `mailto:${email}`,
      });
    }

    if (showHours && hours) {
      contactItems.push({
        icon: Clock,
        content: hours,
        href: null,
      });
    }

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
    };

    const fontSizeClasses = {
      sm: 'text-sm',
      base: 'text-base',
    };

    const layoutClasses = {
      stacked: 'flex flex-col',
      grid: 'grid grid-cols-1 md:grid-cols-2',
    };

    return (
      <div className={`${layoutClasses[layout]} ${gapClasses[gap]}`}>
        {contactItems.map((item, index) => {
          const IconComponent = item.icon;
          const content = (
            <div className="flex items-start gap-3">
              {showIcons && (
                <IconComponent 
                  size={20} 
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: iconColor }}
                />
              )}
              <div 
                className={`${fontSizeClasses[fontSize]} whitespace-pre-line`}
                style={{ color: textColor }}
              >
                {item.content}
              </div>
            </div>
          );

          return item.href ? (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              {content}
            </a>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>
    );
  },
};
