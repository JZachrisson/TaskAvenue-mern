import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

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
      });
    // .catch((error) => {
    //   return error;
    //   // console.log('ERROR HERE', error);
    // });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) {
    console.log(username, password);
    return axios.post(API_URL + 'signup', {
      username,
      password,
      firstName,
      lastName,
    });
  }

  getCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('user')!);
    return currentUser;
  }
}

export default new AuthService();
