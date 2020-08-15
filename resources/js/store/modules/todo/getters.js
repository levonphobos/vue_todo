export default {
    getTodos(state) {
      return state.todos;
    },

    getCurrentTodo(state) {
      return { ...state.currentTodo };
    },

    getShowModal(state) {
      return state.showAssignedUsersModal;
    },

    getAssignedUsers(state) {
      return { ...state.assignedUsers };
    },
  };
