import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

export const loginUser = (username, password) => {
    return axios.post(`${API_URL}token/`, { username, password });
};

// Add additional functions as needed
