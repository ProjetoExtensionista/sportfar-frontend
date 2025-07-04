import api from './api';



export default {

  async createUser(userData) {
    try {
      const payload = {
        fullName: userData.fullName,
        cpf: userData.cpf,
        birthDate: new Date(userData.birthDate),
        email: userData.email,
        password: userData.password,
        passwordTemp: true,
        address: userData.address,
        city: userData.city,
        cep: userData.cep,
        phone: userData.phone
      };

      const response = await api.post('/api/users', payload);
      return response.data; // Retorna só o corpo da resposta

    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

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

  // adiciona “Educador”
  grantEducatorTypeToUser(userId) {
    return api.post('/api/grantEducatorTypeToUser', {
      user_id: userId
    });
  },

  // remove “Educador”
  removeEducatorTypeFromUser(userId) {
    return api.delete(`/api/grantEducatorTypeToUser/${userId}`);
  }
}