import requests
import json

# Test the signup endpoint
url = "http://127.0.0.1:8000/api/auth/signup"
data = {
    "email": "test@example.com",
    "password": "testpass123"
}

headers = {
    "Content-Type": "application/json"
}

try:
    response = requests.post(url, data=json.dumps(data), headers=headers)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")