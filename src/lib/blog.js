// Simple browser-compatible frontmatter parser
// Replaces 'gray-matter' which uses Node.js Buffer
function parseFrontmatter(rawContent) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/
  const match = rawContent.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content: rawContent }
  }

  const frontmatterStr = match[1]
  const content = match[2]
  const data = {}

  // Parse YAML-like frontmatter (simple key: value pairs)
  const lines = frontmatterStr.split('\n')
  let currentKey = null
  let arrayValues = []

  for (const line of lines) {
    // Check for array item (starts with -)
    const arrayMatch = line.match(/^\s*-\s*(.+)$/)
    if (arrayMatch && currentKey) {
      // Remove quotes if present
      let value = arrayMatch[1].trim()
      value = value.replace(/^["']|["']$/g, '')
      arrayValues.push(value)
      continue
    }

    // If we were building an array, save it
    if (currentKey && arrayValues.length > 0) {
      data[currentKey] = arrayValues
      arrayValues = []
      currentKey = null
    }

    // Check for key: value pair
    const keyValueMatch = line.match(/^(\w+):\s*(.*)$/)
    if (keyValueMatch) {
      const key = keyValueMatch[1]
      let value = keyValueMatch[2].trim()

      // Check if this starts an array (empty value or [])
      if (value === '' || value === '[]') {
        currentKey = key
        arrayValues = []
        // Handle inline array like tags: ["a", "b"]
        if (value.startsWith('[') && value.endsWith(']')) {
          const items = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''))
          data[key] = items.filter(s => s.length > 0)
          currentKey = null
        }
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline array
        const items = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''))
        data[key] = items.filter(s => s.length > 0)
      } else {
        // Regular value - remove quotes if present
        value = value.replace(/^["']|["']$/g, '')
        data[key] = value
      }
    }
  }

  // Don't forget any trailing array
  if (currentKey && arrayValues.length > 0) {
    data[currentKey] = arrayValues
  }

  return { data, content }
}

// Simple browser-compatible reading time calculator
// Replaces 'reading-time' package which uses Node.js-specific modules
function calculateReadingTime(content) {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).filter(word => word.length > 0).length
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute))
  return { text: `${minutes} min read`, minutes }
}

// Site configuration
export const SITE_URL = 'https://markdowntolinkedin.com'
export const SITE_NAME = 'Markdown to LinkedIn'

// Import all markdown files from the content/blog directory
// This uses Vite's glob import feature
const blogModules = import.meta.glob('/src/content/blog/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

/**
 * Parse a single markdown file and extract frontmatter + content
 */
function parseMarkdownFile(filePath, rawContent) {
  const { data: frontmatter, content } = parseFrontmatter(rawContent)

  // Extract slug from filename
  const filename = filePath.split('/').pop()
  const slug = filename.replace('.md', '')

  // Calculate reading time
  const stats = calculateReadingTime(content)

  // lastUpdated defaults to date if not specified
  const publishDate = frontmatter.date || new Date().toISOString().split('T')[0]
  const lastUpdated = frontmatter.lastUpdated || publishDate

  return {
    slug,
    frontmatter: {
      title: frontmatter.title || 'Untitled',
      date: publishDate,
      lastUpdated: lastUpdated,
      category: frontmatter.category || 'general',
      tags: frontmatter.tags || [],
      excerpt: frontmatter.excerpt || content.slice(0, 160).replace(/[#*`]/g, '').trim() + '...',
      coverImage: frontmatter.coverImage || null,
      author: frontmatter.author || 'Anonymous',
      ...frontmatter
    },
    content,
    readingTime: stats.text,
    readingTimeMinutes: Math.ceil(stats.minutes)
  }
}

/**
 * Get all blog posts, sorted by date (newest first)
 */
export function getAllPosts() {
  const posts = Object.entries(blogModules).map(([path, content]) => {
    return parseMarkdownFile(path, content)
  })

  // Sort by date, newest first
  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  })
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug) {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

/**
 * Get all unique categories with post counts
 */
export function getAllCategories() {
  const posts = getAllPosts()
  const categoryMap = new Map()

  posts.forEach(post => {
    const category = post.frontmatter.category
    if (categoryMap.has(category)) {
      categoryMap.set(category, categoryMap.get(category) + 1)
    } else {
      categoryMap.set(category, 1)
    }
  })

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count, slug: name.toLowerCase().replace(/\s+/g, '-') }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get all unique tags with post counts
 */
export function getAllTags() {
  const posts = getAllPosts()
  const tagMap = new Map()

  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => {
      if (tagMap.has(tag)) {
        tagMap.set(tag, tagMap.get(tag) + 1)
      } else {
        tagMap.set(tag, 1)
      }
    })
  })

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count, slug: name.toLowerCase().replace(/\s+/g, '-') }))
    .sort((a, b) => b.count - a.count)
}

