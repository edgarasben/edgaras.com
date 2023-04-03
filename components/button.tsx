import { LoadingSpinner } from '@/components/loading-spinner'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isLoading?: boolean
}

export const Button = ({ isLoading = false, children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="flex items-center rounded bg-primary px-3 py-1 text-on-primary focus:outline-none"
    >
      {isLoading && <LoadingSpinner />}
      <span>{children}</span>
    </button>
  )
}
