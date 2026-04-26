from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.database import init_db
from app.api.v1.assistant import router as assistant_router

# The Lifespan context manager replaces @app.on_event("startup")
# It handles the setup and teardown of the database connection cleanly.
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Logic to run on startup
    try:
        await init_db()
        print("🚀 Glacia Labs AI: MongoDB connection initialized successfully.")
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
    
    yield
    
    # Logic to run on shutdown (if needed)
    print("🔌 Glacia Labs AI: Shutting down backend services.")

# Initialize the FastAPI app with the lifespan handler
app = FastAPI(
    title="Glacia AI Backend",
    description="Production-grade Voice Assistant Backend for Glacia Labs",
    version="1.0.0",
    lifespan=lifespan
)

# Standard Glacia Labs CORS configuration
# This allows your Next.js frontend to talk to this FastAPI backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with ["http://localhost:3000", "https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health Check Endpoint
@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "online", "service": "Glacia AI Backend"}

# Include the Assistant Router
app.include_router(assistant_router, prefix="/api/v1/assistant", tags=["Assistant"])

if __name__ == "__main__":
    import uvicorn
    # Using 0.0.0.0 allows you to access this from your local network (e.g., your phone)
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)