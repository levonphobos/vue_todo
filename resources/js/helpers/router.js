import Login from './../pages/Login.vue';

import Todos from './../pages/todo/TodoList.vue';
import AddTodo from './../pages/todo/Add.vue';
import EditTodo from './../pages/todo/Edit.vue';

import Users from './../pages/user/UserList.vue';
import AddUser from './../pages/user/Add.vue';
import EditUser from './../pages/user/Edit.vue';

import Settings from './../pages/settings/Index.vue';
import StripeConfig from './../pages/settings/Stripe.vue';

import VueRouter from 'vue-router';

const routes = [
  { path: '/login', component: Login },

  //{ path: 'register', component: Register },

  { path: '/users', component: Users },
  { path: '/users/add', component: AddUser },
  { path: '/users/edit/:id', component: EditUser },
  { path: '/todos', component: Todos },
  { path: '/todos/add', component: AddTodo },
  { path: '/todos/edit/:id', component: EditTodo },

  { path: '/settings', component: Settings },
  { path: '/settings/config-stripe', component: StripeConfig },
  { path: '/', component: Todos },
];

const router = new VueRouter({
  routes,
});

export default router;

//localStorage.removeItem('token');
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});
