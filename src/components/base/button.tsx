import { LoadingSpinner } from '@/components/base/loading-spinner'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ isLoading = false, children, className, ...props }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          'flex items-center rounded bg-primary px-3 py-1 font-medium text-on-primary transition-colors hover:bg-primary-highlight focus:outline-none',
          className,
        )}
      >
        {isLoading && <LoadingSpinner />}
        <span>{children}</span>
      </button>
    )
  },
)

Button.displayName = 'Button'
export { Button }
