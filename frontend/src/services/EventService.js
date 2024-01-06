import api from './api';

const API_MODEL_URL = '/event';

const addEvent = (event) => {
	return api.post(`${API_MODEL_URL}`, event);
}

const getAllEvent = () => {
	return api.get(`${API_MODEL_URL}`);
}

const EventService = {
	addEvent,
	getAllEvent,
};

export default EventService;