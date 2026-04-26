from beanie import Document
from datetime import datetime
from typing import List, Dict

class ChatSession(Document):
    session_id: str
    messages: List[Dict[str, str]] = [] # Role: content pairs
    updated_at: datetime = datetime.now()

    class Settings:
        name = "chat_sessions"