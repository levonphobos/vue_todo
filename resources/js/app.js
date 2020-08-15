/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
 
require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router';
import router from './helpers/router.js';
import VueAxios from 'vue-axios';
import store from './store/store.js';
import Layout from './layout/Layout.vue';
import axios from './helpers/axios.js';
import config from './helpers/config.js';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.prototype.$config = config;
Vue.use(require('vue-moment'));
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.component('Layout', Layout);

new Vue({
  router,
  store,
}).$mount('#app');
