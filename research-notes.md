# Research Notes: How to Make Text Bold in LinkedIn Posts Without Special Tools

## Key Facts

### LinkedIn's Native Limitations
- LinkedIn does NOT support native bold, italic, or underline formatting in posts
- Only LinkedIn Articles have rich text formatting (CTRL+B works there)
- Copy-paste from Google Docs/Word only partially works (bold/italic sometimes, but not underlines, colors, etc.)

### Unicode Method (Manual Approach)
- Uses Unicode mathematical characters that LOOK bold
- Tools like YayText, BoldText.io, etc. convert regular text to Unicode bold characters
- Example: Regular "a" becomes Unicode "𝗮" (sans-serif bold)
- These are NOT actual bold formatting, just different Unicode characters

### How Unicode Bold Works
- Unicode contains mathematical alphanumeric symbols
- These include bold versions: 𝗮𝗯𝗰 (sans-serif bold), 𝐚𝐛𝐜 (serif bold)
- Originally intended for mathematical notation, not text styling
- Each letter is replaced with its Unicode bold equivalent

### Accessibility & SEO Issues
1. **Screen readers cannot read Unicode characters** - major accessibility problem
2. **Not searchable** - LinkedIn search won't find Unicode bold text
3. **Not indexed by Google** - hurts SEO
4. **Display issues on old Android devices** - shows as rectangles
5. **Associated with spam** - many scammers use these characters

### Native Formatting Alternatives
1. **Spacing** - Use line breaks to separate ideas (single, double, triple)
2. **Symbols** - Use →, -, =, ~, [], {} for structure
3. **Punctuation** - Colons, semicolons, ellipses for rhythm
4. **Emojis** - Strategic use for bullet points (⭐) or emphasis (👇)
5. **Asterisks** - Frame text like *** DO NOT *** for emphasis

### Markdown to LinkedIn Conversion
- Markdown uses **text** for bold
- Conversion tools replace markdown syntax with Unicode bold characters
- MarkdownToLinkedIn.com is one such tool
- VS Code extension "markdown-to-linkedin" does this conversion

## Sources
- John Espirian article (Dec 2019) - YayText explanation
- Expandi.io formatting guide (Nov 2025)
- inputoutput.dev - Unicode technical explanation
- Multiple LinkedIn posts warning against Unicode bold (2025)

## Article Angle
Focus on:
1. DIY Unicode method (how it works, step-by-step)
2. Why it's problematic (accessibility, SEO)
3. When to use it (sparingly, non-essential text only)
4. Better alternative: Markdown conversion method (easier, same result)
5. Best practice: Native formatting with spacing/symbols
