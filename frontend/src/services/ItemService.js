import api from "./api";

const API_MODEL_URL = "/item";

const addItem = (newItem) => api.post(API_MODEL_URL, newItem);

const getAllItems = () => api.get(API_MODEL_URL);

const ItemService = {
  addItem,
  getAllItems,
};

export default ItemService;
