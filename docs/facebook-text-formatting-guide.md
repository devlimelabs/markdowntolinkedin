# Facebook Text Formatting Guide (2025)

## Table of Contents
1. [Character Limits](#character-limits)
2. [Supported Formatting Options](#supported-formatting-options)
3. [Unicode Character Support](#unicode-character-support)
4. [Copy-Paste Behavior](#copy-paste-behavior)
5. [Special Features](#special-features)
6. [Platform Differences](#platform-differences)
7. [Best Practices](#best-practices)
8. [Known Issues and Quirks](#known-issues-and-quirks)
9. [API Limitations](#api-limitations)

## Character Limits

### Posts
- **Maximum limit**: 63,206 characters
- **Optimal length**: 40-80 characters (66% higher engagement)
- **Recommended for business pages**: 125 characters
- **Mobile truncation**: Content beyond 125 characters gets cut off with a "more" button

### Comments
- **Maximum limit**: 8,000 characters (previously 1,500)

### Messages (Messenger)
- Character limits not publicly documented but generally very high
- Supports long messages without apparent restrictions

### Stories
- **Truncation**: Similar to posts, cuts off at 125 characters with a "more" button

### Facebook Ads
- **Headlines**: 40 characters
- **Descriptions**: 30 characters (recommended)

### Profile Elements
- **Page names**: 50 characters
- **Bio**: 101 characters
- **Page bio/About section**: 255 characters
- **Username**: 5-50 characters

### Media Captions
- **Photo/video captions**: 2,200 characters

### Articles
- **Maximum**: 125,000 characters (approximately 20,000 words)

## Supported Formatting Options

### Native Formatting Support

Facebook has **very limited native text formatting support**:

1. **Facebook Notes**: The only area with native bold/italic formatting
2. **Facebook Messenger (Desktop only)**:
   - Bold: `*text*` → **text**
   - Italic: `_text_` → _text_
   - Strikethrough: `~text~` → ~~text~~
   - Monospace/Code: `` `text` `` → `text`
3. **Some Facebook Groups**: Limited Markdown support in specific group posts

### Unicode Workarounds

Since Facebook doesn't support native formatting in posts, users rely on Unicode characters:

#### Available Unicode Styles
- **Bold**: 𝐁𝐨𝐥𝐝 𝐓𝐞𝐱𝐭
- **Italic**: 𝐼𝑡𝑎𝑙𝑖𝑐 𝑇𝑒𝑥𝑡
- **Bold Italic**: 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄
- **Script/Cursive**: 𝒮𝒸𝓇𝒾𝓅𝓉 𝒯𝑒𝓍𝓉
- **Fraktur**: 𝔉𝔯𝔞𝔨𝔱𝔲𝔯 𝔗𝔢𝔵𝔱
- **Double-struck**: 𝔻𝕠𝕦𝕓𝕝𝕖 𝕊𝕥𝕣𝕦𝕔𝕜
- **Sans-serif**: 𝖲𝖺𝗇𝗌 𝖲𝖾𝗋𝗂𝖿
- **Monospace**: 𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎
- **Small Caps**: ꜱᴍᴀʟʟ ᴄᴀᴘꜱ
- **Bubble Text**: Ⓑⓤⓑⓑⓛⓔ Ⓣⓔⓧⓣ
- **Upside Down**: ʇxǝ⊥ uʍoᗡ ǝpᴉsdՈ
- **Backwards**: txeT sdrawkcaB

### Lists and Bullets

Facebook doesn't support native list formatting, but Unicode bullets work:
- • Standard bullet
- ◦ Hollow bullet
- ▪ Square bullet
- ➤ Arrow bullet
- ✓ Checkmark
- ★ Star bullet

## Unicode Character Support

### Emoji Support
- **Full emoji support**: All standard Unicode emojis
- **Facebook-specific reactions**: Care emoji (only in reactions)
- **Platform rendering**: Each platform (iOS, Android, Windows) may display emojis slightly differently
- **Windows limitation**: Limited flag emoji support

### Special Characters and Symbols
Facebook supports a wide range of Unicode symbols including:
- Mathematical symbols
- Currency symbols
- Arrows and shapes
- Musical notes
- Various scripts (Greek, Cyrillic, etc.)
- Technical symbols

### Symbol Rules
- Symbols must be **meaningful and not excessive**
- Hate symbols or offensive imagery are prohibited
- Excessive symbols may result in post removal
- Names must use symbols appropriately (e.g., umlauts for actual spelling)

## Copy-Paste Behavior

### General Behavior
- **Auto-conversion**: Facebook automatically converts supported Unicode when pasted
- **Block characters**: May temporarily show as blocks but convert after posting
- **Cross-platform**: Copy-paste works across all major platforms
- **Emoji conversion**: Text emoticons (like `<3`) auto-convert to emojis (❤️)

### From Different Sources
1. **Unicode Text Generators**: Direct copy-paste works smoothly
2. **Word Processors**: Formatting is stripped; only plain text retained
3. **Rich Text Editors**: HTML/RTF formatting removed
4. **Web Pages**: Only text content copied, no styling

## Special Features

### Mentions (@)
- **Format**: @username or @pagename
- **Auto-complete**: Facebook suggests matches as you type
- **Notifications**: Mentioned users receive notifications
- **In comments**: Works the same as in posts

### Hashtags (#)
- **Optimal number**: 1-2 hashtags per post (593 avg. interactions)
- **Format rules**:
  - Single words: #hashtag
  - Multi-word: #HashtagWithoutSpaces
  - Numbers allowed: #2025Trends
  - No special characters: Punctuation breaks the hashtag
- **Natural integration**: Better to use hashtags within sentences
- **Visibility**: Clickable and searchable

### Links
- **Auto-detection**: URLs automatically become clickable
- **Preview cards**: Links generate preview cards with images
- **Link shorteners**: Supported but may affect preview generation
- **Tracking parameters**: UTM parameters work for analytics

### Media Integration
- **Photos**: Up to 1,000 photos per album
- **Videos**: 4GB max file size, 240 minutes max length
- **Stories**: 20 seconds max for video stories
- **Reels**: 90 seconds max length

## Platform Differences

### Personal Profiles
- **Friend limit**: 5,000 friends
- **Followers**: Unlimited followers for public posts
- **Privacy controls**: Granular privacy settings
- **Professional Mode**: Access to creator tools and insights
- **Formatting**: Same limitations as other post types

### Facebook Pages
- **No friend limit**: Unlimited likes/followers
- **Public by default**: All content is public
- **Business tools**: Analytics, scheduling, advertising
- **Admin roles**: Multiple administrators possible
- **Insights**: Detailed analytics about reach and engagement

### Facebook Groups
- **Privacy levels**: Public, Private, or Secret
- **Member limits**: No official limit
- **Moderation tools**: Rules, member screening, post approval
- **Group-specific features**:
  - Polls
  - Events calendar
  - Files section
  - Units/lessons for learning groups
- **Limited Markdown**: Some groups support basic Markdown

### Facebook Messenger
- **Desktop formatting**: Supports *bold*, _italic_, ~strikethrough~, `code`
- **Mobile formatting**: Not supported
- **Message reactions**: Full emoji reactions
- **Chat colors**: Customizable conversation colors
- **Chat nicknames**: Customizable names within conversations

## Best Practices

### Content Length
1. **Keep it short**: 40-80 characters for maximum engagement
2. **Front-load important info**: Key message before the 125-character cutoff
3. **Mobile-first**: Consider mobile truncation in your writing

### Hashtag Usage
1. **Less is more**: Stick to 1-2 relevant hashtags
2. **Be specific**: Use niche hashtags over generic ones
3. **Natural placement**: Integrate hashtags into sentences
4. **Research tags**: Check hashtag popularity and relevance

### Visual Formatting
1. **Use Unicode sparingly**: Too much styled text reduces readability
2. **Consistency**: Stick to one Unicode style per post
3. **Accessibility**: Consider users who may not see Unicode properly
4. **Test first**: Preview how your formatted text looks

### Engagement Optimization
1. **Video first**: Prioritize Reels and short-form video
2. **Ask questions**: Encourage comments and interaction
3. **Use visuals**: Posts with images get 2.3x more engagement
4. **Post timing**: Consider your audience's active hours

## Known Issues and Quirks

### Unicode Limitations
1. **Browser compatibility**: Some browsers don't display all Unicode
2. **Android issues**: Certain Android versions show boxes instead of styled text
3. **Search problems**: Unicode text may not be searchable
4. **Screen reader issues**: Accessibility tools may not read Unicode correctly

### Platform-Specific Issues
1. **Mobile Messenger**: No text formatting support
2. **Facebook Lite**: Limited Unicode rendering
3. **Older devices**: May not support newer Unicode characters
4. **Regional differences**: Some features vary by country

### Common Problems
1. **Copy-paste formatting loss**: Rich text becomes plain text
2. **Hashtag breaking**: Punctuation splits hashtags
3. **Link preview failures**: Some URLs don't generate previews
4. **Character count confusion**: Emojis may count as multiple characters

## API Limitations

### Graph API Text Formatting
1. **No HTML support**: HTML tags display as plain text
2. **Markdown support**: Limited to Workplace posts
3. **No auto-truncation**: Developers must handle text length
4. **Character encoding**: UTF-8 required

### API Limits
1. **Rate limiting**: Varies by app and endpoint
2. **Batch requests**: Maximum 50 requests per batch
3. **Video uploads**: 25MB limit for attachments
4. **Post frequency**: Spam detection may limit rapid posting

### Developer Considerations
1. **Text validation**: Must handle character limits client-side
2. **Encoding issues**: Proper UTF-8 encoding essential
3. **Preview testing**: Test how posts appear before publishing
4. **Error handling**: API provides specific error codes for limit violations

## Recent Updates (2024-2025)

### New Features
- Extended comment character limit to 8,000
- Enhanced Reels duration to 90 seconds
- Improved Unicode rendering on mobile
- Better hashtag discovery algorithms

### Deprecated Features
- Reduced emphasis on hashtag quantity
- Less visibility for link-heavy posts
- De-prioritized text-only posts in favor of visual content

### Future Considerations
- Continued focus on video content
- AI-powered content recommendations
- Enhanced creator tools for Pages
- Potential native formatting support expansion

---

**Note**: This guide reflects Facebook's capabilities as of July 2025. Features and limitations may change as Facebook updates its platform. Always test formatting before important posts and consider your audience's viewing platform.