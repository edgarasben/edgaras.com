'use client'

import { LoadingSpinner } from './loading-spinner'
import getStripe from '@/lib/stripe'
import { useState } from 'react'

export default function BookHoursForm() {
  const [hours, setHours] = useState(NaN)
  const [loadingCheckout1, setLoadingCheckout1] = useState(false)
  const [loadingCheckout2, setLoadingCheckout2] = useState(false)
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoadingCheckout1(true)
    // Create Stripe checkotu and redirect to Stripe checkout
    const data = await fetch('/api/stripe/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        successUrl: 'http://edgaras.com/portfolio',
        cancelUrl: 'http://edgaras.com/portfolio',
        quantity: hours,
        priceId: 'price_1N14dsKjHyqMsSjZZtLsv8ax'
      })
    })

    const response = await data.json()

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id
    })
    setLoadingCheckout1(false)
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
  }

  function handleHoursChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHours(Number(event.target.value))
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="flex flex-col justify-between gap-10 rounded-[32px] bg-neutral p-12">
        <div className="space-y-4">
          <h3 className="text-4xl">
            <strong>€70</strong> / hour
          </h3>
          <span className="block font-semibold uppercase tracking-wider text-fg-primary">
            Pre-paid hours
          </span>
        </div>
        <p className="h-full text-xl">
          Flexible design partner services for one-time or ongoing projects without
          long-term commitment.
        </p>
        <div className="flex gap-4">
          <form
            onSubmit={handleSubmit}
            className="relative flex w-full flex-col justify-between"
          >
            <label
              htmlFor="hours"
              className={`pb-4 text-lg font-medium ${
                hours && (hours < 1 || hours > 999) && 'text-[red]'
              }`}
            >
              {hours >= 1 && hours < 1000
                ? `Book ${hours} ${hours === 1 ? 'hour' : 'hours'} for €${(
                    hours * 70
                  ).toLocaleString('dk-DK')} EUR`
                : hours
                ? 'Minimum 1 hour, maximum 999'
                : 'Enter number of hours:'}
            </label>
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <input
                onChange={handleHoursChange}
                id="hours"
                type="number"
                min={1}
                max={999}
                placeholder="Enter hours"
                className="w-full rounded-xl border-border-neutral pl-6 text-xl focus-visible:border-border-primary focus-visible:ring-border-primary"
              />
              <button
                type="submit"
                disabled={hours >= 1 && hours < 1000 ? false : true}
                className="flex items-center justify-center space-x-4 right-0 w-full place-self-start self-end whitespace-nowrap rounded-full bg-primary px-8 py-4 text-center text-xl font-bold tracking-wide text-white transition-transform hover:rotate-2 hover:scale-105 disabled:bg-black/20 hover:disabled:rotate-0 hover:disabled:scale-100"
              >
                <span>
                  Book{' '}
                  {hours >= 1 && hours < 1000
                    ? hours + (hours === 1 ? ' hour' : ' hours')
                    : 'hours'}
                </span>

                {loadingCheckout1 && <LoadingSpinner />}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-10 rounded-[32px] bg-primary p-12 text-white">
        <div className="space-y-4">
          <h3 className="text-4xl">
            <strong>€3500</strong> / month
          </h3>
          <span className="block font-bold uppercase tracking-wider opacity-90">
            Subscription
          </span>
        </div>
        <p className="h-full text-xl">
          Dedicated design partner services for a fixed monthly fee, ensuring consistent
          and efficient support for all your design needs.
        </p>
        <a
          href="https://buy.stripe.com/4gw02sgqGe5Ce0U5kk"
          className="place-self-start rounded-full bg-white px-8 py-4 text-xl font-bold tracking-wide text-fg-primary transition-transform hover:rotate-2 hover:scale-105"
        >
          Subscribe
        </a>
      </div>
    </div>
  )
}
