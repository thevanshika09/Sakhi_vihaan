from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase_admin import firestore
import os
from dotenv import load_dotenv
from firebase_utils import FirebaseManager
from models import UserModel, ScanResultModel, CommunityReportModel, ActivityModel

# Load environment variables
load_dotenv()

app = Flask(__name__)
# Enable CORS for all routes and origins
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Firebase manager
firebase = FirebaseManager()
# Get Firestore client from the manager
db = firebase.db

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Welcome to Sakhi Web API"}), 200

@app.route('/api/test-firestore', methods=['GET'])
def test_firestore():
    try:
        # Try to write a test document
        doc_ref = db.collection('test').document()
        doc_ref.set({
            'test': True,
            'timestamp': firestore.SERVER_TIMESTAMP
        })
        return jsonify({"message": "Firestore is working correctly"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# User Routes
@app.route('/api/users', methods=['POST'])
def create_user():
    try:
        data = request.json
        user = UserModel(
            name=data['name'],
            email=data['email'],
            phone=data.get('phone')
        )
        result = firebase.create_document('users', user.to_dict())
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    try:
        result = firebase.get_document('users', user_id)
        if result:
            return jsonify(result), 200
        return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.json
        result = firebase.update_document('users', user_id, data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_all_users():
    try:
        result = firebase.get_all_documents('users')
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Scan Routes
@app.route('/api/scans', methods=['POST'])
def create_scan():
    try:
        data = request.json
        scan = ScanResultModel(
            user_id=data['user_id'],
            scan_type=data['scan_type'],
            content=data['content'],
            result=data['result'],
            details=data.get('details', {})
        )
        result = firebase.create_document('scans', scan.to_dict())
        
        # Update user's scan count
        user_doc = firebase.get_document('users', data['user_id'])
        if user_doc:
            user_data = user_doc['data']
            user_data['total_scans'] = user_data.get('total_scans', 0) + 1
            firebase.update_document('users', data['user_id'], user_data)
            
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/scans/<user_id>', methods=['GET'])
def get_user_scans(user_id):
    try:
        scans = firebase.query_documents('scans', 'user_id', '==', user_id)
        return jsonify(scans), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Community Report Routes
@app.route('/api/reports', methods=['POST'])
def create_report():
    try:
        data = request.json
        report = CommunityReportModel(
            user_id=data['user_id'],
            report_type=data['report_type'],
            content=data['content'],
            description=data['description']
        )
        result = firebase.create_document('reports', report.to_dict())
        
        # Update user's report count and add coins
        user_doc = firebase.get_document('users', data['user_id'])
        if user_doc:
            user_data = user_doc['data']
            user_data['reports_submitted'] = user_data.get('reports_submitted', 0) + 1
            user_data['coins'] = user_data.get('coins', 0) + 10  # Reward for reporting
            firebase.update_document('users', data['user_id'], user_data)
            
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/reports', methods=['GET'])
def get_reports():
    try:
        reports = firebase.get_all_documents('reports')
        return jsonify(reports), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Activity Routes
@app.route('/api/activities', methods=['POST'])
def create_activity():
    try:
        data = request.json
        activity = ActivityModel(
            user_id=data['user_id'],
            activity_type=data['activity_type'],
            details=data.get('details', {})
        )
        result = firebase.create_document('activities', activity.to_dict())
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/activities/<user_id>', methods=['GET'])
def get_user_activities(user_id):
    try:
        activities = firebase.query_documents('activities', 'user_id', '==', user_id)
        return jsonify(activities), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the app on all network interfaces
    app.run(host='0.0.0.0', debug=True, port=5000) 