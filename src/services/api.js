import axios from 'axios';

const api = axios.create({
    baseURL: 'http://projetos.farroupilha.ifrs.edu.br:35010/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config => {
    //const token = localStorage.getItem('token');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInN1YiI6MSwiaWF0IjoxNzQ4MDQyOTEzLCJleHAiOjE3NDgwNDY1MTN9.LjAA0FcxmbRaEhRAZToHgrj_Svpw08qnFz3Wnyy1_Qo'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
