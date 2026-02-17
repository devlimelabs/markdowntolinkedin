#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Abstract geometric composition showing horizontal bars and lines with spacing between them. 
Minimalist design in shades of blue and white. Clean, professional aesthetic.
No text, no letters, no words, no logos, no symbols, purely abstract geometric shapes."""

print("Generating cover image...")
response = client.models.generate_images(
    model='imagen-4.0-generate-001',
    prompt=prompt,
    config=types.GenerateImagesConfig(
        number_of_images=1,
        aspect_ratio='16:9'
    )
)

# Save the image
output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-line-breaks-cover.jpg'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

if response.generated_images:
    generated_image = response.generated_images[0]
    # Save the PIL Image
    generated_image.image.save(output_path)
    print(f"Cover image saved to: {output_path}")
else:
    print("No image generated")
