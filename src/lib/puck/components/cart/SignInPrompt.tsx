'use client';

import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Heading, Text } from "@medusajs/ui";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { useCustomer } from "@lib/hooks/useCustomer";

export interface SignInPromptProps {
  title: string;
  message: string;
  signInLinkText: string;
  signUpLinkText: string;
  showDivider: boolean;
  signedInMessage: string;
  showWhenSignedIn: boolean;
}

export const SignInPrompt: ComponentConfig<SignInPromptProps> = {
  label: "Sign In Prompt",

  fields: {
    title: {
      type: "text",
      label: "Title",
    },
    message: {
      type: "textarea",
      label: "Message",
    },
    signInLinkText: {
      type: "text",
      label: "Sign In Link Text",
    },
    signUpLinkText: {
      type: "text",
      label: "Sign Up Link Text",
    },
    showDivider: {
      type: "radio",
      label: "Show Divider Below",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    signedInMessage: {
      type: "text",
      label: "Signed In Message (optional)",
    },
    showWhenSignedIn: {
      type: "radio",
      label: "Show Message When Signed In",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  },

  defaultProps: {
    title: "Already have an account?",
    message: "Sign in for a better experience.",
    signInLinkText: "Sign in",
    signUpLinkText: "Join us",
    showDivider: true,
    signedInMessage: "You're signed in",
    showWhenSignedIn: false,
  },

  render: ({ title, message, signInLinkText, signUpLinkText, showDivider, signedInMessage, showWhenSignedIn }) => {
    const { customer } = useCustomer();

    // If customer is signed in and we don't want to show anything, return null
    if (customer && !showWhenSignedIn) {
      return null;
    }

    // If customer is signed in and we want to show a message
    if (customer && showWhenSignedIn) {
      return (
        <>
          <div className="bg-white flex items-start justify-between" data-testid="signed-in-message">
            <div>
              <Text className="txt-medium text-ui-fg-subtle">
                {signedInMessage} {customer.email}
              </Text>
            </div>
          </div>
          {showDivider && (
            <div className="h-px w-full border-b border-gray-200" />
          )}
        </>
      );
    }

    // Customer not signed in - show sign in prompt
    return (
      <>
        <div
          className="bg-white flex items-start justify-between"
          data-testid="sign-in-prompt"
        >
          <div>
            <Heading level="h2" className="txt-xlarge">
              {title}
            </Heading>
            <Text className="txt-medium text-ui-fg-subtle mt-2">
              {message}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <LocalizedClientLink href="/account">
              <span className="txt-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover">
                {signInLinkText}
              </span>
            </LocalizedClientLink>
            {signUpLinkText && (
              <>
                <span className="text-ui-fg-subtle">or</span>
                <LocalizedClientLink href="/account">
                  <span className="txt-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover">
                    {signUpLinkText}
                  </span>
                </LocalizedClientLink>
              </>
            )}
          </div>
        </div>
        {showDivider && (
          <div className="h-px w-full border-b border-gray-200" />
        )}
      </>
    );
  },
};
