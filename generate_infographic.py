#!/usr/bin/env python3
import os
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate infographic
prompt = """Create an infographic comparing different methods to make text bold in LinkedIn posts.

The infographic should show:
- A comparison table or visual comparison of 3 methods:
  1. Copy-Paste from Word/Google Docs (with checkmark and X icons)
  2. LinkedIn Articles (with checkmark and X icons)  
  3. Unicode Characters (with warning icon)

For each method show:
- Pros (green checkmarks)
- Cons (red X marks)
- Accessibility rating (stars or icons)

Visual style:
- Clean, modern infographic design
- LinkedIn blue color scheme (#0077B5)
- Professional and easy to read
- Icons and visual elements
- Clear typography
- White or light background

Make it informative and visually appealing for a blog post."""

print("Generating infographic...")
response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Save the image
if response.candidates and response.candidates[0].content.parts:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data') and part.inline_data:
            output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/linkedin-bold-methods-comparison.jpg'
            
            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            with open(output_path, 'wb') as f:
                f.write(part.inline_data.data)
            
            print(f"Infographic saved to: {output_path}")
            break
    else:
        print("No image data found in response")
else:
    print("Failed to generate image")
    print(f"Response: {response}")
