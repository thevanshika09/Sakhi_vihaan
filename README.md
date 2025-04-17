# SakhiPay - Financial Safety App

A comprehensive web application for protecting users against online financial fraud and scams.

## Features

- QR Code Scanning
- UPI ID Verification
- Message Scanning
- Community Alerts
- User Rewards System
- Real-time Scam Detection

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Python (v3.8 or higher)
- npm or yarn
- pip (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Make sure you have the service-account.json file in the backend directory
   (This file contains your Firebase credentials)

5. Start the backend server:
```bash
python app.py
```
The backend will run on http://localhost:5000

### Frontend Setup

1. From the root directory, install Node.js dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```
The frontend will run on http://localhost:3000

## API Endpoints

### User Management
- POST /api/users - Create a new user
- GET /api/users - Get all users
- GET /api/users/<user_id> - Get a specific user
- PUT /api/users/<user_id> - Update a user
- DELETE /api/users/<user_id> - Delete a user

### Activity Management
- POST /api/activities - Create a new activity
- GET /api/activities - Get all activities

## Testing the Application

1. Test the backend connection:
   Visit http://localhost:5000/api/test-firestore

2. Test user creation:
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}'
```

## Environment Variables

Create a .env file in the backend directory with:
```
FLASK_APP=app.py
FLASK_ENV=development
``` 