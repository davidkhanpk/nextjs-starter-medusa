'use client';

import { ComponentConfig } from "@measured/puck";
import { useProduct } from "@lib/hooks/useProduct";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

export interface ProductRatingProps {
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ProductRating: ComponentConfig<ProductRatingProps> = {
  label: "Product Rating",

  fields: {
    showCount: {
      type: "radio",
      label: "Show Review Count",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    size: {
      type: "select",
      label: "Star Size",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
  },

  defaultProps: {
    showCount: true,
    size: "md",
  },

  render: ({ showCount = true, size = "md" }: ProductRatingProps) => {
    const { product } = useProduct();
    const [rating, setRating] = useState<number | null>(null);
    const [count, setCount] = useState(0);

    const starSize = size === "sm" ? "w-3.5 h-3.5" : size === "lg" ? "w-6 h-6" : "w-5 h-5";

    useEffect(() => {
      if (!product?.id) return;

      const getMedusaUrl = () => {
        if (typeof window === "undefined") return process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
        const host = window.location.hostname;
        if (host === "localhost" || host === "127.0.0.1") return "http://localhost:9000";
        return `https://admin.${host}`;
      };

      fetch(`${getMedusaUrl()}/store/products/${product.id}/reviews?limit=100&status=approved`)
        .then((r) => r.json())
        .then((data) => {
          const reviews: any[] = data.reviews ?? [];
          if (reviews.length > 0) {
            const avg = reviews.reduce((s: number, r: any) => s + (r.rating ?? 0), 0) / reviews.length;
            setRating(avg);
            setCount(data.count ?? reviews.length);
          }
        })
        .catch(() => {});
    }, [product?.id]);

    if (!product || rating === null) return null;

    return (
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`${starSize} ${
                s <= Math.round(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 font-medium">{rating.toFixed(1)}</span>
        {showCount && (
          <span className="text-sm text-gray-500">({count})</span>
        )}
      </div>
    );
  },
};
