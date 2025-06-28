import { useState, useEffect } from 'react'
import { X, BookOpen, Accessibility } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { logGuideOpened } from '@/lib/firebase.js'

function SideGuide({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('markdown')

  // Track guide opened
  useEffect(() => {
    if (isOpen) {
      logGuideOpened(activeTab)
    }
  }, [isOpen, activeTab])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Formatting Guide</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="w-full rounded-none border-b">
                <TabsTrigger value="markdown" className="flex-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Markdown Syntax
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="flex-1 flex items-center gap-2">
                  <Accessibility className="w-4 h-4" />
                  Accessibility
                </TabsTrigger>
              </TabsList>

              {/* Markdown Guide Tab */}
              <TabsContent value="markdown" className="p-4 space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">📝 Markdown Syntax Guide</h3>
                  <p className="text-sm text-blue-800">
                    All markdown elements are converted to LinkedIn-compatible Unicode formatting
                  </p>
                </div>

                {/* Text Formatting */}
                <section>
                  <h4 className="font-semibold mb-3">Text Formatting</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded">**Bold text**</code>
                      <span className="font-bold">Bold text</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded">*Italic text*</code>
                      <span className="italic">Italic text</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded">~~Strikethrough~~</code>
                      <span className="line-through">Strikethrough</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded">`inline code`</code>
                      <code className="bg-gray-200 px-2 py-1 rounded text-xs">inline code</code>
                    </div>
                  </div>
                </section>

                {/* Headers */}
                <section>
                  <h4 className="font-semibold mb-3">Headers</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded"># H1 Heading</code>
                      <p className="text-xs text-gray-600 mt-1">Converts to bold text with extra emphasis</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded">## H2 Subheading</code>
                      <p className="text-xs text-gray-600 mt-1">Converts to bold text</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded">### H3 Section Header</code>
                      <p className="text-xs text-gray-600 mt-1">Converts to bold text</p>
                    </div>
                  </div>
                </section>

                {/* Lists */}
                <section>
                  <h4 className="font-semibold mb-3">Lists</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded block mb-2">- Bullet point 1</code>
                      <code className="bg-gray-200 px-2 py-1 rounded block mb-2">- Bullet point 2</code>
                      <p className="text-xs text-gray-600">Converts to: ● Bullet points with proper formatting</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded block mb-2">1. Numbered item</code>
                      <code className="bg-gray-200 px-2 py-1 rounded block mb-2">2. Numbered item</code>
                      <p className="text-xs text-gray-600">Preserves numbering</p>
                    </div>
                  </div>
                </section>

                {/* Links & Tables */}
                <section>
                  <h4 className="font-semibold mb-3">Links & Tables</h4>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-gray-50 rounded">
                      <code className="bg-gray-200 px-2 py-1 rounded">[Link text](https://example.com)</code>
                      <p className="text-xs text-gray-600 mt-1">Converts to: Link text (https://example.com)</p>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                      <p className="text-xs text-gray-600">Tables are converted to readable text format</p>
                    </div>
                  </div>
                </section>

                {/* Pro Tips */}
                <section className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">💡 Pro Tips</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Use headers sparingly - they create visual emphasis</li>
                    <li>• Bold text works best for key points</li>
                    <li>• Code blocks are great for sharing code snippets</li>
                    <li>• Lists help break up long content</li>
                    <li>• Always preview before posting to LinkedIn</li>
                  </ul>
                </section>
              </TabsContent>

              {/* Accessibility Tab */}
              <TabsContent value="accessibility" className="p-4 space-y-6">
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">♿ Accessibility & Screen Reader Support</h3>
                  <p className="text-sm text-amber-800">
                    Ensure your content is accessible to all users
                  </p>
                </div>

                {/* Unicode Limitations */}
                <section className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">⚠️ Unicode Formatting Limitations</h4>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li>• <strong>Screen Readers:</strong> May not correctly interpret Unicode mathematical symbols</li>
                    <li>• <strong>Search:</strong> LinkedIn's search may not recognize styled characters</li>
                    <li>• <strong>Copy/Paste:</strong> Formatting may not transfer correctly to other platforms</li>
                  </ul>
                </section>

                {/* Best Practices */}
                <section>
                  <h4 className="font-semibold mb-3">✅ Accessibility Best Practices</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded">
                      <h5 className="font-medium text-green-900">Use formatting sparingly</h5>
                      <p className="text-sm text-green-800 mt-1">Only for key emphasis</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h5 className="font-medium text-green-900">Provide context</h5>
                      <p className="text-sm text-green-800 mt-1">Ensure meaning is clear without formatting</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h5 className="font-medium text-green-900">Test with screen readers</h5>
                      <p className="text-sm text-green-800 mt-1">Check how your content sounds</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h5 className="font-medium text-green-900">Consider alternatives</h5>
                      <p className="text-sm text-green-800 mt-1">Use plain text version when needed</p>
                    </div>
                  </div>
                </section>

                {/* Accessibility Checklist */}
                <section>
                  <h4 className="font-semibold mb-3">📋 Accessibility Checklist</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      Key information is not conveyed only through formatting
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      Plain text version is available if needed
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      Content has been tested on multiple devices
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded" />
                      Formatting is used sparingly for emphasis only
                    </label>
                  </div>
                </section>

                {/* WCAG Guidelines */}
                <section className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">📘 WCAG Guidelines</h4>
                  <p className="text-sm text-blue-800 mb-2">
                    Our formatter aims to support Web Content Accessibility Guidelines (WCAG) 2.1
                  </p>
                  <div className="space-y-1">
                    <Badge variant="secondary" className="text-xs">Perceivable</Badge>
                    <Badge variant="secondary" className="text-xs">Operable</Badge>
                    <Badge variant="secondary" className="text-xs">Understandable</Badge>
                    <Badge variant="secondary" className="text-xs">Robust</Badge>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideGuide