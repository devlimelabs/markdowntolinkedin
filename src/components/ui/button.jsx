import * as React from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = {
  variant: {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    ghost: 'hover:bg-gray-100 hover:text-gray-900',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
  },
  size: {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-11 px-8 text-base',
    icon: 'h-10 w-10',
  },
}

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default',
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button }