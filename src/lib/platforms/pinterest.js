import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'
import { convertToUnicode } from '../unicodeConverter.js'

// Pinterest platform configuration
export const pinterestPlatform = createPlatform({
  id: PlatformIds.PINTEREST,
  name: 'Pinterest',
  icon: 'pinterest',
  color: '#E60023',
  
  limits: {
    pinDescription: 500,
    pinDescriptionVisible: 75, // first 50-75 chars visible
    pinTitle: 100,
    boardName: 50,
    boardDescription: 500,
    bio: 160, // possibly up to 500
    username: 15,
    displayName: 30,
    comment: 500,
    altText: 500,
    optimalDescription: 232, // viral pins average 220-232 chars
    pagesPerPin: 20 // multi-page pins
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
    [PlatformFeatures.MENTIONS]: { supported: false },
    [PlatformFeatures.HASHTAGS]: { supported: 'keywords', native: true },
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
    
    // Links - Pinterest will auto-detect
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
    
    if (text.length > pinterestPlatform.limits.pinDescription) {
      errors.push(`Description exceeds Pinterest's ${pinterestPlatform.limits.pinDescription} character limit`)
    }
    
    if (text.length < 50) {
      warnings.push('Descriptions under 50 characters may perform poorly')
    }
    
    if (text.length > pinterestPlatform.limits.pinDescriptionVisible) {
      warnings.push(`Only first ${pinterestPlatform.limits.pinDescriptionVisible} characters visible without clicking "more"`)
    }
    
    if (text.length > pinterestPlatform.limits.optimalDescription) {
      warnings.push(`Viral pins average ${pinterestPlatform.limits.optimalDescription} characters`)
    }
    
    // Count hashtags
    const hashtags = text.match(/#\w+/g) || []
    if (hashtags.length > 5) {
      warnings.push('Using more than 2-5 hashtags may reduce reach')
    }
    
    if (hashtags.length > 0) {
      warnings.push('Hashtags are no longer clickable (2024 change) - focus on keywords instead')
    }
    
    // Check for mentions
    if (text.includes('@')) {
      warnings.push('Pinterest does not support @mentions in descriptions')
    }
    
    // Check for unsupported features
    if (text.includes('```')) {
      warnings.push('Code blocks are not supported on Pinterest')
    }
    
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      warnings.push('Tables are not supported on Pinterest')
    }
    
    // SEO warnings
    if (!text.match(/\b\w+\b.*\b\w+\b.*\b\w+\b/)) {
      warnings.push('Include multiple keywords for better SEO')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-white',
    headerClass: 'pinterest-header',
    contentClass: 'pinterest-content',
    showProfilePic: false,
    showEngagement: true,
    cardStyle: true
  },
  
  tips: [
    'Optimal length: 100-300 characters with keywords',
    'Front-load important keywords',
    'Use 2-5 hashtags at the end (treated as keywords)',
    'Include call-to-action phrases',
    'Natural sentence structure performs better',
    'Add detailed alt text for accessibility',
    'Keywords > hashtags for discovery',
    'Include relevant seasonal terms'
  ],
  
  warnings: {
    unicode: 'Unicode formatting may not render on all devices',
    hashtags: 'Hashtags no longer clickable - use as keywords',
    mentions: 'No @mention functionality in descriptions',
    mobile: 'Mobile truncates descriptions early'
  }
})