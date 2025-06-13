import api from './api';
import handleResponse from '../utils/handleResponse';


export default {
    getAll() {
        return handleResponse(api.get('/users'));
    }
    
};