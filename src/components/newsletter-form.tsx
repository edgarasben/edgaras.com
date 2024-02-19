'use client'

import * as Dialog from '@radix-ui/react-dialog'

import { useRef, useState } from 'react'

import { Button } from '@/components/base/button'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function NewsletterForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalText, setModalText] = useState({
    title: '',
    description: '',
  })

  const handleSubscribe = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    setIsLoading(true)
    const target = event.target as typeof event.target & {
      email: { value: string }
    }
    const email = target.email.value

    const subsResponse = await fetch('/api/post-newsletter-subscriber', {
      method: 'POST',
      body: JSON.stringify({ email: email }),
    })

    const data: any = await subsResponse.json()

    if (data.result === 'subscribed')
      setModalText({
        title: 'Subscribed!',
        description: "We'll stay in touch 💌",
      })

    if (data.result === 'already-exists')
      setModalText({
        title: 'Already Subscribed',
        description:
          "You're already part of my mailing list. We'll stay in touch! 📬",
      })

    formRef.current?.reset()

    setIsLoading(false)
    setModalOpen(true)

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh()
    })
  }

  return (
    <>
      <form ref={formRef} onSubmit={handleSubscribe} className="relative">
        <input
          autoComplete="off"
          id="email"
          name="email"
          aria-label="Email address"
          required
          placeholder="Email address"
          type="email"
          className="w-full rounded-lg  border-neutral-fade bg-neutral-fade px-2.5 outline-none transition-all placeholder:text-neutral-fade focus-visible:border-neutral focus-visible:bg-base focus-visible:ring-4 focus-visible:ring-neutral-fade"
        />
        <div className="x inset-y-0 right-0 flex items-center pr-1">
          <Button type="submit" isLoading={isLoading}>
            Subscribe
          </Button>
        </div>
      </form>
      <Modal
        open={modalOpen}
        onOpenChange={setModalOpen}
        modalText={modalText}
      />
    </>
  )
}

const Modal = ({ open, onOpenChange, modalText }: any) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/25 backdrop-blur-xl" />
      <Dialog.Content className="bg-elevated absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-xl p-8">
        <Dialog.Title className="text-xl font-semibold">
          {modalText.title}
        </Dialog.Title>
        <Dialog.Description>{modalText.description}</Dialog.Description>
        <Dialog.Close asChild className="focus:outline-none">
          <Button>OK</Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
