'use client'

import { ClipboardIcon } from '@/icons/solid'

export default function CopyToClipboard({ code }: { code: string }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch (error) {
      console.error('Error copying to clipboard', error)
    } finally {
      setTimeout(() => {
        // do something
      }, 2000)
    }
  }

  return (
    <button onClick={copyToClipboard}>
      <ClipboardIcon className="h-6 w-6 text-neutral-fade" />
    </button>
  )
}
