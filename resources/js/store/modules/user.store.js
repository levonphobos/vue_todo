import Vue from 'vue';
import Vuex from 'vuex';
import actions from './user/actions.js';
import mutations from './user/mutations.js';
import getters from './user/getters.js';

Vue.use(Vuex);

const state = {
    users: [],
    currentUser: {},
  };

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };
