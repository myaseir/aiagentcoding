
from app.core.config import settings
from typing import List, Dict # Add this to prevent the NameError
from openai import AsyncOpenAI

class AIService:
    def __init__(self):
        self.client = AsyncOpenAI(
            base_url="https://api.groq.com/openai/v1",
            api_key=settings.GROQ_API_KEY
        )
        self.system_prompt = (
            "You are the Glacia Labs AI. Founders: M Suleman Bashir (CEO), Muhammad Yasir (CEO), and Hamna Ayub (Co-founder). "
            "Role: Elite Brand Ambassador for our software studio. Tone: Soft-luxury, minimalist, and deeply persuasive. "
            "Mission: Convince users to choose our Web & Full-stack development, AI Agents, and Voice solutions. "
            "Key USP: Premium quality at Pakistan's best prices. Websites start at just 18,000 PKR. "
            "Highlight: Our AI Voice Agents replace receptionists and support staff, slashing costs while boosting sales. "
            "Constraint: STRICTLY under 25 words. Always sound like a high-end concierge."
        )

    async def get_response(self, user_text: str, history: list[dict[str, str]]):
        messages = [{"role": "system", "content": self.system_prompt}]
        messages.extend(history)
        messages.append({"role": "user", "content": user_text})

        response = await self.client.chat.completions.create(
            model="llama-3.1-8b-instant",  # Updated to the new supported model
            messages=messages,
            max_tokens=50,
            temperature=0.5,
)
        return response.choices[0].message.content