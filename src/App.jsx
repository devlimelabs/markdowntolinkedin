import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Copy, Download, Mail, Settings, FileText, Smartphone, Monitor, CheckCircle, AlertCircle, HelpCircle, Share2, Wand2, Undo, Redo } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import SideGuide from '@/components/SideGuide.jsx'
import FormattingToolbar from '@/components/FormattingToolbar.jsx'
import ContextMenu from '@/components/ContextMenu.jsx'
import { logCopyToClipboard, logDownloadText, logEmailToSelf, logFileDropped, logShareClicked, logPageView } from '@/lib/firebase.js'
import { htmlToMarkdown, isMarkdown } from '@/lib/htmlToMarkdown.js'
import { UndoRedoManager } from '@/lib/undoRedoManager.js'
import { formatBold, formatItalic, formatStrikethrough, formatLink, formatBulletList, formatNumberedList, formatCode, formatBlockquote } from '@/lib/textFormatting.js'
import './App.css'

// Unicode character mappings for LinkedIn formatting
const unicodeMap = {
  bold: {
    'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷', 'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁', 'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
    'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝', 'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧', 'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
    '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
  },
  italic: {
    'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫', 'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵', 'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻',
    'A': '𝘈', 'B': '𝘉', 'C': '𝘊', 'D': '𝘋', 'E': '𝘌', 'F': '𝘍', 'G': '𝘎', 'H': '𝘏', 'I': '𝘐', 'J': '𝘑', 'K': '𝘒', 'L': '𝘓', 'M': '𝘔', 'N': '𝘕', 'O': '𝘖', 'P': '𝘗', 'Q': '𝘘', 'R': '𝘙', 'S': '𝘚', 'T': '𝘛', 'U': '𝘜', 'V': '𝘝', 'W': '𝘞', 'X': '𝘟', 'Y': '𝘠', 'Z': '𝘡'
  }
}

// Convert text to Unicode formatting
function convertToUnicode(text, style) {
  if (!unicodeMap[style]) return text
  return text.split('').map(char => unicodeMap[style][char] || char).join('')
}

