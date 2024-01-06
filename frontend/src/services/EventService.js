import api from './api';

const API_MODEL_URL = '/event';

const addEvent = (event) => {
	return api.post(`${API_MODEL_URL}`, event);
}

const EventService = {
	addEvent,
};

export default EventService;