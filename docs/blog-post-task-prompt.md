Clone https://github.com/devlimelabs/markdowntolinkedin and create the next uncompleted blog post from `content-plan/linkedin-blog-content.md`. Follow the process documented in `content-plan/how-to-add-blog-post.md`.

### Research & Content Requirements

1. **Research Phase**
   - Use Ahrefs MCP to analyze top-ranking articles for the target keyword
   - Search multiple authoritative sources for latest data and statistics
   - Verify all facts—do not rely on assumptions

2. **Content Structure**
   - Include a TLDR/quick-reference element above the fold (table, infographic, or summary box)
   - Follow word count targets from content plan:
     - Listicles: 1,500-2,500 words
     - How-to guides: 2,000-3,000 words
     - Comprehensive guides: 3,000-4,500 words
   - Write in authentic, human voice—avoid AI-detectable patterns
   - Maintain emotionally appropriate tone for subject matter

3. **SEO Checklist**
   - Target keyword in title (first 60 chars)
   - Target keyword in meta description
   - Target keyword in first 100 words
   - Target keyword in at least one H2
   - 2-3 secondary keywords naturally integrated
   - 3-5 internal links to related articles
   - 2-3 external links to authoritative sources
   - Service CTA at article end

4. **Visual Media**
   - **Primary tool: Nano Banana Pro (gemini-3-pro-image-preview) via Gemini API connector** — use this for ALL image and infographic generation
   - Fallback options (only if Nano Banana Pro unavailable): Replicate MCP, then royalty-free web images
   - Create cover image for the article
   - Include 1+ additional visual (infographic, chart, or contextual photo)
   - Verify all image links work—no broken images or watermarks
   - Add descriptive alt text to all images

### Post-Creation Tasks

1. **Update Content Plan**
   - Mark the completed article as done in `content-plan/linkedin-blog-content.md`
   - Note completion date if tracking is specified

2. **Build Verification**
   - Run the build command (`npm run build` or equivalent)
   - Verify new article slug appears in sitemap
   - Confirm no build errors

3. **Create Pull Request**
   - Commit all changes (article, images, content plan update)
   - Create PR with descriptive title: `blog: Add [Article Title]`
   - Include brief summary of article topic in PR description
