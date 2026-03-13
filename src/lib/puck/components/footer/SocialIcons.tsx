'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Github } from "lucide-react";

export interface SocialLink {
  platform: "facebook" | "instagram" | "twitter" | "youtube" | "linkedin" | "github";
  url: string;
}

export interface SocialIconsProps {
  links: SocialLink[];
  size: "sm" | "md" | "lg";
  style: "circle" | "square" | "minimal";
  color: string;
  hoverColor: string;
  backgroundColor: string;
  hoverBackgroundColor: string;
  gap: "sm" | "md" | "lg";
  alignment: "left" | "center" | "right";
}

export const SocialIcons: ComponentConfig<SocialIconsProps> = {
  label: "Social Icons",
  
  fields: {
    links: {
      type: "array",
      label: "Social Links",
      arrayFields: {
        platform: {
          type: "select",
          label: "Platform",
          options: [
            { label: "Facebook", value: "facebook" },
            { label: "Instagram", value: "instagram" },
            { label: "Twitter", value: "twitter" },
            { label: "YouTube", value: "youtube" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "GitHub", value: "github" },
          ],
        },
        url: { type: "text", label: "URL" },
      },
      getItemSummary: (item) => `${item.platform}` || "Social Link",
    },
    size: {
      type: "select",
      label: "Icon Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    style: {
      type: "select",
      label: "Style",
      options: [
        { label: "Circle", value: "circle" },
        { label: "Square", value: "square" },
        { label: "Minimal", value: "minimal" },
      ],
    },
    color: {
      type: "text",
      label: "Icon Color",
    },
    hoverColor: {
      type: "text",
      label: "Hover Color",
    },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    hoverBackgroundColor: {
      type: "text",
      label: "Hover Background Color",
    },
    gap: {
      type: "select",
      label: "Spacing Between Icons",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    alignment: {
      type: "select",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  },

  defaultProps: {
    links: [
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "twitter", url: "https://twitter.com" },
    ],
    size: "md",
    style: "circle",
    color: "#ffffff",
    hoverColor: "#3b82f6",
    backgroundColor: "#374151",
    hoverBackgroundColor: "#1f2937",
    gap: "md",
    alignment: "center",
  },

  render: ({
    links,
    size,
    style,
    color,
    hoverColor,
    backgroundColor,
    hoverBackgroundColor,
    gap,
    alignment,
  }) => {
    const iconComponents = {
      facebook: Facebook,
      instagram: Instagram,
      twitter: Twitter,
      youtube: Youtube,
      linkedin: Linkedin,
      github: Github,
    };

    const sizeMap = {
      sm: { icon: 16, padding: 'p-2' },
      md: { icon: 20, padding: 'p-3' },
      lg: { icon: 24, padding: 'p-4' },
    };

    const gapClasses = {
      sm: 'gap-2',
      md: 'gap-3',
      lg: 'gap-4',
    };

    const alignmentClasses = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    const styleClasses = {
      circle: 'rounded-full',
      square: 'rounded-lg',
      minimal: 'rounded-none',
    };

    const { icon: iconSize, padding } = sizeMap[size];

    return (
      <div className={`flex ${gapClasses[gap]} ${alignmentClasses[alignment]}`}>
        {links.map((link, index) => {
          const IconComponent = iconComponents[link.platform];
          
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${padding} ${styleClasses[style]} 
                transition-all duration-200 
                ${style !== 'minimal' ? 'hover:scale-110' : ''}
              `}
              style={{
                backgroundColor: style !== 'minimal' ? backgroundColor : 'transparent',
                color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = hoverColor;
                if (style !== 'minimal') {
                  e.currentTarget.style.backgroundColor = hoverBackgroundColor;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = color;
                if (style !== 'minimal') {
                  e.currentTarget.style.backgroundColor = backgroundColor;
                }
              }}
              aria-label={link.platform}
            >
              <IconComponent size={iconSize} />
            </a>
          );
        })}
      </div>
    );
  },
};
