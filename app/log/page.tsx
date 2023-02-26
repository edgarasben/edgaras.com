import { getLogs, Log } from '@/lib/get-logs'
import { Container } from '@/components/container'
import React from 'react'
import LinkIcon from '@/components/icons/link-icon'
import getWeek from 'date-fns/getWeek'
import ChevronUpDownIcon from '@/components/icons/chevron-up-down-icon'
import ChevronDownIcon from '@/components/icons/chevron-down'
import type { Metadata } from 'next'

export const revalidate = 30 // revalidate every 30 secs

export const metadata: Metadata = {
  title: 'Log'
}

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
        <h2 className="py-8 text-xl font-semibold">Log</h2>
        <div className="space-y-8">
          {groupedItems.map((week) => {
            return (
              <div key={week.week} className="space-y-2">
                <h2 className="text-sm uppercase tracking-wider text-fg-neutral-faded">
                  2023 Week {week.week}
                </h2>

                <ul className="divide-y divide-border-neutral-faded/50 overflow-hidden rounded-md shadow-sm">
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
      <summary className="flex cursor-pointer items-start justify-between sm:items-center">
        <RowInner item={item} />
        <ChevronDownIcon className="h-5 w-5 flex-shrink-0 text-fg-neutral-faded" />
      </summary>
      <div className="mt-3 py-4 text-fg-neutral-faded">{item.content}</div>
    </details>
  ) : (
    <div
      className={`group flex items-center space-x-2 bg-bg-elevated py-2 pl-2 pr-3 ${
        item.url && 'hover:bg-bg-neutral'
      }`}
    >
      <div className="flex items-center justify-between">
        <RowInner item={item} />
      </div>
    </div>
  )
}

function RowInner({ item }: { item: Log }) {
  return (
    <div className="flex items-start space-x-2 sm:items-center">
      <div>
        {item.tag && (
          <span
            className={`y-0.5 mr-1.5 inline-flex rounded px-2 text-black/70 dark:text-white/70 ${
              item.tag === 'Work' ? 'bg-accent-1/50' : ''
            }${item.tag === 'Learn' ? 'bg-accent-2/50' : ''}${
              item.tag === 'Discover' ? 'bg-accent-3/50' : ''
            }`}
          >
            {item.tag}
          </span>
        )}
        <span
          className={
            item.url ? 'underline decoration-fg-neutral/20 underline-offset-4' : ''
          }
        >
          {item.title}
        </span>
      </div>
    </div>
  )
}
