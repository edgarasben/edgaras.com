import { getPosts, Post } from '@/lib/get-posts'
import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card } from '@/components/card'

export const revalidate = 30 // revalidate every 30 secs

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
                    {/*  <div className="absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-[200px]">
                <svg
                    className="text-accent-1"
                    width="1164"
                    height="630"
                    viewBox="0 0 1164 630"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1581.98 18.0077L1496.62 292.762L1168.66 384.461L950.41 578.858L818.796 -114.22L1581.98 18.0077Z" />
                </svg>
                <svg
                    className="text-accent-2"
                    width="1164"
                    height="630"
                    viewBox="0 0 1164 630"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M46 191.467L626.842 -140.988L869.819 38.9119L1099.86 -140.988L1616 -47.4402L1588.68 652.012L1197.62 237.522L46 191.467Z"
                        //fill-opacity="0.25"
                    />
                </svg>

                <svg
                    className="text-accent-3"
                    width="1164"
                    height="630"
                    viewBox="0 0 1164 630"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M1229.94 -131.57L1144.58 143.185L816.626 234.884L598.373 429.281L466.759 -263.797L1229.94 -131.57Z" />
                </svg>
            </div> */}
                </>
            </Container>
        </>
    )
}
