'use client';

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { Star, Check } from "lucide-react";
import { useState, useEffect } from "react";

export interface ProductReviewsProps {
  showRatingsSummary?: boolean;
  showVerifiedBadge?: boolean;
  sortBy?: "recent" | "helpful" | "rating_high" | "rating_low";
  reviewsPerPage?: number;
}

export const ProductReviews: ComponentConfig<ProductReviewsProps> = {
  label: "Product Reviews",

  fields: {
    showRatingsSummary: {
      type: "radio",
      label: "Show Ratings Summary",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    showVerifiedBadge: {
      type: "radio",
      label: "Show Verified Purchase Badge",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    sortBy: {
      type: "select",
      label: "Default Sort",
      options: [
        { label: "Most Recent", value: "recent" },
        { label: "Most Helpful", value: "helpful" },
        { label: "Highest Rating", value: "rating_high" },
        { label: "Lowest Rating", value: "rating_low" },
      ],
    },
    reviewsPerPage: {
      type: "number",
      label: "Reviews Per Page",
    },
  },

  defaultProps: {
    showRatingsSummary: true,
    showVerifiedBadge: true,
    sortBy: "recent",
    reviewsPerPage: 5,
  },

  render: ({
    showRatingsSummary,
    showVerifiedBadge,
    sortBy,
    reviewsPerPage = 5,
  }: ProductReviewsProps) => {
    const { product } = useProduct();
    const [currentSort, setCurrentSort] = useState(sortBy);
    const [reviews, setReviews] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!product?.id) return;
      setLoading(true);

      const getMedusaUrl = () => {
        if (typeof window === "undefined") return process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
        const host = window.location.hostname;
        if (host === "localhost" || host === "127.0.0.1") return "http://localhost:9000";
        return `https://admin.${host}`;
      };

      const params = new URLSearchParams({
        limit: String(reviewsPerPage),
        offset: String(offset),
        status: "approved",
      });

      fetch(`${getMedusaUrl()}/store/products/${product.id}/reviews?${params}`)
        .then((r) => r.json())
        .then((data) => {
          setReviews(data.reviews ?? []);
          setCount(data.count ?? 0);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, [product?.id, offset, reviewsPerPage]);

    if (!product) return null;

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum: number, r: any) => sum + (r.rating ?? 0), 0) / reviews.length
        : 0;
    const totalReviews = count;
    const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
      const n = reviews.filter((r: any) => r.rating === star).length;
      return { star, n, pct: totalReviews > 0 ? (n / totalReviews) * 100 : 0 };
    });

    const renderStars = (rating: number, size = "w-5 h-5") => (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`${size} ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );

    const totalPages = Math.ceil(totalReviews / reviewsPerPage);
    const currentPage = Math.floor(offset / reviewsPerPage) + 1;

    return (
      <div className="product-reviews">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

        {showRatingsSummary && totalReviews > 0 && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                {renderStars(Math.round(averageRating), "w-6 h-6")}
                <p className="text-sm text-gray-600 mt-2">Based on {totalReviews} reviews</p>
              </div>
              <div className="space-y-2">
                {ratingCounts.map(({ star, n, pct }) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-12">{star} star</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">{totalReviews} Reviews</h3>
          <select
            value={currentSort}
            onChange={(e) => setCurrentSort(e.target.value as typeof sortBy)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="recent">Most Recent</option>
            <option value="rating_high">Highest Rating</option>
            <option value="rating_low">Lowest Rating</option>
          </select>
        </div>

        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse h-20 bg-gray-100 rounded-lg" />
            ))}
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <p className="text-gray-500 text-sm">No reviews yet for this product.</p>
        )}

        {!loading && reviews.length > 0 && (
          <div className="space-y-6">
            {reviews.map((review: any) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {renderStars(review.rating, "w-4 h-4")}
                      {review.title && (
                        <span className="text-sm font-medium text-gray-900">{review.title}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">{review.display_name ?? "Anonymous"}</span>
                      {showVerifiedBadge && review.verified_purchase && (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <Check className="w-4 h-4" />
                          Verified Purchase
                        </span>
                      )}
                      <span>•</span>
                      <span>{new Date(review.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{review.content}</p>
                {review.merchant_reply && (
                  <div className="mt-3 pl-4 border-l-2 border-gray-300 text-sm text-gray-600">
                    <span className="font-medium">Store reply: </span>
                    {review.merchant_reply}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setOffset(Math.max(0, offset - reviewsPerPage))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setOffset(offset + reviewsPerPage)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  },
};
