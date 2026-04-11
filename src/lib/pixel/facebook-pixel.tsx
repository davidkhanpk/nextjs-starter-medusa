'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

interface FacebookPixelProps {
  storeId: string;
}

interface PixelConfig {
  pixelId: string;
  pixelCode: string;
  enabled: boolean;
}

export default function FacebookPixel({ storeId }: FacebookPixelProps) {
  const [pixelConfig, setPixelConfig] = useState<PixelConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch pixel configuration from backend
    const fetchPixelConfig = async () => {
      try {
        const response = await fetch(`${process.env.LAUNCHSTORE_API_URL}/marketing/facebook-pixel/config/${storeId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch pixel config');
        }

        const data = await response.json();
        
        if (data.success && data.data.enabled) {
          setPixelConfig(data.data);
        }
      } catch (err) {
        console.error('Facebook Pixel initialization error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    if (storeId) {
      fetchPixelConfig();
    }
  }, [storeId]);

  // Don't render anything if no pixel config or error
  if (!pixelConfig || error) {
    return null;
  }

  return (
    <>
      {/* Facebook Pixel Base Code */}
      <Script
        id="facebook-pixel-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelConfig.pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* Noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelConfig.pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
