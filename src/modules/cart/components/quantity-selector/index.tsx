"use client"

import { Minus, Plus } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

interface QuantitySelectorProps {
  value: number
  onChange: (quantity: number) => void
  min?: number
  max?: number
  disabled?: boolean
  size?: "sm" | "md" | "lg"
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  size = "md",
}: QuantitySelectorProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleDecrease = () => {
    if (value > min && !disabled) {
      setIsUpdating(true)
      onChange(value - 1)
      setTimeout(() => setIsUpdating(false), 300)
    }
  }

  const handleIncrease = () => {
    if (value < max && !disabled) {
      setIsUpdating(true)
      onChange(value + 1)
      setTimeout(() => setIsUpdating(false), 300)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue)
    }
  }

  const sizeClasses = {
    sm: {
      container: "h-8",
      button: "w-7 h-7",
      input: "w-10 text-sm",
      icon: "w-3 h-3",
    },
    md: {
      container: "h-10",
      button: "w-9 h-9",
      input: "w-12 text-base",
      icon: "w-4 h-4",
    },
    lg: {
      container: "h-12",
      button: "w-11 h-11",
      input: "w-14 text-lg",
      icon: "w-5 h-5",
    },
  }

  const sizes = sizeClasses[size]

  return (
    <div
      className={clx(
        "inline-flex items-center rounded-lg border border-gray-300 bg-white shadow-sm",
        "hover:border-gray-400 transition-colors duration-200",
        sizes.container,
        {
          "opacity-50 cursor-not-allowed": disabled,
          "border-blue-500 ring-2 ring-blue-100": isUpdating,
        }
      )}
    >
      {/* Decrease Button */}
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        className={clx(
          "flex items-center justify-center rounded-l-lg",
          "hover:bg-gray-50 active:bg-gray-100",
          "transition-all duration-150",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
          sizes.button
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={clx("text-gray-600", sizes.icon)} />
      </button>

      {/* Quantity Input */}
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className={clx(
          "text-center font-semibold text-gray-900",
          "border-x border-gray-300 bg-white",
          "focus:outline-none focus:bg-gray-50",
          "disabled:bg-gray-50 disabled:text-gray-500",
          "[appearance:textfield]",
          "[&::-webkit-outer-spin-button]:appearance-none",
          "[&::-webkit-inner-spin-button]:appearance-none",
          sizes.input
        )}
        aria-label="Quantity"
      />

      {/* Increase Button */}
      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        className={clx(
          "flex items-center justify-center rounded-r-lg",
          "hover:bg-gray-50 active:bg-gray-100",
          "transition-all duration-150",
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
          sizes.button
        )}
        aria-label="Increase quantity"
      >
        <Plus className={clx("text-gray-600", sizes.icon)} />
      </button>
    </div>
  )
}
