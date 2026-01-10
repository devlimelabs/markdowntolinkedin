#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional, modern cover image for a blog post about making text bold on LinkedIn. 

The image should feature:
- A clean, minimalist design with a gradient background (blue to purple tones)
- The LinkedIn logo or icon prominently displayed
- Bold text examples showing before/after comparison
- Visual elements suggesting text formatting or typography
- Professional business aesthetic
- No people in the image
- Text overlay reading "How to Make Text Bold on LinkedIn"

Style: Modern, clean, professional, suitable for a tech/business blog."""

response = client.models.generate_images(
    model='imagen-4.0-generate-001',
    prompt=prompt,
    config=types.GenerateImagesConfig(
        number_of_images=1,
        aspect_ratio='16:9',
        safety_filter_level='block_low_and_above',
        person_generation='allow_adult'
    )
)

# Save the image
output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.png'
response.generated_images[0].image.save(output_path)
print(f"Cover image saved to: {output_path}")
