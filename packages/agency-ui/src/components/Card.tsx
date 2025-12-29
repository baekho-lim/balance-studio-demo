'use client'

import * as React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const roundedStyles = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
}

const shadowStyles = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
}

/**
 * Card - Base card component with customizable styling
 */
export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  rounded = '2xl',
  shadow = 'sm',
  border = false,
}: CardProps): React.ReactElement {
  const hoverStyles = hover ? 'hover:shadow-lg transition-shadow' : ''
  const borderStyles = border ? 'border border-gray-200' : ''

  return (
    <div
      className={`bg-white ${paddingStyles[padding]} ${roundedStyles[rounded]} ${shadowStyles[shadow]} ${hoverStyles} ${borderStyles} ${className}`}
    >
      {children}
    </div>
  )
}

/**
 * CardHeader - Header section for cards
 */
export interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

export function CardHeader({ children, className = '' }: CardHeaderProps): React.ReactElement {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

/**
 * CardBody - Main content section for cards
 */
export interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export function CardBody({ children, className = '' }: CardBodyProps): React.ReactElement {
  return <div className={className}>{children}</div>
}

/**
 * CardFooter - Footer section for cards
 */
export interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps): React.ReactElement {
  return <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>{children}</div>
}

/**
 * FeatureCard - Card with icon/emoji, title, and description
 * Used for class cards, service cards, etc.
 */
export interface FeatureCardProps {
  icon?: React.ReactNode
  emoji?: string
  title: string
  description?: string
  badge?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  aspectRatio?: string
  iconBgClassName?: string
  onClick?: () => void
}

export function FeatureCard({
  icon,
  emoji,
  title,
  description,
  badge,
  footer,
  className = '',
  aspectRatio = 'aspect-[4/3]',
  iconBgClassName = 'bg-gradient-to-br from-blue-100 to-purple-100',
  onClick,
}: FeatureCardProps): React.ReactElement {
  const isClickable = !!onClick
  const Component = isClickable ? 'button' : 'div'

  return (
    <Component
      onClick={onClick}
      className={`group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all ${isClickable ? 'cursor-pointer w-full text-left' : ''} ${className}`}
    >
      <div className={`${aspectRatio} ${iconBgClassName} flex items-center justify-center`}>
        {emoji && <span className="text-6xl opacity-30">{emoji}</span>}
        {icon && <div className="opacity-30">{icon}</div>}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {badge}
        </div>
        {description && <p className="text-gray-500 text-sm">{description}</p>}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </Component>
  )
}

export default Card
