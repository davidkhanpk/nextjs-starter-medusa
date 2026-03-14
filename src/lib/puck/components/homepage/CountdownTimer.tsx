'use client'

import React, { useState, useEffect } from 'react'
import Link from '@/components/common/SafeLink'

export interface CountdownTimerProps {
  title: string
  subtitle: string
  endDate: string
  timerStyle: 'boxes' | 'minimal' | 'circle'
  showDays: boolean
  showHours: boolean
  showMinutes: boolean
  showSeconds: boolean
  showCTA: boolean
  ctaText: string
  ctaLink: string
  showProducts: boolean
  collectionId: string
  productLimit: number
  productLayout: 'grid' | 'carousel'
  backgroundColor: string
  textColor: string
  timerColor: string
  accentColor: string
  spacing: 'compact' | 'normal' | 'spacious'
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  title,
  subtitle,
  endDate,
  timerStyle,
  showDays,
  showHours,
  showMinutes,
  showSeconds,
  showCTA,
  ctaText,
  ctaLink,
  backgroundColor,
  textColor,
  timerColor,
  accentColor,
  spacing,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  const spacingClasses = {
    compact: 'py-6 px-4',
    normal: 'py-10 px-6',
    spacious: 'py-16 px-8',
  }

  const renderTimerUnit = (value: number, label: string) => {
    if (timerStyle === 'boxes') {
      return (
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg font-bold text-2xl md:text-3xl"
            style={{
              backgroundColor: timerColor,
              color: backgroundColor,
              border: `2px solid ${accentColor}`,
            }}
          >
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm mt-2 font-medium" style={{ color: textColor }}>
            {label}
          </div>
        </div>
      )
    } else if (timerStyle === 'circle') {
      return (
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full font-bold text-2xl md:text-3xl"
            style={{
              backgroundColor: timerColor,
              color: backgroundColor,
              border: `3px solid ${accentColor}`,
            }}
          >
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm mt-2 font-medium" style={{ color: textColor }}>
            {label}
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col items-center">
          <div className="text-3xl md:text-5xl font-bold" style={{ color: timerColor }}>
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm mt-1 font-medium" style={{ color: textColor }}>
            {label}
          </div>
        </div>
      )
    }
  }

  return (
    <div style={{ backgroundColor }} className={`w-full ${spacingClasses[spacing] || 'py-10 px-6'}`}>
      <div className="max-w-7xl mx-auto text-center px-4">
        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold mb-2" style={{ color: textColor }}>
          {title}
        </h2>
        <p className="text-base md:text-xl mb-8" style={{ color: textColor }}>
          {subtitle}
        </p>

        {/* Timer */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-8">
          {showDays && renderTimerUnit(timeLeft.days, 'Days')}
          {showDays && showHours && (
            <div className="text-3xl font-bold" style={{ color: timerColor }}>
              :
            </div>
          )}
          {showHours && renderTimerUnit(timeLeft.hours, 'Hours')}
          {showHours && showMinutes && (
            <div className="text-3xl font-bold" style={{ color: timerColor }}>
              :
            </div>
          )}
          {showMinutes && renderTimerUnit(timeLeft.minutes, 'Minutes')}
          {showMinutes && showSeconds && (
            <div className="text-3xl font-bold" style={{ color: timerColor }}>
              :
            </div>
          )}
          {showSeconds && renderTimerUnit(timeLeft.seconds, 'Seconds')}
        </div>

        {/* CTA */}
        {showCTA && (
          <Link
            href={ctaLink}
            className="inline-block px-8 py-4 font-bold text-lg rounded-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: accentColor,
              color: backgroundColor,
            }}
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  )
}

export default CountdownTimer
