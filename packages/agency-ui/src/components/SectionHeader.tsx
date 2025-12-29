'use client'

import * as React from 'react'

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

const sizeStyles = {
  sm: {
    title: 'text-xl font-bold',
    subtitle: 'text-sm',
    gap: 'mb-2',
    wrapper: 'mb-6',
  },
  md: {
    title: 'text-2xl font-bold',
    subtitle: 'text-base',
    gap: 'mb-3',
    wrapper: 'mb-8',
  },
  lg: {
    title: 'text-3xl font-bold',
    subtitle: 'text-lg',
    gap: 'mb-4',
    wrapper: 'mb-12',
  },
}

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

/**
 * SectionHeader - Reusable section title component
 * Used across all templates for consistent section headings
 */
export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  size = 'lg',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}: SectionHeaderProps): React.ReactElement {
  const styles = sizeStyles[size]
  const alignment = alignStyles[align]

  return (
    <div className={`${alignment} ${styles.wrapper} ${className}`}>
      <h2 className={`${styles.title} text-gray-900 ${styles.gap} ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`${styles.subtitle} text-gray-500 max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
