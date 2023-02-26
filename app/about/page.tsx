import { Container } from '@/components/container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About'
}

export default function AboutPage() {
  return (
    <Container>
      <article className="prose max-w-none lg:prose-xl prose-h1:text-center">
        <h1>About</h1>

        <div className="pt-16 text-center">
          Don&apos;t get too excited, because the about me section isn&apos;t quite ready
          yet. But don&apos;t worry, I&apos;ll have it up and running as soon as possible.
          Patience is a virtue, right? Hang in there! 😅
        </div>
      </article>
    </Container>
  )
}
