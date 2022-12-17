import { getPosts } from '@/lib/get-posts'
import { formatDate } from '@/lib/format-date'
import LinkedinIcon from '@/components/icons/linkedin-icon'
import TwitterIcon from '@/components/icons/twitter-icon'
import MailIcon from '@/components/icons/mail-icon'

export const revalidate = 30 // revalidate every 30 secs

const socialLinks = [
    {
        label: 'Twitter',
        url: 'https://twitter.com/edgarasben',
        icon: <TwitterIcon className="h-5 w-5" />,
    },
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/edgarasben/',

        icon: <LinkedinIcon className="h-5 w-5" />,
    },
    {
        label: 'Mail',
        url: 'mailto:hi@edgaras.com',
        icon: <MailIcon className="h-5 w-5" />,
    },
]

export default async function IndexPage() {
    const posts = await getPosts()
    return (
        <div className="container max-w-screen-sm space-y-8 pt-24 xs:space-y-16">
            <header>
                <div className="space-y-8 rounded-xl bg-bg-base p-8 shadow-sm">
                    <div className="flex justify-between">
                        <div className="flex items-center space-x-4">
                            <img
                                src="/images/edgaras-profile.png"
                                className="h-14 w-14 rounded-full border-2 border-bg-base shadow-md"
                                alt="Edgaras profile"
                            />
                            <div className="space-y-1">
                                <h1 className="font-semibold">
                                    Edgaras Benediktavicius
                                </h1>
                                <p className="text-fg-neutral-faded">
                                    Co-founder at{' '}
                                    <a
                                        href="https://bestwriting.com"
                                        className="underline underline-offset-2 hover:no-underline"
                                    >
                                        Best Writing
                                    </a>
                                </p>
                            </div>
                        </div>
                        <ul className="flex">
                            {socialLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.url}
                                        className="block p-3.5 hover:text-fg-neutral-faded"
                                    >
                                        {link.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-fg-neutral-faded">
                        I design and code things for the web. Get updates on what I
                        learn and build by joining my mailing list. Weekly at most.
                    </p>
                    <NewsletterForm />
                </div>
            </header>
            <main>
                <h2 className="p-8 text-xl font-semibold">Latest posts</h2>
                <ul>
                    <li>
                        {posts.map((post) => (
                            <a
                                key={post.slug}
                                href={`/posts/${post.slug}`}
                                className="block w-full space-y-4 rounded-xl p-8 transition-colors hover:bg-bg-base"
                            >
                                <div className="flex justify-between">
                                    <h3 className="font-semibold">{post.title}</h3>
                                    <time
                                        dateTime={post.firstPosted}
                                        className="text-fg-neutral-faded"
                                    >
                                        {formatDate(post.firstPosted)}
                                    </time>
                                </div>
                                <p className="text-fg-neutral-faded">
                                    {post.summary}
                                </p>
                            </a>
                        ))}
                    </li>
                </ul>
            </main>
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
        </div>
    )
}

const NewsletterForm = () => {
    return (
        <form action="" className="relative flex">
            <input
                aria-label="Email address"
                required
                placeholder="Email address"
                type="email"
                className="w-full rounded-lg border border-transparent bg-bg-neutral p-2.5 outline-none placeholder:text-fg-neutral-faded focus:border-border-neutral-faded focus:bg-bg-neutral"
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                <button
                    type="submit"
                    className="rounded bg-bg-primary px-3 py-1 text-on-primary focus:outline-none"
                >
                    Subscribe
                </button>
            </div>
        </form>
    )
}
