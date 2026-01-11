#!/usr/bin/env python3
"""
Test script to debug the signup issue by simulating the exact server behavior
"""

import asyncio
from sqlmodel import Session
from src.database import get_session, engine
from src.services.auth import UserService
from src.auth.schemas import UserCreate
from src.auth.security import get_password_hash
from src.main import app
from fastapi.testclient import TestClient

def test_database_connection():
    """Test direct database operations"""
    print("Testing database connection...")
    try:
        with Session(engine) as session:
            print("Database connection successful!")

            # Test creating a user manually
            user_service = UserService(session)
            print("UserService initialized")

            # Create a test user
            test_email = "manual_test@example.com"
            test_password = "testpass123"

            # Check if user already exists
            existing_user = user_service.get_user_by_email(test_email)
            if existing_user:
                print(f"User {test_email} already exists, skipping creation")
            else:
                print(f"Creating user: {test_email}")
                hashed = get_password_hash(test_password)
                print(f"Password hashed successfully: {hashed[:20]}...")

                # Create the user
                from src.db.models import User
                db_user = User(email=test_email, hashed_password=hashed)
                session.add(db_user)
                session.commit()
                session.refresh(db_user)
                print(f"User created successfully with ID: {db_user.id}")

    except Exception as e:
        print(f"Database test failed: {e}")
        import traceback
        traceback.print_exc()

def test_api_endpoint():
    """Test the API endpoint using TestClient"""
    print("\nTesting API endpoint...")
    try:
        client = TestClient(app)

        # Test signup
        response = client.post(
            "/api/auth/signup",
            json={"email": "apitest@example.com", "password": "testpass123"}
        )

        print(f"Signup response status: {response.status_code}")
        print(f"Signup response: {response.text}")

        if response.status_code == 200:
            print("SUCCESS: Signup endpoint is working!")
        else:
            print("FAILED: Signup endpoint failed")

    except Exception as e:
        print(f"API test failed: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_database_connection()
    test_api_endpoint()