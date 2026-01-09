#!/usr/bin/env python3
import os
from google import genai

# Initialize the Gemini client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional cover image for a blog post about making text bold on LinkedIn without special tools.

Design specifications:
- Modern, clean design with a professional tech aesthetic
- Color scheme: LinkedIn blue (#0A66C2) as primary color, with white and light gray accents
- Layout: Split design with left and right sections
- Left section: Show a LinkedIn post interface mockup with plain text
- Right section: Show the same post with bold text formatting applied
- Include a subtle arrow or transformation indicator between the two sections
- Add text overlay at the top: "How to Make Text Bold in LinkedIn Posts"
- Subtitle below: "Without Special Tools"
- Background: Subtle gradient from light blue to white
- Include small icons representing: keyboard, text formatting, Unicode symbol
- Professional, minimalist style suitable for a tech blog
- Aspect ratio: 16:9 landscape format
- High contrast for readability
- No people or faces, focus on the interface and text transformation concept"""

print("Generating cover image with nano-banana-pro-preview...")
try:
    response = client.models.generate_images(
        model='nano-banana-pro-preview',
        prompt=prompt,
        config={
            'number_of_images': 1,
            'aspect_ratio': '16:9'
        }
    )

    # Save the image
    if response.generated_images:
        image = response.generated_images[0]
        output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.jpg'
        
        with open(output_path, 'wb') as f:
            f.write(image.image.data)
        
        print(f"Cover image saved to: {output_path}")
    else:
        print("No image was generated")
except Exception as e:
    print(f"Error: {e}")
