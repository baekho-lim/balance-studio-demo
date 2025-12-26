import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Story | Lim Hyejung',
  description: 'Experience the artistic narrative of Lim Hyejung through an immersive storytelling journey. Explore the connections between artworks and their deeper meanings.',
  keywords: ['Lim Hyejung story', 'art narrative', 'artwork journey', 'artistic philosophy', 'Utopia Reality'],
  openGraph: {
    title: 'Story | Lim Hyejung - Artistic Narrative',
    description: 'An immersive journey through the artworks and philosophy of Korean contemporary artist Lim Hyejung.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://limhyejung.com/story',
    languages: {
      'en': 'https://limhyejung.com/story',
      'ko': 'https://limhyejung.com/story',
    },
  },
}

export default function StoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
