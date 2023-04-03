import { Button } from '@react-email/button'
import { Html } from '@react-email/html'
import { Tailwind } from '@react-email/tailwind'
import * as React from 'react'

export default function Email() {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291'
              }
            }
          }
        }}
      >
        <Button className="bg-brand p-16 text-white" href="https://example.com">
          Click meee
        </Button>
      </Tailwind>
    </Html>
  )
}
