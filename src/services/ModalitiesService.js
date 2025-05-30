import api from './api';
import handleResponse from '../utils/handleResponse';

export default {
    getAll() {
        return handleResponse(api.get('/modalidades'));
    },

    getById(id) {
        return handleResponse(api.get(`/modalidades/${id}`));
    },

    create(data) {
        return handleResponse(api.post('/modalidades', data));
    },

    update(id, data) {
        return handleResponse(api.patch(`/modalidades/${id}`, data));
    },

    delete(id) {
        return handleResponse(api.delete(`/modalidades/${id}`));
    },

    save(data) {
        return ('id' in data && data.id)
            ? this.update(data.id, data)
            : this.create(data);
    }
};