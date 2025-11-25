'use client'

import { useState } from 'react'
import { useTheme } from '@lib/theme/ThemeProvider'
import { Button, Input, Text } from '@medusajs/ui'

interface NewsletterFormProps {
  storeId?: string
}

export default function NewsletterForm({ storeId }: NewsletterFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setStatus('error')
      setMessage('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, storeId }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Thank you for subscribing!')
        setEmail('')
        
        // Reset status after 5 seconds
        setTimeout(() => {
          setStatus('idle')
          setMessage('')
        }, 5000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setStatus('error')
      setMessage('An error occurred. Please try again later.')
    }
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="flex-1"
            required
            style={{
              borderColor: status === 'error' ? theme?.colors?.error : theme?.colors?.border,
              backgroundColor: theme?.colors?.surface,
              color: theme?.colors?.textPrimary,
            }}
          />
          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="whitespace-nowrap"
            style={{
              backgroundColor: status === 'success' ? theme?.colors?.success : theme?.colors?.primary,
              color: theme?.colors?.primaryText,
            }}
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </Button>
        </div>

        {/* Status Messages */}
        {message && (
          <Text
            size="small"
            className="mt-2"
            style={{
              color: status === 'error' ? theme?.colors?.error : theme?.colors?.success,
            }}
          >
            {message}
          </Text>
        )}
      </form>

      {/* Privacy Note */}
      <Text 
        size="xsmall" 
        className="mt-2 opacity-60"
        style={{ color: theme?.colors?.textMuted }}
      >
        By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
      </Text>
    </div>
  )
}
