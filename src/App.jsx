import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { FileText, Share2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import Home from '@/pages/Home.jsx'
import Blog from '@/pages/blog/index.jsx'
import BlogPost from '@/pages/blog/[slug].jsx'
import CategoryPage from '@/pages/blog/category/[category].jsx'
import './App.css'

// Default meta tags for the main app
const defaultMeta = {
  title: 'Markdown to LinkedIn | Free LinkedIn Post Formatter',
  description: 'Transform your Markdown content into beautifully formatted LinkedIn posts. Free online tool with real-time preview, copy to clipboard, and more.',
  image: 'https://markdowntolinkedin.com/og-image.png',
  url: 'https://markdowntolinkedin.com'
}

function Layout({ children }) {
  const location = useLocation()
  const isBlogPage = location.pathname.startsWith('/blog')

  const handleShare = (platform) => {
    const shareUrl = 'https://markdowntolinkedin.com/'
    const shareText = 'Check out this free LinkedIn Markdown Formatter!'

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Markdown to LinkedIn
                </h1>
                <p className="text-sm text-gray-600">Transform your content into engaging social media posts</p>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/blog">
                <Button
                  variant={isBlogPage ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center gap-2 ${isBlogPage ? 'bg-gradient-primary text-white' : 'text-gray-600 hover:text-primary-700'}`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="hidden sm:inline">Blog</span>
                </Button>
              </Link>
              {!isBlogPage && (
                <Badge variant="outline" className="bg-gradient-primary text-white border-0">
                  LinkedIn Mode
                </Badge>
              )}
              <Button
                onClick={() => handleShare('linkedin')}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-primary-700"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Helmet>
          <title>{defaultMeta.title}</title>
          <meta name="description" content={defaultMeta.description} />
          <meta property="og:title" content={defaultMeta.title} />
          <meta property="og:description" content={defaultMeta.description} />
          <meta property="og:image" content={defaultMeta.image} />
          <meta property="og:url" content={defaultMeta.url} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={defaultMeta.title} />
          <meta name="twitter:description" content={defaultMeta.description} />
          <meta name="twitter:image" content={defaultMeta.image} />
          <link rel="canonical" href={defaultMeta.url} />
        </Helmet>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/blog/category/:category" element={<CategoryPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
