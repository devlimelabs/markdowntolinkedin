#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate infographic
prompt = """Create a clean, professional infographic showing "The Plain Text Reset Method" for fixing LinkedIn line breaks.

The infographic should show a 3-step process:
1. Copy your text from LinkedIn
2. Paste into a plain text editor (show icons for Notepad/TextEdit)
3. Copy again and paste back to LinkedIn

Visual elements:
- Use arrows or numbered steps to show the flow
- Include simple icons representing: LinkedIn logo, text editor, and copy/paste actions
- Use LinkedIn's blue (#0A66C2) as the primary accent color
- Clean, modern design with plenty of white space
- Easy to read at a glance
- Professional and instructional style
- Portrait or square orientation

Style: Clean, professional, instructional, with clear visual hierarchy and easy-to-follow steps."""

response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Save the image
if response.candidates and response.candidates[0].content.parts:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data') and part.inline_data:
            image_data = part.inline_data.data
            output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/plain-text-reset-method.png'
            with open(output_path, 'wb') as f:
                f.write(image_data)
            print(f"Infographic saved to {output_path}")
            break
else:
    print("No image generated")
