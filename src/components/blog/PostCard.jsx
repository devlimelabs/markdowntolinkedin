import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { formatDate } from '@/lib/blog.js'

export default function PostCard({ post, featured = false }) {
  const { slug, frontmatter, readingTime } = post
  const { title, excerpt, date, category, tags, coverImage } = frontmatter

  if (featured) {
    return (
      <Link to={`/blog/${slug}`} className="block group">
        <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 border-0">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 md:h-full bg-gradient-to-br from-primary-100 to-secondary-100 overflow-hidden">
              {coverImage ? (
                <img
                  src={coverImage}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📝</div>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-primary text-white border-0">
                  Featured
                </Badge>
              </div>
            </div>

            {/* Content */}
            <CardContent className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <Link
                  to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  {category}
                </Link>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(date)}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {title}
              </h2>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {excerpt}
              </p>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center text-primary-600 font-medium group-hover:gap-3 gap-2 transition-all">
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link to={`/blog/${slug}`} className="block group">
      <Card className="h-full overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border-0">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
          {coverImage ? (
            <img
              src={coverImage}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl opacity-20">📝</div>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-5">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Link
              to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(e) => e.stopPropagation()}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              {category}
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readingTime}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {formatDate(date)}
            </span>
            <span className="flex items-center text-sm text-primary-600 font-medium group-hover:gap-2 gap-1 transition-all">
              Read
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
