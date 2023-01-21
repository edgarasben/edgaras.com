import { getPosts, Post } from '@/lib/get-posts'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card } from '@/components/card'

export const revalidate = 300 // revalidate every 5min

export default async function IndexPage() {
    const posts = await getPosts()
    return (
        <>
            <Container>
                <>
                    <Header />
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
                </>
            </Container>
        </>
    )
}
