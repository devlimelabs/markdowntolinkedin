#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize client with API key from environment
client = genai.Client(api_key=os.environ['GEMINI_API_KEY'])

# Generate cover image
prompt = """Create a professional, modern cover image for a LinkedIn blog post about line breaks and formatting. 

The image should feature:
- A clean, minimalist design with a professional color palette (blues, whites, grays)
- Visual representation of text formatting with clear line breaks and spacing
- Abstract representation of organized text vs messy text
- Professional business aesthetic suitable for LinkedIn
- Modern typography elements
- No text or words in the image

Style: Clean, professional, modern, minimalist, business-oriented"""

print("Generating cover image...")
response = client.models.generate_images(
    model='gemini-3-pro-image-preview',
    prompt=prompt,
    config=types.GenerateImagesConfig(
        number_of_images=1,
        aspect_ratio='16:9',
        safety_filter_level='block_some',
        person_generation='allow_adult'
    )
)

# Save the image
if response.generated_images:
    image = response.generated_images[0]
    output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-line-breaks-cover.jpg'
    
    with open(output_path, 'wb') as f:
        f.write(image.image.image_bytes)
    
    print(f"Cover image saved to: {output_path}")
else:
    print("No image was generated")
