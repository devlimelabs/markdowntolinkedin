#!/usr/bin/env python3
"""Check specific model details"""

import os
from google import genai

client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

models_to_check = [
    'models/gemini-3-pro-image-preview',
    'models/nano-banana-pro-preview',
    'models/gemini-2.5-flash-image',
    'models/gemini-2.0-flash-exp-image-generation'
]

for model_name in models_to_check:
    print(f"\n{'='*80}")
    print(f"Model: {model_name}")
    print('='*80)
    try:
        model = client.models.get(name=model_name)
        print(f"Display name: {model.display_name if hasattr(model, 'display_name') else 'N/A'}")
        print(f"Description: {model.description if hasattr(model, 'description') else 'N/A'}")
        print(f"Supported methods: {model.supported_generation_methods if hasattr(model, 'supported_generation_methods') else 'N/A'}")
    except Exception as e:
        print(f"Error: {e}")
