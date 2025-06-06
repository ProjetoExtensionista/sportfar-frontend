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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInN1YiI6MSwiaWF0IjoxNzQ5MjQ4NTQxLCJleHAiOjE3NDkyNTIxNDF9.0Mto7YK-i4HJgH-CWxdAcT_dxr2DvdjV1iH2ZyxPj_A'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
