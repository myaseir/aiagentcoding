from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, AliasChoices
import logging

# Setup a logger to see errors in Vercel logs
logger = logging.getLogger(__name__)

class Settings(BaseSettings):
    # Project Identity
    PROJECT_NAME: str = "Glacia AI Backend"
    ENV: str = "development"

    # Database Configuration
    # We change '...' to a default string to prevent startup crashes
    MONGODB_URL: str = Field(
        default="MISSING", 
        validation_alias=AliasChoices("MONGODB_URL", "MONGODB_URI")
    )
    DATABASE_NAME: str = "glacia_labs"

    # API Keys
    GROQ_API_KEY: str = Field(default="MISSING")

    # Pydantic Settings Configuration
    model_config = SettingsConfigDict(
        # This will look for a .env file locally but won't crash if missing on Vercel
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False 
    )

# Instantiate settings
try:
    settings = Settings()
    
    # Validation check after instantiation
    if settings.MONGODB_URL == "MISSING" or settings.GROQ_API_KEY == "MISSING":
        print("⚠️ WARNING: One or more critical environment variables are missing!")
        print(f"MONGODB_URL status: {'✅ Loaded' if settings.MONGODB_URL != 'MISSING' else '❌ MISSING'}")
        print(f"GROQ_API_KEY status: {'✅ Loaded' if settings.GROQ_API_KEY != 'MISSING' else '❌ MISSING'}")

except Exception as e:
    print(f"❌ Configuration Error during boot: {e}")
    # We still raise e here because if the class structure itself is wrong, 
    # we need to know. But with defaults, it shouldn't raise a ValidationError.
    raise e