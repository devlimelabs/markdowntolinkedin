# Discord Text Formatting Guide (2025)

A comprehensive guide to Discord's text formatting capabilities, character limits, and features as of July 2025.

## Table of Contents

1. [Character Limits](#character-limits)
2. [Basic Markdown Formatting](#basic-markdown-formatting)
3. [Advanced Formatting](#advanced-formatting)
4. [Code Blocks and Syntax Highlighting](#code-blocks-and-syntax-highlighting)
5. [Unicode and Emoji Support](#unicode-and-emoji-support)
6. [Special Features](#special-features)
7. [Platform Differences](#platform-differences)
8. [Bot and Embed Formatting](#bot-and-embed-formatting)
9. [Copy-Paste Behavior](#copy-paste-behavior)
10. [Best Practices](#best-practices)
11. [Known Issues and Quirks](#known-issues-and-quirks)
12. [Recent 2025 Updates](#recent-2025-updates)

## Character Limits

### Message Limits
- **Standard users (without Nitro)**: 8,192 characters per message
- **Regular messages**: 2,000 character limit
- **If exceeding limit**: Discord will automatically send as a TXT file attachment
- **Line breaks**: Excessive line breaks can cause truncation even under character limit
- **Usernames**: 32 characters maximum
- **Channel names**: 100 characters maximum

### Important Notes
- Character count includes all alphanumeric characters, symbols, spaces, and embedded formatting codes
- Markdown formatting adds to the character count
- Emojis often use multiple characters in UTF-8 encoding

## Basic Markdown Formatting

Discord uses a variant of Markdown for text formatting. Here are the basic commands:

### Essential Formatting

| Format | Syntax | Example | Result |
|--------|--------|---------|--------|
| Bold | `**text**` | `**bold text**` | **bold text** |
| Italic | `*text*` or `_text_` | `*italic text*` | *italic text* |
| Underline | `__text__` | `__underlined text__` | __underlined text__ |
| Strikethrough | `~~text~~` | `~~strikethrough~~` | ~~strikethrough~~ |
| Spoiler | `\|\|text\|\|` | `\|\|spoiler text\|\|` | ||spoiler text|| |

### Combining Formats
You can combine multiple formatting styles:
- `***bold and italic***` → ***bold and italic***
- `__**underline and bold**__` → __**underline and bold**__
- `__***underline, bold, and italic***__` → __***underline, bold, and italic***__

### Escaping Formatting
Use a backslash (`\`) to escape formatting:
- `\*not italic\*` → \*not italic\*
- `\_\_not underlined\_\_` → \_\_not underlined\_\_

## Advanced Formatting

### Headers (2025 Feature)
Discord now supports headers with the following syntax:
- `# Big Header` (must have space after #)
- `## Medium Header`
- `### Small Header`

### Subtext (2025 Feature)
- Use `-# ` before text to create smaller subtext
- The text automatically becomes smaller after entering `-#`

### Masked Links
Create clickable links with custom text:
- Syntax: `[Link Text](https://example.com)`
- Example: `[Discord](https://discord.com)` → [Discord](https://discord.com)

### Block Quotes
- Single line: `> This is a quote`
- Multi-line: Start each line with `>`

### Lists
- Unordered: Start lines with `*`, `-`, or `+`
- Ordered: Start lines with numbers followed by `.`

## Code Blocks and Syntax Highlighting

### Inline Code
- Use single backticks: `` `code` ``
- Example: `const variable = "value"`

### Code Blocks
- Single line: Wrap in triple backticks
- Multi-line with syntax highlighting:

````
```javascript
function example() {
    return "Hello, Discord!";
}
```
````

### Supported Languages (100+ languages via highlight.js)

**Common languages:**
- `javascript` / `js`
- `python` / `py`
- `java`
- `cpp` / `c++`
- `csharp` / `cs`
- `html`
- `css`
- `bash` / `shell`
- `json`
- `yaml`
- `markdown` / `md`
- `sql`
- `ruby` / `rb`
- `go`
- `rust`
- `typescript` / `ts`
- `php`
- `swift`
- `kotlin`
- `r`
- `matlab`

**Note**: Syntax highlighting is not visible on mobile apps.

### Resources for Complete Language List
- [highlight.js demo](https://highlightjs.org/static/demo/)
- [Discord Syntax Highlighting Tool](https://discord-syntax-highlighting.vercel.app/)

## Unicode and Emoji Support

### Emoji Features
- **Shortcodes**: Type `:emoji_name:` for standard emoji
- **Custom emoji**: `<:custom_name:emoji_id>` (server-specific)
- **Animated emoji**: `<a:animated_name:emoji_id>`
- **Unicode emoji**: Direct character input supported
- **Emoji 15.0**: Full support as of December 2023

### Unicode Characters
- Full Unicode support for special characters and symbols
- Some newer/obscure symbols may show as "tofu" (□) on certain devices
- Mathematical Unicode characters work for stylized text
- Invisible Unicode characters can be used for blank names

### Known Issues
- Automatic conversion of some Unicode characters to emoji
- Use backslash (`\`) before character to prevent conversion
- No way to prevent conversion when pasting text strings

## Special Features

### Mentions
- **User mentions**: `@username` or `<@user_id>`
- **Role mentions**: `@role_name` or `<@&role_id>`
- **Channel mentions**: `#channel_name` or `<#channel_id>`
- **Everyone/Here**: `@everyone` and `@here` (requires permissions)

### Timestamps
Discord supports dynamic timestamps that show in viewer's local time:
- `<t:timestamp>` - Default format
- `<t:timestamp:t>` - Short time (16:20)
- `<t:timestamp:T>` - Long time (16:20:30)
- `<t:timestamp:d>` - Short date (20/04/2021)
- `<t:timestamp:D>` - Long date (20 April 2021)
- `<t:timestamp:f>` - Short date/time
- `<t:timestamp:F>` - Long date/time
- `<t:timestamp:R>` - Relative time (2 months ago)

### Spoiler Tags
- **Text spoilers**: `||hidden text||`
- **Image spoilers**: Click "Mark as Spoiler" before sending
- **Mobile**: Select text and tap "Mark as Spoiler" in context menu
- **Note**: Image spoilers only work on desktop/web, not mobile

## Platform Differences

### Desktop vs Mobile

**Desktop Advantages:**
- Full syntax highlighting in code blocks
- Image spoiler support
- Better control for selective text copying
- Edit mode for copying formatted text

**Mobile Advantages:**
- iOS: Hold text to copy with formatting preserved
- Same Markdown syntax support as desktop
- Recent parity improvements for thread management

**Mobile Limitations:**
- No syntax highlighting visibility
- Cannot add spoilers to images/media
- Limited text selection in messages/embeds
- Copy whole message only (no partial selection)

### Web vs Desktop App
- Generally feature parity
- Web may have slight delays in feature rollout
- Both support all formatting options

## Bot and Embed Formatting

### Embed Limits
- **Title**: 256 characters
- **Description**: 2048 characters (most commonly hit limit)
- **Field name**: 256 characters
- **Field value**: 1024 characters
- **Footer text**: 2048 characters
- **Author name**: 256 characters
- **Total embed characters**: 6000 (across all embeds in message)
- **Number of fields**: 25 maximum

### Message Components
- **Buttons**: 5 per row, 5 rows max (25 total)
- **Select menus**: 1 per row, 5 rows max
- **Text inputs**: Modal forms only

### Bot-Specific Features
- Hyperlinks only work in embeds, not regular messages
- Multi-image embeds now supported on all platforms (2025)
- `EmbedBuilder` utilities available in discord.js
- Rate limit: 5 messages per 5 seconds

## Copy-Paste Behavior

### From Discord
- **Desktop**: Limited formatting preservation
- **iOS**: Better formatting preservation when copying
- **Issue**: Cannot copy with formatting from others' messages

### To Discord
- **From Office apps**: May paste as image instead of text
- **Solution**: Use `Ctrl+Shift+V` (Cmd+Shift+V on Mac) for plain text
- **From web**: Often loses formatting
- **Best practice**: Use code blocks for preserving formatting

### Known Issues
- Excel data may paste as PNG image
- Rich text from word processors loses formatting
- Some Unicode characters convert to emoji on paste
- Line breaks may not preserve correctly

## Best Practices

### For Readability
1. Use headers to organize long messages
2. Employ code blocks for technical content
3. Utilize spoiler tags for sensitive information
4. Break up walls of text with formatting
5. Use masked links instead of raw URLs

### For Accessibility
1. Don't rely solely on color (from bots)
2. Use clear, descriptive link text
3. Avoid excessive formatting that may confuse screen readers
4. Include alt-text descriptions when relevant

### For Performance
1. Be mindful of character limits
2. Split very long messages naturally
3. Use file attachments for extensive text
4. Consider pagination for bot commands

### For Cross-Platform Compatibility
1. Test formatting on both mobile and desktop
2. Avoid platform-specific features for important info
3. Use standard emoji over custom when possible
4. Provide text alternatives for image content

## Known Issues and Quirks

### Current Limitations
1. **Mobile syntax highlighting**: Not visible despite correct formatting
2. **Selective copying**: Difficult on mobile platforms
3. **Embed totals**: 6000 character limit applies to all embeds combined
4. **Auto-emoji conversion**: Cannot fully disable
5. **Formatting in names**: Limited Unicode support varies by platform

### Common Problems
1. **"Tofu" characters**: Newer Unicode may not render
2. **Mention bugs**: Sometimes converts user to role mentions when editing
3. **Spoiler images**: Recent fix for inconsistent behavior
4. **Timestamp formats**: Fixed to interface language
5. **Line break limits**: Can cause premature truncation

### Workarounds
1. Use `\` to escape unwanted formatting
2. Copy from edit mode to preserve formatting
3. Use code blocks to prevent auto-formatting
4. Split messages manually before hitting limits
5. Upload as text file for very long content

## Recent 2025 Updates

### July 2025
- Fixed mention conversion bug when editing messages
- Resolved spoiler tag issues with images
- Fixed iOS DM timestamp preview bug
- Added AV1 video format support

### May 2025
- Better embed scaling with font sizes
- Multi-image embed support on iOS
- Thread creation parity for mobile
- Priority speaking hotkey added

### April 2025
- Thread lock/unlock on mobile without joining
- Various mobile-desktop parity improvements

### General 2025 Features
- Header support with `#`, `##`, `###`
- Subtext support with `-#`
- Improved Unicode emoji support
- Enhanced bot embed capabilities
- Better formatting preservation

---

*This guide is current as of July 2025. Discord regularly updates features, so check official documentation for the latest information.*