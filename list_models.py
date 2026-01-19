#!/usr/bin/env python3
"""List available Gemini models"""

import os
from google import genai

client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

print("Available models:")
print("-" * 80)

try:
    models = client.models.list()
    for model in models:
        print(f"Name: {model.name}")
        if hasattr(model, 'supported_generation_methods'):
            print(f"  Methods: {model.supported_generation_methods}")
        print()
except Exception as e:
    print(f"Error: {e}")
