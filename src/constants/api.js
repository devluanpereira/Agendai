import axios from "axios";

const api = axios.create({
    baseURL: "https://api.jccomp.online"
});

export default api;