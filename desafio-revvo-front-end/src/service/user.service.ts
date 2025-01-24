import api from './api';

class UserService {
  /**
   * Atualiza os detalhes do usuário logado.
   * @param data Dados do usuário a serem atualizados
   * @returns Resposta da API
   */
  static updateUserDetails(data: any) {
    return api.put('/user', data);
  }
}

export default UserService;