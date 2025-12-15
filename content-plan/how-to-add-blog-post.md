
# How to Add a New Blog Post

**Version 2.0 | December 2025**

This document outlines the process for creating, enhancing, and publishing a new blog post for the MarkdownToLinkedIn project.

---

## 1. Initial Setup and Research

### 1.1. Clone the Repository

Ensure you have the latest version of the `markdowntolinkedin` repository cloned to your local machine.

### 1.2. Consult the Content Plan

Review the `linkedin-blog-content.md` file to identify the next priority article. This plan contains the target keyword, a suggested title, and a brief description.

### 1.3. Conduct In-Depth Research

Perform thorough research on the topic:

* Search the web for top-ranking articles on your target keyword
* Find the latest information, statistics, and best practices from reputable sources (LinkedIn Official Blog, Hootsuite, Buffer, Sprout Social, Forbes, etc.)
* Verify all facts against current sources. Do not assume you know the answer; search and confirm.

---

## 2. Content Creation

### 2.1. Create a New Markdown File

In the `src/content/blog/` directory, create a new markdown file. The filename should be the slug defined in the content plan (e.g., `new-blog-post-title.md`).

### 2.2. Frontmatter

Add the necessary frontmatter to the top of the markdown file:

```yaml
---
title: "The Full Title of the Blog Post"
date: "YYYY-MM-DD"
lastUpdated: "YYYY-MM-DD"
category: "Relevant Category"
tags:
  - relevant-tag-1
  - relevant-tag-2
  - relevant-tag-3
excerpt: "A short summary of the post for social media and search engines."
coverImage: "/blog/images/your-cover-image.jpg"
author: "The MarkdownToLinkedIn Team"
---
```

* **`title`** : The title of the blog post.
* **`date`** : The publication date (YYYY-MM-DD).
* **`lastUpdated`** : The date the post was last updated (YYYY-MM-DD).
* **`category`** : The relevant category for the post.
* **`tags`** : A list of relevant tags.
* **`excerpt`** : A short summary for social media and search engines.
* **`coverImage`** : The path to the cover image (stored in `/public/blog/images/`).
* **`author`** : **Always set to "The MarkdownToLinkedIn Team".**

### 2.3. Write the Article

Write the blog post in Markdown following these best practices:

**Structure:**

* **Compelling Introduction:** Start with a hook that draws the reader in and clearly states what they'll learn.
* **TL;DR Section:** Include a "Too Long; Didn't Read" section at the top with a table summarizing key takeaways. This provides immediate value.
* **Clear Headings:** Use headings and subheadings to structure the article logically.
* **Short Paragraphs:** Keep paragraphs focused on a single idea.
* **Strong Conclusion:** End with a summary of main points and a clear call-to-action.

---

## 3. Writing Guidelines (CRITICAL)

Follow these guidelines to ensure your content reads as genuinely human and avoids AI detection flags.

### 3.1. Punctuation Rules

**NEVER use em-dashes (—) anywhere in the content.** This is the #1 AI content marker. Use these alternatives instead:

* Semicolons for connecting related thoughts
* Periods for new sentences
* Commas for pauses
* Parentheses for asides (like this one)

**Limit semicolons** to 1-2 per article. Replace most with periods or conjunctions.

### 3.2. Words and Phrases to AVOID

These words instantly signal AI authorship. Search for them and replace or eliminate entirely.

| ❌ Don't Use          | ✅ Use Instead                            |
| --------------------- | ----------------------------------------- |
| Delve                 | explore, look at, examine, dig into       |
| Navigate              | handle, work through, deal with, manage   |
| Utilize               | use                                       |
| Leverage              | use, apply, take advantage of             |
| Crucial/Vital/Pivotal | important, key, significant               |
| Robust                | strong, solid, reliable                   |
| Comprehensive         | complete, full, thorough                  |
| Landscape/Realm       | field, space, area, world                 |
| Seamless              | smooth, easy, simple                      |
| Strategic             | (often delete entirely, or use "planned") |

**Forbidden Opening Phrases:**

* ❌ "In today's world..." / "In today's digital age..."
* ❌ "In the ever-evolving landscape of..."
* ❌ "In the fast-paced world of..."
* ❌ "Let's delve into..." / "Let's dive into..."
* ❌ "In this article, we will explore..."

**Forbidden Closing Phrases:**

* ❌ "In conclusion..."
* ❌ "In summary..."
* ❌ "To summarize..."
* ❌ "To wrap up..."

Just conclude naturally without announcing it.

**Hedging Phrases to Delete Entirely:**

* ❌ "It's important to note that..."
* ❌ "It's worth noting that..."
* ❌ "It is essential to consider..."

Just make the point directly.

**Formal Transitions to Replace:**

| ❌ AI Loves  | ✅ Humans Say    |
| ------------ | ---------------- |
| Furthermore  | Also, Plus, And  |
| Moreover     | What's more, And |
| Additionally | Also, Plus       |
| Consequently | So, As a result  |
| Nevertheless | But, Still, Yet  |
| Therefore    | So               |

### 3.3. Sentence Structure

**Target this mix:**

* 25% short (5-10 words): punchy, emphatic
* 50% medium (15-20 words): backbone of content
* 25% long (25-35 words): complex ideas

