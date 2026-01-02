#!/usr/bin/env python3
import os
from google import genai

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# List all available models
print("Available models:")
for model in client.models.list():
    print(f"- {model.name}")
    if hasattr(model, 'supported_generation_methods'):
        print(f"  Supported methods: {model.supported_generation_methods}")
