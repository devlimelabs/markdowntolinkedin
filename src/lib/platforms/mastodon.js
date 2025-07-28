import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'
import { convertToUnicode } from '../unicodeConverter.js'

// Mastodon platform configuration
export const mastodonPlatform = createPlatform({
  id: PlatformIds.MASTODON,
  name: 'Mastodon',
  icon: 'mastodon',
  color: '#6364FF',
  
  limits: {
    post: 500, // default, varies by instance
    bio: 500,
    displayName: 30,
    username: 30,
    fields: 4, // profile metadata fields
    fieldName: 255,
    fieldValue: 255,
    pollOptions: 4,
    pollOptionLength: 50,
    mediaCount: 4,
    altText: 1500, // much higher than other platforms!
    customEmoji: 20 // per post
  },
  
  features: {
    [PlatformFeatures.BOLD]: { supported: 'instance', native: false, unicode: true },
    [PlatformFeatures.ITALIC]: { supported: 'instance', native: false, unicode: true },
    [PlatformFeatures.STRIKETHROUGH]: { supported: 'instance', native: false, unicode: true },
    [PlatformFeatures.UNDERLINE]: { supported: 'unicode', native: false },
    [PlatformFeatures.CODE]: { supported: 'instance', native: false },
    [PlatformFeatures.CODE_BLOCK]: { supported: 'instance', native: false },
    [PlatformFeatures.HEADERS]: { supported: 'instance', native: false },
    [PlatformFeatures.LISTS]: { supported: 'instance', native: false },
    [PlatformFeatures.NUMBERED_LISTS]: { supported: 'instance', native: false },
    [PlatformFeatures.LINKS]: { supported: true, native: true },
    [PlatformFeatures.MENTIONS]: { supported: true, native: true },
    [PlatformFeatures.HASHTAGS]: { supported: true, native: true },
    [PlatformFeatures.BLOCKQUOTE]: { supported: 'instance', native: false },
    [PlatformFeatures.TABLES]: { supported: false },
    [PlatformFeatures.IMAGES]: { supported: true, native: true, limit: 4 },
    [PlatformFeatures.VIDEOS]: { supported: true, native: true, limit: 1 },
    [PlatformFeatures.POLLS]: { supported: true, native: true }
  },
  
  formatter: (markdown, options = {}) => {
    const instanceType = options.instanceType || 'vanilla'
    let result = markdown
    
    if (instanceType === 'glitch' || instanceType === 'hometown') {
      // These forks support markdown-style formatting
      // Keep markdown syntax
      return result
    }
    
    // For vanilla Mastodon, convert to Unicode
    
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
    
    // Convert underline
    result = result.replace(/__(.*?)__/g, (match, text) => convertToUnicode(text, 'underline'))
    
    // Convert bullet lists
    result = result.replace(/^[\s]*[-*+] (.*$)/gm, '• $1')
    
    // Convert numbered lists
    result = result.replace(/^[\s]*(\d+)\. (.*$)/gm, '$1. $2')
    
    // Links stay as-is
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 $2')
    
    // Convert blockquotes
    result = result.replace(/^> (.*$)/gm, '» $1')
    
    // Convert code blocks to monospace
    result = result.replace(/```(.*?)\n([\s\S]*?)```/g, (match, lang, code) => {
      return code.split('\n').map(line => convertToUnicode(line, 'monospace')).join('\n')
    })
    
    // Convert inline code
    result = result.replace(/`([^`]+)`/g, (match, text) => convertToUnicode(text, 'monospace'))
    
    // Add content warning syntax if present
    if (options.contentWarning) {
      result = `CW: ${options.contentWarning}\n\n${result}`
    }
    
    return result
  },
  
  validator: (text, options = {}) => {
    const errors = []
    const warnings = []
    const limit = options.characterLimit || mastodonPlatform.limits.post
    
    if (text.length > limit) {
      errors.push(`Text exceeds instance limit of ${limit} characters`)
    }
    
    // Check for mentions format
    const mentions = text.match(/@[\w.-]+(@[\w.-]+)?/g) || []
    mentions.forEach(mention => {
      if (!mention.includes('@', 1)) {
        warnings.push(`Mention "${mention}" should include instance (e.g., @user@instance.social)`)
      }
    })
    
    // Instance-specific warnings
    if (!options.instanceType || options.instanceType === 'vanilla') {
      if (text.includes('**') || text.includes('*')) {
        warnings.push('Vanilla Mastodon does not support markdown formatting')
      }
    }
    
    // Federation warnings
    if (text.includes('```') || text.match(/^#{1,6}\s+/m)) {
      warnings.push('Formatting may not federate correctly to all instances')
    }
    
    // Custom emoji check
    const customEmoji = text.match(/:[\w_-]+:/g) || []
    if (customEmoji.length > mastodonPlatform.limits.customEmoji) {
      warnings.push(`Too many custom emoji (limit: ${mastodonPlatform.limits.customEmoji})`)
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-gray-900 text-white',
    headerClass: 'mastodon-header',
    contentClass: 'mastodon-content',
    showProfilePic: true,
    showEngagement: true,
    darkMode: true
  },
  
  tips: [
    'Add alt text to images - Mastodon allows up to 1500 characters!',
    'Use Content Warnings (CW) for sensitive content',
    'Include full @user@instance.social for mentions',
    'Check your instance\'s character limit - it may be higher than 500',
    'Use hashtags without camelCase for better accessibility',
    'Consider thread etiquette - use "1/n" format',
    'Custom emoji vary by instance - check availability'
  ],
  
  warnings: {
    unicode: 'Unicode formatting works on all instances',
    markdown: 'Markdown support varies by instance type',
    federation: 'Formatting may not appear correctly on all federated instances',
    customEmoji: 'Custom emoji are instance-specific'
  }
})