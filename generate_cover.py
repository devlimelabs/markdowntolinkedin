#!/usr/bin/env python3
import os
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
prompt = """Create a professional cover image for a blog post about making text bold in LinkedIn posts. 

The image should feature:
- A clean, modern design with LinkedIn's blue color scheme (#0077B5)
- Visual representation of text formatting (bold text examples)
- Professional business aesthetic
- Text overlay: "How to Make Text Bold in LinkedIn Posts"
- Include subtle LinkedIn iconography or interface elements
- High contrast and easy to read
- 16:9 aspect ratio, suitable for a blog header

Style: Modern, professional, clean design with a focus on typography and formatting"""

print("Generating cover image...")
response = client.models.generate_content(
    model='gemini-3-pro-image-preview',
    contents=prompt
)

# Save the image
if response.candidates and response.candidates[0].content.parts:
    for part in response.candidates[0].content.parts:
        if hasattr(part, 'inline_data') and part.inline_data:
            output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.jpg'
            
            # Create directory if it doesn't exist
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            with open(output_path, 'wb') as f:
                f.write(part.inline_data.data)
            
            print(f"Cover image saved to: {output_path}")
            break
    else:
        print("No image data found in response")
else:
    print("Failed to generate image")
    print(f"Response: {response}")
