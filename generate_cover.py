#!/usr/bin/env python3
"""Generate cover image for blog post using Gemini API (Nano Banana Pro)"""

import os
import base64
from google import genai

# Initialize Gemini client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Cover image prompt
cover_prompt = """Generate a professional, modern cover image for a LinkedIn blog post titled "How to Make Text Bold in LinkedIn Posts Without Special Tools".

Design requirements:
- Clean, professional design suitable for a tech/business blog
- Feature bold text examples and LinkedIn branding colors (blue #0A66C2)
- Show visual contrast between regular and bold text
- Include subtle LinkedIn iconography or UI elements
- Modern gradient background with blue tones
- Typography-focused design showing "BOLD" text prominently
- Professional and eye-catching for social media
- 16:9 aspect ratio, landscape orientation
- No people, just typography and design elements
- Minimalist, clean aesthetic

Create an infographic-style image that demonstrates the concept of bold text formatting on LinkedIn."""

print("Generating cover image with Nano Banana Pro (gemini-3-pro-image-preview)...")

response = client.models.generate_content(
    model='models/gemini-3-pro-image-preview',
    contents=cover_prompt
)

# Check if image was generated
if response.candidates and len(response.candidates) > 0:
    candidate = response.candidates[0]
    if candidate.content and candidate.content.parts:
        for part in candidate.content.parts:
            if hasattr(part, 'inline_data') and part.inline_data:
                # Save the generated image
                output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.jpg'
                
                with open(output_path, 'wb') as f:
                    f.write(part.inline_data.data)
                
                print(f"✓ Cover image saved to: {output_path}")
                break
        else:
            print("✗ No image data found in response")
            print(f"Response: {response}")
    else:
        print("✗ No content in candidate")
        print(f"Response: {response}")
else:
    print("✗ Failed to generate cover image")
    print(f"Response: {response}")
