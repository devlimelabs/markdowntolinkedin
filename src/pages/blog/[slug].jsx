import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  User,
  ChevronRight,
  RefreshCw
} from 'lucide-react'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import PostCard from '@/components/blog/PostCard.jsx'
import CategoryBadge from '@/components/blog/CategoryBadge.jsx'
import ShareButtons from '@/components/blog/ShareButtons.jsx'
import {
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  getPostMeta,
  SITE_URL
} from '@/lib/blog.js'

// Custom components for ReactMarkdown
const markdownComponents = {
  // Custom heading rendering with anchor links
  h1: ({ children }) => (
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 border-b border-gray-200 pb-2">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-bold text-gray-900 mt-4 mb-2">
      {children}
    </h4>
  ),
  // Paragraphs
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-4">
      {children}
    </p>
  ),
  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-primary-600 hover:text-primary-700 underline decoration-primary-300 hover:decoration-primary-500 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">
      {children}
    </li>
  ),
  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-6 bg-primary-50 rounded-r-lg italic text-gray-700">
      {children}
    </blockquote>
  ),
  // Code blocks
  code: ({ inline, className, children }) => {
    if (inline) {
      return (
        <code className="bg-gray-100 text-primary-700 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      )
    }
    return (
      <code className={`block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4 ${className || ''}`}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="bg-gray-900 rounded-lg overflow-x-auto my-4">
      {children}
    </pre>
  ),
  // Images
  img: ({ src, alt }) => (
    <figure className="my-6">
      <img
        src={src}
        alt={alt}
        className="rounded-lg shadow-lg w-full"
        loading="lazy"
      />
      {alt && (
        <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  // Tables
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50">
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-gray-700 border-t border-gray-200">
      {children}
    </td>
  ),
  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-gray-200" />
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Post Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The article you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate('/blog')} className="bg-gradient-primary text-white">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Button>
      </div>
    )
  }

  const meta = getPostMeta(post)
  const relatedPosts = getRelatedPosts(slug, 3)
  const { frontmatter, content, readingTime } = post
  const { title, date, lastUpdated, category, tags, coverImage, author } = frontmatter
  const wasUpdated = lastUpdated && lastUpdated !== date

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={meta.publishedTime} />
        {meta.modifiedTime && meta.modifiedTime !== meta.publishedTime && (
          <meta property="article:modified_time" content={meta.modifiedTime} />
        )}
        <meta property="article:author" content={meta.author} />
        <meta property="article:section" content={meta.category} />
        {meta.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="canonical" href={meta.url} />
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/blog" className="hover:text-primary-600 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            to={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
            className="hover:text-primary-600 transition-colors"
          >
            {category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 truncate max-w-[200px]">{title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <CategoryBadge category={category} size="sm" />

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(date)}
            </span>
            {wasUpdated && (
              <span className="flex items-center gap-1.5 text-primary-600">
                <RefreshCw className="w-4 h-4" />
                Updated {formatDate(lastUpdated)}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readingTime}
            </span>
          </div>

          <ShareButtons
            url={`${SITE_URL}/blog/${slug}`}
            title={title}
            description={frontmatter.excerpt}
          />
        </header>

        {/* Cover Image */}
        {coverImage && (
          <div className="mb-10 -mx-4 md:mx-0">
            <img
              src={coverImage}
              alt={title}
              className="w-full rounded-none md:rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={markdownComponents}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">Enjoyed this article?</h3>
              <p className="text-sm text-gray-600">Share it with your network</p>
            </div>
            <ShareButtons
              url={`${SITE_URL}/blog/${slug}`}
              title={title}
              description={frontmatter.excerpt}
            />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link to="/blog">
            <Button variant="outline" className="hover:bg-primary-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Articles
            </Button>
          </Link>
        </div>
      </article>
    </>
  )
}
