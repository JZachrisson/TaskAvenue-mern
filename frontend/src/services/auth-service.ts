import axios from 'axios';

//const API_URL: string = 'https://taskavenue-backend.herokuapp.com/api/auth/';
const API_URL: string = 'http://localhost:8080/api/auth/';

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username: string, password: string) {
    return axios.post(API_URL + 'signup', {
      username,
      password,
    });
  }

  getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    return currentUser;
  }
}

export default new AuthService();
