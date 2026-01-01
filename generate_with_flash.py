#!/usr/bin/env python3
import os
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Try to generate image using Gemini 2.5 Flash
prompt = """Generate an image: Create a professional, modern cover image for a blog post titled "How to Make Text Bold in LinkedIn Posts Without Special Tools".

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

try:
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt
    )
    print("Response:", response.text)
except Exception as e:
    print(f"Error: {e}")
