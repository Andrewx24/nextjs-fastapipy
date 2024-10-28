from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import pywhatkit
from datetime import datetime, timedelta
import logging
import re

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Development
        "https://your-production-domain.com"  # Production (replace with actual domain)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class MessageRequest(BaseModel):
    phone_number: str = Field(..., pattern=r"^\+?\d{10,15}$", description="The phone number in international format, e.g., +1234567890")
    message: str = Field(..., max_length=500, description="The message content to send")
@app.get("/")
async def read_root():
    logger.info("Root endpoint accessed.")
    return {"message": "Hello, World!"}

@app.get("/api/data")
async def get_data():
    logger.info("Data endpoint accessed.")
    return {"data": "This is the backend API"}

@app.post("/api/send-whatsapp")
async def send_whatsapp_message(request: MessageRequest = Body(...)):
    phone_number = request.phone_number
    message = request.message

    # Calculate a time 2 minutes and 10 seconds from now to send the message
    now = datetime.now()
    send_time = now + timedelta(minutes=2, seconds=10)

    try:
        # Log the attempt
        logger.info(f"Attempting to send message to {phone_number} at {send_time.strftime('%H:%M:%S')}")

        # Send the WhatsApp message
        pywhatkit.sendwhatmsg(
            phone_no=phone_number,
            message=message,
            time_hour=send_time.hour,
            time_min=send_time.minute
        )

        logger.info(f"Message scheduled successfully to {phone_number}")
        return {
            "status": "Message scheduled successfully",
            "scheduled_time": send_time.strftime('%Y-%m-%d %H:%M:%S')
        }
    except pywhatkit.main.WAParNotOpenError:
        error_message = "WhatsApp Web is not open or not logged in on the device"
        logger.error(f"Failed to schedule message to {phone_number} - {error_message}")
        raise HTTPException(status_code=500, detail=error_message)
    except pywhatkit.main.CallTimeError:
        error_message = "The scheduled time is invalid. Please try again."
        logger.error(f"Failed to schedule message to {phone_number} - {error_message}")
        raise HTTPException(status_code=400, detail=error_message)
    except Exception as e:
        # Log any other errors
        error_message = f"Failed to schedule message to {phone_number} - Error: {str(e)}"
        logger.error(error_message)
        raise HTTPException(status_code=500, detail="An unexpected error occurred while scheduling the message")
