import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://projetos.farroupilha.ifrs.edu.br:35010',
    timeout: 1000,
    headers: {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGFkbWluLmNvbSIsInN1YiI6MSwiaWF0IjoxNzQ4NjQ3MjMxLCJleHAiOjE3NDg2NTA4MzF9.z_7lkOZi-zshiprYpT5eJlg_VG7gmkf3suICdfcp7ag"
}
});

export {instance}