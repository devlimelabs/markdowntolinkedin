/**
 * Sitemap Generation Script
 *
 * Generates sitemap.xml with proper lastmod dates for all pages.
 * Runs after the build/prerender process.
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')
const CONTENT_DIR = path.join(ROOT_DIR, 'src/content/blog')

const SITE_URL = 'https://markdowntolinkedin.com'

/**
 * Simple frontmatter parser (mirrors blog.js logic)
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const frontmatter = {}
  const lines = match[1].split('\n')

  for (const line of lines) {
    const keyValueMatch = line.match(/^(\w+):\s*(.*)$/)
    if (keyValueMatch) {
      const key = keyValueMatch[1]
      let value = keyValueMatch[2].trim()
      value = value.replace(/^["']|["']$/g, '')
      frontmatter[key] = value
    }
  }

  return frontmatter
}

/**
 * Get blog post data from markdown files
 */
async function getBlogPostsData() {
  try {
    const files = await fs.readdir(CONTENT_DIR)
    const mdFiles = files.filter(f => f.endsWith('.md'))

    const posts = []
    const categories = new Set()

    for (const file of mdFiles) {
      const content = await fs.readFile(path.join(CONTENT_DIR, file), 'utf-8')
      const frontmatter = parseFrontmatter(content)
      const slug = file.replace('.md', '')

      // Get dates - lastUpdated defaults to date if not specified
      const publishDate = frontmatter.date || new Date().toISOString().split('T')[0]
      const lastUpdated = frontmatter.lastUpdated || publishDate

      posts.push({
        slug,
        date: publishDate,
        lastUpdated,
        category: frontmatter.category?.toLowerCase().replace(/\s+/g, '-')
      })

      if (frontmatter.category) {
        categories.add(frontmatter.category.toLowerCase().replace(/\s+/g, '-'))
      }
    }

    return { posts, categories: Array.from(categories) }
  } catch (err) {
    console.error('Error reading blog posts:', err)
    return { posts: [], categories: [] }
  }
}

/**
 * Format date for sitemap (YYYY-MM-DD format)
 */
function formatDateForSitemap(dateStr) {
  // If already in YYYY-MM-DD format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr
  }
  // Otherwise, try to parse and format
  const date = new Date(dateStr)
  return date.toISOString().split('T')[0]
}

/**
 * Generate sitemap XML
 */
async function generateSitemap() {
  console.log('🗺️  Generating sitemap...\n')

  const { posts, categories } = await getBlogPostsData()
  const today = new Date().toISOString().split('T')[0]

  // Find the most recent blog update for the blog index page
  const mostRecentBlogUpdate = posts.reduce((latest, post) => {
    return post.lastUpdated > latest ? post.lastUpdated : latest
  }, posts[0]?.lastUpdated || today)

  // Build URL entries
  const urls = []

  // Homepage (main app - use today's date or a fixed date)
  urls.push({
    loc: SITE_URL,
    lastmod: today,
    changefreq: 'weekly',
    priority: '1.0'
  })

  // Blog index page
  urls.push({
    loc: `${SITE_URL}/blog`,
    lastmod: mostRecentBlogUpdate,
    changefreq: 'daily',
    priority: '0.9'
  })

  // Individual blog posts
  for (const post of posts) {
    urls.push({
      loc: `${SITE_URL}/blog/${post.slug}`,
      lastmod: formatDateForSitemap(post.lastUpdated),
      changefreq: 'monthly',
      priority: '0.8'
    })
  }

  // Category pages - use the most recent post date in each category
  for (const category of categories) {
    const categoryPosts = posts.filter(p => p.category === category)
    const categoryLastmod = categoryPosts.reduce((latest, post) => {
      return post.lastUpdated > latest ? post.lastUpdated : latest
    }, categoryPosts[0]?.lastUpdated || today)

    urls.push({
      loc: `${SITE_URL}/blog/category/${category}`,
      lastmod: formatDateForSitemap(categoryLastmod),
      changefreq: 'weekly',
      priority: '0.7'
    })
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

  // Write sitemap to dist
  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml')
  await fs.writeFile(sitemapPath, xml)

  console.log(`   ✓ Generated sitemap with ${urls.length} URLs`)
  console.log(`   ✓ Saved to: dist/sitemap.xml`)
  console.log('')
  console.log('   URLs included:')
  urls.forEach(url => {
    console.log(`     - ${url.loc} (${url.lastmod})`)
  })
  console.log('')
}

// Run the generator
generateSitemap().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
