'use client'
import { LoadingSpinner } from '@/components/base/loading-spinner'
import { cn } from '@/lib/utils'
import { forwardRef, MouseEventHandler } from 'react'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { isLoading = false, children, className, onClick, ...props }: ButtonProps,
    ref
  ) => {
    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.stopPropagation()
      if (onClick) {
        onClick(event)
      }
    }
    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          'flex items-center rounded bg-primary px-3 py-1 font-medium text-on-primary transition-colors hover:bg-primary-highlight focus:outline-none',
          className
        )}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        <span className="w-full text-center">{children}</span>
      </button>
    )
  }
)

Button.displayName = 'Button'
export { Button }
