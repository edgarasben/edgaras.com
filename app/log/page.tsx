import { getLogs, Log } from '@/lib/get-logs'
import { Container } from '@/components/container'
import React from 'react'
import LinkIcon from '@/components/icons/link-icon'

export const revalidate = 30 // revalidate every 30 secs

export default async function PostsPage() {
    const logs = await getLogs()
    return (
        <Container>
            <section>
                <h2 className="p-8 text-xl font-semibold">Log</h2>
                <ul className="space-y-2 px-8">
                    {logs.map((post: Log) =>
                        post.url ? (
                            <a
                                key={post.title + ' ' + post.url}
                                href={post.url ? post.url : '#'}
                                className="block"
                            >
                                <li className="group flex items-center justify-between rounded bg-bg-elevated px-4 py-2">
                                    <span className="decoration-fg-neutral/25 underline-offset-2 group-hover:underline">
                                        {post.title}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <LinkIcon className="h-4 w-4 text-white" />
                                        <span className="y-0.5 rounded bg-accent-1 px-2 text-black/70 dark:text-white/70">
                                            {post.tag}
                                        </span>
                                    </div>
                                </li>
                            </a>
                        ) : (
                            <li
                                key={post.title + ' ' + post.url}
                                className="flex items-center justify-between  rounded bg-bg-elevated px-4 py-2"
                            >
                                {post.title}
                                <span className="y-0.5 rounded bg-accent-1 px-2 text-black/70 dark:text-white/70">
                                    {post.tag}
                                </span>
                            </li>
                        )
                    )}
                </ul>
            </section>
        </Container>
    )
}
