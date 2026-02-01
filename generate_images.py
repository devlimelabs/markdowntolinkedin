#!/usr/bin/env python3
import os
from google import genai

# Initialize Gemini client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image for LinkedIn line breaks article
cover_prompt = """Create a professional cover image for a blog post titled "How to Add Line Breaks in LinkedIn Posts".

Design specifications:
- Modern, clean design with professional LinkedIn branding colors (blues and whites)
- Central focus: Visual representation of text formatting with line breaks
- Show a "before and after" comparison:
  * LEFT SIDE: Dense, cluttered text block (hard to read)
  * RIGHT SIDE: Well-spaced text with proper line breaks (easy to read)
- Include subtle LinkedIn logo or iconography
- Typography: Clean, modern sans-serif font
- Visual metaphor: Use spacing lines or paragraph symbols to emphasize line breaks
- Color palette: LinkedIn blue (#0A66C2), white, light gray, with accent colors
- Style: Professional, minimalist, tech-focused
- Text overlay: "How to Add Line Breaks in LinkedIn Posts" in bold, readable font
- Aspect ratio: 16:9 landscape format suitable for blog header
- Include visual indicators like arrows or checkmarks showing "correct" formatting
- Modern gradient or subtle geometric patterns in background
- Ensure high contrast for readability"""

print("Generating cover image...")
response = client.models.generate_images(
    model='imagen-4.0-generate-001',
    prompt=cover_prompt,
    config={
        'number_of_images': 1,
        'aspect_ratio': '16:9'
    }
)

# Save the cover image
if response.generated_images:
    image = response.generated_images[0]
    output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-line-breaks-cover.jpg'
    image.image.save(output_path)
    print(f"✓ Cover image saved to: {output_path}")
else:
    print("✗ No cover image generated")

# Generate infographic for line break techniques
infographic_prompt = """Create a professional infographic showing "LinkedIn Line Break Techniques" with the following content:

Title at top: "LinkedIn Line Break Techniques"

Section 1: "Single Line Break"
- Visual: Two lines of text with minimal spacing
- Label: "Press Enter once"
- Effect: "Places text on next line"

Section 2: "Double Line Break"
- Visual: Two lines of text with empty line between
- Label: "Press Enter twice"
- Effect: "Creates paragraph spacing"

Section 3: "Best Practices"
- Icon + text: "1 empty line after hook"
- Icon + text: "Max 3 lines per paragraph"
- Icon + text: "Use white space for readability"

Section 4: "Common Mistakes"
- Red X icon: "Too many line breaks (looks sparse)"
- Red X icon: "No line breaks (wall of text)"
- Red X icon: "Inconsistent spacing"

Design style:
- Clean, modern layout with LinkedIn blue (#0A66C2) as primary color
- Use icons, visual examples, and clear typography
- White background with subtle gray sections
- Professional, easy to understand at a glance
- Vertical layout suitable for blog post
- High contrast and readability"""

print("\nGenerating infographic...")
response2 = client.models.generate_images(
    model='imagen-4.0-generate-001',
    prompt=infographic_prompt,
    config={
        'number_of_images': 1,
        'aspect_ratio': '9:16'
    }
)

# Save the infographic
if response2.generated_images:
    image2 = response2.generated_images[0]
    output_path2 = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-line-breaks-infographic.jpg'
    image2.image.save(output_path2)
    print(f"✓ Infographic saved to: {output_path2}")
else:
    print("✗ No infographic generated")

print("\n✓ All images generated successfully!")
