import axios from 'axios';

const api = axios.create({
    baseURL: 'http://148.226.203.231:8000/api',
    timeout: 10000,
});

export default api;