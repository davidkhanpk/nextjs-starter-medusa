'use client';

/**
 * SafeLink - A wrapper around Next.js Link that prevents crashes from undefined href.
 * Next.js 15 throws "Cannot destructure property 'auth' of 'e' as it is undefined"
 * when Link receives an undefined href (it tries to parse it as a URL object).
 */

import React from 'react';
import NextLink from 'next/link';

type SafeLinkProps = React.ComponentProps<typeof NextLink>;

const SafeLink = React.forwardRef<HTMLAnchorElement, SafeLinkProps>(
  function SafeLink({ href, ...props }, ref) {
    // Guard against undefined/null href which crashes Next.js Link
    const safeHref = href ?? '#';
    return <NextLink ref={ref} href={safeHref} {...props} />;
  }
);

SafeLink.displayName = 'SafeLink';

export default SafeLink;
