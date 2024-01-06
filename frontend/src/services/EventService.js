import api from './api';

const API_MODEL_URL = '/event';

const addEvent = (event) => {
	return api.post(`${API_MODEL_URL}`, event);
}

const getEventById = (id) => {
	return api.get(`${API_MODEL_URL}/${id}`);
}

const getAllEvent = () => {
	return api.get(`${API_MODEL_URL}`);
}

const registerAnEvent = (id, user) => api.post(`${API_MODEL_URL}/${id}/register`, user);

const EventService = {
	addEvent,
	getEventById,
	getAllEvent,
	registerAnEvent
};

export default EventService;