#!/usr/bin/env python3
import os
from google import genai

# Initialize the Gemini client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# List models that might support image generation
image_models = [
    'gemini-3-pro-image-preview',
    'nano-banana-pro-preview',
    'gemini-2.5-flash-image-preview',
    'gemini-2.5-flash-image',
    'gemini-2.0-flash-exp-image-generation',
    'imagen-4.0-generate-001'
]

print("Checking image generation models:")
for model_name in image_models:
    try:
        model = client.models.get(name=model_name)
        print(f"\n✓ {model_name}")
        print(f"  Display name: {model.display_name if hasattr(model, 'display_name') else 'N/A'}")
        print(f"  Description: {model.description if hasattr(model, 'description') else 'N/A'}")
        if hasattr(model, 'supported_generation_methods'):
            print(f"  Methods: {model.supported_generation_methods}")
    except Exception as e:
        print(f"\n✗ {model_name}: {str(e)}")
