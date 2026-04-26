from app.services.ai_service import AIService
from app.services.voice_service import VoiceService
from app.domain.models import ChatSession

class AssistantManager:
    def __init__(self):
        self.ai = AIService()
        self.voice = VoiceService()

    async def process_voice_turn(self, session_id: str, text: str):
        # 1. Fetch or Create Session Memory
        session = await ChatSession.find_one(ChatSession.session_id == session_id)
        if not session:
            session = ChatSession(session_id=session_id, messages=[])
        
        # 2. Get AI Response
        ai_response = await self.ai.get_response(text, session.messages)
        
        # 3. Update Memory
        session.messages.append({"role": "user", "content": text})
        session.messages.append({"role": "assistant", "content": ai_response})
        await session.save()
        
        # 4. Generate Voice
        audio_bytes = await self.voice.text_to_speech(ai_response)
        
        return audio_bytes, ai_response