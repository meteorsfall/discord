# backend/main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from uuid import uuid4
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Event(BaseModel):
    id: str
    title: str
    start: str
    end: str
    allDay: bool = False

calendar_events: List[Event] = []
JSON_FILE = "events.json"


# -------------------------------
# Persistence helpers
# -------------------------------
def save_to_file():
    with open(JSON_FILE, "w") as f:
        json.dump([e.dict() for e in calendar_events], f, indent=2)

def load_from_file():
    global calendar_events
    if os.path.exists(JSON_FILE):
        with open(JSON_FILE, "r") as f:
            calendar_events[:] = [Event(**e) for e in json.load(f)]

# -------------------------------
# Load events on startup
# -------------------------------
load_from_file()

@app.get("/events", response_model=List[Event])
def get_events():
    return calendar_events

@app.post("/events", response_model=Event)
def add_event(event: Event):
    calendar_events.append(event)
    save_to_file()
    return event

@app.delete("/events/{event_id}")
def delete_event(event_id: str):
    print("Deleting event:", event_id)
    global calendar_events
    calendar_events = [e for e in calendar_events if e.id != event_id]
    save_to_file()
    return {"deleted": event_id}
