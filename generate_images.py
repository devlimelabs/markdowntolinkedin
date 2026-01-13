#!/usr/bin/env python3
import os
from google import genai
from google.genai import types
from PIL import Image

# Initialize the Gemini client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Create output directory
os.makedirs('/home/ubuntu/markdowntolinkedin/public/blog/images/', exist_ok=True)

# Generate cover image
print("Generating cover image...")
cover_prompt = """Create a professional, modern cover image for a blog post about making text bold on LinkedIn.

The image should feature:
- A clean, professional design suitable for a tech blog
- Visual representation of bold text formatting on LinkedIn
- LinkedIn's color scheme (blue #0A66C2 and white)
- Text that says "How to Make Text Bold on LinkedIn"
- Modern, minimalist style with professional business aesthetic
- 16:9 aspect ratio suitable for a blog cover image

The image should be eye-catching but professional, suitable for a B2B audience."""

response = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=[cover_prompt],
)

for part in response.parts:
    if part.inline_data is not None:
        image = part.as_image()
        image.save("/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.jpg")
        print("Cover image saved!")

# Generate infographic
print("\nGenerating infographic...")
infographic_prompt = """Create a professional infographic showing the three methods to make text bold on LinkedIn.

The infographic should include:
- Title: "3 Ways to Bold Text on LinkedIn"
- Three sections arranged vertically or in a grid:
  1. Unicode Converters (with warning icon)
  2. Copy from Word/Docs (with document icon)
  3. Markdown Converter (with checkmark icon, highlighted as recommended)
- Each section should have a brief description
- Use LinkedIn's blue color (#0A66C2) as accent
- Clean, modern design with icons
- Professional business style
- Easy to read and understand

Make it visually appealing and informative."""

response2 = client.models.generate_content(
    model="gemini-2.5-flash-image",
    contents=[infographic_prompt],
)

for part in response2.parts:
    if part.inline_data is not None:
        image = part.as_image()
        image.save("/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-bold-methods-infographic.jpg")
        print("Infographic saved!")

print("\nAll images generated successfully!")
