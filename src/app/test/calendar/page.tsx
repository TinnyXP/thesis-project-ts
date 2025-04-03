"use client";
import { useEffect, useState } from "react";

const API_KEY = "AIzaSyA8n4zPGCmsywdB98QFwsExKv7gkTasDO0";
const CALENDAR_ID = "thesis.bangkachao.64@gmail.com"; // Example: abcd1234@group.calendar.google.com

export default function Page() {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
            );
            const data = await response.json();
            setEvents(data.items || []);
        };
        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Google Calendar Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <strong>{event.summary}</strong> - {event.start?.dateTime || event.start?.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}
