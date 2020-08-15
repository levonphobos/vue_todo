import todoService from './../../../services/todo.service.js';
import router from './../../../helpers/router.js';
export default {
    fetchTodos({ commit, dispatch }) {
      todoService.fetchTodos()
               .then(todos => {
                  commit('INIT_TODOS', todos);
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });

    },

    getTodo({ commit }, todoID) {
      todoService.getTodo(todoID)
        .then(todo => {
          commit('INIT_CURRENT_TODO', todo);
        })
        .catch(error => {
          commit('ERROR', error);
        });
    },

    addTodo({ commit }, todoData) {
      todoService.addTodo(todoData)
               .then(todo => {
                  commit('ADD_TODO', todo);
                  router.push('/todos');
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });
    },

    updateTodo({ commit }, todoData) {
      todoService.updateTodo(todoData)
               .then(todo => {
                  commit('UPDATE_TODO', todo);
                  router.push('/todos');
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });
    },

    deleteTodo({ commit }, todoID) {
      todoService.deleteTodo(todoID)
               .then(todo => {
                  commit('DELETE_TODO', todo.id);
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });
    },

    changeTodoStatus({ commit }, todoData) {
      todoData.status = todoData.status ? 0 : 1;
      todoService.updateTodo(todoData)
               .then(todo => {
                  commit('CHANGE_TODO_STATUS', todo);
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });
    },

    assignUsers({ commit }, data) {
      todoService.assignUsers(data)
               .then(done => {
                  commit('ASSIGN_USERS', data);
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });
    },

    showModal({ commit }, todoID) {
      commit('SHOW_USERS_MODAL');
      /*todoData.status = todoData.status ? 0 : 1;
      todoService.updateTodo(todoData)
               .then(todo => {
                  commit('CHANGE_TODO_STATUS', todo);
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });*/
    },

    closeModal({ commit }, todoID) {
      commit('HIDE_USERS_MODAL');
      /*todoService.getTodoUsers(todoID)
               .then(todos => {
                  commit('INIT_TODO_ASSIGNED_USERS', todos);
                })
               .catch(function (error) {
                  commit('ERROR', error);
                });*/
    },
  };
