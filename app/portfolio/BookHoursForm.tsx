'use client'

import getStripe from '@/lib/get-stripejs'
import { useRef, useState } from 'react'

export default function BookHoursForm() {
  const [hours, setHours] = useState(NaN)
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Create Stripe checkotu and redirect to Stripe checkout
    const data = await fetch('/api/stripe/checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        /*         successUrl: 'http://edgaras.com/success', */
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
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
  }

  function handleHoursChange(event: React.ChangeEvent<HTMLInputElement>) {
    setHours(Number(event.target.value))
  }

  return (
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
          className="right-0 block w-full place-self-start self-end whitespace-nowrap rounded-full bg-primary px-8 py-4 text-center text-xl font-bold tracking-wide text-white transition-transform hover:rotate-2 hover:scale-105 disabled:bg-black/20 hover:disabled:rotate-0 hover:disabled:scale-100"
        >
          Book{' '}
          {hours >= 1 && hours < 1000
            ? hours + (hours === 1 ? ' hour' : ' hours')
            : 'hours'}
        </button>
      </div>
    </form>
  )
}
