from fastapi.testclient import TestClient
from src.main import app
import json

client = TestClient(app)

print("Testing signup endpoint...")
response = client.post(
    "/api/auth/signup",
    json={"email": "test@example.com", "password": "testpass123"}
)

print(f"Status: {response.status_code}")
print(f"Response: {response.text}")
if response.status_code == 500:
    print("Full response details:", response.__dict__)