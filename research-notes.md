# Research Notes: How to Make Text Bold in LinkedIn Posts

## Key Findings

### LinkedIn Native Formatting
- LinkedIn does NOT support native rich text formatting (no built-in bold, italic, underline)
- Only LinkedIn Articles support real rich-text formatting
- Posts, profiles, and comments require workarounds

### Unicode Bold Text Method
- Uses Unicode Mathematical Alphanumeric Symbols
- Characters like 𝗯𝗼𝗹𝗱 are different Unicode characters that LOOK bold
- Not actual formatting, but character replacement
- Example: Regular "b" becomes "𝗯" (Unicode U+1D5EF)

### How Unicode Text Generators Work
- Tools convert regular text to Unicode characters
- Process: Type text → Tool converts to Unicode → Copy → Paste to LinkedIn
- Popular tools: YayText, various LinkedIn text formatters

### Accessibility Concerns (CRITICAL)
Per Axbom (accessibility expert, Aug 2023):
- Screen readers often skip Unicode characters entirely OR read them as mathematical symbols
- Creates confusion and sensory overload for users with assistive technology
- Excludes people using text-to-speech applications

John Espirian (LinkedIn expert, Dec 2019):
- Unicode characters cannot be read by screen readers
- Characters won't be indexed for search purposes (not searchable on LinkedIn)
- Don't appear correctly on old Android devices (show as rectangles)
- Recommendation: Don't use for essential information or keywords

### When to Use Unicode Formatting
- Acceptable for non-essential content
- OK for visual emphasis on secondary points
- Can be used "for fun" but not for critical information
- Should NOT be used for keywords (won't be searchable)

### Alternative: Markdown to LinkedIn Conversion
- Write in markdown (easier workflow for developers/content creators)
- Convert markdown formatting to Unicode
- Tools like MarkdownToLinkedIn automate this process

### Current Best Practices (2025)
From Reply.io (July 2025):
- Over 2 million posts published daily on LinkedIn
- Formatting helps posts stand out
- Benefits: readability, accessibility (when done right), professionalism
- Use formatting strategically, not excessively

### Types of Unicode Formatting Available
- Bold
- Italic
- Bold Italic
- Underline
- Strikethrough
- Monospace
- Small caps
- Script/handwritten style

## Sources Reviewed
1. John Espirian - "How to use bold & italics on LinkedIn" (Dec 2019)
2. Reply.io - "The ONLY Guide to LinkedIn Post Formatting" (July 2025)
3. Per Axbom - "Don't fake bold and italic text with Unicode" (Aug 2023)
4. Various LinkedIn formatting tools and guides

## Article Angle
Focus on DIY manual method while being honest about limitations, then introduce markdown as easier alternative.
