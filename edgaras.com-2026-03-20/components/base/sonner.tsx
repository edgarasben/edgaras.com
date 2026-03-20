'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-base group-[.toaster]:text-neutral group-[.toaster]:border-neutral group-[.toaster]:shadow-overlay',
          description: 'group-[.toast]:text-neutral-fade',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-neutral-fade'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
