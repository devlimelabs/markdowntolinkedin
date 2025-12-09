import { Helmet } from 'react-helmet-async'
import { BookOpen, TrendingUp } from 'lucide-react'
import PostCard from '@/components/blog/PostCard.jsx'
import CategoryBadge from '@/components/blog/CategoryBadge.jsx'
import { getAllPosts, getAllCategories, SITE_URL, SITE_NAME } from '@/lib/blog.js'

export default function Blog() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  // Get featured post (first post or one marked as featured)
  const featuredPost = posts.find(p => p.frontmatter.featured) || posts[0]
  const remainingPosts = posts.filter(p => p.slug !== featuredPost?.slug)

  const meta = {
    title: `Blog | ${SITE_NAME}`,
    description: 'Tips, guides, and insights for LinkedIn content creators. Learn how to format, write, and optimize your LinkedIn posts for maximum engagement.',
    url: `${SITE_URL}/blog`,
    image: `${SITE_URL}/og-image.png`
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            LinkedIn Content Tips & Guides
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master LinkedIn content creation with our expert tips, formatting guides, and strategies for maximum engagement.
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-500">Browse by Category</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <CategoryBadge
                  key={category.slug}
                  category={category.name}
                  count={category.count}
                />
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Coming Soon
            </h2>
            <p className="text-gray-600">
              We're working on some great content. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12">
                <PostCard post={featuredPost} featured />
              </div>
            )}

            {/* Post Grid */}
            {remainingPosts.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingPosts.map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Newsletter CTA (placeholder) */}
        <div className="mt-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Get LinkedIn Tips in Your Inbox
          </h2>
          <p className="text-primary-100 mb-6 max-w-xl mx-auto">
            Join our newsletter for weekly tips on creating engaging LinkedIn content, formatting tricks, and growth strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
