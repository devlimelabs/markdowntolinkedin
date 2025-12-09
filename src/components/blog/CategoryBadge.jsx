import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge.jsx'
import { Folder } from 'lucide-react'

export default function CategoryBadge({
  category,
  count,
  isActive = false,
  showCount = true,
  size = 'default' // 'sm' | 'default' | 'lg'
}) {
  const slug = category.toLowerCase().replace(/\s+/g, '-')

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    default: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  }

  return (
    <Link to={`/blog/category/${slug}`}>
      <Badge
        variant={isActive ? 'default' : 'secondary'}
        className={`
          ${sizeClasses[size]}
          ${isActive
            ? 'bg-gradient-primary text-white border-0 hover:shadow-glow'
            : 'bg-gray-100 text-gray-700 hover:bg-primary-50 hover:text-primary-700'
          }
          transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5
        `}
      >
        <Folder className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
        <span className="capitalize">{category}</span>
        {showCount && count !== undefined && (
          <span className={`
            ${isActive ? 'bg-white/20' : 'bg-gray-200'}
            rounded-full px-1.5 text-xs
          `}>
            {count}
          </span>
        )}
      </Badge>
    </Link>
  )
}
