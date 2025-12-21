#!/usr/bin/env python3
import os
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Generate cover image
cover_prompt = """Create a professional, modern cover image for a LinkedIn blog post about making text bold on LinkedIn.

The image should feature:
- A clean, professional design with LinkedIn's blue color (#0A66C2) as the primary color
- Visual representation of text transformation from regular to bold
- Typography elements showing the before/after effect
- Modern, minimalist style suitable for a tech blog
- Professional business aesthetic
- The concept of "formatting" or "text styling" should be clear

Style: Modern, clean, professional, tech-focused
Color scheme: LinkedIn blue, white, and subtle gradients
No text overlay needed - this is a cover image"""

print("Generating cover image...")
try:
    response = client.models.generate_content(
        model='nano-banana-pro-preview',
        contents=cover_prompt
    )
    
    # Check if response has images
    if hasattr(response, 'candidates') and response.candidates:
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'inline_data'):
                output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/make-text-bold-linkedin-cover.png'
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                
                with open(output_path, 'wb') as f:
                    f.write(part.inline_data.data)
                
                print(f"Cover image saved to: {output_path}")
                break
    else:
        print("No image in response")
        print(f"Response: {response}")
        
except Exception as e:
    print(f"Error: {e}")

# Generate infographic
infographic_prompt = """Create a clean, professional infographic showing how Unicode bold text works on LinkedIn.

The infographic should include:
- Title: "How Unicode Bold Text Works"
- A visual comparison showing:
  - Regular text: "Hello" (in normal font)
  - Unicode bold: "𝐇𝐞𝐥𝐥𝐨" (in bold-looking characters)
- An arrow or transformation symbol between them
- Brief explanation: "Each letter is replaced with a special Unicode character"
- Examples of the Unicode alphabet (A-Z in bold Unicode)
- LinkedIn blue color scheme (#0A66C2)
- Clean, modern design
- Easy to understand at a glance

Style: Educational infographic, professional, clean layout
Color scheme: LinkedIn blue, white, light gray accents"""

print("\nGenerating infographic...")
try:
    response = client.models.generate_content(
        model='nano-banana-pro-preview',
        contents=infographic_prompt
    )
    
    # Check if response has images
    if hasattr(response, 'candidates') and response.candidates:
        for part in response.candidates[0].content.parts:
            if hasattr(part, 'inline_data'):
                output_path = '/home/ubuntu/markdowntolinkedin/public/blog/images/unicode-bold-infographic.png'
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                
                with open(output_path, 'wb') as f:
                    f.write(part.inline_data.data)
                
                print(f"Infographic saved to: {output_path}")
                break
    else:
        print("No image in response")
        print(f"Response: {response}")
        
except Exception as e:
    print(f"Error: {e}")
