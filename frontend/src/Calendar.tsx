import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import type {DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function CalendarApp() {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Fetch events from FastAPI backend
  const fetchEvents = async () => {
    const res = await fetch('http://localhost:8000/events');
    const data = await res.json();
    setEvents(data);
  };

  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    const title = prompt('Enter event title:');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

      const newEvent = {
        id: crypto.randomUUID(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
      await fetch('http://localhost:8000/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent),
      });

      fetchEvents(); // refresh state
    }
  };

  const handleEventClick = async (clickInfo: EventClickArg) => {
    if (window.confirm('Delete this event?')) {
      await fetch(`http://localhost:8000/events/${clickInfo.event.id}`, {
        method: 'DELETE',
      });

      fetchEvents(); // refresh state
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto' }}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        editable={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        events={events} // optional: start empty
      />
    </div>
  );
}
