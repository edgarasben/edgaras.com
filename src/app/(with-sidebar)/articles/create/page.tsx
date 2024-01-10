import { Container } from '@/components/container'
import { ChevronLeftIcon } from '@/components/icons/outline'
import { createArticle, updateArticle } from '@/data/actions'
import { getUser } from '@/data/queries'

import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function CreateArticle() {
  const user = await getUser()

  if (!user) {
    redirect(`/login`)
  }

  return (
    <Container>
      <Link
        href="/"
        className="group absolute top-[223px] flex items-center gap-1.5 rounded-full bg-neutral-fade py-1 pl-2 pr-3 font-medium text-neutral-fade hover:text-neutral md:left-[336px] md:top-4"
      >
        <ChevronLeftIcon className="relative h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back
      </Link>
      <form action={createArticle} className="flex flex-col">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="border border-neutral bg-base"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="border border-neutral bg-base"
        />
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          className="border border-neutral bg-base"
        />
        <textarea
          name="markdown"
          rows={25}
          placeholder="Markdown"
          className="border border-neutral bg-base"
        />
        <select name="status" className="border border-neutral bg-base">
          <option value="public">Public</option>
          <option value="draft">Draft</option>
        </select>
        <button
          type="submit"
          className="border border-neutral bg-base leading-10"
        >
          Create
        </button>
      </form>
    </Container>
  )
}
