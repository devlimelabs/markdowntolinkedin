# X (Twitter) Text Formatting Guide (2025)

## Table of Contents
1. [Character Limits](#character-limits)
2. [Supported Formatting Options](#supported-formatting-options)
3. [Unicode Character Support](#unicode-character-support)
4. [Copy-Paste Behavior](#copy-paste-behavior)
5. [Special Features](#special-features)
6. [Thread Creation and Formatting](#thread-creation-and-formatting)
7. [Best Practices](#best-practices)
8. [Known Issues and Quirks](#known-issues-and-quirks)
9. [API Limitations and Differences](#api-limitations-and-differences)

## Character Limits

### Free Accounts
- **Standard tweets**: 280 characters
- **Direct messages**: 10,000 characters
- **Bio**: 160 characters
- **Username**: 15 characters
- **Display name**: 50 characters

### X Premium (formerly Twitter Blue)
- **Extended tweets**: 25,000 characters per tweet
- **Direct messages**: 10,000 characters (same as free)
- **Video uploads**: Up to 2 hours (vs 2 minutes 20 seconds for free users)
- **Edit window**: Can edit tweets up to 5 times within 30 minutes

### Character Counting Rules
- **Regular characters**: Count as 1 character each
- **Special characters and emojis**: Count as 2 characters each
- **Links**: Count as 23 characters (regardless of actual URL length)
- **Media attachments**: pic.twitter.com URLs count as 0 characters
- **@mentions in replies**: Auto-populated mentions don't count toward limit

## Supported Formatting Options

### X Premium Native Formatting
X Premium Basic subscribers have access to:
- **Bold text**: Native bold formatting in the composer
- **Italic text**: Native italic formatting in the composer
- **Rich text button**: New button in post composer for formatting

### Non-Premium Workarounds
Users without X Premium can use Unicode generators for:
- **Bold**: 𝐁𝐨𝐥𝐝 𝐭𝐞𝐱𝐭 (Mathematical Bold)
- **Italic**: 𝘐𝘵𝘢𝘭𝘪𝘤 𝘵𝘦𝘹𝘵 (Mathematical Italic)
- **Bold Italic**: 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄
- **Script**: 𝓢𝓬𝓻𝓲𝓹𝓽 𝓣𝓮𝔁𝓽
- **Fraktur**: 𝔉𝔯𝔞𝔨𝔱𝔲𝔯 𝔗𝔢𝔵𝔱
- **Double-struck**: 𝔻𝕠𝕦𝕓𝕝𝕖-𝕤𝕥𝕣𝕦𝕔𝕜

### What's NOT Supported
- Underline text
- Strikethrough text
- Color formatting
- Font size changes
- Hyperlink text (beyond automatic URL detection)
- Tables or structured layouts
- Code blocks with syntax highlighting

## Unicode Character Support

### The 𝕏 Logo
- **Unicode**: U+1D54F (Mathematical Double-Struck Capital X)
- **Character**: 𝕏
- **Support**: Added in Unicode 3.1 (2001)
- **Fallback**: May not display on older systems without proper font support

### Unicode Rendering
- **Full support**: Mathematical alphanumeric symbols
- **Character encoding**: UTF-8 only
- **Normalization**: Uses Unicode Normalization Form C (NFC)
- **Fallback fonts**: Automatically used when primary font lacks character

### Platform Compatibility
- **Modern browsers**: Full support
- **Mobile apps**: Generally good support
- **Older systems**: May show replacement characters or boxes

## Copy-Paste Behavior

### From External Sources
1. **Plain text**: Preserves line breaks and basic formatting
2. **Rich text**: Strips all formatting except Unicode characters
3. **Links**: Automatically converts to shortened t.co links
4. **Images**: Cannot be pasted directly, must be uploaded

### Unicode Formatted Text
- **Mathematical Unicode**: Preserved when copied (𝐁𝐨𝐥𝐝, 𝘐𝘵𝘢𝘭𝘪𝘤)
- **Special symbols**: Generally preserved if within Unicode range
- **Emojis**: Fully supported and preserved

### Platform-Specific Behavior
- **Desktop web**: Best compatibility for copy-paste
- **Mobile apps**: May have limitations with complex Unicode
- **Third-party clients**: Variable support for formatting

## Special Features

### Mentions (@)
- **Format**: @username
- **Character limit**: Doesn't count in replies when auto-populated
- **Notification**: Mentioned users receive alerts
- **Verification**: Blue checkmarks for verified accounts

### Hashtags (#)
- **Format**: #hashtag
- **Best practice**: 1-3 hashtags per post
- **Discovery**: Makes content searchable
- **Trending**: Can appear in trending topics

### Links
- **Auto-shortening**: All links become t.co URLs
- **Preview cards**: Automatic generation with title, description, image
- **Character count**: Always counts as 23 characters
- **Tracking**: X tracks click-through rates

### Media Attachments
- **Images**: Up to 4 per tweet
- **Videos**: 1 per tweet (2:20 for free, 2 hours for Premium)
- **GIFs**: 1 per tweet
- **Polls**: 2-4 options, up to 7 days duration

## Thread Creation and Formatting

### Basic Thread Structure
- **Maximum posts**: 25 tweets per thread
- **Creation**: Use "+" button before publishing
- **Numbering**: Common practice to use 1/n format

### Thread Best Practices
1. **First tweet**: Include main point and key hashtags
2. **Breaking points**: Natural paragraph or thought breaks
3. **Media placement**: Spread throughout for engagement
4. **Final tweet**: Summary or call-to-action

### 2025 Updates
- **Thread analytics**: Per-post engagement metrics
- **Quote threading**: Thread other users' threads
- **Collaborative threads**: Multiple authors feature

## Best Practices

### Content Formatting
1. **Line breaks**: Use double line breaks for paragraphs
2. **Emoji usage**: Enhances readability but counts as 2 characters
3. **Capitalization**: Use sparingly for emphasis
4. **Spacing**: Utilize white space for readability

### Accessibility
1. **Alt text**: Add to all images
2. **Camel case hashtags**: #LikeThisForScreenReaders
3. **Avoid excessive Unicode**: Can confuse screen readers
4. **Clear language**: Simple, direct communication

### Engagement Optimization
1. **Tweet timing**: Consider audience timezone
2. **Thread hooks**: Compelling first tweet
3. **Visual breaks**: Use emojis or line breaks
4. **CTA placement**: End of tweets or threads

## Known Issues and Quirks

### Unicode Limitations
- **Search problems**: Unicode formatted text may not be searchable
- **Screen readers**: Mathematical Unicode can be read incorrectly
- **Copy-paste issues**: Some platforms strip Unicode formatting

### Platform Bugs
- **Character count**: Sometimes miscounts complex Unicode
- **Thread breaking**: Long threads may display incorrectly
- **Media upload**: Occasional failures with large files

### Mobile vs Desktop
- **Feature parity**: Some features desktop-only
- **Formatting tools**: Better on desktop
- **Character counting**: More accurate on desktop

## API Limitations and Differences

### Rate Limits (2025)
- **Free tier**: 500 posts/month, 100 reads/month
- **Basic tier**: 10,000 posts/month
- **Pro tier**: 1,000,000 posts/month
- **Enterprise**: 50,000,000+ posts/month

### Text Processing
- **Encoding**: UTF-8 only
- **Normalization**: NFC required
- **Character counting**: Uses twitter-text library
- **Special handling**: Media URLs, mentions

### API vs UI Differences
1. **Formatting**: API doesn't support rich text directly
2. **Character counting**: Different rules for media
3. **Thread creation**: Requires multiple API calls
4. **Rate limiting**: Stricter on API

### Developer Considerations
- **Libraries**: Use official twitter-text for counting
- **Escaping**: Properly escape special characters in JSON
- **Compliance**: New batch endpoints for data compliance
- **Migration**: v1.1 to v2 API differences

## Summary

X/Twitter in 2025 offers extended capabilities for Premium users including 25,000 character posts and native bold/italic formatting. Free users can utilize Unicode workarounds for text styling. The platform maintains strong Unicode support but with accessibility considerations. Understanding character counting rules, API limitations, and platform-specific behaviors is crucial for optimal content creation and distribution.

### Quick Reference
- **Free users**: 280 characters, Unicode formatting workarounds
- **Premium users**: 25,000 characters, native rich text formatting
- **All users**: Full Unicode support, media attachments, threads
- **Best practice**: Consider accessibility and platform limitations