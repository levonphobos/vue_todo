export default {
    login,
    logout,
  };

function login(email, password) {
  return new Promise((resolve, reject) => {
    Vue.axios.post('/api/login', { email, password })
      .then(response => {
          if (response.data.access_token) {
            localStorage.setItem('token', JSON.stringify(response.data));
            Vue.axios.defaults.headers.common = {
              Authorization: 'Bearer ' + response.data.access_token,
            };
            resolve(response.data.user);
          }

        })
      .catch(error => {
          reject(error);
        });
  });

}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('token');
}
