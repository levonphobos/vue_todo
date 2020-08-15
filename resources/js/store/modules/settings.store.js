import Vue from 'vue';
import Vuex from 'vuex';
import actions from './settings/actions.js';
import mutations from './settings/mutations.js';
import getters from './settings/getters.js';

Vue.use(Vuex);

const state = {
    stripe: {},
  };

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
  };
