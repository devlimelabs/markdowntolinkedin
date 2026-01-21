#!/usr/bin/env python3
"""Generate process infographic for LinkedIn bold text formatting."""

import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate process infographic
prompt = """Create a clean, professional infographic showing the step-by-step process for making text bold on LinkedIn.

The infographic should show 4 steps in a vertical or horizontal flow:

Step 1: "Write Your Text"
- Icon or illustration of text being typed
- Example: "This is my LinkedIn post"

Step 2: "Use a Formatter Tool"
- Icon of a tool/converter
- Show text being converted with **bold** markdown or Unicode

Step 3: "Copy Formatted Text"
- Icon of clipboard or copy button
- Show the bold Unicode result: "𝗧𝗵𝗶𝘀 𝗶𝘀 𝗺𝘆 𝗟𝗶𝗻𝗸𝗲𝗱𝗜𝗻 𝗽𝗼𝘀𝘁"

Step 4: "Paste into LinkedIn"
- Icon of LinkedIn logo or post interface
- Show the final bold text in a LinkedIn post

Design requirements:
- Clean, modern style with good visual hierarchy
- Use LinkedIn blue (#0A66C2) as accent color
- Professional business aesthetic
- Clear numbered steps (1, 2, 3, 4)
- Icons or simple illustrations for each step
- Arrows or connectors showing the flow
- White or light background for readability

Style: Professional infographic suitable for a business blog post.
Dimensions: 1200x800 pixels (landscape format)"""

print("Generating process infographic...")
response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Save the image
if response.candidates and response.candidates[0].content.parts:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data') and part.inline_data:
            image_data = part.inline_data.data
            output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-bold-text-process.jpg'
            with open(output_path, 'wb') as f:
                f.write(image_data)
            print(f"Process infographic saved to: {output_path}")
            break
else:
    print("Error: No image data in response")
    print(f"Response: {response}")
