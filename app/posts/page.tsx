import { getPosts } from '@/lib/get-posts'
import { Posts } from '@/components/posts'
import { Container } from '@/components/container'

export const revalidate = 30 // revalidate every 30 secs

export default async function PostsPage() {
    const posts = await getPosts()
    return (
        <Container>
            <Posts posts={posts} />
        </Container>
    )
}