// Parse and convert Markdown to LinkedIn format
function convertMarkdownToLinkedIn(markdown) {
  let result = markdown

  // Convert headers
  result = result.replace(/^### (.*$)/gm, (match, text) => `**${convertToUnicode(text, 'bold')}**`)
  result = result.replace(/^## (.*$)/gm, (match, text) => `**${convertToUnicode(text, 'bold')}**`)
  result = result.replace(/^# (.*$)/gm, (match, text) => `**${convertToUnicode(text, 'bold')}**`)

  // Convert bold text
  result = result.replace(/\*\*(.*?)\*\*/g, (match, text) => convertToUnicode(text, 'bold'))

  // Convert italic text
  result = result.replace(/\*(.*?)\*/g, (match, text) => convertToUnicode(text, 'italic'))

  // Convert strikethrough
  result = result.replace(/~~(.*?)~~/g, (match, text) => {
    return text.split('').map(char => char + '̶').join('')
  })

  // Convert bullet lists
  result = result.replace(/^[\s]*[-*+] (.*$)/gm, '● $1')

  // Convert numbered lists
  result = result.replace(/^[\s]*(\d+)\. (.*$)/gm, '$1. $2')

  // Convert links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')

  // Convert blockquotes
  result = result.replace(/^> (.*$)/gm, (match, text) => `${convertToUnicode(text, 'italic')}`)

  // Convert code blocks (inline)
  result = result.replace(/`([^`]+)`/g, '$1')

  return result
}

function App() {
  const [markdown, setMarkdown] = useState(`# Welcome to LinkedIn Markdown Formatter

Transform your **Markdown** content into *LinkedIn-ready* formatted text!

## Key Features

- **Bold text** formatting
- *Italic text* emphasis  
- ~~Strikethrough~~ text
- Bullet point lists
- Numbered lists
- [Link formatting](https://example.com)

## How to Use

1. Paste your Markdown content
2. See the live preview
3. Copy the formatted result
4. Paste into LinkedIn

> This tool makes LinkedIn posting effortless!`)

  const [linkedInText, setLinkedInText] = useState('')
  const [viewMode, setViewMode] = useState('desktop')
  const [copySuccess, setCopySuccess] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [autoConvert, setAutoConvert] = useState(true)
  const [lastAutoConverted, setLastAutoConverted] = useState(false)
  const [, forceUpdate] = useState({})
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 })
  
  // Refs
  const textareaRef = useRef(null)
  const undoRedoManagerRef = useRef(new UndoRedoManager())
  const lastValueRef = useRef(markdown)

  // Log page view on mount
  useEffect(() => {
    logPageView()
    // Save initial state
    undoRedoManagerRef.current.saveState(markdown, 0, 0)
  }, [])

  // Convert markdown to LinkedIn format whenever input changes
  useEffect(() => {
    const converted = convertMarkdownToLinkedIn(markdown)
    setLinkedInText(converted)
    
    // Save state for undo/redo
    if (textareaRef.current && markdown !== lastValueRef.current) {
      const { selectionStart, selectionEnd } = textareaRef.current
      if (undoRedoManagerRef.current.shouldSaveState()) {
        undoRedoManagerRef.current.saveState(markdown, selectionStart, selectionEnd)
      }
      lastValueRef.current = markdown
      // Force update to refresh toolbar button states
      forceUpdate({})
    }
  }, [markdown])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const textarea = textareaRef.current
      if (!textarea) return
      
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const isCtrlCmd = isMac ? e.metaKey : e.ctrlKey
      
      // Press ? or Ctrl+/ to open guide
      if ((e.key === '?' && !e.ctrlKey && !e.metaKey) || (e.key === '/' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault()
        setIsGuideOpen(true)
        return
      }
      
      // Only handle shortcuts when textarea is focused
      if (document.activeElement !== textarea) return
      
      // Undo/Redo
      if (isCtrlCmd && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        const state = undoRedoManagerRef.current.undo()
        if (state) {
          setMarkdown(state.value)
          setTimeout(() => {
            textarea.setSelectionRange(state.selectionStart, state.selectionEnd)
            textarea.focus()
          }, 0)
        }
        return
      }
      
      if ((isCtrlCmd && e.key === 'z' && e.shiftKey) || (isCtrlCmd && e.key === 'y')) {
        e.preventDefault()
        const state = undoRedoManagerRef.current.redo()
        if (state) {
          setMarkdown(state.value)
          setTimeout(() => {
            textarea.setSelectionRange(state.selectionStart, state.selectionEnd)
            textarea.focus()
          }, 0)
        }
        return
      }
      
      // Formatting shortcuts
      if (isCtrlCmd) {
        const { selectionStart, selectionEnd, value } = textarea
        let result = null
        
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault()
            result = formatBold(value, selectionStart, selectionEnd)
            break
          case 'i':
            e.preventDefault()
            result = formatItalic(value, selectionStart, selectionEnd)
            break
          case 'k':
            e.preventDefault()
            result = formatLink(value, selectionStart, selectionEnd)
            break
          case 's':
            if (e.shiftKey) {
              e.preventDefault()
              result = formatStrikethrough(value, selectionStart, selectionEnd)
            }
            break
        }
        
        if (result) {
          setMarkdown(result.text)
          setTimeout(() => {
            textarea.setSelectionRange(result.newSelectionStart, result.newSelectionEnd)
            textarea.focus()
          }, 0)
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(linkedInText)
      setCopySuccess(true)
      logCopyToClipboard(true)
      toast.success('Copied to clipboard!')
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      logCopyToClipboard(false)
      toast.error('Failed to copy text')
    }
  }

  // Handle file download
  const handleDownload = () => {
    const blob = new Blob([linkedInText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'linkedin-post.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    logDownloadText()
    toast.success('File downloaded!')
  }

  // Handle email
  const handleEmail = () => {
    const subject = encodeURIComponent('LinkedIn Post Content')
    const body = encodeURIComponent(linkedInText)
    window.open(`mailto:?subject=${subject}&body=${body}`)
    logEmailToSelf()
  }

  // Handle file drop
  const handleFileDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const mdFile = files.find(file => file.name.endsWith('.md') || file.type === 'text/markdown')
    
    if (mdFile) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setMarkdown(e.target.result)
        logFileDropped()
        toast.success('Markdown file loaded!')
      }
      reader.readAsText(mdFile)
    } else {
      toast.error('Please drop a Markdown (.md) file')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }
  
  // Handle context menu
  const handleContextMenu = (e) => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    // Only show context menu if there's selected text
    const { selectionStart, selectionEnd } = textarea
    if (selectionStart !== selectionEnd) {
      e.preventDefault()
      setContextMenu({
        isOpen: true,
        x: e.clientX,
        y: e.clientY
      })
    }
  }
  
  const handleContextMenuAction = (action) => {
    const textarea = textareaRef.current
    if (!textarea) return
    
    const { selectionStart, selectionEnd, value } = textarea
    let result = null
    
    switch (action) {
      case 'bold':
        result = formatBold(value, selectionStart, selectionEnd)
        break
      case 'italic':
        result = formatItalic(value, selectionStart, selectionEnd)
        break
      case 'strikethrough':
        result = formatStrikethrough(value, selectionStart, selectionEnd)
        break
      case 'link':
        const url = prompt('Enter URL:', 'https://')
        if (!url) return
        result = formatLink(value, selectionStart, selectionEnd, url)
        break
      case 'bulletList':
        result = formatBulletList(value, selectionStart, selectionEnd)
        break
      case 'numberedList':
        result = formatNumberedList(value, selectionStart, selectionEnd)
        break
      case 'quote':
        result = formatBlockquote(value, selectionStart, selectionEnd)
        break
      case 'code':
        result = formatCode(value, selectionStart, selectionEnd)
        break
    }
    
    if (result) {
      setMarkdown(result.text)
      setTimeout(() => {
        textarea.setSelectionRange(result.newSelectionStart, result.newSelectionEnd)
        textarea.focus()
      }, 0)
    }
  }

  // Handle paste event for auto-conversion
  const handlePaste = async (e) => {
    if (!autoConvert) return
    
    // Prevent default paste
    e.preventDefault()
    
    // Try to get HTML content first
    const clipboardData = e.clipboardData || window.clipboardData
    const htmlData = clipboardData.getData('text/html')
    const textData = clipboardData.getData('text/plain')
    
    if (htmlData && !isMarkdown(textData)) {
      // Convert HTML to Markdown
      const convertedMarkdown = htmlToMarkdown(htmlData)
      setMarkdown(convertedMarkdown)
      setLastAutoConverted(true)
      toast.success('Auto-converted from rich text to Markdown!', {
        icon: <Wand2 className="w-4 h-4" />
      })
    } else {
      // Just paste as plain text
      setMarkdown(textData)
      setLastAutoConverted(false)
    }
  }

  const characterCount = linkedInText.length
  const linkedInLimit = 3000
  const isOverLimit = characterCount > linkedInLimit

  // Handle share
  const handleShare = async (platform) => {
    const shareUrl = 'https://markdowntolinkedin.com/'
    const shareText = 'Check out this free LinkedIn Markdown Formatter - Convert your Markdown to beautifully formatted LinkedIn posts!'
    
    logShareClicked(platform)
    
    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast.success('Link copied to clipboard!')
      } catch (err) {
        toast.error('Failed to copy link')
      }
    } else if (navigator.share) {
      // Use Web Share API if available
      try {
        await navigator.share({
          title: 'LinkedIn Markdown Formatter',
          text: shareText,
          url: shareUrl
        })
      } catch (err) {
        // User cancelled or error
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            LinkedIn Markdown Formatter
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Convert your Markdown documents to LinkedIn-ready formatted text
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">Full Markdown Support</Badge>
            <Badge variant="secondary">Live Preview</Badge>
            <Badge variant="secondary">One-Click Copy</Badge>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6" style={{ minHeight: '600px' }}>
          {/* Input Section */}
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Markdown Input
                  {lastAutoConverted && (
                    <Badge variant="secondary" className="text-xs">
                      <Wand2 className="w-3 h-3 mr-1" />
                      Auto-converted
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setAutoConvert(!autoConvert)}
                    variant={autoConvert ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-2"
                    title="Toggle auto-conversion of pasted rich text"
                  >
                    <Wand2 className="w-4 h-4" />
                    {autoConvert ? 'Auto' : 'Manual'}
                  </Button>
                  <Button
                    onClick={() => setIsGuideOpen(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4" />
                    Guide
                    <kbd className="ml-1 px-1 py-0.5 text-xs bg-gray-100 border rounded">?</kbd>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="relative"
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
              >
                <div className="border rounded-lg overflow-hidden">
                  <FormattingToolbar
                    textareaRef={textareaRef}
                    value={markdown}
                    onChange={setMarkdown}
                    undoRedoManager={undoRedoManagerRef.current}
                  />
                  <Textarea
                    ref={textareaRef}
                    value={markdown}
                    onChange={(e) => {
                      setMarkdown(e.target.value)
                      setLastAutoConverted(false)
                    }}
                    onPaste={handlePaste}
                    onContextMenu={handleContextMenu}
                    placeholder={autoConvert ? "Paste anything here - text, formatted content from Word/Google Docs, or Markdown..." : "Paste your Markdown content here or drag & drop a .md file..."}
                    className="min-h-[500px] font-mono text-sm resize-none border-0 rounded-t-none"
                  />
                </div>
                <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  {markdown.length} characters
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• {autoConvert ? 'Paste from Word, Google Docs, or any website - auto-converts to Markdown!' : 'Use **bold** for emphasis and key points'}</li>
                  <li>• Use *italics* for quotes and subtle emphasis</li>
                  <li>• Headers become bold formatted text</li>
                  <li>• Lists are converted to bullet points</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  LinkedIn Preview
                </CardTitle>
                <Tabs value={viewMode} onValueChange={setViewMode}>
                  <TabsList>
                    <TabsTrigger value="desktop" className="flex items-center gap-1">
                      <Monitor className="w-4 h-4" />
                      Desktop
                    </TabsTrigger>
                    <TabsTrigger value="mobile" className="flex items-center gap-1">
                      <Smartphone className="w-4 h-4" />
                      Mobile
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`bg-white border rounded-lg p-4 ${viewMode === 'mobile' ? 'max-w-sm mx-auto' : ''}`}>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    You
                  </div>
                  <div>
                    <div className="font-semibold">Your Name</div>
                    <div className="text-sm text-gray-500">Your Title • Now</div>
                  </div>
                </div>
                <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                  {linkedInText || 'Your formatted content will appear here...'}
                </div>
                <div className="mt-4 pt-3 border-t flex items-center gap-4 text-sm text-gray-500">
                  <span>👍 Like</span>
                  <span>💬 Comment</span>
                  <span>🔄 Repost</span>
                  <span>📤 Send</span>
                </div>
              </div>
              
              {/* Character Count */}
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className={`flex items-center gap-2 ${isOverLimit ? 'text-red-600' : 'text-green-600'}`}>
                  {isOverLimit ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  <span>
                    {characterCount} / {linkedInLimit} characters
                  </span>
                </div>
                {isOverLimit && (
                  <Badge variant="destructive">Over LinkedIn limit</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={handleCopy} 
                className="flex items-center gap-2"
                size="lg"
              >
                {copySuccess ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
              </Button>
              
              <Button 
                onClick={handleDownload} 
                variant="outline"
                className="flex items-center gap-2"
                size="lg"
              >
                <Download className="w-4 h-4" />
                Download Text
              </Button>
              
              <Button 
                onClick={handleEmail} 
                variant="outline"
                className="flex items-center gap-2"
                size="lg"
              >
                <Mail className="w-4 h-4" />
                Email to Self
              </Button>
              
              <Button 
                onClick={() => navigator.share ? handleShare('native') : handleShare('linkedin')} 
                variant="outline"
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
                size="lg"
              >
                <Share2 className="w-4 h-4" />
                Share This Tool
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">
            Made with ❤️ for LinkedIn content creators • 
            <a href="https://www.linkedin.com/in/john-pribesh-61892027/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
              Report Issues
            </a>
          </p>
        </div>
      </div>
      <Toaster />
      <SideGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <ContextMenu
        isOpen={contextMenu.isOpen}
        position={{ x: contextMenu.x, y: contextMenu.y }}
        onClose={() => setContextMenu({ isOpen: false, x: 0, y: 0 })}
        onAction={handleContextMenuAction}
      />
    </div>
  )
}

export default App

