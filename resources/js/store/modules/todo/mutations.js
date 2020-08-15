export default {
    INIT_TODOS(state, todos) {
      state.todos = todos;
    },

    ADD_TODO(state, todo) {
      state.todos.unshift(todo);
    },

    UPDATE_TODO(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id);
      state.todos.splice(index, 1, todo);
    },

    CHANGE_TODO_STATUS(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id);
      state.todos.splice(index, 1, todo);
    },

    DELETE_TODO(state, todoID) {
      state.todos = state.todos.filter(item => item.id !== todoID);
    },

    INIT_CURRENT_TODO(state, todo) {
      state.currentTodo = todo;
    },

    ASSIGN_USERS(state, data) {
      const todo = state.todos.filter(item => item.id === data.todoID)[0];
      todo.assigned_users = data.users;
    },

    SHOW_USERS_MODAL(state) {
      state.showAssignedUsersModal = true;
    },

    HIDE_USERS_MODAL(state) {
      state.showAssignedUsersModal = false;
    },
  };
