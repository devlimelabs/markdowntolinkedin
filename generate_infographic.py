#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate infographic
prompt = """Abstract visualization showing three different methods or approaches side by side.
Three vertical panels with simple geometric icons and symbols.
Minimalist design in LinkedIn blue and white colors.
Purely visual, no text, no words, no letters, no labels - only abstract shapes and icons."""

print("Generating infographic...")
response = client.models.generate_images(
    model='imagen-4.0-generate-001',
    prompt=prompt,
    config=types.GenerateImagesConfig(
        number_of_images=1,
        aspect_ratio='16:9'
    )
)

# Save the image
output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-line-breaks-methods.jpg'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

if response.generated_images:
    generated_image = response.generated_images[0]
    # Save the PIL Image
    generated_image.image.save(output_path)
    print(f"Infographic saved to: {output_path}")
else:
    print("No image generated")
