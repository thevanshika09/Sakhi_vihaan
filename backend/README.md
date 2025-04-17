# Sakhi Web Backend

This is the Flask backend for the Sakhi Web application, integrated with Firebase.

## Setup Instructions

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Set up Firebase:
   - Go to the Firebase Console (https://console.firebase.google.com/)
   - Create a new project or select an existing one
   - Go to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the downloaded JSON file as `firebase-credentials.json` in the backend directory

3. Create a `.env` file in the backend directory with your environment variables:
```
FLASK_APP=app.py
FLASK_ENV=development
```

## Running the Backend

1. Start the Flask server:
```bash
python app.py
```

The server will run on http://localhost:5000

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/users` - Create a new user
- `GET /api/users/<user_id>` - Get user by ID

## Connecting with Frontend

The frontend (Next.js) can make API calls to these endpoints. Make sure to handle CORS properly in your frontend requests. 