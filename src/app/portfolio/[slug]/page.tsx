import Balancer from 'react-wrap-balancer'
import Image from 'next/image'
import Link from 'next/link'
import PortfolioFooter from '../PortfolioFooter'
import data from '../data.json'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return data.map((item: any) => ({
    slug: item.slug,
  }))
}

export default async function CasePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const page = data.find((page: any) => {
    return page.slug === slug
  })

  if (!page) {
    return notFound()
  }

  return (
    <div className="bg-base">
      <header className="mx-auto w-full max-w-screen-xl space-y-16 px-8 pt-8 md:space-y-32 md:pb-24">
        <Link
          href="/portfolio"
          className="group inline-flex items-start gap-2 rounded-full border border-transparent bg-neutral px-4 py-2 hover:border-neutral-fade hover:bg-transparent"
        >
          <span className="-translate-y-[1px] font-semibold transition-all group-hover:-translate-x-1 group-hover:text-primary">
            ←
          </span>
          <span className="font-medium">Back to portfolio</span>
        </Link>
        <div className="space-y-4">
          <p className="text-2xl font-medium text-primary">{page?.project}</p>
          <h1 className="font-display text-3xl font-extrabold leading-tight xs:text-4xl md:w-2/3 md:text-5xl md:leading-snug">
            <Balancer>{page?.title}</Balancer>
          </h1>
        </div>
      </header>

      <section className="mx-auto w-full max-w-screen-xl space-x-8 space-y-32 px-8 pb-16 pt-12">
        <ul className="grid grid-cols-2 gap-8 md:auto-cols-auto md:grid-flow-col md:grid-cols-none [&>li>p]:text-neutral">
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
                className="font-medium text-primary underline"
                href={page?.meta?.link?.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {page?.meta?.link?.text}
              </a>
            </p>
          </li>
        </ul>
      </section>
      {page?.coverHorizontal && (
        <section className="relative aspect-video w-full">
          <Image
            src={page?.coverHorizontal}
            alt={page?.title}
            priority
            fill
            className="object-cover object-top"
          />
        </section>
      )}
      {page?.description && (
        <section className="text-medium mx-auto w-full max-w-screen-xl space-y-32 px-8 py-16 text-xl leading-relaxed md:py-48 md:text-3xl md:leading-relaxed">
          <p dangerouslySetInnerHTML={{ __html: page?.description }} />
        </section>
      )}
      {page?.image1 && (
        <section className="mx-auto grid w-full max-w-screen-xl gap-8 px-8 pb-16 md:grid-cols-2 md:pb-32">
          <div className="relative aspect-video md:col-span-2">
            <Image src={page?.image1} alt="test" fill className="object-cover" />
          </div>
          <div className="relative aspect-square">
            <Image src={page?.image2} alt="test" fill className="object-cover" />
          </div>
          <div className="relative aspect-square">
            <Image src={page?.image3} alt="test" fill className="object-cover" />
          </div>
          <div className="relative aspect-video md:col-span-2">
            <Image src={page?.image4} alt="test" fill className="object-cover" />
          </div>
        </section>
      )}
      {page?.results && (
        <section className="text-medium mx-auto w-full max-w-screen-xl space-y-16 px-8 py-16 md:py-16 md:pb-64">
          <h2 className="text-3xl font-extrabold md:text-5xl">Results</h2>
          <p className="text-xl leading-relaxed md:text-3xl md:leading-relaxed">
            {page.results.intro}
          </p>
          <ol className="list-decimal space-y-8 pl-7 text-xl md:text-2xl">
            {page.results.list &&
              page.results.list.map((item) => (
                <li key="item" className="pl-2 marker:text-neutral-fade">
                  {item}
                </li>
              ))}
          </ol>
        </section>
      )}
      <PortfolioFooter />
    </div>
  )
}
