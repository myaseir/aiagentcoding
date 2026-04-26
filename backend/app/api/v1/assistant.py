from fastapi import APIRouter, Response, Header
from app.services.assistant_manager import AssistantManager

router = APIRouter()
manager = AssistantManager()

@router.post("/chat")
async def chat_endpoint(user_input: str, x_session_id: str = Header("default_session")):
    audio, text = await manager.process_voice_turn(x_session_id, user_input)
    
    # We return the audio; you can pass the text in custom headers if needed
    return Response(
        content=audio, 
        media_type="audio/mpeg",
        headers={"X-AI-Response": text}
    )