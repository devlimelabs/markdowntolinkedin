import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'
import { convertToUnicode } from '../unicodeConverter.js'

// Facebook platform configuration
export const facebookPlatform = createPlatform({
  id: PlatformIds.FACEBOOK,
  name: 'Facebook',
  icon: 'facebook',
  color: '#1877F2',
  
  limits: {
    post: 63206,
    comment: 8000,
    bio: 101,
    username: 50,
    pageName: 75,
    eventName: 64,
    eventDescription: 63206,
    groupName: 75,
    albumName: 50,
    albumDescription: 200,
    photoCaption: 200,
    videoTitle: 65,
    videoDescription: 63206,
    storyText: 125, // truncated on mobile
    messengerMessage: 20000,
    adPrimary: 125,
    adHeadline: 40,
    adDescription: 30,
    optimalPost: 80 // 40-80 chars get most engagement
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
    [PlatformFeatures.IMAGES]: { supported: true, native: true },
    [PlatformFeatures.VIDEOS]: { supported: true, native: true },
    [PlatformFeatures.POLLS]: { supported: true, native: true }
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
    
    // Convert underline (if using underscore syntax)
    result = result.replace(/__(.*?)__/g, (match, text) => convertToUnicode(text, 'underline'))
    
    // Simple bullet lists
    result = result.replace(/^[\s]*[-*+] (.*$)/gm, '• $1')
    
    // Numbered lists
    result = result.replace(/^[\s]*(\d+)\. (.*$)/gm, '$1. $2')
    
    // Links - Facebook will auto-detect
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
    
    if (text.length > facebookPlatform.limits.post) {
      errors.push(`Text exceeds Facebook's ${facebookPlatform.limits.post} character limit`)
    }
    
    if (text.length > facebookPlatform.limits.optimalPost) {
      warnings.push(`Posts with 40-80 characters get the most engagement (current: ${text.length})`)
    }
    
    if (text.length > facebookPlatform.limits.storyText) {
      warnings.push('Text will be truncated at 125 characters on mobile Stories')
    }
    
    // Count hashtags
    const hashtags = text.match(/#\w+/g) || []
    if (hashtags.length > 2) {
      warnings.push('Using more than 2 hashtags can reduce reach on Facebook')
    }
    
    // Check for unsupported features
    if (text.includes('```')) {
      warnings.push('Code blocks are not supported on Facebook')
    }
    
    if (text.match(/^#{1,6}\s+/m)) {
      warnings.push('Headers are not supported on Facebook')
    }
    
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      warnings.push('Tables are not supported on Facebook')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-white',
    headerClass: 'facebook-header',
    contentClass: 'facebook-content',
    showProfilePic: true,
    showEngagement: true
  },
  
  tips: [
    'Keep posts between 40-80 characters for best engagement',
    'Use only 1-2 hashtags integrated naturally in your text',
    'Videos get 135% more organic reach than photos',
    'Post between 9 AM - 3 PM on weekdays',
    'Ask questions to increase comments by 100%',
    'Use emojis sparingly - they can increase engagement',
    'Tag relevant pages and people to expand reach'
  ],
  
  warnings: {
    unicode: 'Unicode formatting may not display correctly on all devices',
    hashtags: 'Excessive hashtags can be marked as spam',
    links: 'External links may reduce organic reach',
    stories: 'Story text is truncated at 125 characters on mobile'
  }
})