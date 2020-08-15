import Vue from 'vue';
import Vuex from 'vuex';
import actions from './todo/actions.js';
import mutations from './todo/mutations.js';
import getters from './todo/getters.js';

Vue.use(Vuex);

const state = {
    todos: [],
    currentTodo: {},
    showAssignedUsersModal: false,
  };

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
  };
