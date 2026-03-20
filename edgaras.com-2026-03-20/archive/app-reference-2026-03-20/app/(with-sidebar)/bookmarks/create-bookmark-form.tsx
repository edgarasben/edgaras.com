'use client'

import { createBookmark } from '@/data/actions'
import { useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

export default function CreateBookmarkForm() {
  const ref = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  const [state, action] = useFormState(createBookmark, undefined)
  /*     const errors = state?.error */
  return (
    <form
      ref={ref}
      action={(formData) => {
        action(formData)
        ref.current?.reset()
      }}
    >
      <div className="flex flex-col">
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="bg-neutral"
        />
        <input
          name="link"
          type="text"
          placeholder="Link"
          defaultValue={'https://'}
          className="bg-neutral"
        />
        <input
          name="tags"
          type="text"
          placeholder="Tags (comma seperated)"
          className="bg-neutral"
        />
        <button type="submit">{pending ? 'Loading...' : 'Create'}</button>
        {state && <pre>{JSON.stringify(state)}</pre>}
      </div>
    </form>
  )
}
