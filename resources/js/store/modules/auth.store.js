import actions from './auth/actions.js';
import getters from './auth/getters.js';
import mutations from './auth/mutations.js';

const user = JSON.parse(localStorage.getItem('user'));
const state = user ? { status: { loggedIn: true }, user } : { status: {}, user: null };

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations,
  };
