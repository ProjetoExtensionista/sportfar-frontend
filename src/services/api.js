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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInN1YiI6MSwiaWF0IjoxNzQ5ODUxNTA4LCJleHAiOjE3NDk4NTUxMDh9.rRi3dcKI8ZP_hM8A5HLgne79RlK47jHWZFPWg9xVWow'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
