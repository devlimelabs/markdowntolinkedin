# Research Notes: LinkedIn Line Breaks

## Key Findings

### The Problem
- LinkedIn frequently collapses paragraph breaks into one giant block of text
- Affects both About sections and posts
- Looks fine while editing, but collapses after saving
- This is a widespread issue affecting many users
- Some users report it's a bug on LinkedIn's side
- Inconsistent behavior: some viewers see breaks, others don't

### Methods Users Have Tried (That Don't Always Work)
- Shift + Enter for line breaks
- Zero-width space
- Invisible characters
- Copying from Google Docs → LinkedIn
- Copying from Notepad → LinkedIn
- Adding punctuation at end of paragraphs
- Japanese "kana dot" trick
- Typing directly in LinkedIn

### Solutions That Have Worked
1. **Mobile app workaround**: Re-do everything on Android LinkedIn app, save it, then it populates correctly on all platforms
2. **Delete and recreate**: Delete the About section entirely (including skills), then add section again with new content
3. **Manual entry on mobile**: Delete spaces manually on the app and re-enter them
4. **Use proper line break technique**: Double line breaks (pressing Enter twice) to create paragraph spacing

### Technical Details
- LinkedIn's API uses `\n` for line breaks
- Single line breaks place text on next line
- Double line breaks insert an empty line between text
- Rich text formatting (bold, italics) not supported via API
- Desktop vs mobile formatting can differ

### Best Practices for Line Breaks
- Use double line breaks for paragraph separation
- Single line breaks for subtle spacing
- White space is heavily used on LinkedIn for readability
- After hook/opening line, 1 empty line is enough
- Avoid overusing double line breaks

## Sources to Check
- LinkedIn Official Documentation
- LinkedIn Help Center
- Community forums and discussions
- Technical API documentation


## LinkedIn Character Limits (2025)
- Posts: 3,000 characters
- Comments: 2,000 characters
- Headline: 220 characters (desktop), 240 characters (mobile)
- About section: varies
- Messages: 8,000 characters
- Articles: 110,000 characters when publishing

## Line Break Trends
- Single-sentence paragraphs increasingly popular
- Most posts use 1-2 sentence paragraphs followed by line break
- Double line breaks create empty line between text
- Single line breaks place text on next line without gap
- Overuse of double line breaks can make posts look sparse

## Engagement Data
- Ideal post length: 1,300-1,600 characters for maximum engagement
- Well-structured posts generate up to 3x more engagement
- Mobile users (80% of traffic) prefer shorter, scannable content
- LinkedIn algorithm favors posts that keep users engaged

## Formatting Impact on Readability
- Poorly managed line breaks disrupt flow
- Irregular spacing creates bad reading experience
- Line breaks are "secret weapon" for readability
- Break up content when introducing new points
- Don't lump everything into one big chunk of text

## Unicode and Special Characters
- Unicode characters count toward character limit
- Special characters like < > # % { } [ ] can cause errors
- Formatted text (bold, italic via Unicode) has accessibility issues
- Screen readers struggle with Unicode characters
