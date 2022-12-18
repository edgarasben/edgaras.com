import { formatDate } from '@/lib/format-date'

type CardProps = {
    slug: string
    title: string
    firstPosted: string
    summary: string
}

export const Card = ({ data }: { data: CardProps }) => (
    <a
        href={`/posts/${data.slug}`}
        className="block w-full space-y-4 rounded-xl p-8 transition-colors hover:bg-bg-base"
    >
        <div className="flex justify-between">
            <h3 className="font-semibold">{data.title}</h3>
            <time dateTime={data.firstPosted} className="text-fg-neutral-faded">
                {formatDate(data.firstPosted)}
            </time>
        </div>
        <p className="text-fg-neutral-faded">{data.summary}</p>
    </a>
)
