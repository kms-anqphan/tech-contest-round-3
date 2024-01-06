import React, { useEffect, useState } from 'react';
import EventService from '../../services/EventService';
import moment from 'moment';
import { useNavigate } from 'react-router';

import './Home.css';

export default function Home() {
	const [events, setEvents] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		// set events
		EventService.getAllEvent()
			.then((res) => {
				setEvents(res.data);
			})
			.catch((err) => console.log(err));
	})

	const handleCreateEvent = () => {
		navigate('/event_entry', { replace: true });
	}

	const handleCreateItem = () => {
		navigate('/item_entry', { replace: true });
	}

	// make a list of simple card components with event details
	const eventList = events.map((event) => {
		return (
			<div className="event-card" id={event.id}>
				<h3>{event.title}</h3>
				<p>{event.description}</p>
				<p>Event: {moment(event.eventStart).format('MM/DD/YYYY')} - {moment(event.eventEnd).format('MM/DD/YYYY')}</p>
				<p>Registration: {moment(event.registrationStart).format('MM/DD/YYYY')} - {moment(event.registrationEnd).format('MM/DD/YYYY')}</p>
			</div>
		);
	});

  return (
    <div className='home-container'>
      <h1>Welcome to the Event Management System</h1>
      <p>Here you can manage all the events created by the company.</p>
			<button className='create-event-button' onClick={handleCreateEvent}>Create Event</button>
			<button className='create-item-button' onClick={handleCreateItem}>Create Item</button>
			{eventList}
    </div>
  );
}
