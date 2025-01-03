'use client'

import { useEffect, useOptimistic, useRef, useState, useTransition } from 'react'
import { Bookmark } from '../../../../../db/schema'
import { deleteBookmark, updateBookmark } from '../actions'

type EditingBookmark = {
  title: string
  link: string
  tags: string
}

export function BookmarkList({
  initialBookmarks
}: {
  initialBookmarks: Bookmark[]
}) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValues, setEditValues] = useState<EditingBookmark>({
    title: '',
    link: '',
    tags: ''
  })
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()
  const [optimisticBookmarks, updateOptimisticBookmarks] = useOptimistic(
    initialBookmarks,
    (
      state,
      update:
        | { id: number; data: Omit<EditingBookmark, 'tags'> & { tags: string[] } }
        | { id: number; type: 'delete' }
    ) =>
      'type' in update
        ? state.filter((bookmark) => bookmark.id !== update.id)
        : state.map((bookmark) =>
            bookmark.id === update.id ? { ...bookmark, ...update.data } : bookmark
          )
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingIndex !== null) {
        if (e.key === 'Escape') {
          setEditingIndex(null)
          setEditValues({
            title: '',
            link: '',
            tags: ''
          })
        }
        return
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < initialBookmarks.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === 'Enter') {
        if (e.metaKey) {
          // CMD+Enter opens in new tab
          initialBookmarks[selectedIndex]?.link &&
            window.open(initialBookmarks[selectedIndex].link, '_blank')
        } else {
          // Enter opens in same tab
          initialBookmarks[selectedIndex]?.link &&
            (window.location.href = initialBookmarks[selectedIndex].link)
        }
      } else if (e.key.toLowerCase() === 'e') {
        // 'E' starts editing
        e.preventDefault()
        const bookmark = optimisticBookmarks[selectedIndex]
        if (bookmark) {
          setEditingIndex(selectedIndex)
          setEditValues({
            title: bookmark.title || '',
            link: bookmark.link,
            tags: bookmark.tags?.join(', ') || ''
          })
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [initialBookmarks, selectedIndex, editingIndex])

  // Focus input when entering edit mode
  useEffect(() => {
    if (editingIndex !== null && formRef.current) {
      const input = formRef.current.querySelector('input')
      if (input) {
        input.focus()
      }
    }
  }, [editingIndex])

  return (
    <div className="text-neutral-softer flex flex-col justify-center">
      {optimisticBookmarks.map((bookmark, index) => (
        <div
          key={bookmark.id}
          tabIndex={0}
          role="button"
          onFocus={() => setSelectedIndex(index)}
          onMouseEnter={() => setSelectedIndex(index)}
          onClick={() => {
            if (editingIndex === null) {
              setSelectedIndex(index)
              setEditingIndex(index)
              setEditValues({
                title: bookmark.title || '',
                link: bookmark.link,
                tags: bookmark.tags?.join(', ') || ''
              })
            }
          }}
          className={`cursor-pointer transition-colors duration-150 ease-in-out ${
            selectedIndex === index
              ? "text-neutral relative select-none before:absolute before:-left-[2ch] before:text-cyan-500 before:transition-all before:duration-150 before:content-['>']"
              : 'hover:text-neutral'
          }`}
        >
          {editingIndex === index ? (
            <form
              ref={formRef}
              className="flex flex-col"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const bookmark = optimisticBookmarks[editingIndex]
                if (bookmark) {
                  const tags = editValues.tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean)

                  setUpdatingId(bookmark.id)
                  startTransition(() => {
                    updateOptimisticBookmarks({
                      id: bookmark.id,
                      data: {
                        title: editValues.title,
                        link: editValues.link,
                        tags
                      }
                    })
                    updateBookmark(bookmark.id, {
                      title: editValues.title,
                      link: editValues.link,
                      tags
                    })
                  })
                  setEditingIndex(null)
                  setEditValues({
                    title: '',
                    link: '',
                    tags: ''
                  })
                }
              }}
            >
              <input
                type="text"
                value={editValues.title}
                onChange={(e) =>
                  setEditValues((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Title"
                className="placeholder:text-neutral-softer/50 w-full bg-transparent focus:outline-none"
              />
              <input
                type="url"
                value={editValues.link}
                onChange={(e) =>
                  setEditValues((prev) => ({ ...prev, link: e.target.value }))
                }
                placeholder="URL"
                className="placeholder:text-neutral-softer/50 w-full bg-transparent focus:outline-none"
              />
              <input
                type="text"
                value={editValues.tags}
                onChange={(e) =>
                  setEditValues((prev) => ({ ...prev, tags: e.target.value }))
                }
                placeholder="Tags (comma separated)"
                className="placeholder:text-neutral-softer/50 w-full bg-transparent focus:outline-none"
              />
              <button type="submit" hidden />
            </form>
          ) : (
            <div className="flex gap-[1ch]">
              <span>{bookmark.title || bookmark.link}</span>
              {isPending && bookmark.id === updatingId && (
                <span className="inline-flex h-[2rem] w-[1ch] items-center justify-center">
                  <span className="block h-[6px] w-[6px] animate-pulse rounded-full bg-cyan-500" />
                </span>
              )}{' '}
              <span className="text-amber-300">{bookmark.tags?.join(', ')}</span>
            </div>
          )}
          {editingIndex === index && (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const bookmark = optimisticBookmarks[editingIndex]
                if (bookmark) {
                  setUpdatingId(bookmark.id)
                  startTransition(() => {
                    updateOptimisticBookmarks({ id: bookmark.id, type: 'delete' })
                    deleteBookmark(bookmark.id)
                  })
                  setEditingIndex(null)
                  setEditValues({
                    title: '',
                    link: '',
                    tags: ''
                  })
                }
              }}
              className="mt-2 text-red-500 transition-colors duration-150 hover:text-red-400 focus-visible:underline"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
