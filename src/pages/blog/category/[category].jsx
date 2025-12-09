import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowLeft, Folder, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import PostCard from '@/components/blog/PostCard.jsx'
import CategoryBadge from '@/components/blog/CategoryBadge.jsx'
import {
  getPostsByCategory,
  getAllCategories,
  getCategoryMeta
} from '@/lib/blog.js'

export default function CategoryPage() {
  const { category: categorySlug } = useParams()
  const posts = getPostsByCategory(categorySlug)
  const categories = getAllCategories()

  // Format category name from slug
  const categoryName = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const meta = getCategoryMeta(categorySlug, posts)
  const currentCategory = categories.find(c => c.slug === categorySlug)

  if (posts.length === 0) {
    return (
      <>
        <Helmet>
          <title>{meta.title}</title>
          <meta name="robots" content="noindex" />
        </Helmet>

        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">📂</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No Articles in "{categoryName}"
          </h1>
          <p className="text-gray-600 mb-8">
            There are no articles in this category yet. Check out our other categories!
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map(cat => (
              <CategoryBadge
                key={cat.slug}
                category={cat.name}
                count={cat.count}
                isActive={cat.slug === categorySlug}
              />
            ))}
          </div>
          <Link to="/blog">
            <Button className="bg-gradient-primary text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:url" content={meta.url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="canonical" href={meta.url} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/blog" className="hover:text-primary-600 transition-colors">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{categoryName}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl">
              <Folder className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {categoryName}
              </h1>
              <p className="text-gray-500">
                {posts.length} article{posts.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-600 max-w-2xl">
            Browse all articles about {categoryName.toLowerCase()}. Tips, guides, and insights to help you create better LinkedIn content.
          </p>
        </div>

        {/* Other Categories */}
        {categories.length > 1 && (
          <div className="mb-10">
            <div className="text-sm font-medium text-gray-500 mb-3">
              All Categories
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <CategoryBadge
                  key={cat.slug}
                  category={cat.name}
                  count={cat.count}
                  isActive={cat.slug === categorySlug}
                />
              ))}
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link to="/blog">
            <Button variant="outline" className="hover:bg-primary-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
