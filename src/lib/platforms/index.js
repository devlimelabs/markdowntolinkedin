// Central platform registry and utilities

import { linkedinPlatform } from './linkedin.js'
import { twitterPlatform } from './twitter.js'
import { facebookPlatform } from './facebook.js'
import { instagramPlatform } from './instagram.js'
import { mastodonPlatform } from './mastodon.js'
import { blueskyPlatform } from './bluesky.js'
import { youtubePlatform } from './youtube.js'
import { tiktokPlatform } from './tiktok.js'
import { pinterestPlatform } from './pinterest.js'
import { redditPlatform } from './reddit.js'
import { discordPlatform } from './discord.js'

// Platform registry
export const platforms = {
  [linkedinPlatform.id]: linkedinPlatform,
  [twitterPlatform.id]: twitterPlatform,
  [facebookPlatform.id]: facebookPlatform,
  [instagramPlatform.id]: instagramPlatform,
  [mastodonPlatform.id]: mastodonPlatform,
  [blueskyPlatform.id]: blueskyPlatform,
  [youtubePlatform.id]: youtubePlatform,
  [tiktokPlatform.id]: tiktokPlatform,
  [pinterestPlatform.id]: pinterestPlatform,
  [redditPlatform.id]: redditPlatform,
  [discordPlatform.id]: discordPlatform
}

// Get platform by ID
export function getPlatform(platformId) {
  return platforms[platformId]
}

// Get all platforms
export function getAllPlatforms() {
  return Object.values(platforms)
}

// Get enabled platforms (for future configuration)
export function getEnabledPlatforms() {
  // For now, return all platforms
  // In the future, this could check user preferences
  return getAllPlatforms()
}

// Convert markdown for a specific platform
export function convertForPlatform(markdown, platformId, options = {}) {
  const platform = getPlatform(platformId)
  if (!platform) {
    throw new Error(`Unknown platform: ${platformId}`)
  }
  
  return platform.formatter(markdown, options)
}

// Validate text for a specific platform
export function validateForPlatform(text, platformId, options = {}) {
  const platform = getPlatform(platformId)
  if (!platform) {
    throw new Error(`Unknown platform: ${platformId}`)
  }
  
  return platform.validator(text, options)
}

// Get character limit for a platform
export function getCharacterLimit(platformId, type = 'post', options = {}) {
  const platform = getPlatform(platformId)
  if (!platform) {
    throw new Error(`Unknown platform: ${platformId}`)
  }
  
  // Handle special cases
  if (platformId === 'twitter' && options.premium) {
    return platform.limits.tweetPremium
  }
  
  if (platformId === 'mastodon' && options.characterLimit) {
    return options.characterLimit
  }
  
  return platform.limits[type] || platform.limits.post
}

// Check if a feature is supported on a platform
export function isFeatureSupported(platformId, feature) {
  const platform = getPlatform(platformId)
  if (!platform) {
    return false
  }
  
  const support = platform.features[feature]
  if (!support) {
    return false
  }
  
  return support.supported !== false
}

// Get platform-specific tips
export function getPlatformTips(platformId) {
  const platform = getPlatform(platformId)
  if (!platform) {
    return []
  }
  
  return platform.tips || []
}

// Get platform warnings
export function getPlatformWarnings(platformId) {
  const platform = getPlatform(platformId)
  if (!platform) {
    return {}
  }
  
  return platform.warnings || {}
}

// Convert markdown for all platforms
export function convertForAllPlatforms(markdown, options = {}) {
  const results = {}
  
  getAllPlatforms().forEach(platform => {
    try {
      results[platform.id] = {
        text: convertForPlatform(markdown, platform.id, options[platform.id] || {}),
        validation: validateForPlatform(markdown, platform.id, options[platform.id] || {}),
        platform: platform
      }
    } catch (error) {
      results[platform.id] = {
        error: error.message,
        platform: platform
      }
    }
  })
  
  return results
}

// Export individual platforms for direct access
export { 
  linkedinPlatform, 
  twitterPlatform, 
  facebookPlatform, 
  instagramPlatform, 
  mastodonPlatform, 
  blueskyPlatform,
  youtubePlatform,
  tiktokPlatform,
  pinterestPlatform,
  redditPlatform,
  discordPlatform
}