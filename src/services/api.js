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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInN1YiI6MSwiaWF0IjoxNzUxNTg3NjQwLCJleHAiOjE3NTE1OTEyNDB9.5472eLYDzCXrdAyfrXkwN0mR5690ywNZ0EaL5Hg3iAE'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
