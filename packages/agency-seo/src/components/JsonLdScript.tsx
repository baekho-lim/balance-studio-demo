/**
 * React component for rendering JSON-LD scripts
 */

import * as React from 'react'

export interface JsonLdScriptProps {
  data: Record<string, unknown>
  id?: string
}

/**
 * Render a single JSON-LD script tag
 */
export function JsonLdScript({ data, id }: JsonLdScriptProps): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0) // Minified output
      }}
    />
  )
}

export interface JsonLdScriptsProps {
  schemas: Array<Record<string, unknown>>
  prefix?: string
}

/**
 * Render multiple JSON-LD script tags
 */
export function JsonLdScripts({ schemas, prefix = 'jsonld' }: JsonLdScriptsProps): React.ReactElement {
  return (
    <>
      {schemas.map((schema, index) => (
        <JsonLdScript
          key={`${prefix}-${index}`}
          data={schema}
          id={`${prefix}-${index}`}
        />
      ))}
    </>
  )
}

export interface JsonLdContainerProps {
  children: React.ReactNode
}

/**
 * Container for JSON-LD scripts (for organization)
 */
export function JsonLdContainer({ children }: JsonLdContainerProps): React.ReactElement {
  return <>{children}</>
}
