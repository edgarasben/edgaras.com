import { LinkedinIcon, XComIcon } from '@/components/icons/solid'

export default function Page() {
  return (
    <div className="border-softer mx-auto max-w-screen-md border-x">
      <div className="space-y-2 px-8 pt-8 pb-24">
        <h1 className="text-left text-2xl font-semibold">Edgaras Benediktavičius</h1>
        <p className="text-neutral-fade text-soft text-left text-2xl">
          Design Engineer & Founder
        </p>
      </div>
      <ul className="space-y-[-1px]">
        <li>
          <a
            href="/tree/uses"
            className="border-softer flex items-center justify-between border-y p-8 text-left font-semibold hover:bg-white/1"
          >
            <span className="text-2xl">Projects</span>
            <span className="opacity-50">/projects</span>
          </a>
        </li>
        <li>
          <a
            href="/tree/uses"
            className="border-softer flex items-center justify-between border-y p-8 text-left font-semibold hover:bg-white/1"
          >
            <span className="text-2xl">Experiments</span>
            <span className="opacity-50">/experiments</span>
          </a>
        </li>
        <li>
          <a
            href="/tree/uses"
            className="border-softer flex items-center justify-between border-y p-8 text-left font-semibold hover:bg-white/1"
          >
            <span className="text-2xl">Blog</span>
            <span className="opacity-50">/blog</span>
          </a>
        </li>
        <li>
          <a
            href="/tree/uses"
            className="border-softer flex items-center justify-between border-y p-8 text-left font-semibold hover:bg-white/1"
          >
            <span className="text-2xl">Newsletter</span>
            <span className="opacity-50">/newsletter</span>
          </a>
        </li>
        <li>
          <a
            href="/tree/uses"
            className="border-softer flex items-center justify-between border-y p-8 text-left font-semibold hover:bg-white/1"
          >
            <span className="text-2xl">Bookmarks</span>
            <span className="opacity-50">/bookmarks</span>
          </a>
        </li>
        <li>
          <a
            href="https://craftled.com"
            className="border-softer flex items-center justify-between border-y p-8 text-left font-semibold hover:bg-white/1"
          >
            <span className="text-2xl">Craftled</span>
            <span className="opacity-50">craftled.com</span>
          </a>
        </li>
        <li>
          <a
            href="https://serviceintent.com"
            className="border-softer flex items-center justify-between border-y p-8 text-left font-semibold hover:bg-white/1"
          >
            <span className="text-2xl">Service Intent</span>
            <span className="opacity-50">serviceintent.com</span>
          </a>
        </li>
        <li>
          <a
            href="/tree/uses"
            className="border-softer flex items-center justify-between border-y p-8 text-left font-semibold hover:bg-white/1"
          >
            <span className="text-2xl">About</span>
            <span className="opacity-50">/about</span>
          </a>
        </li>
      </ul>
      <ul className="flex gap-6 p-8">
        <li>
          <a href="https://x.com/edgarasben">
            <XComIcon className="h-6 w-6 hover:opacity-50" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/edgarasben/">
            <LinkedinIcon className="h-6 w-6 hover:opacity-50" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/edgarasben/">
            <LinkedinIcon className="h-6 w-6 hover:opacity-50" />
          </a>
        </li>
      </ul>
    </div>
  )
}
