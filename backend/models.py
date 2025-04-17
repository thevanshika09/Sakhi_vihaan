from datetime import datetime
from typing import Optional, List, Dict, Any

class UserModel:
    def __init__(self, name: str, email: str, phone: Optional[str] = None):
        self.name = name
        self.email = email
        self.phone = phone
        self.coins = 0
        self.total_scans = 0
        self.reports_submitted = 0
        self.created_at = datetime.now()
        self.updated_at = datetime.now()

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "coins": self.coins,
            "total_scans": self.total_scans,
            "reports_submitted": self.reports_submitted,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class ScanResultModel:
    def __init__(self, user_id: str, scan_type: str, content: str, result: str, details: Dict[str, Any]):
        self.user_id = user_id
        self.scan_type = scan_type  # 'qr', 'upi', 'message'
        self.content = content
        self.result = result  # 'safe', 'warning', 'danger'
        self.details = details
        self.created_at = datetime.now()

    def to_dict(self) -> dict:
        return {
            "user_id": self.user_id,
            "scan_type": self.scan_type,
            "content": self.content,
            "result": self.result,
            "details": self.details,
            "created_at": self.created_at
        }

class CommunityReportModel:
    def __init__(self, user_id: str, report_type: str, content: str, description: str):
        self.user_id = user_id
        self.report_type = report_type  # 'scam', 'fraud', 'suspicious'
        self.content = content
        self.description = description
        self.verified = False
        self.upvotes = 0
        self.created_at = datetime.now()

    def to_dict(self) -> dict:
        return {
            "user_id": self.user_id,
            "report_type": self.report_type,
            "content": self.content,
            "description": self.description,
            "verified": self.verified,
            "upvotes": self.upvotes,
            "created_at": self.created_at
        }

class ActivityModel:
    def __init__(self, user_id: str, activity_type: str, details: Dict[str, Any]):
        self.user_id = user_id
        self.activity_type = activity_type  # 'scan', 'report', 'reward'
        self.details = details
        self.created_at = datetime.now()

    def to_dict(self) -> dict:
        return {
            "user_id": self.user_id,
            "activity_type": self.activity_type,
            "details": self.details,
            "created_at": self.created_at
        } 