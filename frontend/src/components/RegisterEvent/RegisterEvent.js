import React, { useEffect } from "react";
import { useParams } from "react-router";
import EventService from "../../services/EventService";

export default function RegisterEvent() {
  const { eventId } = useParams();

  useEffect(() => {
    EventService.getEventById(eventId)
  }, [eventId]);

  return <div>Register Event</div>;
}