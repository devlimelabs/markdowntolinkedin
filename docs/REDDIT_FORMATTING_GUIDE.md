# Reddit Text Formatting Comprehensive Guide

## Table of Contents
1. [Character Limits](#character-limits)
2. [Supported Formatting Options](#supported-formatting-options)
3. [Platform Differences](#platform-differences)
4. [Unicode Character Support](#unicode-character-support)
5. [Copy-Paste Behavior](#copy-paste-behavior)
6. [Special Features](#special-features)
7. [Subreddit Rules & AutoModerator](#subreddit-rules--automoderator)
8. [Best Practices](#best-practices)
9. [Known Issues & Quirks](#known-issues--quirks)
10. [API Limitations & PRAW](#api-limitations--praw)
11. [Editor Modes Comparison](#editor-modes-comparison)

## Character Limits

### Post Content
- **Old Reddit**: 40,000 characters maximum
- **New Reddit**: 10,000 characters maximum
- **Mobile Apps**: 10,000 characters maximum

### Post Titles
- **Standard Posts**: 300 characters maximum
- **Mobile Ads**: 100 characters maximum
- **Desktop Ads**: 250 characters maximum
- **Note**: Post titles cannot be edited after submission

### Comments
- **Text Comments**: 10,000 characters maximum (estimated, not explicitly documented)
- **Nested Reply Depth**: Maximum 10 levels deep

### Subreddit Descriptions
- **Community Description**: 500 characters maximum (no markdown support)
- **Sidebar**: Supports full markdown formatting

### Other Limits
- **Draft Limit**: Up to 20 drafts can be saved
- **Draft Retention**: Maximum 14 days
- **Username Mentions**: Limited per comment to prevent spam
- **Links**: No hard limit, but excessive links may trigger spam filters

## Supported Formatting Options

### Basic Text Formatting

| Format | Markdown Syntax | Example | Result |
|--------|----------------|---------|---------|
| Italic | `*text*` or `_text_` | `*italic*` | *italic* |
| Bold | `**text**` or `__text__` | `**bold**` | **bold** |
| Bold Italic | `***text***` or `___text___` | `***both***` | ***both*** |
| Strikethrough | `~~text~~` | `~~strike~~` | ~~strike~~ |
| Superscript | `^text` or `^(longer text)` | `2^10` | 2^10 |
| Inline Code | `` `code` `` | `` `print()` `` | `print()` |
| Escape | `\*text\*` | `\*literal\*` | \*literal\* |

### Headers
```markdown
# Header 1
## Header 2
### Header 3
#### Header 4
##### Header 5
###### Header 6
```

### Lists

#### Unordered Lists
```markdown
- Item 1
- Item 2
  - Sub-item 2.1
  - Sub-item 2.2
- Item 3

* Alternative syntax
+ Another alternative
```

#### Ordered Lists
```markdown
1. First item
2. Second item
   1. Sub-item 2.1
   2. Sub-item 2.2
3. Third item
```

### Links
```markdown
[Link text](https://www.example.com)
[Link with title](https://www.example.com "Title text")
<https://www.example.com> (auto-link)
/r/subreddit (auto-link to subreddit)
/u/username (auto-link to user)
```

### Quotes
```markdown
> Single line quote

> Multi-line quote
> continues here
> and here

> Nested quotes
>> Second level
>>> Third level
```

### Code Blocks
````markdown
```
Code block without syntax highlighting
Multiple lines supported
```

```python
# Code block with syntax highlighting
def hello():
    print("Hello, Reddit!")
```

    Alternative: indent with 4 spaces
    for code blocks
````

### Tables
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

| Left align | Center | Right align |
|:-----------|:------:|------------:|
| Left       | Center | Right       |
```

### Horizontal Rules
```markdown
---
***
___
```

## Platform Differences

### Old Reddit (old.reddit.com)
- **Markdown**: Required for all formatting
- **Character Limit**: 40,000 for posts
- **Preview**: No live preview
- **Interface**: Text-only editor
- **Tables**: Full support
- **Custom CSS**: Subreddit styling applies

### New Reddit (www.reddit.com)
- **Editor Options**: 
  - Fancy Pants Editor (WYSIWYG)
  - Markdown Mode (optional)
- **Character Limit**: 10,000 for posts
- **Preview**: Live preview in Fancy Pants
- **Interface**: Rich text editor with toolbar
- **Tables**: Supported in both modes
- **Inline Images**: Supported

### Mobile Apps (Official)
- **iOS App**:
  - Basic markdown support
  - Limited formatting toolbar
  - 10,000 character limit
  - No table support in editor
- **Android App**:
  - Similar to iOS
  - Slightly better markdown rendering
  - Same character limits

### Third-Party Apps
- **Apollo** (iOS - discontinued): Full markdown support
- **Reddit is Fun** (Android): Full markdown support
- **Sync for Reddit**: Enhanced markdown editor
- **Boost**: Custom formatting options

## Unicode Character Support

### Supported Unicode
- **Basic Latin**: Full support (U+0000 to U+007F)
- **Latin-1 Supplement**: Full support (U+0080 to U+00FF)
- **Emoji**: Full support across all platforms
- **Mathematical Alphanumeric Symbols**: Supported (𝐛𝐨𝐥𝐝, 𝑖𝑡𝑎𝑙𝑖𝑐, etc.)
- **Special Characters**: Via HTML entities (`&nbsp;`, `&copy;`, etc.)

### Unicode Input Methods
```markdown
Direct: 🎉 😀 ™ © ® 
HTML Entities: &copy; &reg; &trade; &nbsp;
Mathematical: 𝕕𝕠𝕦𝕓𝕝𝕖 𝓢𝓬𝓻𝓲𝓹𝓽
```

### Limitations
- Some Unicode characters may not render on all devices
- RTL (Right-to-Left) text has limited support
- Combining characters may cause display issues

## Copy-Paste Behavior

### From External Sources

#### Rich Text Sources (Word, Google Docs)
- **Fancy Pants Editor**: Attempts to preserve formatting
- **Markdown Mode**: Strips all formatting
- **Recommendation**: Paste as plain text first

#### Web Pages
- **Links**: Usually preserved
- **Formatting**: Often lost or corrupted
- **Images**: Not preserved (must upload separately)

#### Code Editors
- **Indentation**: Usually preserved
- **Syntax Highlighting**: Lost
- **Line Numbers**: Should be removed before pasting

### Platform-Specific Issues
- **Firefox + Fancy Pants**: Known performance issues
- **Safari**: May add extra line breaks
- **Mobile**: Limited clipboard access

## Special Features

### Spoiler Tags
```markdown
>!Spoiler text here!<
>!Multiple line
spoilers work too!<
```
**Note**: Click to reveal hidden text

### User & Subreddit Mentions
```markdown
/u/username - mentions a user
/r/subreddit - links to a subreddit
u/username - alternative syntax
r/subreddit - alternative syntax
```

### Flairs
- Post flairs: Set via UI or AutoModerator
- User flairs: Subreddit-specific
- Can include emoji and text

### Embedded Media
- **Images**: Direct upload or link
- **Videos**: Direct upload (with limits)
- **GIFs**: Supported via direct upload or Giphy
- **External embeds**: YouTube, Twitter, etc. (auto-embedded from links)

### Live Threads
- Special formatting for live updates
- Chronological ordering
- Limited markdown support

## Subreddit Rules & AutoModerator

### AutoModerator Capabilities

#### Content Filtering
```yaml
# Example AutoModerator rule
type: submission
title (includes): ["buy", "sell", "shop"]
action: remove
action_reason: "Commercial content"
```

#### Formatting Enforcement
- Require specific title formats
- Minimum/maximum character counts
- Banned words or phrases
- Required flairs

#### Common Rules
1. **Title Requirements**
   - Length limits (min/max)
   - Required tags [TAG]
   - No ALL CAPS
   - Specific formats

2. **Content Rules**
   - No URL shorteners
   - Account age requirements
   - Karma thresholds
   - Banned domains

3. **Formatting Rules**
   - No excessive emojis
   - Proper spoiler tags
   - Code block requirements

### Subreddit-Specific Customization
- **CSS Styling** (old Reddit only)
- **Custom flairs**
- **Sidebar rules**
- **Wiki formatting**
- **Post templates**

## Best Practices

### General Formatting
1. **Readability First**
   - Use headers for organization
   - Break up walls of text
   - Use lists for multiple points
   - Add spacing between sections

2. **Mobile Consideration**
   - Avoid complex tables
   - Keep lines shorter
   - Test on mobile before posting
   - Use simple formatting

3. **Accessibility**
   - Describe images in text
   - Avoid only-emoji comments
   - Use clear link text
   - Provide context for quotes

### Code Sharing
```markdown
# DO: Use code blocks for readability
```python
def example():
    return "Clean and readable"
```

# DON'T: Inline long code snippets
def example(): return "Hard to read"
```

### Table Best Practices
- Keep tables simple (3-4 columns max)
- Use alignment sparingly
- Avoid nested formatting in cells
- Consider lists for simple data

### Link Management
- Use descriptive link text
- Avoid URL shorteners
- Check links before posting
- Archive important links

## Known Issues & Quirks

### Formatting Bugs
1. **Nested Formatting**
   - Some combinations break
   - `**bold with _nested italic_**` may fail
   - Tables in spoilers don't work

2. **Mobile Rendering**
   - Tables often break on mobile
   - Long code blocks require horizontal scroll
   - Some Unicode doesn't display

3. **Editor Conflicts**
   - Switching between Fancy Pants and Markdown can corrupt formatting
   - Copy-paste in Fancy Pants is buggy
   - Undo/redo unreliable

### Platform-Specific Issues

#### Firefox + Fancy Pants Editor
- Severe lag when typing
- Copy-paste delays
- Workaround: Use Markdown mode

#### Mobile App Limitations
- No table creation UI
- Limited formatting toolbar
- Preview not always accurate

#### Old Reddit
- No emoji picker
- Manual markdown required
- No drag-drop images

## API Limitations & PRAW

### PRAW (Python Reddit API Wrapper)

#### Features
```python
# PRAW supports full Reddit API
import praw

reddit = praw.Reddit(
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_SECRET",
    user_agent="YOUR_APP_NAME"
)

# Submit with markdown
reddit.subreddit("test").submit(
    title="Test Post",
    selftext="**Bold** and *italic* text"
)
```

#### Rate Limits
- **Requests**: 60 per minute
- **Posts**: Varies by karma/age
- **Comments**: Varies by karma/age
- **Edits**: Less restrictive

#### API Constraints
- Cannot bypass subreddit rules
- AutoModerator still applies
- Character limits enforced
- No special formatting privileges

### Other API Considerations
- Markdown is default format
- HTML must be converted
- Unicode fully supported
- Bulk operations limited

## Editor Modes Comparison

### Fancy Pants Editor (Rich Text)

#### Pros
- Visual formatting
- No markdown knowledge needed
- Drag-drop images
- Live preview
- Formatting toolbar

#### Cons
- Performance issues (especially Firefox)
- Copy-paste bugs
- Sometimes corrupts complex formatting
- Not available on all platforms

#### Best For
- New users
- Simple formatting
- Quick posts
- Image-heavy content

### Markdown Mode

#### Pros
- Full control
- Predictable behavior
- Better performance
- Works everywhere
- Version control friendly

#### Cons
- Learning curve
- No visual preview (on old Reddit)
- Manual syntax required
- Easy to make mistakes

#### Best For
- Power users
- Complex formatting
- Code sharing
- Cross-platform consistency

### Switching Between Modes
1. Can be done per-post
2. Set default in preferences
3. Some formatting may be lost
4. Test before submitting

### Recommendations
- **For automation**: Always use Markdown
- **For beginners**: Start with Fancy Pants
- **For mobile**: Use Markdown
- **For complex posts**: Use Markdown

## Summary

Reddit's text formatting system is powerful but has platform-specific quirks. Understanding these differences helps create better content that works across all Reddit interfaces. Key takeaways:

1. **Character limits vary** by platform (40k vs 10k)
2. **Markdown is universal** but not required everywhere
3. **Mobile has limitations** for complex formatting
4. **AutoModerator rules** vary by subreddit
5. **Unicode support is good** but not perfect
6. **API access** requires respecting limits
7. **Editor choice** impacts user experience

For best results, use simple formatting that works everywhere and test your content across different platforms before posting.