import type { Post } from '@/lib/get-posts'
import { Card } from '@/components/card'

export const Posts = ({ posts }: { posts: Post[] }) => (
    <section>
        <h2 className="p-8 text-xl font-semibold">Latest posts</h2>
        <ul>
            <li>
                {posts.map((post: Post) => (
                    <Card key={post.slug} data={post} />
                ))}
            </li>
        </ul>
    </section>
)
