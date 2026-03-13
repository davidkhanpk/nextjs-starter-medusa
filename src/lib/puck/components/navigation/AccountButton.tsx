'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { User } from "lucide-react";
import Link from "@/components/common/SafeLink";

export interface AccountButtonProps {
  showLabel: boolean;
  label: string;
  iconSize: "sm" | "md" | "lg";
  iconColor: string;
  hoverColor: string;
  style: "minimal" | "outlined" | "filled";
  linkTo: string;
  signedInLink: string;
  showWhenSignedOut: boolean;
  showWhenSignedIn: boolean;
}

export const AccountButton: ComponentConfig<AccountButtonProps> = {
  label: "Account Button",
  
  fields: {
    showLabel: {
      type: "radio",
      label: "Show Label",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    label: {
      type: "text",
      label: "Button Label",
    },
    iconSize: {
      type: "select",
      label: "Icon Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    iconColor: {
      type: "text",
      label: "Icon Color",
    },
    hoverColor: {
      type: "text",
      label: "Hover Color",
    },
    style: {
      type: "select",
      label: "Button Style",
      options: [
        { label: "Minimal", value: "minimal" },
        { label: "Outlined", value: "outlined" },
        { label: "Filled", value: "filled" },
      ],
    },
    linkTo: {
      type: "text",
      label: "Link (Signed Out)",
    },
    signedInLink: {
      type: "text",
      label: "Link (Signed In)",
    },
    showWhenSignedOut: {
      type: "radio",
      label: "Show When Signed Out",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showWhenSignedIn: {
      type: "radio",
      label: "Show When Signed In",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    showLabel: false,
    label: "Account",
    iconSize: "md",
    iconColor: "#000000",
    hoverColor: "#3b82f6",
    style: "minimal",
    linkTo: "/account",
    signedInLink: "/account",
    showWhenSignedOut: true,
    showWhenSignedIn: true,
  },

  render: ({
    showLabel,
    label,
    iconSize,
    iconColor,
    hoverColor,
    style,
    linkTo,
    signedInLink,
    showWhenSignedOut,
    showWhenSignedIn,
  }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    // Check if user is signed in
    React.useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch('/api/auth/check');
          if (response.ok) {
            const data = await response.json();
            setIsSignedIn(data.authenticated || false);
          }
        } catch (error) {
          console.error('Failed to check auth:', error);
        }
      };

      checkAuth();
    }, []);

    // Don't render if visibility conditions not met
    if (!isSignedIn && !showWhenSignedOut) return null;
    if (isSignedIn && !showWhenSignedIn) return null;

    const sizeMap = {
      sm: 20,
      md: 24,
      lg: 28,
    };

    const iconSizeValue = sizeMap[iconSize];

    const styleClasses = {
      minimal: "p-2 rounded-full hover:bg-gray-100",
      outlined: "p-2 border-2 rounded-full hover:bg-gray-100",
      filled: "p-2 rounded-full",
    };

    const href = isSignedIn ? signedInLink : linkTo;

    return (
      <Link
        href={href}
        className={`flex items-center gap-2 transition-all ${styleClasses[style]}`}
        style={{
          color: isHovered ? hoverColor : iconColor,
          backgroundColor: style === 'filled' ? (isHovered ? hoverColor : iconColor) : 'transparent',
          borderColor: style === 'outlined' ? iconColor : 'transparent',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Account"
      >
        <User 
          size={iconSizeValue}
          style={{ 
            color: style === 'filled' ? '#ffffff' : (isHovered ? hoverColor : iconColor)
          }}
        />
        
        {showLabel && (
          <span 
            className="font-medium"
            style={{ 
              color: style === 'filled' ? '#ffffff' : (isHovered ? hoverColor : iconColor)
            }}
          >
            {label}
          </span>
        )}
      </Link>
    );
  },
};
