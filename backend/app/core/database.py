from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.domain.models import ChatSession
from app.core.config import settings

async def init_db():
    try:
        # Create the client with the Atlas URI
        client = AsyncIOMotorClient(settings.MONGODB_URL)
        
        # Verify the connection is alive
        await client.admin.command('ping')
        
        # Initialize Beanie with your ChatSession model
        await init_beanie(
            database=client[settings.DATABASE_NAME],
            document_models=[ChatSession]
        )
        print("✅ Glacia AI: Connected to MongoDB Atlas successfully.")
    except Exception as e:
        print(f"❌ Glacia AI: Failed to connect to MongoDB Atlas. Error: {e}")
        raise e