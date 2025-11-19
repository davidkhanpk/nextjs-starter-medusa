'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from '@lib/utils'
import { transitions } from '@lib/design-system'

interface ProductImage {
  id: string
  url: string
  alt?: string
}

interface ProductLightboxProps {
  images: ProductImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
}

export default function ProductLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ProductLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          handlePrevious()
          break
        case 'ArrowRight':
          handleNext()
          break
        case '+':
        case '=':
          handleZoomIn()
          break
        case '-':
          handleZoomOut()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentIndex])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
    setZoomLevel(1)
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
    setZoomLevel(1)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
    setIsZoomed(true)
  }

  const handleZoomOut = () => {
    const newZoom = Math.max(zoomLevel - 0.5, 1)
    setZoomLevel(newZoom)
    if (newZoom === 1) setIsZoomed(false)
  }

  const toggleZoom = () => {
    if (isZoomed) {
      setZoomLevel(1)
      setIsZoomed(false)
    } else {
      setZoomLevel(2)
      setIsZoomed(true)
    }
  }

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitions.fast}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
            <div className="text-white">
              <p className="text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className={cn(
                  'p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors',
                  zoomLevel <= 1 && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleZoom}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className={cn(
                  'p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors',
                  zoomLevel >= 3 && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </motion.button>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors ml-2"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Main Image */}
          <div className="absolute inset-0 flex items-center justify-center p-20">
            <AnimatePresence mode="wait" custom={currentIndex}>
              <motion.div
                key={currentIndex}
                custom={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={transitions.spring}
                className={cn(
                  'relative w-full h-full',
                  isZoomed && 'cursor-move overflow-hidden'
                )}
                drag={isZoomed}
                dragConstraints={{ top: -100, bottom: 100, left: -100, right: 100 }}
                dragElastic={0.1}
              >
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentImage.url}
                    alt={currentImage.alt || `Product image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                    quality={100}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              {/* Previous */}
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors z-10"
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </motion.button>

              {/* Next */}
              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors z-10"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </motion.button>
            </>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/50 to-transparent">
              <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <motion.button
                    key={image.id}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsZoomed(false)
                      setZoomLevel(1)
                    }}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200',
                      currentIndex === index
                        ? 'border-white shadow-xl scale-110'
                        : 'border-white/30 hover:border-white/60'
                    )}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {currentIndex !== index && (
                      <div className="absolute inset-0 bg-black/30" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Instructions Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-white/70 text-sm text-center"
          >
            <p>Use arrow keys to navigate • +/- to zoom • ESC to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
