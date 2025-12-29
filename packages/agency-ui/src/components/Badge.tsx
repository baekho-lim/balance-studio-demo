'use client'

import * as React from 'react'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'all-levels'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-blue-100 text-blue-700',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  danger: 'bg-red-100 text-red-700',
  info: 'bg-purple-100 text-purple-700',
  // Fitness level badges
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700',
  'all-levels': 'bg-blue-100 text-blue-700',
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
}

/**
 * Badge - Reusable badge/tag component
 * Includes fitness level variants for pilates/gym templates
 */
export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps): React.ReactElement {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  )
}

/**
 * LevelBadge - Convenience wrapper for fitness level badges
 */
export interface LevelBadgeProps {
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showLabel?: boolean
}

const levelLabels: Record<LevelBadgeProps['level'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  'all-levels': 'All Levels',
}

export function LevelBadge({
  level,
  size = 'sm',
  className = '',
  showLabel = true,
}: LevelBadgeProps): React.ReactElement {
  return (
    <Badge variant={level} size={size} className={className}>
      {showLabel ? levelLabels[level] : level}
    </Badge>
  )
}

export default Badge
