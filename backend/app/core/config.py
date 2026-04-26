from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    # Project Identity
    PROJECT_NAME: str = Field(default="Glacia AI Backend", env="PROJECT_NAME")
    ENV: str = Field(default="development", env="ENV")

    # Database Configuration
    # We leave the default empty or local so it FORCES the use of .env/Vercel variables
    MONGODB_URL: str = Field(..., env="MONGODB_URL") 
    DATABASE_NAME: str = Field(default="glacia_labs", env="DATABASE_NAME")

    # API Keys
    # Using '...' makes this a REQUIRED field; the app will crash on startup 
    # if the key is missing, which is safer for production.
    GROQ_API_KEY: str = Field(..., env="GROQ_API_KEY")

    # Pydantic Settings Configuration
    model_config = SettingsConfigDict(
        # This looks for a .env file in the same directory
        env_file=".env",
        env_file_encoding="utf-8",
        # 'ignore' allows extra variables in your .env without crashing
        extra="ignore"
    )

# Instantiate settings
try:
    settings = Settings()
except Exception as e:
    print("❌ Configuration Error: Missing required environment variables.")
    print(f"Details: {e}")
    # In a local environment, this helps you debug what's missing
    raise e