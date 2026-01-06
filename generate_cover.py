#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional cover image for a blog post about making text bold in LinkedIn posts. 

The image should feature:
- A clean, modern design with LinkedIn's brand colors (blue and white)
- Visual representation of bold text on a LinkedIn post interface
- Professional and minimalist style
- Text overlay reading "How to Make Text Bold in LinkedIn Posts"
- High quality, suitable for a blog cover image (1200x630px aspect ratio)

Style: Modern, clean, professional, tech-focused"""

print("Generating cover image...")

response = client.models.generate_images(
    model='gemini-3-pro-image-preview',
    prompt=prompt,
    config=types.GenerateImagesConfig(
        number_of_images=1,
        aspect_ratio='16:9'
    )
)

# Save the image
if response.generated_images:
    image = response.generated_images[0]
    output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.jpg'
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Save the image
    with open(output_path, 'wb') as f:
        f.write(image.image.data)
    
    print(f"Cover image saved to: {output_path}")
else:
    print("No image generated")
