import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'
import { convertToUnicode } from '../unicodeConverter.js'

// X/Twitter platform configuration
export const twitterPlatform = createPlatform({
  id: PlatformIds.TWITTER,
  name: 'X (Twitter)',
  icon: 'twitter',
  color: '#000000', // X brand color
  
  limits: {
    tweet: 280,
    tweetPremium: 25000,
    thread: 25, // max posts in a thread
    bio: 160,
    dm: 10000,
    username: 15,
    displayName: 50,
    linkLength: 23, // all links count as 23 chars
    mediaCount: 4, // images
    videoCount: 1,
    gifCount: 1,
    pollOptions: 4,
    pollOptionLength: 25
  },
  
  features: {
    [PlatformFeatures.BOLD]: { supported: 'premium', native: true, unicode: true },
    [PlatformFeatures.ITALIC]: { supported: 'premium', native: true, unicode: true },
    [PlatformFeatures.STRIKETHROUGH]: { supported: 'unicode', native: false },
    [PlatformFeatures.UNDERLINE]: { supported: false },
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
    [PlatformFeatures.POLLS]: { supported: true, native: true }
  },
  
  formatter: (markdown, options = {}) => {
    const isPremium = options.premium || false
    let result = markdown
    
    // Remove headers - not supported
    result = result.replace(/^#{1,6}\s+(.*$)/gm, '$1')
    
    // Convert bold
    if (isPremium) {
      // Keep markdown syntax for premium users
      result = result.replace(/\*\*(.*?)\*\*/g, '**$1**')
    } else {
      // Use Unicode for free users
      result = result.replace(/\*\*(.*?)\*\*/g, (match, text) => convertToUnicode(text, 'bold'))
    }
    
    // Convert italic
    if (isPremium) {
      // Keep markdown syntax for premium users
      result = result.replace(/\*(.*?)\*/g, '*$1*')
    } else {
      // Use Unicode for free users
      result = result.replace(/\*(.*?)\*/g, (match, text) => convertToUnicode(text, 'italic'))
    }
    
    // Convert strikethrough (Unicode only)
    result = result.replace(/~~(.*?)~~/g, (match, text) => convertToUnicode(text, 'strikethrough'))
    
    // Simple bullet lists
    result = result.replace(/^[\s]*[-*+] (.*$)/gm, '• $1')
    
    // Numbered lists
    result = result.replace(/^[\s]*(\d+)\. (.*$)/gm, '$1. $2')
    
    // Links stay as-is (Twitter will auto-detect)
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
  
  validator: (text, options = {}) => {
    const errors = []
    const warnings = []
    const isPremium = options.premium || false
    const limit = isPremium ? twitterPlatform.limits.tweetPremium : twitterPlatform.limits.tweet
    
    // Calculate effective length (links count as 23 chars)
    const urlRegex = /https?:\/\/[^\s]+/g
    const urls = text.match(urlRegex) || []
    let effectiveLength = text.length
    
    urls.forEach(url => {
      effectiveLength = effectiveLength - url.length + twitterPlatform.limits.linkLength
    })
    
    if (effectiveLength > limit) {
      errors.push(`Text exceeds ${isPremium ? 'Premium' : 'standard'} limit of ${limit} characters (effective length: ${effectiveLength})`)
    }
    
    // Check for unsupported features
    if (text.includes('```')) {
      warnings.push('Code blocks are not supported on X')
    }
    
    if (text.match(/^#{1,6}\s+/m)) {
      warnings.push('Headers are not supported on X')
    }
    
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      warnings.push('Tables are not supported on X')
    }
    
    if (!isPremium && (text.includes('**') || text.includes('*'))) {
      warnings.push('Native formatting requires X Premium subscription')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-black text-white',
    headerClass: 'x-header',
    contentClass: 'x-content',
    showProfilePic: true,
    showEngagement: true,
    darkMode: true
  },
  
  tips: [
    'Use 1-2 hashtags maximum for better engagement',
    'Tweets with images get 150% more retweets',
    'Best posting times: 9-10 AM and 7-9 PM',
    'Keep tweets under 100 characters for 17% more engagement',
    'Use threads for longer content (reply to yourself)',
    'Tag relevant accounts to increase visibility',
    'Retweet with comment for better reach'
  ],
  
  warnings: {
    unicode: 'Unicode text may not be searchable',
    premium: 'Bold and italic formatting requires X Premium',
    threads: 'Threads are limited to 25 posts',
    media: 'You can add up to 4 images OR 1 video per tweet'
  }
})