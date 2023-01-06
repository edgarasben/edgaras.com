import { getPosts } from '@/lib/get-posts'
import { getPost } from '@/lib/get-post'
import { formatDate } from '@/lib/format-date'
import { Markdown } from '@/components/markdown'

import { Container } from '@/components/container'

interface PostPageProps {
    params: {
        slug: string[]
    }
}

export const revalidate = 30 // revalidate every 30 secs

export default async function PostPage({ params }: PostPageProps) {
    let slug = params.slug.toString()

    const post = await getPost(slug)

    return (
        <Container>
            <article className="prose max-w-none prose-h1:text-center prose-figcaption:text-fg-neutral-faded prose-code:break-words prose-code:bg-white">
                <h1>{post.title}</h1>
                <time
                    dateTime="2018-07-07"
                    className="block text-center text-fg-neutral-faded"
                >
                    {formatDate(post.firstPosted)}
                </time>
                <div className="pt-16">
                    <Markdown>{post.content}</Markdown>
                </div>
            </article>
        </Container>
    )
}

export async function generateStaticParams() {
    const posts = await getPosts()

    return posts.map((post) => ({
        slug: post.slug
    }))
}
