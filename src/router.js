import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { getUserRoles } from './utils/userCookie';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/board',
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue'),
    },
    {
      path: '/board',
      name: 'board',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/board/index.vue'),
      meta: {
        roles: ['ROLE_USER'],
      },
    },
    {
      path: '/board/:boardId',
      name: 'boardDetail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/board/detail.vue'),
      meta: {
        roles: ['ROLE_USER'],
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiredRoles = to.matched.reduce((roles, record) => {
    const additionalRoles = record.meta.roles || [];
    return roles.concat(additionalRoles);
  }, []);

  if (!requiredRoles.length) {
    return next();
  }

  const roles = getUserRoles();
  for (const requiredRole of requiredRoles) {
    if (roles.includes(requiredRole)) {
      return next();
    }
  }

  next({
    path: '/login',
    query: { redirect: to.fullPath },
  });
});


export default router;
