'use client'

import type { Bookmark } from './page'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/base/dialog'
import { deleteBookmark } from '@/data/actions'
import { Button } from '@/components/base/button'
import { useState } from 'react'
import { EllipsisVerticalOutlineIcon } from '@/components/icons/outline'

export function BookmarkLink({
  bookmark,
  withMenu
}: {
  bookmark: Bookmark
  withMenu: boolean
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const handleItemClick = (e: React.MouseEvent) => {
    if (!isDialogOpen) {
      window.open(bookmark.link, '_blank', 'noopener,noreferrer')
    }
  }
  return (
    <div
      onClick={handleItemClick}
      className="mx-1 flex cursor-pointer gap-x-4 rounded-lg py-5 transition-colors hover:bg-neutral-fade"
    >
      <div className="relative flex w-full min-w-0 justify-between px-3">
        <a
          className="text-sm font-medium leading-6 text-neutral"
          target="_blank"
          rel="noopener noreferrer"
          href={bookmark.link}
          onClick={(e) => e.stopPropagation()}
        >
          {bookmark.title}
        </a>
        {withMenu ? (
          <>
            {/*  <form action={deleteBookmark}>
              <input type="hidden" name="id" defaultValue={bookmark.id} />
              <Button className="bg-[red]">Delete</Button>
            </form> */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <div className="absolute inset-y-0 right-2 flex items-center justify-center">
                <DialogTrigger
                  className="rounded-full p-2 hover:bg-neutral-fade"
                  onClick={(event) => event.stopPropagation()}
                >
                  <EllipsisVerticalOutlineIcon className="h-6 w-6" />
                </DialogTrigger>
              </div>
              <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        ) : null}
      </div>
    </div>
  )
}
