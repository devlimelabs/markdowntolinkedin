#!/usr/bin/env python3
"""Generate infographic for blog post using Gemini API (Nano Banana Pro)"""

import os
from google import genai

# Initialize Gemini client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Infographic prompt
infographic_prompt = """Create a professional infographic showing "3 Methods to Make Text Bold on LinkedIn".

Design a clean, modern infographic with three distinct sections:

Method 1: LinkedIn Articles
- Icon: Document/article symbol
- Text: "Use LinkedIn's native article feature for built-in bold formatting"

Method 2: Copy from Docs
- Icon: Document transfer/copy symbol  
- Text: "Copy pre-formatted text from Google Docs or Word (limited support)"

Method 3: Markdown Converter
- Icon: Code/markdown symbol
- Text: "Use markdown syntax with a converter tool (easiest method)"

Design requirements:
- Professional blue color scheme matching LinkedIn (#0A66C2)
- Clean, modern layout with numbered sections (1, 2, 3)
- Icons for each method
- Short, clear descriptions
- Visual hierarchy with bold headings
- White background with blue accents
- Typography-focused design
- 16:9 landscape orientation
- Minimalist, infographic style
- No people, just icons and text"""

print("Generating infographic with Nano Banana Pro (gemini-3-pro-image-preview)...")

response = client.models.generate_content(
    model='models/gemini-3-pro-image-preview',
    contents=infographic_prompt
)

# Check if image was generated
if response.candidates and len(response.candidates) > 0:
    candidate = response.candidates[0]
    if candidate.content and candidate.content.parts:
        for part in candidate.content.parts:
            if hasattr(part, 'inline_data') and part.inline_data:
                # Save the generated image
                output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/bold-text-methods-infographic.jpg'
                
                with open(output_path, 'wb') as f:
                    f.write(part.inline_data.data)
                
                print(f"✓ Infographic saved to: {output_path}")
                break
        else:
            print("✗ No image data found in response")
    else:
        print("✗ No content in candidate")
else:
    print("✗ Failed to generate infographic")
