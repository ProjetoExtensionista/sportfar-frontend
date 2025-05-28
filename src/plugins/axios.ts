import axios from 'axios'
import router from '../router'

const axiosInstance = axios.create({
  baseURL: 'http://projetos.farroupilha.ifrs.edu.br:35010/',
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      router.push({ name: 'Login' })
    }

    return Promise.reject(error)
  }
)

export { axiosInstance }