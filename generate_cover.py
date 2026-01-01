#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional, modern cover image for a blog post titled "How to Make Text Bold in LinkedIn Posts Without Special Tools".

The image should feature:
- A clean, minimalist design with LinkedIn's brand colors (blue #0A66C2 as primary)
- A smartphone or laptop screen showing a LinkedIn post interface
- Visual emphasis on bold text within the post
- Icons or symbols representing Unicode characters or text formatting
- Professional typography showing "LinkedIn Bold Text" prominently
- A modern gradient background (blue to light blue)
- Clean, corporate aesthetic suitable for a tech/social media blog

Style: Flat design, modern, professional, tech-focused
Aspect ratio: 16:9 (landscape)
No people, focus on the interface and text formatting concept."""

response = client.models.generate_images(
    model='gemini-2.0-flash-exp-image-generation',
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
    
    with open(output_path, 'wb') as f:
        f.write(image.image.data)
    
    print(f"Cover image saved to: {output_path}")
else:
    print("No image generated")
