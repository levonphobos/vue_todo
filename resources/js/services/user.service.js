const userService = {
    fetchUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
  };

export default userService;

function fetchUsers() {
  return new Promise((resolve, reject) => {
      Vue.axios.get('/api/users')
           .then(response => {
              resolve(response.data);
            })
           .catch(error => {
              reject(error);
            });

    });
}

function getUser(userID) {
  return new Promise((resolve, reject) => {
      Vue.axios.get('/api/users/' + userID)
           .then(response => {
              if (response.status == 200) {
                resolve(response.data);
              }
            })
           .catch(error => {
              if (error.response.status == 401) {
                dispatch('Auth/LOGOUT', commit);
              }

              reject(error);
            });

    });
}

function addUser(user) {
  return new Promise((resolve, reject) => {
    Vue.axios.post('/api/users', user)
      .then(response => {
          //console.log(response);
          if (response.status === 201) {
            resolve(response.data);
          }
        })
      .catch(error => {
          if (error == 401) {
            dispatch('Auth/LOGOUT', commit);
          }

          reject(error);
        });
  });
}

function updateUser(user) {
  return new Promise((resolve, reject) => {
    Vue.axios.put('/api/users/' + user.id, user)
      .then(response => {
          if (response.status == 202) {
            resolve(response.data);
          }
        })
      .catch(error => {
          if (error == 401) {
            dispatch('Auth/LOGOUT', commit);
          }

          reject(error);
        });
  });
}

function deleteUser(userID) {
  return new Promise((resolve, reject) => {
    Vue.axios.delete('/api/users/' + userID)
      .then(response => {
          if (response.status == 200) {
            resolve(response.data);
          }
        })
      .catch(error => {
          if (error == 401) {
            dispatch('Auth/LOGOUT', commit);
          }

          reject(error);
        });
  });
}
