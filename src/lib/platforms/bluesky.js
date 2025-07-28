import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'
import { convertToUnicode } from '../unicodeConverter.js'

// Bluesky platform configuration
export const blueskyPlatform = createPlatform({
  id: PlatformIds.BLUESKY,
  name: 'Bluesky',
  icon: 'bluesky',
  color: '#00A8E8',
  
  limits: {
    post: 300, // strict limit
    bio: 256,
    displayName: 64,
    handle: 253, // including domain
    altText: 1000,
    linkLength: 23, // all links count as 23 chars
    mediaCount: 4, // images
    videoLength: 180, // 3 minutes as of 2025
    hashtags: 8, // recommended maximum
    lists: 100 // max lists you can create
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
    [PlatformFeatures.LINKS]: { supported: true, native: true },
    [PlatformFeatures.MENTIONS]: { supported: true, native: true },
    [PlatformFeatures.HASHTAGS]: { supported: true, native: true },
    [PlatformFeatures.BLOCKQUOTE]: { supported: false },
    [PlatformFeatures.TABLES]: { supported: false },
    [PlatformFeatures.IMAGES]: { supported: true, native: true, limit: 4 },
    [PlatformFeatures.VIDEOS]: { supported: true, native: true, limit: 1 },
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
    
    // Links - Bluesky will auto-detect
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 $2')
    
    // Remove blockquotes
    result = result.replace(/^>\s+(.*$)/gm, '$1')
    
    // Remove code blocks and inline code
    result = result.replace(/```[\s\S]*?```/g, (match) => {
      return match.replace(/```\w*\n?/g, '').trim()
    })
    result = result.replace(/`([^`]+)`/g, '$1')
    
    return result
  },
  
  validator: (text) => {
    const errors = []
    const warnings = []
    
    // Calculate effective length (links count as 23 chars)
    const urlRegex = /https?:\/\/[^\s]+/g
    const urls = text.match(urlRegex) || []
    let effectiveLength = text.length
    
    urls.forEach(url => {
      effectiveLength = effectiveLength - url.length + blueskyPlatform.limits.linkLength
    })
    
    if (effectiveLength > blueskyPlatform.limits.post) {
      errors.push(`Text exceeds Bluesky's strict ${blueskyPlatform.limits.post} character limit (effective: ${effectiveLength})`)
    }
    
    // Count hashtags
    const hashtags = text.match(/#\w+/g) || []
    if (hashtags.length > blueskyPlatform.limits.hashtags) {
      warnings.push(`Consider using no more than ${blueskyPlatform.limits.hashtags} hashtags for better visibility`)
    }
    
    // Check for mentions format
    const mentions = text.match(/@[\w.-]+/g) || []
    mentions.forEach(mention => {
      if (mention.includes('.') && !mention.endsWith('.bsky.social')) {
        warnings.push(`Custom domains in handles may not resolve correctly`)
      }
    })
    
    // Check for unsupported features
    if (text.includes('```')) {
      warnings.push('Code blocks are not supported on Bluesky')
    }
    
    if (text.match(/^#{1,6}\s+/m)) {
      warnings.push('Headers are not supported on Bluesky')
    }
    
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      warnings.push('Tables are not supported on Bluesky')
    }
    
    // Thread warning
    if (effectiveLength > 250) {
      warnings.push('Consider creating a thread by replying to yourself')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-white',
    headerClass: 'bluesky-header',
    contentClass: 'bluesky-content',
    showProfilePic: true,
    showEngagement: true
  },
  
  tips: [
    'Keep posts under 250 chars for single-post clarity',
    'Use 2-5 hashtags for custom feed discovery',
    'Create threads by replying to yourself',
    'Add alt text to images (up to 1000 chars)',
    'Best times: 8-10 AM and 5-7 PM EST',
    'Engage with replies - Bluesky favors interaction',
    'Use lists to organize your follows',
    'Custom feeds are powerful - optimize for keywords'
  ],
  
  warnings: {
    unicode: 'Unicode formatting may affect facet byte offsets',
    strictLimit: 'Bluesky has a strict 300 character limit',
    threads: 'No native thread creation - reply to yourself',
    polls: 'Polls are not yet supported on Bluesky'
  }
})