import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import EventService from "../../services/EventService";

export default function RegisterEvent() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    EventService.getEventById(eventId).then((res) => setEvent(res.data));
  }, [eventId]);

  return (
    <div>
      <h1>Register Event</h1>
      <h2>Event Details:</h2>
      <p>Event Name: {event.name}</p>
      <p>Event Date: {event.date}</p>
      <p>Event Location: {event.location}</p>
      {/* Add more event details as needed */}
    </div>
  );
}