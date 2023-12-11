import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export const Card = ({ data }: { data: any }) => (
  <Link
    href={`/${data.slug}`}
    className="block w-full space-y-4 rounded-xl px-4 py-4 transition-colors hover:bg-neutral-fade"
  >
    <div className="flex flex-col xs:flex-row">
      <time
        dateTime={data?.created_at}
        className="min-w-[56px] pt-0.5 text-sm uppercase text-neutral-fade"
      >
        {formatDate(data.created_at)}
      </time>
      <h3 className="font-medium">{data.title}</h3>
    </div>
    {/* {data.summary && <p className="text-neutral-fade">{data.summary}</p>} */}
  </Link>
)
