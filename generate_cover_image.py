#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the Gemini client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional, modern cover image for a blog post about making text bold on LinkedIn.

The image should feature:
- A clean, professional design suitable for a tech blog
- Visual representation of bold text formatting
- LinkedIn's color scheme (blue and white)
- Text that says "How to Make Text Bold on LinkedIn"
- Modern, minimalist style
- Professional business aesthetic

The image should be eye-catching but professional, suitable for a B2B audience."""

response = client.models.generate_images(
    model='gemini-3-pro-image-preview',
    prompt=prompt,
    config=types.GenerateImageConfig(
        number_of_images=1,
        aspect_ratio='16:9'
    )
)

# Save the image
if response.generated_images:
    image = response.generated_images[0]
    output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.jpg'
    
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'wb') as f:
        f.write(image.image.image_bytes)
    
    print(f"Cover image saved to: {output_path}")
else:
    print("No image generated")
