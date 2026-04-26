import sys
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

# This is the most stable way for Vercel to find your 'app' module
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings
from app.core.database import init_db
from app.api.v1.assistant import router as assistant_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # This matches your working project's style
    if settings.MONGODB_URL == "MISSING":
        print("❌ CRITICAL: MONGODB_URL is not set in Vercel!")
    else:
        await init_db()
    yield