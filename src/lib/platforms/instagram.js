import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'
import { convertToUnicode } from '../unicodeConverter.js'

// Instagram platform configuration
export const instagramPlatform = createPlatform({
  id: PlatformIds.INSTAGRAM,
  name: 'Instagram',
  icon: 'instagram',
  color: '#E4405F',
  
  limits: {
    caption: 2200,
    captionTruncate: 125, // "more" button appears
    bio: 150,
    username: 30,
    displayName: 30,
    hashtags: 30, // per post
    hashtagLength: 100, // per hashtag
    mentions: 30, // soft limit
    storyText: 2200, // but keep it short
    reelCaption: 2200,
    commentLength: 2200,
    dmLength: 1000,
    altText: 100
  },
  
  features: {
    [PlatformFeatures.BOLD]: { supported: 'unicode', native: false },
    [PlatformFeatures.ITALIC]: { supported: 'unicode', native: false },
    [PlatformFeatures.STRIKETHROUGH]: { supported: 'unicode', native: false },
    [PlatformFeatures.UNDERLINE]: { supported: 'unicode', native: false },
    [PlatformFeatures.CODE]: { supported: false },
    [PlatformFeatures.CODE_BLOCK]: { supported: false },
    [PlatformFeatures.HEADERS]: { supported: false },
    [PlatformFeatures.LISTS]: { supported: 'manual', native: false },
    [PlatformFeatures.NUMBERED_LISTS]: { supported: 'manual', native: false },
    [PlatformFeatures.LINKS]: { supported: 'bio-only', native: false },
    [PlatformFeatures.MENTIONS]: { supported: true, native: true },
    [PlatformFeatures.HASHTAGS]: { supported: true, native: true },
    [PlatformFeatures.BLOCKQUOTE]: { supported: false },
    [PlatformFeatures.TABLES]: { supported: false },
    [PlatformFeatures.IMAGES]: { supported: true, native: true, limit: 10 },
    [PlatformFeatures.VIDEOS]: { supported: true, native: true },
    [PlatformFeatures.POLLS]: { supported: false }
  },
  
  formatter: (markdown) => {
    let result = markdown
    
    // Remove headers - not supported
    result = result.replace(/^#{1,6}\s+(.*$)/gm, '$1')
    
    // Convert bold text to Unicode
    result = result.replace(/\*\*(.*?)\*\*/g, (match, text) => convertToUnicode(text, 'bold'))
    
    // Convert italic text to Unicode
    result = result.replace(/\*(.*?)\*/g, (match, text) => convertToUnicode(text, 'italic'))
    
    // Convert strikethrough to Unicode
    result = result.replace(/~~(.*?)~~/g, (match, text) => convertToUnicode(text, 'strikethrough'))
    
    // Convert underline
    result = result.replace(/__(.*?)__/g, (match, text) => convertToUnicode(text, 'underline'))
    
    // Simple bullet lists
    result = result.replace(/^[\s]*[-*+] (.*$)/gm, '• $1')
    
    // Numbered lists
    result = result.replace(/^[\s]*(\d+)\. (.*$)/gm, '$1. $2')
    
    // Links - warn that they won't be clickable
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 (link in bio)')
    
    // Remove blockquotes
    result = result.replace(/^>\s+(.*$)/gm, '$1')
    
    // Remove code blocks and inline code
    result = result.replace(/```[\s\S]*?```/g, (match) => {
      return match.replace(/```\w*\n?/g, '').trim()
    })
    result = result.replace(/`([^`]+)`/g, '$1')
    
    // Add line breaks for Instagram formatting
    result = result.replace(/\n\n/g, '\n.\n') // Instagram hack for paragraph spacing
    
    return result
  },
  
  validator: (text) => {
    const errors = []
    const warnings = []
    
    if (text.length > instagramPlatform.limits.caption) {
      errors.push(`Caption exceeds Instagram's ${instagramPlatform.limits.caption} character limit`)
    }
    
    if (text.length > instagramPlatform.limits.captionTruncate) {
      warnings.push(`Only first ${instagramPlatform.limits.captionTruncate} characters will be visible without clicking "more"`)
    }
    
    // Count hashtags
    const hashtags = text.match(/#\w+/g) || []
    if (hashtags.length > instagramPlatform.limits.hashtags) {
      errors.push(`Instagram allows maximum ${instagramPlatform.limits.hashtags} hashtags per post`)
    }
    
    if (hashtags.length > 11) {
      warnings.push('Using more than 11 hashtags can reduce reach')
    }
    
    // Check for links
    if (text.match(/https?:\/\/[^\s]+/)) {
      warnings.push('Links in captions are not clickable - use "link in bio" strategy')
    }
    
    // Check for unsupported features
    if (text.includes('```')) {
      warnings.push('Code blocks are not supported on Instagram')
    }
    
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      warnings.push('Tables are not supported on Instagram')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-white',
    headerClass: 'instagram-header',
    contentClass: 'instagram-content',
    showProfilePic: true,
    showEngagement: true,
    mobileFirst: true
  },
  
  tips: [
    'Put important info in first 125 characters',
    'Use 5-11 relevant hashtags for best reach',
    'Add hashtags in first comment to keep caption clean',
    'Use line breaks (dots) for better readability',
    'Best posting times: 11 AM - 1 PM, 7 PM - 9 PM',
    'Use emojis to increase engagement by 48%',
    'Include a clear call-to-action',
    'Mention relevant accounts to expand reach'
  ],
  
  warnings: {
    unicode: 'Some Unicode styles may break hashtag functionality',
    links: 'Links are not clickable in posts - only in bio',
    hashtags: 'Using all 30 hashtags often reduces reach',
    accessibility: 'Unicode text is not screen reader friendly'
  }
})