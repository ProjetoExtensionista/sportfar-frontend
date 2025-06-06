import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://projetos.farroupilha.ifrs.edu.br:35010',
    timeout: 1000,
    headers: {
        "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInN1YiI6MCwiaWF0IjoxNzQ3NDQwODE0LCJleHAiOjE3NDc0NDQ0MTR9.X1gieH4J8CW0Ei8QtFkvYFfk7Pt3Ktcym2IURgttg78"
    }
});

export {instance}