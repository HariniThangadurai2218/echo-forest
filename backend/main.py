from fastapi import FastAPI

app = FastAPI(
    title="Echo Forest API",
    description="Backend API for AI-powered forest acoustic monitoring",
    version="0.1.0"
)


@app.get("/")
def root():
    return {
        "message": "Echo Forest API is running",
        "status": "online"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }