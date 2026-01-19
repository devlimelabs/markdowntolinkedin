#!/usr/bin/env python3
"""Generate cover image for LinkedIn bold text blog post using Nano Banana Pro"""

import os
from google import genai
from google.genai import types

# Initialize client with API key from environment
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Prompt for cover image
prompt = """Create a professional, modern cover image for a blog post titled "How to Bold Text on LinkedIn (Desktop & Mobile)".

The image should feature:
- A split-screen design showing a desktop computer on the left and a mobile phone on the right
- Both screens displaying the LinkedIn interface with bold text examples
- Professional blue color scheme matching LinkedIn's brand (use blues like #0A66C2)
- Clean, minimal design with a gradient background
- Text overlay at the top: "How to Bold Text on LinkedIn"
- Subtitle below: "Desktop & Mobile Guide"
- Modern, professional aesthetic suitable for a tech/social media blog
- High contrast and readability
- 16:9 aspect ratio, landscape orientation

Style: Clean, professional, modern tech illustration with a focus on clarity and visual hierarchy."""

print("Generating cover image...")
print(f"Using model: models/gemini-3-pro-image-preview")

try:
    response = client.models.generate_images(
        model='models/gemini-3-pro-image-preview',
        prompt=prompt,
        config=types.GenerateImagesConfig(
            number_of_images=1,
            aspect_ratio='16:9'
        )
    )
    
    # Save the image
    if response.generated_images:
        image = response.generated_images[0]
        output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/bold-text-linkedin-desktop-mobile-cover.jpg'
        
        with open(output_path, 'wb') as f:
            f.write(image.image.image_bytes)
        
        print(f"✓ Cover image saved to: {output_path}")
    else:
        print("✗ No images generated")
        
except Exception as e:
    print(f"✗ Error generating image: {e}")
