import { formatDate } from '@/lib/format-date'
import Link from 'next/link'

export const Card = ({ data }: { data: any }) => (
  <Link
    href={`/posts/${data.slug}`}
    className="block w-full space-y-4 rounded-xl p-8 transition-colors hover:bg-base"
  >
    <div className="flex flex-col justify-between space-y-2 xs:flex-row xs:space-y-0">
      <h3 className="font-medium">{data.title}</h3>
      <time
        dateTime={data?.created_at}
        className="text-sm text-fg-neutral-faded xs:text-right xs:text-base"
      >
        {formatDate(data.created_at)}
      </time>
    </div>
    {/* {data.summary && <p className="text-fg-neutral-faded">{data.summary}</p>} */}
  </Link>
)
