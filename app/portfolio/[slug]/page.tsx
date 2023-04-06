import { notFound } from 'next/navigation'
import PortfolioFooter from '../PortfolioFooter'
import data from '../data.json'
import Image from 'next/image'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

export function generateStaticParams() {
  return data.map((item) => ({
    slug: item.slug
  }))
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const page = data.find((page) => page.slug === slug)
  if (!page) {
    // not found page here
    return notFound()
  }

  return (
    <div className="bg-base">
      <header className="mx-auto w-full max-w-screen-xl space-y-16 px-8 pt-16 md:space-y-32 md:pb-32">
        <Link href="/portfolio" className="group flex space-x-2">
          <span className="block -translate-y-[1px] font-semibold transition-all group-hover:-translate-x-1 group-hover:text-fg-primary">
            ←
          </span>
          <span className="block font-medium">Back to portfolio</span>
        </Link>
        <div className="space-y-4">
          <p className="text-2xl font-medium text-fg-primary">{page?.project}</p>
          <h1 className="text-4xl font-bold leading-snug md:w-2/3 md:text-5xl">
            {page?.title}
          </h1>
        </div>
      </header>

      <section className="mx-auto w-full max-w-screen-xl space-y-32 space-x-8 px-8 py-16">
        <ul className="grid grid-cols-2 gap-8 md:auto-cols-auto md:grid-flow-col md:grid-cols-none [&>li>p]:text-fg-neutral">
          <li className="space-y-2">
            <h2 className="text-sm uppercase tracking-wider">Role</h2>
            <p className="font-medium md:text-xl">{page?.meta?.role}</p>
          </li>

          <li className="space-y-2">
            <h2 className="text-sm uppercase tracking-wider">Client</h2>
            <p className="font-medium md:text-xl">{page?.meta?.client}</p>
          </li>

          <li className="space-y-2">
            <h2 className="text-sm uppercase tracking-wider">Year</h2>
            <p className="font-medium md:text-xl">{page?.meta?.year}</p>
          </li>

          <li className="space-y-2">
            <h2 className="text-sm uppercase tracking-wider">Link</h2>
            <p className="font-medium md:text-xl">
              <a
                className="font-medium text-fg-primary underline"
                href={page?.meta?.link?.url}
              >
                {page?.meta?.link?.text}
              </a>
            </p>
          </li>
        </ul>
      </section>
      <section className="relative aspect-video w-full">
        <Image
          src={page?.image}
          alt="Edgaras profile"
          fill
          className="object-cover object-top"
        />
      </section>
      <section className="text-medium mx-auto w-full max-w-screen-xl space-y-32 px-8 py-16 text-xl leading-relaxed md:py-48 md:text-3xl md:leading-loose">
        <p>
          <Balancer>{page?.description}</Balancer>
        </p>
      </section>
      <section className="mx-auto grid w-full max-w-screen-xl grid-cols-2 gap-8 px-8 pb-24  md:pb-48">
        <div className="relative col-span-2 aspect-video">
          <Image src={page?.image} alt="test" fill className="object-cover" />
        </div>
        <div className="relative aspect-square">
          <Image src={page?.image2} alt="test" fill className="object-cover" />
        </div>
        <div className="relative aspect-square">
          <Image src={page?.image} alt="test" fill className="object-cover" />
        </div>
        <div className="relative col-span-2 aspect-video">
          <Image src={page?.image2} alt="test" fill className="object-cover" />
        </div>
      </section>
      <PortfolioFooter />
    </div>
  )
}
