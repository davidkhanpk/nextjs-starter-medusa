'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star } from 'lucide-react';

interface ProductReviewForm {
  productId: string;
  productTitle: string;
  productThumbnail?: string;
  rating: number;
  title: string;
  content: string;
  displayName: string;
}

type PageState = 'loading' | 'invalid' | 'ready' | 'submitting' | 'success' | 'error';

const getLaunchStoreUrl = () => {
  if (typeof window === 'undefined') return process.env.LAUNCHSTORE_API_URL || 'http://localhost:3000/api';
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') return 'http://localhost:3000/api';
  return `https://platform.${host.split('.').slice(-2).join('.')}`;
};

const getMedusaUrl = () => {
  if (typeof window === 'undefined') return process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000';
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1') return 'http://localhost:9000';
  return `https://admin.${host}`;
};

function StarRatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className="p-0.5 transition-transform hover:scale-110"
          aria-label={`${s} star${s !== 1 ? 's' : ''}`}
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              s <= (hover || value) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function ReviewPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [storeId, setStoreId] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [forms, setForms] = useState<ProductReviewForm[]>([]);
  const [state, setState] = useState<PageState>('loading');

  // ─── 1. Validate token ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!token) {
      setState('invalid');
      return;
    }

    // The token URL is /review?token=xxx — we need the storeId to validate.
    // The notification provider embeds it as ?storeId=xxx&token=xxx.
    const sid = searchParams.get('storeId');
    if (!sid) {
      setState('invalid');
      return;
    }
    setStoreId(sid);

    const baseUrl = getShopikoolUrl().replace('/api', '');
    fetch(`${baseUrl}/stores/${sid}/reviews/validate-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then(async (data) => {
        if (!data.valid) {
          setState('invalid');
          return;
        }

        setOrderId(data.orderId);

        // ─── 2. Fetch product titles from Medusa ─────────────────────────────
        const medusaUrl = getMedusaUrl();
        const productDetails = await Promise.all(
          (data.productIds as string[]).map(async (pid: string) => {
            try {
              const res = await fetch(`${medusaUrl}/store/products/${pid}`);
              const pdata = await res.json();
              const p = pdata.product;
              return {
                productId: pid,
                productTitle: p?.title ?? pid,
                productThumbnail: p?.thumbnail ?? undefined,
                rating: 5,
                title: '',
                content: '',
                displayName: '',
              };
            } catch {
              return {
                productId: pid,
                productTitle: pid,
                productThumbnail: undefined,
                rating: 5,
                title: '',
                content: '',
                displayName: '',
              };
            }
          })
        );

        setForms(productDetails);
        setState('ready');
      })
      .catch(() => setState('invalid'));
  }, [token]);

  // ─── Update a single form field ─────────────────────────────────────────────
  const updateForm = (index: number, field: keyof ProductReviewForm, value: string | number) => {
    setForms((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  };

  // ─── 3. Submit all reviews ──────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeId || !orderId || !token) return;

    setState('submitting');

    const medusaUrl = getMedusaUrl();
    const publishableKey =
      typeof window !== 'undefined'
        ? document.querySelector<HTMLMetaElement>('meta[name="medusa-key"]')?.content ?? ''
        : '';

    try {
      for (const form of forms) {
        if (!form.content.trim()) continue;
        await fetch(`${medusaUrl}/store/products/${form.productId}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(publishableKey ? { 'x-publishable-api-key': publishableKey } : {}),
          },
          body: JSON.stringify({
            order_id: orderId,
            rating: form.rating,
            title: form.title.trim() || undefined,
            content: form.content.trim(),
            display_name: form.displayName.trim() || undefined,
          }),
        });
      }

      // Mark token as used so it can't be resubmitted
      const baseUrl = getShopikoolUrl().replace('/api', '');
      await fetch(`${baseUrl}/stores/${storeId}/reviews/mark-token-used`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      setState('success');
    } catch {
      setState('error');
    }
  };

  // ─── Render states ───────────────────────────────────────────────────────────
  if (state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-black" />
      </div>
    );
  }

  if (state === 'invalid') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid or Expired Link</h1>
          <p className="text-gray-500">
            This review link is invalid, has expired, or has already been used.
          </p>
        </div>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-gray-500">Your reviews have been submitted and will appear once approved.</p>
        </div>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-500 mb-4">We couldn't submit your reviews. Please try again.</p>
          <button
            onClick={() => setState('ready')}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Experience</h1>
          <p className="text-gray-500">
            How did you like your recent purchase? Your feedback helps other shoppers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {forms.map((form, i) => (
            <div key={form.productId} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
              {/* Product header */}
              <div className="flex items-center gap-4">
                {form.productThumbnail && (
                  <img
                    src={form.productThumbnail}
                    alt={form.productTitle}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <h2 className="text-lg font-semibold text-gray-900">{form.productTitle}</h2>
              </div>

              {/* Star rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <StarRatingInput
                  value={form.rating}
                  onChange={(v) => updateForm(i, 'rating', v)}
                />
              </div>

              {/* Review title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Title <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => updateForm(i, 'title', e.target.value)}
                  maxLength={120}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="Summarize your experience"
                />
              </div>

              {/* Review body */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => updateForm(i, 'content', e.target.value)}
                  rows={4}
                  maxLength={2000}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20 resize-none"
                  placeholder="What did you like or dislike? How was the quality?"
                />
              </div>

              {/* Display name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.displayName}
                  onChange={(e) => updateForm(i, 'displayName', e.target.value)}
                  maxLength={60}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
                  placeholder="How should we display your name?"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={state === 'submitting'}
            className="w-full py-3.5 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === 'submitting' ? 'Submitting…' : 'Submit Reviews'}
          </button>
        </form>
      </div>
    </div>
  );
}