**Critical:** Never have 3+ consecutive sentences of similar length.

**Human techniques to use:**

* Sentence fragments for effect. Like this one.
* Start sentences with "And" or "But" occasionally
* One-word sentences: "Wrong." "Exactly." "Simple."
* Vary paragraph lengths (1-7 sentences)

### 3.4. Voice and Tone

* **Write conversationally** , like you're explaining something to a colleague
* **Use contractions** : don't, won't, it's, you're, can't, we've
* **Write in active voice** : "You should" instead of "It is recommended that"
* **Address readers as "you"** directly
* **Ask direct questions** instead of rhetorical ones that sound robotic
* **Use specific examples** rather than generic statements
* **Express opinions** : "Here's what most people get wrong..." or "The best approach is..."

### 3.5. References and Citations

**Do not use numbered inline citations** like `[1]` or `[2]` in the article body. These are AI content markers.

**Instead:**

* Weave attribution naturally into sentences:
  * ✅ "According to LinkedIn's official data, posts with images get 2x more engagement."
  * ✅ "Research from Hootsuite shows that the best time to post is..."
  * ❌ "Posts with images get 2x more engagement [1]."
* Include an unnumbered **"Resources"** or **"Further Reading"** section at the end:

```markdown
## Resources

- LinkedIn Official Blog: Content Best Practices
- Hootsuite: LinkedIn Marketing Guide
- Buffer: Social Media Engagement Statistics
```

---

## 4. Adding Visuals

Each post must have a **cover image** and at least **one additional visual** (infographic, chart, or contextual image) in the article body.

### 4.1. Image Generation

#### ⚠️ CRITICAL: Use the Correct Model

When generating images with AI, you **MUST** use the Nano Banana Pro model:

| Setting              | Required Value                             |
| -------------------- | ------------------------------------------ |
| **Model Name** | `gemini-3-pro-image-preview`             |
| **Tool**       | Gemini API connector                       |
| **Use For**    | ALL images, infographics, and cover images |

**DO NOT use these models:**

* ❌ `imagen-4.0-generate-00` — Will not work properly for infographics
* ❌ Any other Imagen model
* ❌ Any model other than `gemini-3-pro-image-preview`

The Nano Banana Pro model (`gemini-3-pro-image-preview`) is the **only** model capable of generating quality infographics.

**Fallback options** (only if Nano Banana Pro is unavailable):

1. Replicate MCP with Nano Banana Pro model
2. Royalty-free images from Unsplash, Pexels, or Pixabay (last resort)

### 4.2. Image Storage and Implementation

* **Storage:** Place all images in the `public/blog/images/` directory
* **Filenames:** Use descriptive filenames (e.g., `linkedin-engagement-infographic.png`)
* **Implementation:** Reference images in markdown: `![Descriptive alt text](/blog/images/your-image.png)`
* **Verification:** Ensure all images render correctly with no broken links or watermarks

---

## 5. Final Review Checklist

Before submitting, run through this complete checklist:

### Content Quality

* [ ] Proofread for spelling and grammar errors
* [ ] **No em-dashes (—)** anywhere in the article
* [ ] No AI tell-words (delve, leverage, landscape, robust, comprehensive, strategic, etc.)
* [ ] No forbidden opening phrases ("In today's world...")
* [ ] No forbidden closing phrases ("In conclusion...")
* [ ] Contractions used naturally throughout (you're, it's, don't)
* [ ] Sentence lengths vary dramatically (no 3+ consecutive similar lengths)
* [ ] Active voice used throughout
* [ ] Read aloud test passed: Does it sound like a real person talking?

### References

* [ ] No numbered inline citations `[1]`, `[2]` in article body
* [ ] Sources attributed naturally in prose
* [ ] Unnumbered Resources/Further Reading section at end

### Technical

* [ ] Frontmatter complete and accurate
* [ ] Author set to "The MarkdownToLinkedIn Team"
* [ ] All internal and external links work correctly
* [ ] Cover image exists and displays correctly
* [ ] Additional visuals exist and display correctly
* [ ] Images generated with `gemini-3-pro-image-preview` (Nano Banana Pro)

### SEO

* [ ] Target keyword in title (within first 60 characters)
* [ ] Target keyword in excerpt/meta description
* [ ] Target keyword in first 100 words
* [ ] Target keyword in at least one H2
* [ ] 3-5 internal links to related articles
* [ ] 2-3 external links to authoritative sources
* [ ] Clear call-to-action at article end

---

## 6. Submit for Review

Once the article is complete:

1. **Commit Your Changes:** Add the new `.md` file and any new images to a Git commit.
2. **Run the Build:** Execute `npm run build` and verify no errors occur.
3. **Create a Pull Request:** Push changes and create a PR with title: `blog: Add [Article Title]`
4. **Update the Content Plan:** In the same PR, update the article status in `content-plan/linkedin-blog-content.md` from `[ ]` to `[x]`.

---

## Notes

**Missing Images:** The following placeholder images need to be created:

* `character-limits-2025.jpg` - A visual guide to LinkedIn character limits
* `engagement-tips.jpg` - Generic engagement tips image

These can be created using the Nano Banana Pro model (`gemini-3-pro-image-preview`) via the Gemini API connector.
