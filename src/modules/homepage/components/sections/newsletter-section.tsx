'use client'

import { HomepageSection } from '../../types'
import { useState } from 'react'

interface NewsletterSectionProps {
  section: HomepageSection
}

export function NewsletterSection({ section }: NewsletterSectionProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // TODO: Implement newsletter subscription API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated delay
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section className="py-12 bg-gray-50 rounded-lg">
      <div className="max-w-2xl mx-auto text-center px-4">
        {section.title && (
          <h2 className="text-3xl font-bold mb-2">{section.title}</h2>
        )}
        {section.subtitle && (
          <p className="text-gray-600 mb-6">{section.subtitle}</p>
        )}

        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-green-600">✓ Successfully subscribed!</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-red-600">Failed to subscribe. Please try again.</p>
        )}
      </div>
    </section>
  )
}
