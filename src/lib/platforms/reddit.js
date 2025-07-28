import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'

// Reddit platform configuration
export const redditPlatform = createPlatform({
  id: PlatformIds.REDDIT,
  name: 'Reddit',
  icon: 'reddit',
  color: '#FF4500',
  
  limits: {
    postTitle: 300,
    postText: 40000, // old Reddit
    postTextNew: 10000, // new Reddit
    comment: 10000,
    bio: 200,
    username: 20,
    subredditName: 21,
    subredditDescription: 500,
    subredditSidebar: 10240,
    flairText: 64,
    wikiPage: 524288 // 0.5MB
  },
  
  features: {
    [PlatformFeatures.BOLD]: { supported: true, native: true },
    [PlatformFeatures.ITALIC]: { supported: true, native: true },
    [PlatformFeatures.STRIKETHROUGH]: { supported: true, native: true },
    [PlatformFeatures.UNDERLINE]: { supported: false },
    [PlatformFeatures.CODE]: { supported: true, native: true },
    [PlatformFeatures.CODE_BLOCK]: { supported: true, native: true },
    [PlatformFeatures.HEADERS]: { supported: true, native: true },
    [PlatformFeatures.LISTS]: { supported: true, native: true },
    [PlatformFeatures.NUMBERED_LISTS]: { supported: true, native: true },
    [PlatformFeatures.LINKS]: { supported: true, native: true },
    [PlatformFeatures.MENTIONS]: { supported: true, native: true },
    [PlatformFeatures.HASHTAGS]: { supported: false },
    [PlatformFeatures.BLOCKQUOTE]: { supported: true, native: true },
    [PlatformFeatures.TABLES]: { supported: true, native: true },
    [PlatformFeatures.IMAGES]: { supported: true, native: true },
    [PlatformFeatures.VIDEOS]: { supported: true, native: true },
    [PlatformFeatures.POLLS]: { supported: true, native: true }
  },
  
  formatter: (markdown, options = {}) => {
    // Reddit supports full markdown - minimal conversion needed
    let result = markdown
    
    // Reddit uses different spoiler syntax
    result = result.replace(/\|\|(.*?)\|\|/g, '>!$1!<')
    
    // Convert user mentions from @ to u/
    result = result.replace(/@(\w+)/g, 'u/$1')
    
    // Convert subreddit mentions
    result = result.replace(/r\/(\w+)/g, 'r/$1')
    
    // Ensure proper line breaks for paragraphs
    result = result.replace(/\n\n/g, '\n\n')
    
    // Reddit-specific formatting for better compatibility
    if (options.oldReddit) {
      // Old Reddit has better markdown support, no changes needed
      return result
    }
    
    // For new Reddit / Fancy Pants compatibility
    if (options.fancyPants) {
      // Convert some markdown to be more compatible
      // Headers might need adjustment
      result = result.replace(/^(#{1,6})\s+/gm, '$1 ')
    }
    
    return result
  },
  
  validator: (text, options = {}) => {
    const errors = []
    const warnings = []
    const isOldReddit = options.oldReddit || false
    const limit = isOldReddit ? redditPlatform.limits.postText : redditPlatform.limits.postTextNew
    
    if (text.length > limit) {
      errors.push(`Text exceeds ${isOldReddit ? 'old' : 'new'} Reddit's ${limit} character limit`)
    }
    
    // Check for common Reddit formatting issues
    if (text.includes('***') || text.includes('___')) {
      warnings.push('Triple asterisks/underscores can cause formatting issues')
    }
    
    // Check for nested formatting
    if (text.match(/\*\*.*\*.*\*\*/) || text.match(/__.*_.*__/)) {
      warnings.push('Nested formatting may not render correctly on mobile')
    }
    
    // Table warnings
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      const tableLines = text.split('\n').filter(line => line.includes('|'))
      if (tableLines.some(line => line.split('|').length > 10)) {
        warnings.push('Tables with many columns may not display well on mobile')
      }
    }
    
    // Spoiler tag check
    if (text.includes('>!') && text.includes('!<')) {
      warnings.push('Spoiler tags may not work in all Reddit apps')
    }
    
    // Check for hashtags (not supported)
    if (text.includes('#')) {
      const hashtags = text.match(/#\w+/g) || []
      if (hashtags.length > 0) {
        warnings.push('Reddit does not support hashtags - use subreddit-specific flair instead')
      }
    }
    
    // Line break warnings
    if (text.includes('\n') && !text.includes('\n\n')) {
      warnings.push('Single line breaks may not display - use double line breaks for paragraphs')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-white',
    headerClass: 'reddit-header',
    contentClass: 'reddit-content',
    showProfilePic: false,
    showEngagement: true,
    darkMode: options => options.darkMode || false
  },
  
  tips: [
    'Use proper markdown syntax for best results',
    'Double line breaks for paragraphs',
    'Tables work best with simple formatting',
    'Include a TL;DR for long posts',
    'Use u/ for user mentions, r/ for subreddits',
    'Add flair if the subreddit requires it',
    'Preview in both old and new Reddit',
    'Consider mobile users when formatting'
  ],
  
  warnings: {
    characterLimit: 'New Reddit has lower character limits than old Reddit',
    mobileFormatting: 'Complex formatting may not render on mobile apps',
    spoilers: 'Spoiler tags vary by platform',
    fancyPants: 'Fancy Pants editor may alter your markdown'
  }
})