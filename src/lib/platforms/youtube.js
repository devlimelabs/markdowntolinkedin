import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'
import { convertToUnicode } from '../unicodeConverter.js'

// YouTube platform configuration
export const youtubePlatform = createPlatform({
  id: PlatformIds.YOUTUBE,
  name: 'YouTube',
  icon: 'youtube',
  color: '#FF0000',
  
  limits: {
    title: 100,
    titleVisible: 70, // truncation point
    description: 5000,
    comment: 10000,
    channelDescription: 1000,
    communityPost: 10000,
    shortsTitle: 100,
    shortsTitleVisible: 40, // mobile visibility
    hashtags: 15, // total allowed
    hashtagsVisible: 3, // shown above title
    timestamps: 100, // max chapter markers
    playlistTitle: 150,
    playlistDescription: 5000
  },
  
  features: {
    [PlatformFeatures.BOLD]: { supported: true, native: true },
    [PlatformFeatures.ITALIC]: { supported: true, native: true },
    [PlatformFeatures.STRIKETHROUGH]: { supported: true, native: true },
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
    [PlatformFeatures.IMAGES]: { supported: false },
    [PlatformFeatures.VIDEOS]: { supported: false },
    [PlatformFeatures.POLLS]: { supported: false }
  },
  
  formatter: (markdown) => {
    let result = markdown
    
    // Convert headers to plain text
    result = result.replace(/^#{1,6}\s+(.*$)/gm, '$1')
    
    // Convert YouTube's native formatting
    // Bold: **text** to *text*
    result = result.replace(/\*\*(.*?)\*\*/g, '*$1*')
    
    // Italic: *text* to _text_  (avoiding conflicts with bold)
    result = result.replace(/(?<!\*)\*(?!\*)([^*]+?)(?<!\*)\*(?!\*)/g, '_$1_')
    
    // Strikethrough: ~~text~~ to -text-
    result = result.replace(/~~(.*?)~~/g, '-$1-')
    
    // Convert bullet lists
    result = result.replace(/^[\s]*[-*+] (.*$)/gm, '• $1')
    
    // Convert numbered lists
    result = result.replace(/^[\s]*(\d+)\. (.*$)/gm, '$1. $2')
    
    // Links stay as-is (YouTube auto-detects)
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 $2')
    
    // Remove blockquotes
    result = result.replace(/^>\s+(.*$)/gm, '$1')
    
    // Remove code blocks and inline code
    result = result.replace(/```[\s\S]*?```/g, (match) => {
      return match.replace(/```\w*\n?/g, '').trim()
    })
    result = result.replace(/`([^`]+)`/g, '$1')
    
    // Convert timestamps if present (HH:MM:SS or MM:SS format)
    result = result.replace(/(\d{1,2}):(\d{2})(?::(\d{2}))?/g, (match, h, m, s) => {
      if (s) {
        return `${h}:${m}:${s}`
      } else {
        return `${h}:${m}`
      }
    })
    
    return result
  },
  
  validator: (text, options = {}) => {
    const errors = []
    const warnings = []
    const type = options.type || 'description'
    
    // Check character limits based on content type
    if (type === 'title' && text.length > youtubePlatform.limits.title) {
      errors.push(`Title exceeds YouTube's ${youtubePlatform.limits.title} character limit`)
    }
    
    if (type === 'title' && text.length > youtubePlatform.limits.titleVisible) {
      warnings.push(`Title will be truncated at ${youtubePlatform.limits.titleVisible} characters in search results`)
    }
    
    if (type === 'description' && text.length > youtubePlatform.limits.description) {
      errors.push(`Description exceeds YouTube's ${youtubePlatform.limits.description} character limit`)
    }
    
    // Count hashtags
    const hashtags = text.match(/#\w+/g) || []
    if (hashtags.length > youtubePlatform.limits.hashtags) {
      warnings.push(`YouTube only processes first ${youtubePlatform.limits.hashtags} hashtags`)
    }
    
    // Check for timestamps/chapters
    const timestamps = text.match(/\d{1,2}:\d{2}(?::\d{2})?/g) || []
    if (timestamps.length > 0 && timestamps.length < 3) {
      warnings.push('Need at least 3 timestamps starting with 00:00 for chapters to work')
    }
    
    // Check formatting
    if (text.includes('**') || text.includes('_') || text.includes('-')) {
      const formattingNote = 'YouTube formatting requires spaces around symbols (*bold*, _italic_, -strikethrough-)'
      if (!warnings.includes(formattingNote)) {
        warnings.push(formattingNote)
      }
    }
    
    // Check for unsupported features
    if (text.includes('```')) {
      warnings.push('Code blocks are not supported on YouTube')
    }
    
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      warnings.push('Tables are not supported on YouTube')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-white',
    headerClass: 'youtube-header',
    contentClass: 'youtube-content',
    showProfilePic: true,
    showEngagement: true
  },
  
  tips: [
    'Put important keywords in first 125 characters',
    'Use timestamps for chapters (start with 00:00)',
    'Add 3-5 relevant hashtags at the end',
    'YouTube formatting needs spaces: *bold* not **bold**',
    'Include a clear call-to-action',
    'Optimize titles for 70 character display limit',
    'Use line breaks to improve readability',
    'Add links to related videos and playlists'
  ],
  
  warnings: {
    formatting: 'YouTube formatting requires whitespace around symbols',
    hashtags: 'Only first 3 hashtags appear above title',
    timestamps: 'Chapters need 3+ timestamps starting with 00:00',
    api: 'API has different formatting rules than native YouTube'
  }
})