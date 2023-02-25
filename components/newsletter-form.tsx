'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/button'
/* import { usePlausible } from 'next-plausible' */

import * as Dialog from '@radix-ui/react-dialog'

export function NewsletterForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const formRef = useRef<HTMLFormElement | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalText, setModalText] = useState({
        title: '',
        description: ''
    })
    /*     const plausible = usePlausible() */

    const handleSubscribe = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        setIsLoading(true)
        const target = event.target as typeof event.target & {
            email: { value: string }
        }
        const email = target.email.value

        const subsResponse = await fetch('/api/post-newsletter-subscriber', {
            method: 'POST',
            body: JSON.stringify({ email: email })
        })

        const data: any = await subsResponse.json()

        if (data.result === 'subscribed')
            setModalText({
                title: 'Subscribed!',
                description: "We'll stay in touch 💌"
            })

        if (data.result === 'already-exists')
            setModalText({
                title: 'We are already pals!',
                description:
                    "You're already part of the inner circle - my mailing list! I will keep you in a loop. 📬"
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
            <form ref={formRef} onSubmit={handleSubscribe} className="relative flex">
                <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    aria-label="Email address"
                    required
                    placeholder="Email address"
                    type="email"
                    className="w-full rounded-lg border border-transparent bg-bg-neutral p-2.5 outline-none placeholder:text-fg-neutral-faded focus:border-border-neutral-faded focus:bg-bg-neutral focus:ring-border-neutral-faded"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        /*             onClick={() => plausible('Clicked Subscribe')} */
                    >
                        Subscribe
                    </Button>
                </div>
            </form>
            <Modal open={modalOpen} onOpenChange={setModalOpen} modalText={modalText} />
        </>
    )
}

const Modal = ({ open, onOpenChange, modalText }: any) => (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/25 backdrop-blur-xl" />
            <Dialog.Content className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-xl bg-bg-elevated p-8">
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
