'use client'

import { motion } from 'framer-motion'
import { cn } from '@lib/utils'

export default function ModernProductCardSkeleton() {
  return (
    <div className="relative">
      <div className={cn(
        'relative overflow-hidden rounded-2xl bg-gray-50',
        'border border-gray-200',
      )}>
        {/* Image Skeleton */}
        <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>

        {/* Info Skeleton */}
        <div className="p-4 bg-white space-y-3">
          {/* Title Lines */}
          <div className="space-y-2">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-4 bg-gray-200 rounded w-3/4"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="h-4 bg-gray-200 rounded w-1/2"
            />
          </div>

          {/* Rating Skeleton */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            className="h-3 bg-gray-200 rounded w-24"
          />

          {/* Price Skeleton */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            className="h-6 bg-gray-200 rounded w-20"
          />
        </div>
      </div>
    </div>
  )
}
