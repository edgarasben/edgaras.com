import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export const Card = ({ data }: { data: any }) => (
  <Link
    href={`/articles/${data.slug}`}
    className="block w-full space-y-4 rounded-xl py-4 px-4 transition-colors hover:bg-base"
  >
    <div className="flex flex-col gap-1 xs:flex-row xs:space-y-0">
      <time
        dateTime={data?.created_at}
        className="text-sm text-fg-neutral-faded xs:text-base min-w-[64px]"
      >
        {formatDate(data.created_at)}
      </time>
      <h3 className="font-medium">{data.title}</h3>
    </div>
    {/* {data.summary && <p className="text-fg-neutral-faded">{data.summary}</p>} */}
  </Link>
)
