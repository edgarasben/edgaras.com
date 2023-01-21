import { getLogs, Log } from '@/lib/get-logs'
import { Container } from '@/components/container'
import React from 'react'
import LinkIcon from '@/components/icons/link-icon'
import getWeek from 'date-fns/getWeek'
import ChevronUpDownIcon from '@/components/icons/chevron-up-down-icon'
import ChevronDownIcon from '@/components/icons/chevron-down'

export const revalidate = 30 // revalidate every 30 secs

export default async function PostsPage() {
    const logs = await getLogs()

    // Group logs by week number derived from the log date
    const groupedItems: { week: number; logs: Log[] }[] = logs.reduce(
        (acc: { week: number; logs: Log[] }[], item) => {
            const weekNumber = getWeek(new Date(item.created))
            const existingWeek = acc.find((w) => w.week === weekNumber)
            if (existingWeek) {
                existingWeek.logs.push(item)
            } else {
                acc.push({ week: weekNumber, logs: [item] })
            }
            return acc
        },
        []
    )

    const weekGroups: { [key: number]: Log[] } = {}
    logs.map((item) => {
        const date = new Date(item.created)
        const week = getWeek(date)
        if (!weekGroups[week]) {
            weekGroups[week] = []
        }
        weekGroups[week].push(item)
    })

    return (
        <Container>
            <section>
                <h2 className="py-8 px-4 text-xl font-semibold">Log</h2>
                <div className="space-y-8">
                    {groupedItems.map((week) => {
                        return (
                            <div key={week.week} className="space-y-2 px-4">
                                <h2 className="text-sm uppercase tracking-wider text-fg-neutral-faded">
                                    2022 Week {week.week}
                                </h2>

                                <ul className="overflow-hidden rounded-md">
                                    {week.logs.map((logItem: any) =>
                                        logItem.url ? (
                                            <li key={logItem.title + ' ' + logItem.url}>
                                                <a href={logItem.url}>
                                                    <Row item={logItem} />
                                                </a>
                                            </li>
                                        ) : (
                                            <li key={logItem.title + ' ' + logItem.url}>
                                                <Row item={logItem} />
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </section>
        </Container>
    )
}

function Row({ item }: { item: Log }) {
    return item.content ? (
        <details className="group flex items-center space-x-2 bg-bg-elevated py-2 pl-2 pr-3 open:bg-bg-neutral hover:bg-bg-neutral">
            <summary className="flex cursor-pointer items-center justify-between">
                <RowInner item={item} />
                <ChevronDownIcon className="h-5 w-5 text-fg-neutral-faded" />
            </summary>
            <div className="mt-3 py-4 text-fg-neutral-faded">{item.content}</div>
        </details>
    ) : (
        <div className="group flex items-center space-x-2 bg-bg-elevated py-2 pl-2 pr-3 hover:bg-bg-neutral">
            <div className="flex items-center justify-between">
                <RowInner item={item} />
            </div>
        </div>
    )
}

function RowInner({ item }: { item: Log }) {
    return (
        <div className="flex items-center space-x-2">
            {item.tag && (
                <span
                    className={`y-0.5 rounded px-2 text-black/70 dark:text-white/70 ${
                        item.tag === 'Work' ? 'bg-accent-1' : ''
                    }${item.tag === 'Learn' ? 'bg-accent-2' : ''}${
                        item.tag === 'Discover' ? 'bg-accent-3' : ''
                    }`}
                >
                    {item.tag}
                </span>
            )}
            <span
                className={
                    item.url
                        ? 'decoration-fg-neutral/50 underline-offset-4 group-hover:underline'
                        : ''
                }
            >
                {item.title}
            </span>
            {item.url && <LinkIcon className="h-4 w-4 text-fg-neutral-faded" />}
        </div>
    )
}
