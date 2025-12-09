import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import {
  Share2,
  Link as LinkIcon,
  Twitter,
  Linkedin,
  Facebook,
  Check
} from 'lucide-react'
import { toast } from 'sonner'

export default function ShareButtons({ url, title, description }) {
  const [copied, setCopied] = useState(false)

  const shareUrl = url || window.location.href
  const shareTitle = title || document.title
  const shareDescription = description || ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  const handleShare = (platform) => {
    let shareLink = ''

    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: shareTitle,
            text: shareDescription,
            url: shareUrl
          }).catch(() => {})
          return
        }
        break
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 mr-1">Share:</span>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopyLink}
        className="text-gray-600 hover:text-primary-600 hover:bg-primary-50"
        title="Copy link"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="text-gray-600 hover:text-[#1DA1F2] hover:bg-blue-50"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="text-gray-600 hover:text-[#0A66C2] hover:bg-blue-50"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="text-gray-600 hover:text-[#1877F2] hover:bg-blue-50"
        title="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </Button>

      {navigator.share && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleShare('native')}
          className="text-gray-600 hover:text-primary-600 hover:bg-primary-50"
          title="More sharing options"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
