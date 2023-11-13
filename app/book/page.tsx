import BookHoursForm from '@/components/book-hours-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Design Hours'
}

export default function BookDesignHours() {
  return (
    <div className="bg-base h-full">
      <section className="mx-auto w-full max-w-screen-xl space-y-20 px-8 pb-24 md:pb-32 md:pt-24">
        <h2
          id="payment-options"
          className="text-5xl font-extrabold text-fg-neutral md:text-left"
        >
          Payment Options
        </h2>
        <BookHoursForm />
      </section>
    </div>
  )
}
