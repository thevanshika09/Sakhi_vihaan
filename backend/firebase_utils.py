from firebase_admin import firestore, credentials, initialize_app
from datetime import datetime
import firebase_admin
import os

class FirebaseManager:
    def __init__(self):
        # Initialize Firebase if not already initialized
        if not firebase_admin._apps:
            # Get the current directory
            current_dir = os.path.dirname(os.path.abspath(__file__))
            service_account_path = os.path.join(current_dir, "service-account.json")
            cred = credentials.Certificate(service_account_path)
            initialize_app(cred)
        self.db = firestore.client()

    def create_document(self, collection_name: str, data: dict):
        """Create a new document in a collection"""
        try:
            # Add timestamp
            data['created_at'] = datetime.now()
            data['updated_at'] = datetime.now()
            
            # Create document
            doc_ref = self.db.collection(collection_name).document()
            doc_ref.set(data)
            return {'id': doc_ref.id, 'data': data}
        except Exception as e:
            print(f"Error creating document: {e}")
            raise e

    def get_document(self, collection_name: str, document_id: str):
        """Get a document by ID"""
        try:
            doc_ref = self.db.collection(collection_name).document(document_id)
            doc = doc_ref.get()
            if doc.exists:
                return {'id': doc.id, 'data': doc.to_dict()}
            return None
        except Exception as e:
            print(f"Error getting document: {e}")
            raise e

    def update_document(self, collection_name: str, document_id: str, data: dict):
        """Update a document"""
        try:
            # Add update timestamp
            data['updated_at'] = datetime.now()
            
            doc_ref = self.db.collection(collection_name).document(document_id)
            doc_ref.update(data)
            return {'id': document_id, 'data': data}
        except Exception as e:
            print(f"Error updating document: {e}")
            raise e

    def delete_document(self, collection_name: str, document_id: str):
        """Delete a document"""
        try:
            self.db.collection(collection_name).document(document_id).delete()
            return {'message': f'Document {document_id} deleted successfully'}
        except Exception as e:
            print(f"Error deleting document: {e}")
            raise e

    def get_all_documents(self, collection_name: str):
        """Get all documents in a collection"""
        try:
            docs = self.db.collection(collection_name).stream()
            return [{'id': doc.id, 'data': doc.to_dict()} for doc in docs]
        except Exception as e:
            print(f"Error getting all documents: {e}")
            raise e

    def query_documents(self, collection_name: str, field: str, operator: str, value: any):
        """Query documents based on field conditions"""
        try:
            docs = self.db.collection(collection_name).where(field, operator, value).stream()
            return [{'id': doc.id, 'data': doc.to_dict()} for doc in docs]
        except Exception as e:
            print(f"Error querying documents: {e}")
            raise e 