import sys
import os
from contextlib import asynccontextmanager

# --- SYSTEM PATH STABILIZATION ---
# This ensures that even when running via 'uvicorn', 
# the 'app' module is discoverable.
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import init_db
from app.api.v1.assistant import router as assistant_router

# --- LIFESPAN (Database Init) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handles startup (DB connection) and shutdown logic.
    """
    try:
        await init_db()
        print("✅ Glacia Systems: Connected to MongoDB Atlas successfully.")
    except Exception as e:
        print(f"❌ Glacia Systems: Database connection failed: {e}")
    
    yield
    
    print("🔌 Glacia Systems: Backend services safely terminated.")

# --- APP INSTANCE ---
# This 'app' object is what uvicorn looks for
app = FastAPI(
    title="Glacia AI Backend",
    description="Professional Voice Intelligence for Glacia Labs",
    version="1.1.0",
    lifespan=lifespan
)

# --- SECURITY & CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update to specific domains for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- SYSTEM ENDPOINTS ---
@app.get("/health", tags=["System"])
async def health():
    """Returns the operational status of the Glacia Backend."""
    return {
        "status": "online",
        "latency": "optimized",
        "engine": "Llama-3.1-8B-Instant"
    }

# --- ASSISTANT ROUTING ---
app.include_router(
    assistant_router, 
    prefix="/api/v1/assistant", 
    tags=["Assistant"]
)

# NOTE: The 'if __name__ == "__main__"' block is no longer strictly 
# necessary when using 'uvicorn main:app', but it's good practice 
# to keep it as a fallback for direct script execution.
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)