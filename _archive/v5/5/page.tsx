import { LinkedinIcon, XComIcon } from '@/components/icons/solid'

const links = [
  { label: 'Projects', href: '/projects', external: false },
  { label: 'Writing', href: '/writing', external: false },
  { label: 'Bookmarks', href: '/bookmarks', external: false },
  { label: 'Now', href: '/now', external: false },
  { label: 'Uses', href: '/uses', external: false },
  { label: 'Craftled', href: 'https://craftled.com', external: true },
  { label: 'Service Intent', href: 'https://serviceintent.com', external: true },
]

export default function Page() {
  return (
    <main className="flex min-h-full flex-col">
      <div className="mx-auto w-full max-w-lg px-6 py-16 sm:px-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-semibold tracking-tight">Edgaras Benediktavičius</h1>
          <p className="text-soft mt-1 text-lg">Design Engineer & Founder</p>
        </header>

        {/* Bio */}
        <section className="mb-12">
          <p className="text-soft leading-relaxed">
            I design and build things for the web. Co-founder at{' '}
            <a
              href="https://craftled.com"
              className="text-default underline underline-offset-2 hover:opacity-60"
            >
              Craftled
            </a>{' '}
            and{' '}
            <a
              href="https://serviceintent.com"
              className="text-default underline underline-offset-2 hover:opacity-60"
            >
              Service Intent
            </a>
            .
          </p>
        </section>

        {/* Navigation */}
        <nav className="mb-12">
          <ul className="border-softer divide-softer divide-y border-y">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-between py-4 transition-opacity hover:opacity-60"
                >
                  <span className="font-medium">{link.label}</span>
                  {link.external && (
                    <span className="text-soft text-sm">{link.href.replace('https://', '')}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <footer>
          <ul className="flex gap-5">
            <li>
              <a
                href="https://x.com/edgarasben"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
                aria-label="X (Twitter)"
              >
                <XComIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/edgarasben/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-60"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </main>
  )
}
