# Research Notes: LinkedIn Line Breaks

## Key Findings

### The Problem
- LinkedIn sometimes removes line breaks and collapses well-formatted text into a single block
- This happens inconsistently across different devices, browsers, and user accounts
- Users report this issue in About sections, posts, and comments
- It's a rendering/formatting issue, not a user mistake

### Root Causes (from Václav Šulista article, Jan 2026)

1. **Mixed formatting systems**: Using emojis as headers, Unicode bold, different bullet symbols, and manual line breaks creates interpretation conflicts

2. **Copy-paste contamination**: Text from Word, Google Docs, Notion, or AI tools carries invisible characters (non-breaking spaces, soft returns) that accumulate and override paragraph separation

3. **Incorrect bullet syntax**: Missing space after hyphen (e.g., `-Item` instead of `- Item`) can cause LinkedIn to merge entire section

4. **Multiple LinkedIn editors**: LinkedIn runs multiple versions of editors in parallel; content saved in one may render differently in another

### Solutions Found

#### Fix Method (Plain Text Reset)
1. Copy entire About section
2. Paste into plain-text editor (Notepad, Apple Notes in plain mode)
3. Copy again from plain text editor
4. Paste back into LinkedIn
5. Reapply spacing, headings, bullets carefully
6. Ensure empty lines before/after section headers
7. Save and refresh

#### Prevention Best Practices
- Leave one empty line before and after section headers
- Use one bullet style consistently
- Always include space after hyphens
- Avoid heavy formatting inside bullet points
- Perform major edits on desktop, not mobile
- Limit repeated copy-paste cycles from external tools

#### Mobile App Fix (from Reddit)
- Some users report that editing through mobile app preserves line breaks better
- Input line spaces manually through mobile app

#### Unicode Character Workaround (from Reddit)
- Add invisible Unicode character (zero-width or similar): "⠀"
- Add spaces until cursor naturally moves to next line

#### Technical Methods
- Use `\n` for line breaks in API/automation contexts
- Use series of hyphens as section separators

### Additional Context
- LinkedIn uses rich text with embedded formatting metadata (not plain text)
- Platform may interpret spacing/paragraph breaks differently across devices/browsers
- Same content can appear formatted for one viewer, broken for another
- Desktop vs mobile formatting often differs

### Sources
- Václav Šulista LinkedIn article (Jan 8, 2026)
- Reddit r/linkedin discussions (Nov-Dec 2025)
- Various LinkedIn posts and community discussions


## Best Practices for Line Breaks (from Reply.io, July 2025)

### Why Line Breaks Matter
- Long paragraphs = scroll past
- White space = engagement magnet
- Each paragraph should be a single thought or idea
- Gives the eye somewhere to rest
- Keeps people reading

### Optimal Formatting
- Break text into short paragraphs
- Use line breaks often
- Keep paragraphs to 1-2 sentences max (8-15 words ideal)
- One sentence. Enter. Another sentence. Enter again.
- Mix short and long sentences for rhythm

### Visual Hierarchy Tips
- Front-load your hook (first 1-3 lines before "see more" cutoff)
- Use bullet points and dashes to break up ideas
- Add visual anchors (emojis, ALL CAPS sparingly)
- Make content skimmable
- End with clear CTA or strong statement

### Common Mistakes to Avoid
- Wall of text (huge paragraphs with no breaks)
- No structure or flow
- Over-formatting (too many emojis, caps, bullets)
- Weak opening line
- Not previewing on both desktop and mobile

### Key Stats
- Over 2 million LinkedIn posts appear daily
- First 3 lines crucial (LinkedIn truncates posts)
- Mobile formatting differs from desktop
- Well-structured posts get significantly more engagement

## Additional Insights

### Platform Behavior
- LinkedIn uses rich text with embedded formatting metadata
- Not plain text storage
- Different browsers/devices/editor versions interpret spacing differently
- Same content can appear formatted for one viewer, broken for another
- Desktop vs mobile rendering inconsistencies

### Character Limits
- Posts: 3,000 characters maximum
- Comments: 1,250 characters
- About section: 2,600 characters
- Headlines: 220 characters

### Engagement Impact
- Posts with proper formatting get up to 3x more engagement
- White space improves readability dramatically
- Line breaks essential for mobile users (80% of LinkedIn traffic)
- Proper structure helps with algorithm visibility
