#!/usr/bin/env python3
import os
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate infographic
prompt = """Create a professional infographic showing the 3 methods to bold text on LinkedIn.

Design requirements:
- Show 3 distinct sections, one for each method:
  1. Unicode Text Formatter (most common method)
  2. LinkedIn Articles (native formatting)
  3. Copy from Word/Docs (alternative method)
- Each section should have an icon or visual representation
- Use LinkedIn's blue (#0A66C2) as the primary accent color
- Include simple step indicators (1, 2, 3) or arrows showing the flow
- Clean, modern design with good visual hierarchy
- Professional business aesthetic
- Minimal text, focus on visual communication
- Vertical or square layout
- High quality, suitable for embedding in a blog post"""

response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Save the image
output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-bold-text-methods-infographic.jpg'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# The response contains the generated image
if hasattr(response, 'candidates') and response.candidates:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data'):
            with open(output_path, 'wb') as f:
                f.write(part.inline_data.data)
            print(f"Infographic saved to: {output_path}")
            break
else:
    print("No image generated in response")
    print(response)
