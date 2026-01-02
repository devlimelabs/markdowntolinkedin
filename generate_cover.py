#!/usr/bin/env python3
import os
import base64
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional, modern cover image for a LinkedIn blog post about making text bold in LinkedIn posts. 

The image should feature:
- A clean, professional design with a blue and white color scheme (LinkedIn brand colors)
- Visual representation of bold text transformation (before/after concept)
- Typography elements showing regular text converting to bold text
- Modern, minimalist style suitable for a tech/social media blog
- No text overlay needed, purely visual design
- Professional business aesthetic

Style: Clean, modern, professional infographic style with a tech-forward look."""

print("Generating cover image...")
response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Check if image was generated
if hasattr(response, 'candidates') and response.candidates:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data'):
            # Save the image
            output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.png'
            with open(output_path, 'wb') as f:
                f.write(part.inline_data.data)
            print(f"Cover image saved to: {output_path}")
            break
else:
    print("No image generated. Response:", response)
