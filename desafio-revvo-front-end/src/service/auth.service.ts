import api from "./api";

type user = {
  id: number,
  name?: string,
  email: string,
  password: string,
  token?: string,
  refresh?: string,
}

interface LoginData {
  email: string;
  password: string;
}


export const AuthService = {
  async register(data: user) {
    return api.post('/register', data);
  },
  
  async login(data: LoginData) {
    return api.post('/login', data);
  },

  async refreshToken(refreshToken: string) {
    return api.post('/refresh', { refresh_token: refreshToken });
  },

  async logout() {
    return api.post('/logout');
  },

  async getUser() {
    const response = api.get('/me');
    return response
  },
};

export default api;