import sys
import os
from contextlib import asynccontextmanager

# --- SYSTEM PATH STABILIZATION ---
# Since main.py is INSIDE the 'app' folder, we add the parent directory 
# to sys.path so that 'from app.core...' remains a valid absolute import.
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# These imports now work because the parent directory is in sys.path
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
app = FastAPI(
    title="Glacia AI Backend",
    description="Professional Voice Intelligence for Glacia Labs",
    version="1.1.0",
    lifespan=lifespan
)

# --- SECURITY & CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
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

if __name__ == "__main__":
    import uvicorn
    # Use the string reference so reload works correctly
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)