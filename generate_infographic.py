#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate infographic
prompt = """Create a professional infographic comparing two methods for making text bold on LinkedIn.

The infographic should show:
- Title at top: "Two Ways to Make Text Bold on LinkedIn"
- Left side: "Manual Method (Unicode)" with icons representing copy-paste workflow
- Right side: "Markdown Method" with icons representing markdown syntax
- Use checkmarks and X marks to show pros and cons
- Clean, modern design with blue and purple color scheme
- Icons for: accessibility issues, SEO problems, time efficiency
- Professional business aesthetic suitable for a tech blog

Style: Clean infographic design, modern, professional, easy to read."""

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
output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/bold-text-methods-comparison.png'
response.generated_images[0].image.save(output_path)
print(f"Infographic saved to: {output_path}")
