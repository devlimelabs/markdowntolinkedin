import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'
import { convertToUnicode } from '../unicodeConverter.js'

// TikTok platform configuration
export const tiktokPlatform = createPlatform({
  id: PlatformIds.TIKTOK,
  name: 'TikTok',
  icon: 'tiktok',
  color: '#000000',
  
  limits: {
    caption: 2200, // increased from 300
    bio: 80,
    username: 24,
    displayName: 30,
    comment: 150,
    hashtags: 100, // per hashtag
    hashtagCount: 100, // total hashtags allowed
    videoDescription: 2200,
    soundName: 60,
    altText: 100, // for photos
    seriesDescription: 80
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
    [PlatformFeatures.IMAGES]: { supported: true, native: true },
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
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    
    // Remove blockquotes
    result = result.replace(/^>\s+(.*$)/gm, '$1')
    
    // Remove code blocks and inline code
    result = result.replace(/```[\s\S]*?```/g, (match) => {
      return match.replace(/```\w*\n?/g, '').trim()
    })
    result = result.replace(/`([^`]+)`/g, '$1')
    
    // Convert TikTok hidden emojis if present
    const tiktokEmojis = {
      '[loveface]': '🥰',
      '[smile]': '😊',
      '[happy]': '😃',
      '[angry]': '😠',
      '[cry]': '😢',
      '[embarrassed]': '😳',
      '[surprised]': '😮',
      '[wronged]': '😤',
      '[shout]': '😱',
      '[flushed]': '😳',
      '[yummy]': '😋',
      '[complacent]': '😏',
      '[drool]': '🤤',
      '[scream]': '😱',
      '[weep]': '😭',
      '[speechless]': '😶',
      '[funnyface]': '🤪',
      '[laughwithtears]': '🤣',
      '[wicked]': '😈',
      '[facewithrollingeyes]': '🙄',
      '[sulk]': '😞',
      '[thinking]': '🤔',
      '[lovely]': '🥰',
      '[greedy]': '🤑',
      '[wow]': '🤩',
      '[joyful]': '🥳',
      '[hehe]': '😄',
      '[slap]': '🤦',
      '[tears]': '😭',
      '[stun]': '😲',
      '[cute]': '😊',
      '[blink]': '😉',
      '[disdain]': '😒',
      '[astonish]': '😲',
      '[rage]': '🤬',
      '[cool]': '😎',
      '[excited]': '🤗',
      '[proud]': '😤',
      '[smileface]': '🙂',
      '[evil]': '😈',
      '[angel]': '😇',
      '[laugh]': '😂',
      '[pride]': '😏',
      '[nap]': '😴',
      '[loveusignlanguage]': '🤟'
    }
    
    // Replace TikTok emoji codes
    Object.entries(tiktokEmojis).forEach(([code, emoji]) => {
      result = result.replace(new RegExp(code.replace('[', '\\[').replace(']', '\\]'), 'g'), emoji)
    })
    
    return result
  },
  
  validator: (text) => {
    const errors = []
    const warnings = []
    
    if (text.length > tiktokPlatform.limits.caption) {
      errors.push(`Caption exceeds TikTok's ${tiktokPlatform.limits.caption} character limit`)
    }
    
    // Count hashtags
    const hashtags = text.match(/#\w+/g) || []
    if (hashtags.length > 10) {
      warnings.push('Using more than 3-5 hashtags can reduce reach on TikTok')
    }
    
    // Check for individual hashtag length
    hashtags.forEach(tag => {
      if (tag.length > tiktokPlatform.limits.hashtags) {
        errors.push(`Hashtag "${tag}" exceeds ${tiktokPlatform.limits.hashtags} character limit`)
      }
    })
    
    // Check for links
    if (text.match(/https?:\/\/[^\s]+/)) {
      warnings.push('Links in captions are not clickable - only bio links work (requires 1000+ followers)')
    }
    
    // Check for unsupported features
    if (text.includes('```')) {
      warnings.push('Code blocks are not supported on TikTok')
    }
    
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      warnings.push('Tables are not supported on TikTok')
    }
    
    // Unicode warnings
    if (text.match(/[\u{1D400}-\u{1D7FF}]/u)) {
      warnings.push('Unicode formatting may not display correctly on all devices')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-black text-white',
    headerClass: 'tiktok-header',
    contentClass: 'tiktok-content',
    showProfilePic: true,
    showEngagement: true,
    mobileFirst: true
  },
  
  tips: [
    'Keep captions short and engaging (100-150 characters)',
    'Use 3-5 relevant hashtags for best reach',
    'Front-load important information',
    'Add captions for accessibility',
    'Post at peak times: 6-10 AM and 7-11 PM',
    'Use trending sounds and effects',
    'Hook viewers in first 3 seconds',
    'Engage with comments quickly'
  ],
  
  warnings: {
    unicode: 'Unicode text may not display on all devices',
    links: 'Links are not clickable in captions',
    desktop: 'Desktop uploads may get lower engagement',
    hashtags: 'Too many hashtags can hurt reach'
  }
})