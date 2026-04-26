import sys
import os
from contextlib import asynccontextmanager

# --- SYSTEM PATH STABILIZATION ---
# This ensures that whether you run locally or on Vercel, 
# the 'app' module is findable.
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Relative-friendly imports
from app.core.database import init_db
from app.api.v1.assistant import router as assistant_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    try:
        await init_db()
        print("✅ Glacia Systems: Connected to MongoDB Atlas successfully.")
    except Exception as e:
        print(f"❌ Glacia Systems: Database connection failed: {e}")
    yield
    print("🔌 Glacia Systems: Backend services safely terminated.")

app = FastAPI(
    title="Glacia AI Backend",
    description="Professional Voice Intelligence for Glacia Labs",
    version="1.1.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["System"])
async def health():
    return {
        "status": "online",
        "engine": "Llama-3.1-8B-Instant"
    }

app.include_router(
    assistant_router, 
    prefix="/api/v1/assistant", 
    tags=["Assistant"]
)

# CRITICAL: Do NOT include uvicorn.run() directly here for Vercel.
# Vercel handles the server execution.