/**
 * Get posts by category
 */
export function getPostsByCategory(categorySlug) {
  const posts = getAllPosts()
  return posts.filter(post => {
    const postCategorySlug = post.frontmatter.category.toLowerCase().replace(/\s+/g, '-')
    return postCategorySlug === categorySlug
  })
}

/**
 * Get posts by tag
 */
export function getPostsByTag(tagSlug) {
  const posts = getAllPosts()
  return posts.filter(post => {
    return post.frontmatter.tags.some(tag =>
      tag.toLowerCase().replace(/\s+/g, '-') === tagSlug
    )
  })
}

/**
 * Get related posts (same category, excluding current post)
 */
export function getRelatedPosts(currentSlug, limit = 3) {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  const posts = getAllPosts()
  const relatedPosts = posts
    .filter(post =>
      post.slug !== currentSlug &&
      post.frontmatter.category === currentPost.frontmatter.category
    )
    .slice(0, limit)

  // If not enough related posts, fill with recent posts from other categories
  if (relatedPosts.length < limit) {
    const additionalPosts = posts
      .filter(post =>
        post.slug !== currentSlug &&
        !relatedPosts.some(rp => rp.slug === post.slug)
      )
      .slice(0, limit - relatedPosts.length)

    relatedPosts.push(...additionalPosts)
  }

  return relatedPosts
}

/**
 * Get all post slugs (for SSG route generation)
 */
export function getAllPostSlugs() {
  return getAllPosts().map(post => post.slug)
}

/**
 * Get all category slugs (for SSG route generation)
 */
export function getAllCategorySlugs() {
  return getAllCategories().map(cat => cat.slug)
}

/**
 * Format date for display
 */
export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Generate OG meta tags for a blog post
 */
export function getPostMeta(post) {
  const url = `${SITE_URL}/blog/${post.slug}`
  const image = post.frontmatter.coverImage
    ? (post.frontmatter.coverImage.startsWith('http')
        ? post.frontmatter.coverImage
        : `${SITE_URL}${post.frontmatter.coverImage}`)
    : `${SITE_URL}/og-image.png`

  return {
    title: `${post.frontmatter.title} | ${SITE_NAME} Blog`,
    description: post.frontmatter.excerpt,
    url,
    image,
    type: 'article',
    publishedTime: post.frontmatter.date,
    modifiedTime: post.frontmatter.lastUpdated,
    author: post.frontmatter.author,
    category: post.frontmatter.category,
    tags: post.frontmatter.tags
  }
}

/**
 * Generate OG meta tags for a category page
 */
export function getCategoryMeta(categorySlug, posts) {
  const categoryName = categorySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${categoryName} Articles | ${SITE_NAME} Blog`,
    description: `Browse ${posts.length} article${posts.length !== 1 ? 's' : ''} about ${categoryName}. Tips, guides, and insights for LinkedIn content creators.`,
    url: `${SITE_URL}/blog/category/${categorySlug}`,
    image: `${SITE_URL}/og-image.png`,
    type: 'website'
  }
}
