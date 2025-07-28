# Mastodon Text Formatting Capabilities Guide

## Table of Contents
1. [Character Limits](#character-limits)
2. [Supported Formatting Options](#supported-formatting-options)
3. [Unicode Character Support](#unicode-character-support)
4. [Copy-Paste Behavior](#copy-paste-behavior)
5. [Special Features](#special-features)
6. [Federation Differences](#federation-differences)
7. [Best Practices](#best-practices)
8. [Known Issues](#known-issues)
9. [API Capabilities](#api-capabilities)

## Character Limits

### Default Limit
- **Standard Mastodon**: 500 characters per post
- This is a hard-coded limit in vanilla Mastodon installations

### Instance Variations
Instances can have different character limits through:

1. **Custom-Modified Mastodon**
   - Administrators can modify source code to change limits
   - Requires technical knowledge and recompilation
   - Common custom limits: 1000, 2500, 5000 characters

2. **Mastodon Forks**
   - **Glitch-soc**: Easy admin controls for character limits
   - **Hometown**: Similar features with adjustable limits
   - These forks provide UI controls for administrators

3. **Non-Mastodon Fediverse Software**
   - Pleroma: Up to 5000 characters
   - Misskey: Up to 3000 characters
   - Firefish (formerly Calckey): Variable limits
   - These posts appear in Mastodon feeds with full content

### Finding High-Limit Instances
- Check fedi.garden's "Larger Post Size" section
- Instance directories often list character limits
- Ask instance admins about their limits

## Supported Formatting Options

### Current State (2024)
**Vanilla Mastodon does NOT support:**
- ❌ Native Markdown authoring
- ❌ HTML composition in posts
- ❌ Rich text editing
- ❌ Bold/italic formatting buttons

**Vanilla Mastodon DOES support:**
- ✅ Displaying formatted content from other fediverse software
- ✅ Basic HTML sanitization for federated content
- ✅ Hyperlinks (auto-detected or explicit)
- ✅ Line breaks

### What Mastodon Can Display
When receiving formatted posts from other fediverse platforms:
- **Bold text** (from `<strong>` tags)
- **Italic text** (from `<em>` tags)
- **Headers** (from `<h1>` to `<h6>` tags)
- **Links** (from `<a>` tags)
- **Line breaks** (from `<br>` tags)
- **Paragraphs** (from `<p>` tags)

### Glitch-soc Fork Formatting
The Glitch-soc fork supports creating and displaying:
- Headers (h1-h6)
- **Bold** text
- *Italic* text
- ~~Strikethrough~~ text
- > Blockquotes
- `Inline code`
- ```Code blocks```
- Subscript and superscript
- Ordered and unordered lists

## Unicode Character Support

### Standard Unicode
- Full Unicode emoji support (version depends on instance)
- Most instances use Twemoji or similar libraries
- Supports Unicode 10/Emoji v5 with 2600+ emoji symbols
- Mathematical Unicode characters (𝐛𝐨𝐥𝐝, 𝑖𝑡𝑎𝑙𝑖𝑐) display correctly

### Custom Emojis
- Syntax: `:emoji_name:`
- Instance-specific custom emojis
- Visible in emoji picker
- Can be categorized for organization
- Administrators can bulk import via CLI

### Unicode Copy-Paste Behavior
- Unicode characters (including mathematical bold/italic) paste correctly
- Custom emojis convert to `:shortcode:` format
- Remote custom emojis may not transfer properly
- Standard Unicode emoji paste as expected

## Copy-Paste Behavior

### Text Content
- Plain text: Copies perfectly
- Unicode formatted text: Maintains formatting
- Line breaks: Preserved
- URLs: Remain clickable when pasted

### Special Elements
- **Mentions**: Copy as `@username@instance.social`
- **Hashtags**: Copy as `#hashtag`
- **Custom emojis**: Copy as `:emoji_name:`
- **Remote custom emojis**: May lose reference

### From Other Platforms
- Twitter/X: Plain text only
- Rich text editors: Formatting stripped
- Markdown editors: Source text copied (not rendered)
- Web pages: HTML stripped, plain text retained

## Special Features

### Mentions
- Format: `@username@instance.social`
- Local mentions: `@username` (assumes same instance)
- Auto-completion available
- Domain doesn't count against character limit

### Hashtags
- Format: `#hashtag`
- Alphanumeric + underscores allowed
- Cannot be numbers-only
- Case-insensitive for search
- Clickable for discovery
- Can follow hashtags for timeline inclusion

### Content Warnings (CW)
- Hides post content behind warning text
- Also hides media attachments
- Use cases:
  - Sensitive content
  - Spoilers
  - Long posts ("Read more" functionality)
  - Topic warnings (politics, health, etc.)
- CW text has same character limit as posts
- Hashtags in CW text don't become clickable

### Polls
- 2-4 answer options
- Each option: 25 character limit
- Duration options: 5 min to 7 days
- Cannot edit after posting
- Results visible after voting or expiry
- Cannot combine with media attachments

### Media Attachments
- Images: JPG, PNG, GIF (static or animated)
- Video: MP4, WebM (limited duration/size)
- Audio: MP3, OGG, WAV
- Maximum 4 attachments per post
- Alt text: Up to 1500 characters per image
- Can mark as sensitive content

## Federation Differences

### ActivityPub Implementation
Different fediverse software implements ActivityPub differently:

1. **Content Format**
   - Mastodon: Sanitized HTML
   - Pleroma: Supports Markdown
   - Misskey: Rich text with custom markup
   - WriteFreely: Full HTML support

2. **Feature Support**
   - Polls: Not all software supports them
   - Reactions: Misskey has emoji reactions
   - Quote posts: Some software supports, Mastodon doesn't
   - Formatting: Varies significantly

### Instance-Specific Differences
1. **Limited Federation Mode**
   - Some instances only federate with approved servers
   - Affects content visibility

2. **Content Policies**
   - Different moderation rules
   - Varying content warning expectations
   - Different cultural norms

3. **Technical Limitations**
   - Rate limits vary
   - Media size limits differ
   - API access restrictions

## Best Practices

### Accessibility
1. **Always add alt text** to images
   - Describe image content concisely
   - 1500 character limit available
   - Essential for screen reader users

2. **Use clear language**
   - Avoid excessive abbreviations
   - Define uncommon terms
   - Consider non-native speakers

3. **Proper content warnings**
   - Be descriptive but concise
   - Consider various sensitivities
   - Don't overuse (diminishes effectiveness)

### Formatting Workarounds
1. **For emphasis without formatting:**
   - Use CAPS sparingly
   - Use *asterisks* or _underscores_
   - Use Unicode characters (with caution)

2. **For structure:**
   - Use line breaks effectively
   - Number lists manually (1. 2. 3.)
   - Use emoji as bullet points

3. **For code:**
   - Use code-specific instances
   - Post screenshots with alt text
   - Link to external code hosting

### Cross-Platform Compatibility
1. **Keep it simple**
   - Assume lowest common denominator
   - Test posts from different software
   - Avoid platform-specific features

2. **Use standard elements**
   - Stick to mentions and hashtags
   - Avoid fancy Unicode unless necessary
   - Consider mobile users

## Known Issues

### Current Limitations
1. **No native rich text** in vanilla Mastodon
2. **Hashtags in CW fields** don't become clickable
3. **Character counting** inconsistencies with Unicode
4. **Custom emoji conflicts** with Unicode shortcodes
5. **No quote posts** in vanilla Mastodon

### Federation Issues
1. **Formatting loss** between different software
2. **Poll compatibility** problems
3. **Media attachment** size conflicts
4. **Custom emoji** visibility issues
5. **Mention formatting** differences

### API Limitations
1. Must submit content as **HTML**
2. No Markdown parsing endpoint
3. Limited formatting validation
4. Inconsistent error messages
5. No rich text preview endpoint

## API Capabilities

### Post Creation
```json
POST /api/v1/statuses
{
  "status": "HTML content here",
  "media_ids": [],
  "poll": {},
  "in_reply_to_id": null,
  "sensitive": false,
  "spoiler_text": "CW text here",
  "visibility": "public",
  "language": "en"
}
```

### Content Format
- Submit as sanitized HTML
- Mentions: `<a href="..." class="mention">@user</a>`
- Hashtags: `<a href="..." class="hashtag">#tag</a>`
- Plain text with `<p>` and `<br>` tags
- Custom emojis as `:shortcode:`

### Media Upload
```json
POST /api/v2/media
{
  "file": "binary data",
  "description": "Alt text here"
}
```

### Formatting Validation
- No built-in Markdown converter
- Client-side formatting required
- HTML sanitization on server
- Limited tags allowed: `<p>`, `<br>`, `<a>`, `<span>`

## Instance Resources

### Finding Instances
- [joinmastodon.org](https://joinmastodon.org) - Official directory
- [fedi.garden](https://fedi.garden) - Categorized instances
- [instances.social](https://instances.social) - Technical details

### Checking Instance Features
1. View `/about` page for rules and limits
2. Check `/api/v1/instance` for technical details
3. Ask existing users about features
4. Test with a temporary account

### Popular Modified Instances
- Many art instances: Higher media limits
- Academic instances: Longer character limits
- Tech instances: Code formatting support
- Regional instances: Language-specific features

## Future Developments

### Proposed Features
1. **Markdown support** (Issue #23981)
   - Active discussion
   - Various implementation proposals
   - No timeline for inclusion

2. **Rich text editing**
   - Community interest high
   - Technical challenges remain
   - Fork implementations exist

3. **Better formatting display**
   - Improved federation support
   - Enhanced sanitization
   - More HTML tags allowed

### Community Solutions
1. **Third-party clients** with formatting
2. **Browser extensions** for enhancement
3. **External tools** for conversion
4. **Alternative fediverse software**

---

*This guide reflects Mastodon's capabilities as of 2024. Features may vary by instance, version, and any custom modifications.*