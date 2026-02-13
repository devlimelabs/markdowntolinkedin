#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional blog post cover image for an article titled "How to Add Line Breaks in LinkedIn Posts".

The image should show:
- A split-screen comparison: left side showing messy, collapsed text (wall of text), right side showing well-formatted text with proper line breaks and white space
- Use LinkedIn's brand colors (blue #0A66C2) as accent colors
- Modern, clean design with a professional look
- Include visual elements like text blocks, spacing indicators, or formatting symbols
- The image should convey the problem (collapsed text) and solution (proper formatting)
- Make it eye-catching and suitable for a blog header
- Landscape orientation, suitable for 1200x630px social media sharing

Style: Modern, professional, clean, with good contrast and readability."""

response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Save the image
if response.candidates and response.candidates[0].content.parts:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data') and part.inline_data:
            image_data = part.inline_data.data
            output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-line-breaks-cover.png'
            with open(output_path, 'wb') as f:
                f.write(image_data)
            print(f"Cover image saved to {output_path}")
            break
else:
    print("No image generated")
