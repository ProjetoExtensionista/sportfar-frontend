import api from './api';
import handleResponse from '../utils/handleResponse';



export default {
  getAll() {
    const tipos = [
      { id: 1, name: 'Aluno' },
      { id: 2, name: 'Educador' },
      { id: 3, name: 'Responsável' }
    ];
  
    const requests = tipos.map(({ id, name }) => {
      return api.get(`/api/users/usertype/${id}`).then(response => {
        const data = response.data;
  
        if (Array.isArray(data)) {
          return data.map(user => ({
            ...user,
            __tipo__: name // marcador temporário
          }));
        }
  
        return [{ ...data, __tipo__: name }];
      });
    });
  
    return Promise.all(requests).then(results => {
      const todosUsuarios = results.flat();
  
      const usuariosUnificados = [];
  
      const mapUsuarios = new Map();
  
      todosUsuarios.forEach(user => {
        const key = user.id; // ou use user.email se preferir
  
        if (!mapUsuarios.has(key)) {
          mapUsuarios.set(key, {
            ...user,
            Tipo: [user.__tipo__]
          });
        } else {
          mapUsuarios.get(key).Tipo.push(user.__tipo__);
        }
      });
  
      return Array.from(mapUsuarios.values());
    });
  },
  
    getByType(type) {
      return handleResponse(api.get(`/api/users/findByClass/${type}`))
    }
  }