import subprocess
import time
import requests
import json

def run_server():
    # Start the server in a subprocess
    proc = subprocess.Popen(['python', 'run.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    # Wait a bit for server to start
    time.sleep(5)

    # Test the signup
    try:
        response = requests.post(
            'http://127.0.0.1:8000/api/auth/signup',
            json={'email': 'testuser4@example.com', 'password': 'testpass123'},
            timeout=10
        )
        print(f'Status: {response.status_code}')
        print(f'Response: {response.text}')
    except Exception as e:
        print(f'Request failed: {e}')

    # Give some time for server to output any errors
    time.sleep(5)

    # Terminate the server
    proc.terminate()
    proc.wait()

    # Print server output
    stdout, stderr = proc.communicate()
    print("Server stdout:", stdout)
    print("Server stderr:", stderr)

if __name__ == "__main__":
    run_server()