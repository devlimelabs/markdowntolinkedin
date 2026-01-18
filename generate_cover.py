#!/usr/bin/env python3
import os
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional, modern cover image for a LinkedIn blog post about bold text formatting.

Design requirements:
- Show a split-screen concept: left side showing a desktop computer, right side showing a mobile phone
- Both screens should display a LinkedIn post interface with bold text visible
- Use LinkedIn's brand colors (blue #0A66C2) as accent colors
- Include subtle icons or visual elements representing text formatting (bold text symbols)
- Modern, clean design with good contrast
- Professional business aesthetic suitable for LinkedIn
- No text or words in the image
- 16:9 aspect ratio, landscape orientation
- High quality, suitable for a blog header"""

response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Save the image
output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/bold-text-linkedin-desktop-mobile-cover.jpg'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

# The response contains the generated image
if hasattr(response, 'candidates') and response.candidates:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data'):
            with open(output_path, 'wb') as f:
                f.write(part.inline_data.data)
            print(f"Cover image saved to: {output_path}")
            break
else:
    print("No image generated in response")
    print(response)
