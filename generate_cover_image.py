#!/usr/bin/env python3
"""Generate cover image for LinkedIn bold text blog post using Gemini API."""

import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional, modern cover image for a blog post titled "How to Bold Text on LinkedIn (Desktop & Mobile)".

The image should feature:
- A split-screen design showing a desktop computer on the left and a smartphone on the right
- Both screens displaying LinkedIn's interface with bold text examples
- Clean, professional color scheme using LinkedIn's blue (#0A66C2) as an accent
- Modern, minimalist design aesthetic
- Text overlay at the top: "How to Bold Text on LinkedIn"
- Subtitle: "Desktop & Mobile Guide"
- Professional business/tech style suitable for a LinkedIn formatting tutorial

Style: Clean, modern, professional infographic style with good contrast and readability.
Dimensions: 1200x630 pixels (landscape format for blog cover)"""

print("Generating cover image...")
response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Save the image
if response.candidates and response.candidates[0].content.parts:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data') and part.inline_data:
            image_data = part.inline_data.data
            output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/bold-text-linkedin-desktop-mobile-cover.jpg'
            with open(output_path, 'wb') as f:
                f.write(image_data)
            print(f"Cover image saved to: {output_path}")
            break
else:
    print("Error: No image data in response")
    print(f"Response: {response}")
