import { NextResponse } from 'next/server';
import { defaultTheme } from '@lib/theme/types';
import { mapPlatformThemeToStorefront } from '@lib/theme/mapper';

/**
 * GET /api/theme
 * 
 * Fetches the store's theme configuration from Shopikool Platform API
 * 
 * Flow:
 * 1. Determine store ID (from env in dev, subdomain in production)
 * 2. Fetch theme from Platform: GET /stores/:id/theme
 * 3. Map platform Theme table to storefront format
 * 4. Return theme with customCSS
 */
export async function GET(request: Request) {
  try {
    // Get store ID
    const storeId = getStoreId(request);

    if (!storeId) {
      console.warn('[Theme API] No store ID found, using default theme');
      return NextResponse.json({ theme: defaultTheme });
    }

    // Fetch from Shopikool Platform (PUBLIC endpoint - no auth required)
    const platformApiUrl = process.env.SHOPIKOOL_API_URL || 'http://localhost:3000/api';
    const themeUrl = `${platformApiUrl}/public/stores/id/${storeId}/theme`;
    
    const response = await fetch(themeUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
      next: { 
        revalidate: process.env.NODE_ENV === 'production' ? 300 : 60,
        tags: [`theme-${storeId}`]
      },
    });

    if (!response.ok) {
      console.warn(`[Theme API] Failed: ${response.status} ${response.statusText}`);
      return NextResponse.json({ theme: defaultTheme });
    }

    const platformTheme = await response.json();
    
    // Map platform theme to storefront
    const storefrontTheme = mapPlatformThemeToStorefront(platformTheme);
    
    return NextResponse.json({ 
      theme: storefrontTheme,
      customCSS: platformTheme.customCSS || null,
      version: platformTheme.version || 1
    });
  } catch (error) {
    console.error('[Theme API] Error:', error);
    return NextResponse.json({ theme: defaultTheme });
  }
}

function getStoreId(request: Request): string | null {
  // Development: Use env variable
  if (process.env.NODE_ENV === 'development') {
    return process.env.STORE_ID || null;
  }

  // Production: Extract from subdomain
  const host = request.headers.get('host') || '';
  return extractSubdomain(host);
}

function extractSubdomain(host: string): string | null {
  const hostWithoutPort = host.split(':')[0];
  
  if (hostWithoutPort === 'localhost' || hostWithoutPort.startsWith('192.168')) {
    return null;
  }
  
  const parts = hostWithoutPort.split('.');
  
  if (parts.length < 3) {
    return null;
  }
  
  return parts[0];
}
