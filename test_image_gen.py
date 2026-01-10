#!/usr/bin/env python3
import os
from google import genai
from google.genai import types

# Initialize the client
client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))

# Try gemini-2.5-flash-image
model_to_test = 'models/gemini-2.5-flash-image'
print(f"Testing model: {model_to_test}")

try:
    response = client.models.generate_images(
        model=model_to_test,
        prompt="A simple blue circle on white background",
        config=types.GenerateImagesConfig(
            number_of_images=1,
            aspect_ratio='16:9'
        )
    )
    print(f"✓ Success with {model_to_test}")
    response.generated_images[0].image.save('/home/ubuntu/test_image.png')
    print("Test image saved to /home/ubuntu/test_image.png")
except Exception as e:
    print(f"✗ Failed with {model_to_test}: {e}")
