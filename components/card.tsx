import { formatDate } from '@/lib/format-date'
import Link from 'next/link'

type CardProps = {
  slug: string
  title: string
  firstPosted: string
  summary: string
}

export const Card = ({ data }: { data: CardProps }) => (
  <Link
    href={`/posts/${data.slug}`}
    className="block w-full space-y-4 rounded-xl p-8 transition-colors hover:bg-base"
  >
    <div className="flex flex-col justify-between space-y-2 xs:flex-row xs:space-y-0">
      <h3 className="font-semibold">{data.title}</h3>
      <time
        dateTime={data.firstPosted}
        className="text-sm text-fg-neutral-faded xs:text-right xs:text-base"
      >
        {formatDate(data.firstPosted)}
      </time>
    </div>
    {data.summary && <p className="text-fg-neutral-faded">{data.summary}</p>}
  </Link>
)
