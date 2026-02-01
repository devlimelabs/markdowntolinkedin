#!/usr/bin/env python3
import os
from google import genai

# Initialize Gemini client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image for LinkedIn line breaks article
prompt = """Create a professional cover image for a blog post titled "How to Add Line Breaks in LinkedIn Posts".

Design specifications:
- Modern, clean design with professional LinkedIn branding colors (blues and whites)
- Central focus: Visual representation of text formatting with line breaks
- Show a "before and after" comparison:
  * LEFT SIDE: Dense, cluttered text block (hard to read)
  * RIGHT SIDE: Well-spaced text with proper line breaks (easy to read)
- Include subtle LinkedIn logo or iconography
- Typography: Clean, modern sans-serif font
- Visual metaphor: Use spacing lines or paragraph symbols to emphasize line breaks
- Color palette: LinkedIn blue (#0A66C2), white, light gray, with accent colors
- Style: Professional, minimalist, tech-focused
- Text overlay: "How to Add Line Breaks in LinkedIn Posts" in bold, readable font
- Aspect ratio: 16:9 landscape format suitable for blog header
- Include visual indicators like arrows or checkmarks showing "correct" formatting
- Modern gradient or subtle geometric patterns in background
- Ensure high contrast for readability"""

print("Generating cover image with imagen-4.0...")
response = client.models.generate_images(
    model='imagen-4.0-generate-001',
    prompt=prompt,
    config={
        'number_of_images': 1,
        'aspect_ratio': '16:9'
    }
)

# Save the generated image
if response.generated_images:
    image = response.generated_images[0]
    output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-line-breaks-cover.jpg'
    
    # The image object has the data directly
    with open(output_path, 'wb') as f:
        # Try different ways to access the image data
        if hasattr(image, 'data'):
            f.write(image.data)
        elif hasattr(image.image, 'data'):
            f.write(image.image.data)
        else:
            # Save the image object directly
            image.save(output_path)
    
    print(f"Cover image saved to: {output_path}")
else:
    print("No image generated")
