'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play, ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@lib/utils'
import { animationVariants, transitions, designSystem } from '@lib/design-system'
import { useTheme } from '@lib/theme/ThemeProvider'
import LocalizedClientLink from '@modules/common/components/localized-client-link'

interface ModernHeroProps {
  variant?: 'gradient' | 'image' | 'video' | 'minimal'
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  backgroundImage?: string
  backgroundVideo?: string
  showScrollIndicator?: boolean
  height?: 'sm' | 'md' | 'lg' | 'full'
}

export default function ModernHero({
  variant = 'gradient',
  title,
  subtitle,
  ctaText = 'Shop Now',
  ctaLink = '/store',
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  backgroundVideo,
  showScrollIndicator = true,
  height = 'lg',
}: ModernHeroProps) {
  const { theme } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { scrollY } = useScroll()
  
  // Parallax effect
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const heightClasses = {
    sm: 'min-h-[50vh]',
    md: 'min-h-[65vh]',
    lg: 'min-h-[85vh]',
    full: 'min-h-screen',
  }

  const displayTitle = title || theme?.branding?.storeName || 'Welcome to Our Store'
  const displaySubtitle = subtitle || 'Discover Amazing Products'

  // Gradient Variant
  if (variant === 'gradient') {
    return (
      <motion.div
        ref={containerRef}
        initial="initial"
        animate="animate"
        className={cn(
          'relative overflow-hidden',
          heightClasses[height]
        )}
      >
        {/* Animated Gradient Background */}
        <motion.div
          animate={{
            background: [
              `linear-gradient(135deg, ${theme?.colors?.primary || '#3b82f6'} 0%, ${theme?.colors?.secondary || '#8b5cf6'} 100%)`,
              `linear-gradient(225deg, ${theme?.colors?.secondary || '#8b5cf6'} 0%, ${theme?.colors?.primary || '#3b82f6'} 100%)`,
              `linear-gradient(135deg, ${theme?.colors?.primary || '#3b82f6'} 0%, ${theme?.colors?.secondary || '#8b5cf6'} 100%)`,
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />

        {/* Overlay Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Content */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20"
        >
          {/* Badge */}
          <motion.div
            variants={animationVariants.fadeIn}
            className="mb-6 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium"
          >
            ✨ New Collection Available
          </motion.div>

          {/* Title with Stagger Animation */}
          <motion.h1
            variants={animationVariants.stagger}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl"
          >
            {displayTitle.split(' ').map((word, i) => (
              <motion.span
                key={i}
                variants={animationVariants.fadeIn}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={animationVariants.slideUp}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-2xl"
          >
            {displaySubtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={animationVariants.slideUp}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <LocalizedClientLink href={ctaLink}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'group px-8 py-4 bg-white text-gray-900 rounded-full font-semibold',
                  'flex items-center gap-2 shadow-xl hover:shadow-2xl transition-shadow duration-300'
                )}
              >
                {ctaText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </LocalizedClientLink>

            {secondaryCtaText && secondaryCtaLink && (
              <LocalizedClientLink href={secondaryCtaLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-300"
                >
                  {secondaryCtaText}
                </motion.button>
              </LocalizedClientLink>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        )}
      </motion.div>
    )
  }

  // Image Variant with Parallax
  if (variant === 'image') {
    return (
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden',
          heightClasses[height]
        )}
      >
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: y }}
          className="absolute inset-0 -z-10"
        >
          <div
            className="w-full h-[120%] bg-cover bg-center"
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : `linear-gradient(135deg, ${theme?.colors?.primary || '#3b82f6'} 0%, ${theme?.colors?.secondary || '#8b5cf6'} 100%)`,
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 max-w-5xl drop-shadow-2xl"
          >
            {displayTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/95 mb-10 max-w-3xl drop-shadow-lg"
          >
            {displaySubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LocalizedClientLink href={ctaLink}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-gray-900 rounded-full font-bold text-lg shadow-2xl"
              >
                {ctaText}
              </motion.button>
            </LocalizedClientLink>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // Video Variant
  if (variant === 'video') {
    return (
      <div
        ref={containerRef}
        className={cn(
          'relative overflow-hidden',
          heightClasses[height]
        )}
      >
        {/* Background Video */}
        {backgroundVideo && (
          <div className="absolute inset-0 -z-10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 drop-shadow-2xl"
          >
            {displayTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl sm:text-2xl text-white/95 mb-10 max-w-3xl drop-shadow-lg"
          >
            {displaySubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex gap-4"
          >
            <LocalizedClientLink href={ctaLink}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold shadow-2xl"
              >
                {ctaText}
              </motion.button>
            </LocalizedClientLink>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="px-6 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-semibold border-2 border-white flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Video
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // Minimal Variant
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className={cn(
        'relative overflow-hidden bg-white',
        heightClasses[height]
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Text */}
          <motion.div variants={animationVariants.fadeIn} className="space-y-8">
            <motion.h1
              variants={animationVariants.slideUp}
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-tight"
            >
              {displayTitle}
            </motion.h1>

            <motion.p
              variants={animationVariants.slideUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              {displaySubtitle}
            </motion.p>

            <motion.div
              variants={animationVariants.slideUp}
              transition={{ delay: 0.4 }}
            >
              <LocalizedClientLink href={ctaLink}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    backgroundColor: theme?.colors?.primary || '#3b82f6',
                    color: theme?.colors?.primaryText || '#ffffff',
                  }}
                  className="px-8 py-4 rounded-full font-semibold shadow-lg flex items-center gap-2"
                >
                  {ctaText}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </LocalizedClientLink>
            </motion.div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            variants={animationVariants.fadeIn}
            transition={{ delay: 0.3 }}
            className="relative h-96 lg:h-full"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${theme?.colors?.primary || '#3b82f6'} 0%, ${theme?.colors?.secondary || '#8b5cf6'} 100%)`,
                boxShadow: designSystem.shadows.glow,
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
