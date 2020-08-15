import userService from './../../../services/user.service.js';
import router from './../../../helpers/router.js';
export default {
    fetchUsers({ commit, dispatch }) {
      userService.fetchUsers()
       .then(users => {
          commit('INIT_USERS', users);
        })
       .catch(function (error) {
          if (error == 401) {
            dispatch('Auth/logout', commit, { root: true });
          };
        });
    },

    getUser({ commit }, userID) {
      userService.getUser(userID)
        .then(user => {
          commit('INIT_CURRENT_USER', user);
        })
        .catch(error => {
          if (error == 401) {
            dispatch('Auth/logout', commit, { root: true });
          };
        });
    },

    addUser({ commit }, userData) {
      userService.addUser(userData)
         .then(user => {
            commit('ADD_USER', user);
            router.push('/users');
          })
         .catch(function (error) {
            if (error == 401) {
              dispatch('Auth/logout', commit, { root: true });
            };
          });
    },

    updateUser({ commit }, userData) {
      userService.updateUser(userData)
         .then(user => {
            commit('UPDATE_USER', user);
            router.push('/users');
          })
         .catch(function (error) {
            if (error == 401) {
              dispatch('Auth/logout', commit, { root: true });
            };

            console.log(error);
          });
    },

    changeCurrentUserAvatar({ commit }, avatar) {
      commit('UPDATE_CURRENT_USER_AVATAR', avatar);
    },

    deleteUser({ commit }, userID) {
      userService.deleteUser(userID)
         .then(user => {
            commit('DELETE_USER', user.id);
          })
         .catch(function (error) {
            if (error == 401) {
              dispatch('Auth/logout', commit, { root: true });
            };

            console.log(error);
          });
    },

  };
