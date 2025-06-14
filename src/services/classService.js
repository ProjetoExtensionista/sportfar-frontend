import api from './api';
import handleResponse from '../utils/handleResponse';

export default {
    getByClassId(id) {
        return handleResponse(api.get(`/classRoom/${id}`));
    },
    getAbsencesByClassRoomId(id) {
        return handleResponse(api.get(`/classRoom/getStudentsAbsenceByClassId/${id}`));
    }
};