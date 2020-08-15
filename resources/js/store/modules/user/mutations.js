export default {
    INIT_USERS(state, users) {
      state.users = users;
    },

    ADD_USER(state, user) {
      state.users.unshift(user);
    },

    UPDATE_USER(state, user) {
      const index = state.users.findIndex(item => item.id === user.id);
      state.users.splice(index, 1, user);
    },

    DELETE_USER(state, userID) {
      state.users = state.users.filter(item => item.id !== userID);
    },

    INIT_CURRENT_USER(state, user) {
      state.currentUser = user;
    },

    UPDATE_CURRENT_USER_AVATAR(state, avatar) {
      state.currentUser.avatar = avatar;
    },
  };
