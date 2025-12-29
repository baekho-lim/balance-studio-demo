'use client'

import * as React from 'react'
import Link from 'next/link'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-600 hover:bg-gray-100',
  gradient: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-4 text-lg',
}

/**
 * Button - Reusable button component with link support
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  disabled = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
}: ButtonProps): React.ReactElement {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all'
  const widthStyles = fullWidth ? 'w-full' : ''
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`

  // External link
  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
      >
        {children}
      </a>
    )
  }

  // Internal link
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    )
  }

  // Regular button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {children}
    </button>
  )
}

/**
 * CTAGroup - Container for call-to-action buttons
 */
export interface CTAGroupProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
  gap?: 'sm' | 'md' | 'lg'
}

const alignStyles = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

const gapStyles = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
}

export function CTAGroup({
  children,
  className = '',
  align = 'center',
  gap = 'md',
}: CTAGroupProps): React.ReactElement {
  return (
    <div className={`flex flex-wrap items-center ${alignStyles[align]} ${gapStyles[gap]} ${className}`}>
      {children}
    </div>
  )
}

export default Button
