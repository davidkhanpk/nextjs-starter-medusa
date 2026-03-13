'use client';

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { Star, ThumbsUp, Check } from "lucide-react";
import { useState } from "react";

export interface ProductReviewsProps {
  showRatingsSummary?: boolean;
  showReviewForm?: boolean;
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
    showReviewForm: {
      type: "radio",
      label: "Show Review Form",
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
    showReviewForm: true,
    showVerifiedBadge: true,
    sortBy: "recent",
    reviewsPerPage: 5,
  },

  render: ({
    showRatingsSummary,
    showReviewForm,
    showVerifiedBadge,
    sortBy,
    reviewsPerPage = 5,
  }: ProductReviewsProps) => {
    const { product } = useProduct();
    const [currentSort, setCurrentSort] = useState(sortBy);

    if (!product) {
      return null;
    }

    // Mock reviews data (in production, fetch from API)
    const reviews = [
      {
        id: "1",
        author: "John D.",
        rating: 5,
        title: "Amazing product!",
        comment: "This product exceeded my expectations. Highly recommend!",
        date: "2025-12-15",
        verified: true,
        helpful: 12,
      },
      {
        id: "2",
        author: "Sarah M.",
        rating: 4,
        title: "Good quality",
        comment: "Great quality for the price. Would buy again.",
        date: "2025-12-10",
        verified: true,
        helpful: 8,
      },
      {
        id: "3",
        author: "Mike R.",
        rating: 5,
        title: "Perfect!",
        comment: "Exactly what I was looking for. Fast shipping too!",
        date: "2025-12-05",
        verified: false,
        helpful: 5,
      },
    ];

    // Calculate average rating
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;
    const totalReviews = reviews.length;

    // Rating distribution
    const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      count: reviews.filter((r) => r.rating === rating).length,
      percentage: (reviews.filter((r) => r.rating === rating).length / totalReviews) * 100,
    }));

    const renderStars = (rating: number, size = "w-5 h-5") => {
      return (
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`${size} ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      );
    };

    return (
      <div className="product-reviews">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews
        </h2>

        {/* Ratings Summary */}
        {showRatingsSummary && (
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Rating */}
              <div className="text-center md:text-left">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                {renderStars(Math.round(averageRating), "w-6 h-6")}
                <p className="text-sm text-gray-600 mt-2">
                  Based on {totalReviews} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingCounts.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 w-12">
                      {rating} star
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {totalReviews} Reviews
          </h3>
          <select
            value={currentSort}
            onChange={(e) => setCurrentSort(e.target.value as typeof sortBy)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
            <option value="rating_high">Highest Rating</option>
            <option value="rating_low">Lowest Rating</option>
          </select>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {renderStars(review.rating, "w-4 h-4")}
                    <span className="text-sm font-medium text-gray-900">
                      {review.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">{review.author}</span>
                    {showVerifiedBadge && review.verified && (
                      <span className="inline-flex items-center gap-1 text-green-600">
                        <Check className="w-4 h-4" />
                        Verified Purchase
                      </span>
                    )}
                    <span>•</span>
                    <span>{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{review.comment}</p>
              <button className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                <ThumbsUp className="w-4 h-4" />
                <span>Helpful ({review.helpful})</span>
              </button>
            </div>
          ))}
        </div>

        {/* Write Review Form */}
        {showReviewForm && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Write a Review
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star className="w-6 h-6 text-gray-300 hover:text-yellow-400" />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Sum up your review"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Share your thoughts about this product"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    );
  },
};
