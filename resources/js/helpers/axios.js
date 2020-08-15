import axios from 'axios';
import router from './router';

axios.interceptors.request.use(
  (config) => {
    let token = JSON.parse(localStorage.getItem('token'));
    if (token && token.access_token) {
      console.log(token.access_token);
      config.headers.Authorization = 'Bearer ' + token.access_token;
    }

    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
  },

  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response && error.response.status === 401) {
        //return Promise.reject('LOGOUT');

        router.push('login');
      } else {
        return Promise.reject(error);
      }
    });

export default axios;
