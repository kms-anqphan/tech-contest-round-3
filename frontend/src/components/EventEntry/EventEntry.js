// create an Event entry screen with following fields and a submit button
// Title (text input), Description (text area), event start (date time picker), event end (date time picker), registration start (date time picker), registration end (date time picker)
// Item (dropdown with all items), Count (number input)

// Path: frontend/src/components/EventEntry/EventEntry.js

import React, { useEffect, useState } from "react";
import TokenService from "../../services/TokenService";
import EventService from "../../services/EventService";
import ItemService from "../../services/ItemService";
import "./EventEntry.css";

export default function EventEntry() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [eventStart, setEventStart] = useState("");
	const [eventEnd, setEventEnd] = useState("");
	const [registrationStart, setRegistrationStart] = useState("");
	const [registrationEnd, setRegistrationEnd] = useState("");
	const [items, setItems] = useState([{ item: "", count: 0}]);
	const [itemOptions, setItemOptions] = useState([]);

	useEffect(() => {
		// set item options
		ItemService.getAllItems()
			.then((res) => {
				setItemOptions(res.data);
				console.log(res.data)
			})
			.catch((err) => console.log(err));
	}, []);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleEventStartChange = (e) => {
		setEventStart(e.target.value);
	};

	const handleEventEndChange = (e) => {
		setEventEnd(e.target.value);
	};

	const handleRegistrationStartChange = (e) => {
		setRegistrationStart(e.target.value);
	};

	const handleRegistrationEndChange = (e) => {
		setRegistrationEnd(e.target.value);
	};

	const handleItemChange = (e, index) => {
		const newItems = [...items];
		newItems[index].item = e.target.value;
		setItems(newItems);
	};

	const handleCountChange = (e, index) => {
		const newItems = [...items];
		newItems[index].count = e.target.value;
		setItems(newItems);
	};

	const handleAddItem = (e) => {
		e.preventDefault();
		const newItems = [...items];
		newItems.push({ item: "", count: 0 });
		setItems(newItems);
	};

	const handleRemoveItem = (e, index) => {
		e.preventDefault();
		const newItems = [...items];
		newItems.splice(index, 1);
		setItems(newItems);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		EventService.addEvent({
			title,
			description,
			eventStart,
			eventEnd,
			registrationStart,
			registrationEnd,
			items
		})
			.then((res) => {
				console.log(res)
				alert("Event created successfully!")
			})
			.catch((err) => console.log(err));
	};

	const itemOptionsDisplay = itemOptions.map((item, index) => {
		return (
			<option key={index} value={item.id}>
				{item.description}
			</option>
		);
	});

	const itemsDisplay = items.map((item, index) => {
		return (
			<div key={index}>
				<select onChange={(e) => handleItemChange(e, index)}>
					{itemOptionsDisplay}
				</select>
				<input type="number" onChange={(e) => handleCountChange(e, index)} />
				<button onClick={(e) => handleRemoveItem(e, index)}>Remove Item</button>
			</div>
		);
	});

	return (
		<div className="container">
			<h1>Event Entry</h1>
			<form className="form">
				<label>Title</label>
				<input
					className="input-field"
					type="text"
					value={title}
					onChange={handleTitleChange}
					placeholder="Title"
				/>
				<label>Description</label>
				<textarea
					className="input-field"
					type="text"
					value={description}
					onChange={handleDescriptionChange}
					placeholder="Description"
				/>
				<label>Event Start</label>
				<input
					className="input-field"
					type="datetime-local"
					value={eventStart}
					onChange={handleEventStartChange}
					placeholder="Event Start"
				/>
				<label>Event End</label>
				<input
					className="input-field"
					type="datetime-local"
					value={eventEnd}
					onChange={handleEventEndChange}
					placeholder="Event End"
				/>
				<label>Registration Start</label>
				<input
					className="input-field"
					type="datetime-local"
					value={registrationStart}
					onChange={handleRegistrationStartChange}
					placeholder="Registration Start"
				/>
				<label>Registration End</label>
				<input
					className="input-field"
					type="datetime-local"
					value={registrationEnd}
					onChange={handleRegistrationEndChange}
					placeholder="Registration End"
				/>
				{/* item selection section, a list that can dynamically added with item dropdown and number input for count */}
				{itemsDisplay}
				<button className="add-item-button" onClick={handleAddItem}>Add Item</button>
				<button className="submit-button" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
}
