#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate infographic
prompt = """Generate an image: Create an infographic showing "Unicode Bold Text: How It Works".

The infographic should:
- Show a simple 3-step process diagram
- Step 1: Regular text "Hello" in normal font
- Step 2: Arrow pointing to conversion process with text "Unicode Conversion"
- Step 3: Bold Unicode text "𝗛𝗲𝗹𝗹𝗼" 
- Include a visual representation of character transformation
- Use clean, modern design with blue accent colors (#0A66C2)
- Show that it's not real formatting, just different characters
- Include a small warning icon with text "Accessibility Issues"
- Professional, educational style
- Horizontal layout

Style: Clean infographic design, educational, professional, with LinkedIn blue accents.
Aspect ratio: 16:9 horizontal format."""

print("Generating infographic...")

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
                output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/unicode-bold-how-it-works.jpg'
                
                with open(output_path, 'wb') as f:
                    f.write(part.inline_data.data)
                
                print(f"Infographic saved to: {output_path}")
                break
        else:
            print("No image data found in response")
    else:
        print("No content in response")
else:
    print("No candidates in response")
