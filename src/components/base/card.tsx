import { isThisYear, format } from 'date-fns'
import Link from 'next/link'
import { Tables } from '@/lib/types/supabase'

type Data = {
  data: Tables<'articles'>
}

export const Card = ({ data }: Data) => (
  <Link
    href={`/${data.slug}`}
    className="block w-full space-y-4 rounded-xl px-4 py-4 text-sm transition-colors hover:bg-neutral-fade"
  >
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <time
          dateTime={data?.created_at}
          className="min-w-[56px] pt-0.5 text-sm uppercase text-neutral-fade"
        >
          {isThisYear(data.published_at)
            ? format(data.published_at, 'MMM d')
            : format(data.published_at, 'yyyy')}
        </time>
        <h3 className="font-medium">{data.title}</h3>
      </div>
      {data.status === 'draft' && (
        <div className="text-on-warn inline-block rounded-full bg-warn-fade px-2 text-2xs font-medium uppercase leading-5 tracking-widest">
          {data.status}
        </div>
      )}
    </div>
    {/* {data.summary && <p className="text-neutral-fade">{data.summary}</p>} */}
  </Link>
)
