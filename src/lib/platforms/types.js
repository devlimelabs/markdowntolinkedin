// Platform type definitions and interfaces

export const PlatformFeatures = {
  BOLD: 'bold',
  ITALIC: 'italic',
  STRIKETHROUGH: 'strikethrough',
  UNDERLINE: 'underline',
  CODE: 'code',
  CODE_BLOCK: 'codeBlock',
  HEADERS: 'headers',
  LISTS: 'lists',
  NUMBERED_LISTS: 'numberedLists',
  LINKS: 'links',
  MENTIONS: 'mentions',
  HASHTAGS: 'hashtags',
  BLOCKQUOTE: 'blockquote',
  TABLES: 'tables',
  IMAGES: 'images',
  VIDEOS: 'videos',
  POLLS: 'polls'
}

export const PlatformIds = {
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  MASTODON: 'mastodon',
  BLUESKY: 'bluesky',
  THREADS: 'threads',
  REDDIT: 'reddit',
  DISCORD: 'discord',
  YOUTUBE: 'youtube',
  TIKTOK: 'tiktok',
  PINTEREST: 'pinterest'
}

// Platform configuration structure
export const createPlatform = ({
  id,
  name,
  icon,
  color,
  limits,
  features,
  formatter,
  validator,
  preview,
  tips,
  warnings
}) => ({
  id,
  name,
  icon,
  color,
  limits,
  features,
  formatter,
  validator,
  preview,
  tips,
  warnings
})