#!/usr/bin/env python3
"""Generate infographic showing the bold text methods"""

import os
from google import genai
from google.genai import types

# Initialize client with API key from environment
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Prompt for infographic
prompt = """Create a clean, professional infographic showing "3 Methods to Bold Text on LinkedIn".

The infographic should have:
- Title at top: "3 Methods to Bold Text on LinkedIn"
- Three sections arranged vertically, each with an icon and description:

Method 1: Online Text Formatters
- Icon: Computer/browser icon
- Text: "Use tools like YayText or MarkdownToLinkedIn"
- Sub-text: "Type → Format → Copy → Paste"

Method 2: Markdown Converters
- Icon: Markdown symbol or code brackets
- Text: "Convert **bold** markdown to Unicode"
- Sub-text: "Perfect for developers"

Method 3: Browser Extensions
- Icon: Puzzle piece or extension icon
- Text: "Desktop-only Chrome extensions"
- Sub-text: "Format directly in LinkedIn"

Design style:
- Professional blue color scheme (#0A66C2 LinkedIn blue)
- Clean, modern layout with good spacing
- Icons should be simple and clear
- Easy to read typography
- White or light background
- Vertical layout, portrait orientation
- Visual hierarchy with clear sections

Make it look professional and suitable for a tech blog."""

print("Generating infographic...")
print(f"Using model: models/imagen-4.0-generate-001")

try:
    response = client.models.generate_images(
        model='models/imagen-4.0-generate-001',
        prompt=prompt,
        config=types.GenerateImagesConfig(
            number_of_images=1,
            aspect_ratio='9:16'
        )
    )
    
    # Save the image
    if response.generated_images:
        image = response.generated_images[0]
        output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-bold-methods-infographic.jpg'
        
        with open(output_path, 'wb') as f:
            f.write(image.image.image_bytes)
        
        print(f"✓ Infographic saved to: {output_path}")
    else:
        print("✗ No images generated")
        
except Exception as e:
    print(f"✗ Error generating image: {e}")
