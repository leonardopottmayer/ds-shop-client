import axios from "axios";

const api = axios.create({ baseURL: import.meta.env["VITE_MS_SHOP_BASE_URL"] });

export default api;
