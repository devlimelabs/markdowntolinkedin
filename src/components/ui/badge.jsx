import * as React from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = {
  default: 'bg-blue-100 text-blue-900',
  secondary: 'bg-gray-100 text-gray-900',
  destructive: 'bg-red-100 text-red-900',
  outline: 'text-gray-900 border border-gray-200',
}

const Badge = React.forwardRef(({ 
  className, 
  variant = 'default',
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = 'Badge'

export { Badge }