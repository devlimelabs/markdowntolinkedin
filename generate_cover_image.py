#!/usr/bin/env python3
import os
import base64
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Generate an image: Create a professional cover image for a blog post titled "How to Make Text Bold in LinkedIn Posts Without Special Tools". 

The image should:
- Feature the LinkedIn logo or LinkedIn-themed colors (blue #0A66C2)
- Show text formatting concepts visually (bold text, formatting symbols)
- Include visual elements like Unicode characters or text transformation
- Have a modern, clean design suitable for a technical blog post
- Be professional and eye-catching
- Include the text "Make Text Bold on LinkedIn" prominently
- Show the concept of text transformation or formatting

Style: Modern, professional, tech-focused, clean design with LinkedIn branding colors.
Aspect ratio: 16:9 horizontal format."""

print("Generating cover image...")

response = client.models.generate_content(
    model='models/gemini-3-pro-image-preview',
    contents=prompt,
    config=types.GenerateContentConfig(
        temperature=0.9,
        response_modalities=["IMAGE"]
    )
)

# Save the image
if response.candidates and len(response.candidates) > 0:
    candidate = response.candidates[0]
    if candidate.content and candidate.content.parts:
        for part in candidate.content.parts:
            if part.inline_data:
                output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.jpg'
                
                with open(output_path, 'wb') as f:
                    f.write(part.inline_data.data)
                
                print(f"Cover image saved to: {output_path}")
                break
        else:
            print("No image data found in response")
    else:
        print("No content in response")
else:
    print("No candidates in response")
