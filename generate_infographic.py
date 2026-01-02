#!/usr/bin/env python3
import os
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate infographic
prompt = """Create a professional infographic showing the Unicode bold text conversion process for LinkedIn posts.

The infographic should show:
- Step-by-step visual flow from left to right
- Step 1: Regular text "Hello LinkedIn" in a text box
- Step 2: Arrow pointing to a Unicode converter tool icon
- Step 3: Bold Unicode text "𝗛𝗲𝗹𝗹𝗼 𝗟𝗶𝗻𝗸𝗲𝗱𝗜𝗻" in a text box
- Step 4: Arrow pointing to LinkedIn logo or post mockup
- Clean, modern design with blue and white color scheme
- Professional business aesthetic
- Icons and visual elements that clearly communicate the process

Style: Clean, modern infographic with clear visual hierarchy and professional design."""

print("Generating infographic...")
response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Check if image was generated
if hasattr(response, 'candidates') and response.candidates:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data'):
            # Save the image
            output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/unicode-bold-text-process.png'
            with open(output_path, 'wb') as f:
                f.write(part.inline_data.data)
            print(f"Infographic saved to: {output_path}")
            break
else:
    print("No image generated. Response:", response)
