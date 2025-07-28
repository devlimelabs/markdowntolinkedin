# Bluesky Text Formatting Guide (2025)

## Table of Contents
1. [Character Limits](#character-limits)
2. [Supported Formatting Options](#supported-formatting-options)
3. [Unicode Character Support](#unicode-character-support)
4. [Copy-Paste Behavior](#copy-paste-behavior)
5. [Special Features](#special-features)
6. [AT Protocol Specifics](#at-protocol-specifics)
7. [Best Practices](#best-practices)
8. [Known Issues](#known-issues)
9. [API Capabilities](#api-capabilities)

## Character Limits

### Post Limits
- **Regular posts**: 300 characters (including replies and posts with media)
- **Bio**: 256 characters
- **Profile name**: 64 characters
- **Handles**: 1-20 characters during handle creation
- **Alt text for images**: 1,000 characters (at UI level)
- **Hashtag limit**: 8 hashtags maximum per post

### Important Notes
- When tagging someone, the domain (e.g., ".bsky.social") counts toward the character limit
- No built-in thread option currently available (must reply to your own posts)
- Cannot edit posts after publishing (proofreading essential)

## Supported Formatting Options

### Current State (2025)
Bluesky **does not** have native text formatting options. The platform lacks built-in support for:
- Bold text
- Italic text
- Strikethrough
- Code blocks
- Underline

### Workarounds
Users rely on third-party tools that use Unicode character substitution:
- **Unicode formatters**: Convert regular text to mathematical bold/italic Unicode characters
- **Third-party tools**: Nuelink, Thriendly, AICarousels, Publer offer Bluesky text formatters
- These tools create "styled" text using special Unicode characters that appear formatted

### Future Development
- Open feature request for official support of bold, italics, underline, and strikethrough
- Community actively requesting native formatting support
- Development focused on expanding the rich text facets system

## Unicode Character Support

### Technical Implementation
- **Encoding**: UTF-8 code units (byte offsets into UTF-8 encoded strings)
- **Important**: Some languages (JavaScript) use UTF-16 or Unicode codepoints for string indexing
  - Must convert to byte arrays before working with facets
  
### Emoji Support
- Full emoji support via standard Unicode
- 🦋 Butterfly emoji commonly used to reference Bluesky (since December 2023)
- Some Unicode symbols (☑, ✔) may display as plain Unicode rather than emoji

### Special Characters
- Mathematical alphanumeric symbols work (for fake bold/italic)
- Unicode bullet points and special markers supported
- Full UTF-8 character set available

## Copy-Paste Behavior

### Standard Behavior
- Regular text copy-paste works as expected
- Unicode-formatted text (fake bold/italic) maintains formatting when pasted
- Emojis copy-paste normally
- Links and mentions preserved through facet system

### Cross-Platform Considerations
- Unicode formatting may not display correctly on all platforms
- Some applications may strip Unicode formatting
- Best to test formatting appearance across different devices

## Special Features

### Mentions
- Format: @handle (e.g., @username.bsky.social)
- Mentions use DIDs (Decentralized Identifiers) internally
- Domain counts toward character limit
- Clickable and searchable

### Links
- Automatic link detection and shortening in display
- Full URLs preserved in facets
- Link cards available (preview without URL text)
- Can delete link text after card generation to save characters

### Hashtags
- Clickable and searchable
- Maximum 8 hashtags per post
- Best practice: 2-5 relevant hashtags
- Case-insensitive
- No spaces allowed (use camelCase or underscores)

### Media Attachments
- **Images**: Up to 4 per post, 1MB each, webp/png formats
- **Videos**: Up to 3 minutes (180 seconds), 1GB max, MP4/MOV formats
- **GIFs**: Via Tenor integration only (no custom uploads yet)
- Each image can have alt text (1,000 character limit)

## AT Protocol Specifics

### Rich Text Facets System
Instead of markup languages, Bluesky uses "facets" - annotations pointing to text locations:

```json
{
  "text": "Hello @alice.bsky.social check out https://example.com",
  "facets": [
    {
      "index": {
        "byteStart": 6,
        "byteEnd": 24
      },
      "features": [{
        "$type": "app.bsky.richtext.facet#mention",
        "did": "did:plc:..."
      }]
    },
    {
      "index": {
        "byteStart": 35,
        "byteEnd": 53
      },
      "features": [{
        "$type": "app.bsky.richtext.facet#link",
        "uri": "https://example.com"
      }]
    }
  ]
}
```

### Why Facets Over Markdown?
1. **Extensibility**: New features without breaking existing clients
2. **Fallback behavior**: Unknown facets can be hidden/warned
3. **Network compatibility**: All clients understand the same system
4. **Clean text**: No visible markup syntax in posts

### Current Facet Types
- `app.bsky.richtext.facet#mention`: Account mentions
- `app.bsky.richtext.facet#link`: URLs
- `app.bsky.richtext.facet#tag`: Hashtags

## Best Practices

### Content Strategy
1. **Engagement First**
   - Reply to others meaningfully
   - Use quote posts to continue conversations
   - Participate in community discussions
   - Don't just broadcast - interact

2. **Posting Frequency**
   - 1-2 posts daily for consistency
   - Quality over quantity
   - Stay active in conversations
   - Few times weekly minimum if not daily

3. **Hashtag Strategy**
   - Use 2-5 relevant hashtags per post
   - Mix general and niche hashtags
   - Research hashtag usage before posting
   - Consider custom feed keywords

### Custom Feeds
- Bluesky's "super-powered hashtags"
- Use specific keywords to appear in feeds
- Add relevant emojis for themed feeds
- Research feed requirements before posting

### Thread Creation
1. Create initial post
2. Reply to your own post immediately
3. Continue replying to build thread
4. Each reply links to previous
5. Keep individual posts under 300 characters

### Character Optimization
- Use link cards instead of full URLs
- Abbreviate when necessary
- Split long content into threads
- Remove domains from mentions when context is clear

## Known Issues

### Current Limitations (2025)
1. **No post editing** - must delete and repost
2. **No native formatting** - only Unicode workarounds
3. **Limited media options** - no custom GIFs, limited video editing
4. **Character counting** - domains in mentions count
5. **Unicode rendering** - some symbols don't display as emoji

### Platform-Specific Issues
- JavaScript requires UTF-8 conversion for facets
- Some third-party clients may not support all facets
- Unicode formatting may break in some contexts
- Alt text limited at UI level despite protocol support

## API Capabilities

### Authentication
- JWT-based authentication system
- Session tokens for API access
- OAuth-style flow for third-party apps

### Post Creation
```javascript
// Example post with facets
{
  "repo": "did:plc:...",
  "collection": "app.bsky.feed.post",
  "record": {
    "text": "Hello World!",
    "createdAt": "2025-01-20T12:00:00Z",
    "facets": [],
    "langs": ["en"]
  }
}
```

### Supported Features
- Multiple embed types (images, external links, quote posts)
- Language detection and tagging
- Rich text facet creation
- Blob references for media
- Thread creation via self-replies

### Rate Limits
- API rate limits apply (check current documentation)
- Bulk operations should be batched
- Media uploads count separately

### Libraries and SDKs
Official libraries available for:
- TypeScript/JavaScript
- Python
- Dart
- Go

### Recent Updates (2025)
1. **Video length increased** to 3 minutes (from 60 seconds)
2. **DM filtering** with "Chat Requests" feature
3. **Simplified muting** from post menus
4. **Enhanced reporting** tools
5. **Optimized tablet** web layout

### Growth Statistics
- 28+ million registered users (early 2025)
- 32+ million active users (March 2025)
- Rapid platform evolution continues

---

## Summary

Bluesky in 2025 remains focused on simplicity with its 300-character limit and facet-based rich text system. While native formatting options are still absent, the platform's unique approach prioritizes compatibility and extensibility across its federated network. Users work around limitations with Unicode formatting tools, while developers can leverage the robust API and facet system for rich interactions. The platform continues to evolve rapidly, with ongoing discussions about expanding formatting capabilities while maintaining backward compatibility.