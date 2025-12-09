/**
 * Prerender Script for Blog Static Site Generation
 *
 * This script:
 * 1. Assumes Vite build has already run
 * 2. Starts a local preview server
 * 3. Uses Puppeteer to render each blog page
 * 4. Extracts the HTML with proper meta tags
 * 5. Saves static HTML files to dist/
 */

import { preview } from 'vite'
import puppeteer from 'puppeteer'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, '..')
const DIST_DIR = path.join(ROOT_DIR, 'dist')

// Get blog routes from markdown files
async function getBlogRoutes() {
  const contentDir = path.join(ROOT_DIR, 'src/content/blog')

  try {
    const files = await fs.readdir(contentDir)
    const mdFiles = files.filter(f => f.endsWith('.md'))

    const posts = []
    const categories = new Set()

    for (const file of mdFiles) {
      const content = await fs.readFile(path.join(contentDir, file), 'utf-8')
      const slug = file.replace('.md', '')

      // Simple frontmatter extraction
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
      if (frontmatterMatch) {
        const categoryMatch = frontmatterMatch[1].match(/category:\s*["']?([^"'\n]+)["']?/)
        if (categoryMatch) {
          categories.add(categoryMatch[1].toLowerCase().replace(/\s+/g, '-'))
        }
      }

      posts.push(slug)
    }

    return {
      posts,
      categories: Array.from(categories)
    }
  } catch (err) {
    console.error('Error reading blog content:', err)
    return { posts: [], categories: [] }
  }
}

async function prerender() {
  console.log('🚀 Starting prerender process...\n')

  // Get blog routes
  const { posts, categories } = await getBlogRoutes()

  // Build the list of routes to prerender
  const routes = [
    '/blog',
    ...posts.map(slug => `/blog/${slug}`),
    ...categories.map(cat => `/blog/category/${cat}`)
  ]

  console.log(`📝 Found ${posts.length} blog posts`)
  console.log(`📁 Found ${categories.length} categories`)
  console.log(`🔗 Total routes to prerender: ${routes.length}\n`)

  // Start Vite preview server (serves from dist/)
  console.log('🖥️  Starting preview server...')
  const server = await preview({
    root: ROOT_DIR,
    preview: {
      port: 4173,
      strictPort: true
    }
  })

  const serverUrl = 'http://localhost:4173'
  console.log(`   Server running at ${serverUrl}\n`)

  // Launch Puppeteer
  console.log('🎭 Launching browser...')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 })

    // Collect console messages for debugging
    const consoleMessages = []
    page.on('console', msg => {
      consoleMessages.push(`${msg.type()}: ${msg.text()}`)
    })

    page.on('pageerror', err => {
      console.error('   Page error:', err.message)
    })

    for (const route of routes) {
      consoleMessages.length = 0 // Clear for each route
      console.log(`   Rendering: ${route}`)

      const url = `${serverUrl}${route}`

      try {
        // Navigate and wait for network to be idle
        await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 30000
        })

        // Wait for React to render by checking for content in #root
        await page.waitForFunction(
          () => {
            const root = document.getElementById('root')
            return root && root.children.length > 0
          },
          { timeout: 10000 }
        )

        // Additional wait for any async content
        await new Promise(resolve => setTimeout(resolve, 2000))

        // Get the full HTML
        const html = await page.content()

        // Verify we have actual content
        const hasContent = await page.evaluate(() => {
          const root = document.getElementById('root')
          return root && root.innerHTML.length > 100
        })

        if (!hasContent) {
          console.error(`   ⚠ Warning: ${route} may not have rendered properly`)
          // Log console messages for debugging
          if (consoleMessages.length > 0) {
            console.error('   Console output:', consoleMessages.slice(0, 5).join('\n   '))
          }
        }

        // Determine the output path
        let outputPath
        if (route === '/blog') {
          outputPath = path.join(DIST_DIR, 'blog', 'index.html')
        } else {
          outputPath = path.join(DIST_DIR, route, 'index.html')
        }

        // Ensure directory exists
        await fs.mkdir(path.dirname(outputPath), { recursive: true })

        // Write the HTML file
        await fs.writeFile(outputPath, html)
        console.log(`   ✓ Saved: ${outputPath.replace(DIST_DIR, 'dist')}`)
      } catch (err) {
        console.error(`   ✗ Error rendering ${route}:`, err.message)
        // Log console messages for debugging
        if (consoleMessages.length > 0) {
          console.error('   Console output:', consoleMessages.slice(0, 10).join('\n   '))
        }
      }
    }

    console.log('\n✅ Prerendering complete!')
    console.log(`   Generated ${routes.length} static HTML files\n`)

  } catch (err) {
    console.error('❌ Prerender error:', err)
    process.exit(1)
  } finally {
    await browser.close()
    server.httpServer.close()
  }
}

// Run the prerender
prerender().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
