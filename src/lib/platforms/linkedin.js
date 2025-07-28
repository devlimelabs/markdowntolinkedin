import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'
import { convertToUnicode } from '../unicodeConverter.js'

// LinkedIn platform configuration
export const linkedinPlatform = createPlatform({
  id: PlatformIds.LINKEDIN,
  name: 'LinkedIn',
  icon: 'linkedin',
  color: '#0A66C2',
  
  limits: {
    post: 3000,
    article: 120000,
    headline: 220,
    about: 2600,
    comment: 1250,
    message: 8000,
    companyUpdate: 700,
    truncatePreview: 210, // "see more" appears
    hashtagCount: 30,
    mentionCount: 50,
    mediaCount: 9
  },
  
  features: {
    [PlatformFeatures.BOLD]: { supported: 'unicode', native: false },
    [PlatformFeatures.ITALIC]: { supported: 'unicode', native: false },
    [PlatformFeatures.STRIKETHROUGH]: { supported: 'unicode', native: false },
    [PlatformFeatures.UNDERLINE]: { supported: 'unicode', native: false },
    [PlatformFeatures.CODE]: { supported: 'unicode', native: false },
    [PlatformFeatures.CODE_BLOCK]: { supported: false },
    [PlatformFeatures.HEADERS]: { supported: 'unicode', native: false },
    [PlatformFeatures.LISTS]: { supported: 'unicode', native: false },
    [PlatformFeatures.NUMBERED_LISTS]: { supported: true, native: true },
    [PlatformFeatures.LINKS]: { supported: true, native: true },
    [PlatformFeatures.MENTIONS]: { supported: true, native: true },
    [PlatformFeatures.HASHTAGS]: { supported: true, native: true },
    [PlatformFeatures.BLOCKQUOTE]: { supported: 'unicode', native: false },
    [PlatformFeatures.TABLES]: { supported: false },
    [PlatformFeatures.IMAGES]: { supported: true, native: true, limit: 9 },
    [PlatformFeatures.VIDEOS]: { supported: true, native: true, limit: 1 },
    [PlatformFeatures.POLLS]: { supported: true, native: true }
  },
  
  formatter: (markdown) => {
    let result = markdown
    
    // Convert headers to bold
    result = result.replace(/^### (.*$)/gm, (match, text) => convertToUnicode(text, 'bold'))
    result = result.replace(/^## (.*$)/gm, (match, text) => convertToUnicode(text, 'bold'))
    result = result.replace(/^# (.*$)/gm, (match, text) => convertToUnicode(text, 'bold'))
    
    // Convert bold text
    result = result.replace(/\*\*(.*?)\*\*/g, (match, text) => convertToUnicode(text, 'bold'))
    
    // Convert italic text
    result = result.replace(/\*(.*?)\*/g, (match, text) => convertToUnicode(text, 'italic'))
    
    // Convert strikethrough
    result = result.replace(/~~(.*?)~~/g, (match, text) => convertToUnicode(text, 'strikethrough'))
    
    // Convert bullet lists
    result = result.replace(/^[\s]*[-*+] (.*$)/gm, '• $1')
    
    // Convert numbered lists (keep native)
    result = result.replace(/^[\s]*(\d+)\. (.*$)/gm, '$1. $2')
    
    // Convert links to LinkedIn format
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    
    // Convert blockquotes to italic
    result = result.replace(/^> (.*$)/gm, (match, text) => convertToUnicode(text, 'italic'))
    
    // Convert inline code
    result = result.replace(/`([^`]+)`/g, (match, text) => convertToUnicode(text, 'monospace'))
    
    return result
  },
  
  validator: (text) => {
    const errors = []
    const warnings = []
    
    if (text.length > linkedinPlatform.limits.post) {
      errors.push(`Text exceeds LinkedIn's ${linkedinPlatform.limits.post} character limit`)
    }
    
    if (text.length > linkedinPlatform.limits.truncatePreview) {
      warnings.push('Your post will show "see more" after 210 characters')
    }
    
    // Count hashtags
    const hashtags = text.match(/#\w+/g) || []
    if (hashtags.length > linkedinPlatform.limits.hashtagCount) {
      warnings.push(`LinkedIn recommends using no more than ${linkedinPlatform.limits.hashtagCount} hashtags`)
    }
    
    // Check for code blocks
    if (text.includes('```')) {
      warnings.push('Code blocks are not supported on LinkedIn and will appear as plain text')
    }
    
    // Check for tables
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      warnings.push('Tables are not supported on LinkedIn')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-white',
    headerClass: 'linkedin-header',
    contentClass: 'linkedin-content',
    showProfilePic: true,
    showEngagement: true
  },
  
  tips: [
    'Use 3-5 hashtags for optimal reach',
    'Posts with images get 2x more engagement',
    'Keep your message concise - aim for 150-300 characters',
    'Tag relevant people and companies to increase visibility',
    'Post during business hours (Tuesday-Thursday, 8-10 AM or 5-6 PM)',
    'Use bullet points for easy scanning',
    'Include a clear call-to-action'
  ],
  
  warnings: {
    unicode: 'Unicode formatting may not be searchable and can cause accessibility issues',
    apiLimits: 'LinkedIn API has a 150 posts/day limit',
    mentions: 'Mentions require exact capitalization to work properly',
    editMethod: 'To add link previews, post first then edit immediately'
  }
})