'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import StoryView from '@/components/story/StoryView'

// Import data
import artworksData from '@/data/artworks.json'
import storyOrder from '@/data/storyOrder.json'

import type { Artwork } from '@/types'

const artworks = artworksData as Artwork[]

export default function StoryPage() {
  const router = useRouter()

  // Order artworks according to storytelling sequence
  const orderedArtworks = useMemo(() => {
    return storyOrder
      .map((id) => artworks.find((artwork) => artwork.id === id))
      .filter((artwork): artwork is Artwork => artwork !== undefined)
  }, [])

  const handleClose = () => {
    router.push('/')
  }

  return <StoryView artworks={orderedArtworks} onClose={handleClose} />
}
