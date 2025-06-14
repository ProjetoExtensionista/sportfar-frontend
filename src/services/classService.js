import api from './api';
import handleResponse from '../utils/handleResponse';

export default {
    getById(id) {
        return handleResponse(api.get(`/classRoom/${id}`));
    }
};