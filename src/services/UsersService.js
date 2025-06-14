import api from './api';
import handleResponse from '../utils/handleResponse';



export default {
    getAll() {
      return handleResponse(api.get('/api/users'))
    },
  
    getByType(type) {
      return handleResponse(api.get(`/api/users/findByClass/${type}`))
    }
  }