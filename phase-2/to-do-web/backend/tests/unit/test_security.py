# backend/tests/unit/test_security.py
from src.auth.security import hash_password, verify_password

def test_password_hashing():
    password = "testpassword"
    hashed_password = hash_password(password)
    assert hashed_password != password
    assert verify_password(password, hashed_password)
    assert not verify_password("wrongpassword", hashed_password)
