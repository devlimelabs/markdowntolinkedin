import { PlatformIds, PlatformFeatures, createPlatform } from './types.js'

// Discord platform configuration
export const discordPlatform = createPlatform({
  id: PlatformIds.DISCORD,
  name: 'Discord',
  icon: 'discord',
  color: '#5865F2',
  
  limits: {
    message: 2000,
    messageNitro: 8192, // with Nitro Tier 2
    username: 32,
    nickname: 32,
    channelName: 100,
    channelTopic: 1024,
    embed: 6000, // total across all fields
    embedTitle: 256,
    embedDescription: 4096,
    embedFieldName: 256,
    embedFieldValue: 1024,
    embedFields: 25,
    embedFooter: 2048,
    embedAuthor: 256,
    customStatus: 128,
    bio: 190,
    serverName: 100
  },
  
  features: {
    [PlatformFeatures.BOLD]: { supported: true, native: true },
    [PlatformFeatures.ITALIC]: { supported: true, native: true },
    [PlatformFeatures.STRIKETHROUGH]: { supported: true, native: true },
    [PlatformFeatures.UNDERLINE]: { supported: true, native: true },
    [PlatformFeatures.CODE]: { supported: true, native: true },
    [PlatformFeatures.CODE_BLOCK]: { supported: true, native: true },
    [PlatformFeatures.HEADERS]: { supported: true, native: true }, // New in 2025
    [PlatformFeatures.LISTS]: { supported: true, native: true },
    [PlatformFeatures.NUMBERED_LISTS]: { supported: true, native: true },
    [PlatformFeatures.LINKS]: { supported: true, native: true },
    [PlatformFeatures.MENTIONS]: { supported: true, native: true },
    [PlatformFeatures.HASHTAGS]: { supported: false },
    [PlatformFeatures.BLOCKQUOTE]: { supported: true, native: true },
    [PlatformFeatures.TABLES]: { supported: false },
    [PlatformFeatures.IMAGES]: { supported: true, native: true },
    [PlatformFeatures.VIDEOS]: { supported: true, native: true },
    [PlatformFeatures.POLLS]: { supported: false }
  },
  
  formatter: (markdown) => {
    // Discord supports most markdown natively
    let result = markdown
    
    // Discord uses || for spoilers instead of >! !<
    result = result.replace(/>!(.*?)!</g, '||$1||')
    
    // Ensure code blocks have language specified for syntax highlighting
    result = result.replace(/```\n/g, '```\n')
    
    // Discord has special syntax for timestamps
    // Convert ISO dates to Discord timestamp format if present
    const isoDateRegex = /\b(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[\.\d]*Z?)\b/g
    result = result.replace(isoDateRegex, (match, date) => {
      const timestamp = Math.floor(new Date(date).getTime() / 1000)
      return `<t:${timestamp}:F>`
    })
    
    // Discord subtext (new 2025 feature)
    result = result.replace(/^-# (.*$)/gm, '-# $1')
    
    // Ensure mentions use proper Discord format
    result = result.replace(/@(\w+)/g, '@$1')
    
    // Channel mentions
    result = result.replace(/#(\w+)/g, '#$1')
    
    return result
  },
  
  validator: (text, options = {}) => {
    const errors = []
    const warnings = []
    const hasNitro = options.nitro || false
    const limit = hasNitro ? discordPlatform.limits.messageNitro : discordPlatform.limits.message
    
    if (text.length > limit) {
      errors.push(`Message exceeds Discord's ${limit} character limit${hasNitro ? ' (Nitro)' : ''}`)
    }
    
    // Check for triple formatting (doesn't work well)
    if (text.includes('***')) {
      warnings.push('Triple asterisks (***) for bold+italic works better as **_text_**')
    }
    
    // Check code blocks
    const codeBlocks = text.match(/```[\s\S]*?```/g) || []
    codeBlocks.forEach(block => {
      if (!block.match(/```\w+\n/)) {
        warnings.push('Specify language after ``` for syntax highlighting (e.g., ```js)')
      }
    })
    
    // Check for tables (not supported)
    if (text.includes('|') && text.match(/\|.*\|.*\|/)) {
      warnings.push('Tables are not supported in Discord - consider using code blocks')
    }
    
    // Check for hashtags (not Discord format)
    const hashtags = text.match(/#\w+/g) || []
    if (hashtags.length > 0) {
      warnings.push('Use Discord channel format #channel-name for channel mentions')
    }
    
    // Embed warnings
    if (options.embed) {
      if (text.length > discordPlatform.limits.embedDescription) {
        errors.push(`Embed description exceeds ${discordPlatform.limits.embedDescription} character limit`)
      }
    }
    
    // Mobile formatting warnings
    if (text.includes('||') && text.includes('**')) {
      warnings.push('Spoiler tags with formatting may not work on mobile')
    }
    
    return { errors, warnings }
  },
  
  preview: {
    containerClass: 'bg-discord-dark text-white',
    headerClass: 'discord-header',
    contentClass: 'discord-content',
    showProfilePic: true,
    showEngagement: false,
    darkMode: true,
    fontFamily: 'Whitney, sans-serif'
  },
  
  tips: [
    'Use ``` with language for syntax highlighting',
    'Headers: # H1, ## H2, ### H3 (2025 feature)',
    'Subtext: -# for small gray text (2025 feature)',
    'Timestamps: <t:UNIX_TIMESTAMP:F> for dynamic dates',
    'Spoilers: ||hidden text|| for spoiler tags',
    'Mentions: @username, @role, #channel',
    'Combine formats: **_bold italic_**',
    'Use > for quotes, >>> for multi-line quotes'
  ],
  
  warnings: {
    mobile: 'Some formatting combinations may not work on mobile',
    spoilers: 'Image spoilers only work on desktop',
    syntax: 'Syntax highlighting varies by language support',
    embeds: 'Bot embeds have different limits than regular messages'
  }
})