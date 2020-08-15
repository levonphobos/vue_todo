const todoService = {
    fetchTodos,
    addTodo,
    getTodo,
    updateTodo,
    assignUsers,
    deleteTodo,
  };

export default todoService;

function fetchTodos() {
  return new Promise((resolve, reject) => {
      Vue.axios.get('/api/todos')
           .then(response => {
              resolve(response.data);
            })
           .catch(error => {
              reject(error);
            });

    });
}

function getTodo(todoID) {
  return new Promise((resolve, reject) => {
      Vue.axios.get('/api/todos/' + todoID)
           .then(response => {
              console.log(response);
              if (response.status == 200) {
                resolve(response.data);
              }
            })
           .catch(error => {
              reject(error);
            });

    });
}

function addTodo(todo) {
  return new Promise((resolve, reject) => {
    Vue.axios.post('/api/todos', todo)
      .then(response => {
          if (response.status == 201) {
            resolve(response.data);
          }
        })
      .catch(error => {
          reject(error);
        });
  });
}

function updateTodo(todo) {
  return new Promise((resolve, reject) => {
    Vue.axios.put('/api/todos/' + todo.id, todo)
      .then(response => {
          if (response.status == 202) {
            resolve(response.data);
          }
        })
      .catch(error => {
          reject(error);
        });
  });
}

function assignUsers(todoData) {
  return new Promise((resolve, reject) => {
      Vue.axios.post('/api/todos/assign/user', todoData)
           .then(response => {
              if (response.status == 200) {
                resolve(todoData);
              }
            })
           .catch(error => {
              reject(error);
            });

    });
}

function deleteTodo(todoID) {
  return new Promise((resolve, reject) => {
    Vue.axios.delete('/api/todos/' + todoID)
      .then(response => {
          if (response.status == 200) {
            resolve(response.data);
          }
        })
      .catch(error => {
          reject(error);
        });
  });
}
