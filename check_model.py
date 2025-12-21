#!/usr/bin/env python3
import os
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Check specific models
models_to_check = [
    'gemini-3-pro-image-preview',
    'nano-banana-pro-preview',
    'gemini-2.5-flash-image-preview',
    'gemini-2.5-flash-image',
    'imagen-4.0-generate-001'
]

print("Checking models for image generation:")
for model_name in models_to_check:
    try:
        model = client.models.get(model=model_name)
        print(f"\n{model_name}:")
        print(f"  Display name: {model.display_name if hasattr(model, 'display_name') else 'N/A'}")
        print(f"  Description: {model.description if hasattr(model, 'description') else 'N/A'}")
        print(f"  Supported methods: {model.supported_generation_methods if hasattr(model, 'supported_generation_methods') else 'N/A'}")
    except Exception as e:
        print(f"\n{model_name}: Error - {e}")
