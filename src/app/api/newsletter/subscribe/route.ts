import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, storeId } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    // TODO: Integrate with LaunchStore backend to store newsletter subscription
    // For now, we'll log it and return success
    
    // Option 1: Call LaunchStore backend API
    const shopikoolBackend = process.env.LAUNCHSTORE_BACKEND_URL || 'http://localhost:3001'
    
    try {
      const response = await fetch(`${shopikoolBackend}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          storeId,
          source: 'storefront',
          subscribedAt: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        // If backend fails, still return success to user but log error
        console.error('Failed to store newsletter subscription:', await response.text())
      }
    } catch (backendError) {
      // Backend not available, log and continue
      console.error('Newsletter backend error:', backendError)
      console.log('Newsletter subscription (backend unavailable):', { email, storeId })
    }

    // Return success to user
    return NextResponse.json({ 
      success: true,
      message: 'Successfully subscribed to newsletter'
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
