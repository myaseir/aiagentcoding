from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Glacia AI Backend"
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "glacia_labs"
    GROQ_API_KEY: str = "your_groq_key_here"
    
    # Add this line to match your .env file
    ENV: str = "development" 

    # This tells Pydantic how to handle the .env file and extra fields
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"  # This is the "magic" line that prevents the error if you add more keys later
    )

settings = Settings()