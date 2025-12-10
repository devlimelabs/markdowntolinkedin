# How to Add a New Blog Post

This document outlines the process for creating, enhancing, and publishing a new blog post for the MarkdownToLinkedIn project.

## 1. Initial Setup and Research

- **Clone the Repository:** Ensure you have the latest version of the `markdowntolinkedin` repository cloned to your local machine.
- **Consult the Content Plan:** Review the `linkedin-blog-content.md` file to identify the next priority article. This plan contains the target keyword, a suggested title, and a brief description.
- **Conduct In-Depth Research:** Perform thorough research on the topic. Use search engines and tools like Ahrefs to find the latest information, statistics, and best practices. Gather insights from reputable sources such as Forbes, Hootsuite, and other industry blogs.

## 2. Content Creation

- **Create a New Markdown File:** In the `src/content/blog/` directory, create a new markdown file. The filename should be the slug defined in the content plan (e.g., `new-blog-post-title.md`).
- **Write the Article:** Write the blog post in Markdown, following these best practices:
    - **Structure:** Use clear headings and subheadings to structure the article.
    - **Introduction:** Start with a compelling introduction that hooks the reader.
    - **TL;DR Section:** Include a "Too Long; Didn't Read" (TL;DR) section at the top with a table summarizing the key takeaways. This provides immediate value to the reader.
    - **Body:** Expand on the key points with detailed explanations, examples, and data. Use short paragraphs and clear language.
    - **Conclusion:** End with a strong conclusion that summarizes the main points and includes a call-to-action.
    - **References:** If you cite any external sources, include a "References" section at the end with numbered links.
    
    **CRITICAL WRITING GUIDELINES (to avoid AI-generated content flags):**
    - **NEVER use em-dashes (—) anywhere in the content.** Use semicolons, periods, commas, or simple sentence breaks instead.
    - **Avoid overly formal or academic language.** Write conversationally, like you're explaining something to a colleague.
    - **Don't overuse corporate buzzwords** like "landscape," "leverage," "strategic," "comprehensive," etc.
    - **Keep sentences simple and direct.** Avoid unnecessarily complex sentence structures.
    - **Write in active voice** whenever possible. Instead of "it is recommended that," write "you should."
    - **Use contractions** like "don't," "won't," "it's" to sound more human.
    - **Ask direct questions** instead of rhetorical ones that sound robotic.
    - **Use specific examples** rather than generic statements.
    - **Avoid starting with phrases** like "In today's landscape," "In a world where," or "In the fast-paced world of."
- **Frontmatter:** Add the necessary frontmatter to the top of the markdown file. This includes:
    - `title`: The title of the blog post.
    - `date`: The publication date (YYYY-MM-DD).
    - `lastUpdated`: The date the post was last updated (YYYY-MM-DD).
    - `category`: The relevant category for the post.
    - `tags`: A list of relevant tags.
    - `excerpt`: A short summary of the post for social media and search engines.
    - `coverImage`: The path to the cover image.
    - `author`: The author's name.

## 3. Adding Visuals

- **Create or Source Images:**
    - **Infographics/Diagrams:** 
      - **For Manus Agent users:** Create diagrams using Mermaid.js. Save the diagram code in a `.mmd` file and render it to a PNG image using the `manus-render-diagram` command.
      - **For all other users:** Use online tools like Canva, Figma, or draw.io to create diagrams and infographics. Alternatively, use AI image generation tools like Replicate MCP, DALL-E, or Midjourney if available.
    - **Cover Images:** Find a high-quality, royalty-free image from sources like Unsplash, Pexels, or Pixabay. The image should be relevant to the blog post's topic.
- **Image Placement:**
    - Place all images in the `public/blog/images/` directory.
    - Use descriptive filenames for your images (e.g., `linkedin-engagement-infographic.png`).
    - Reference the images in your markdown file using the correct path (e.g., `![Alt text for the image](/blog/images/your-image.png)`).

## 4. Final Review and Pull Request

- **Proofread:** Carefully proofread the entire article for any spelling or grammar errors.
- **Check Links:** Ensure all internal and external links are working correctly.
- **Verify Images:** Ensure all referenced images exist in the `public/blog/images/` directory and are properly formatted.
- **Create a Pull Request:** Once the article is complete and all assets are in place, commit your changes and create a pull request to the `main` branch of the `devlimelabs/markdowntolinkedin` repository.

## Notes

**Missing Images:** The following placeholder images need to be created:
- `character-limits-2025.jpg` - A visual guide to LinkedIn character limits
- `engagement-tips.jpg` - Generic engagement tips image (this was replaced with the engagement infographic)

These can be created using the tools mentioned in section 3 above.
