INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Add this near the top
    'django.middleware.common.CommonMiddleware',
    # ...
]

# Allow your frontend origin
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]

# Or allow all origins (not recommended for production)
# CORS_ALLOW_ALL_ORIGINS = True