#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional, modern cover image for a LinkedIn blog post about making text bold on LinkedIn.

The image should feature:
- A clean, professional design with LinkedIn's blue color (#0A66C2) as the primary color
- Visual representation of text transformation from regular to bold
- Typography elements showing the before/after effect
- Modern, minimalist style suitable for a tech blog
- Professional business aesthetic
- The concept of "formatting" or "text styling" should be clear

Style: Modern, clean, professional, tech-focused
Color scheme: LinkedIn blue, white, and subtle gradients
No text overlay needed - this is a cover image"""

print("Generating cover image...")
response = client.models.generate_images(
    model='gemini-3-pro-image-preview',
    prompt=prompt,
    config=types.GenerateImagesConfig(
        number_of_images=1,
        aspect_ratio='16:9',
        safety_filter_level='block_only_high',
        person_generation='allow_adult'
    )
)

# Save the image
if response.generated_images:
    image = response.generated_images[0]
    output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.png'
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'wb') as f:
        f.write(image.image.data)
    
    print(f"Cover image saved to: {output_path}")
else:
    print("No image generated")
