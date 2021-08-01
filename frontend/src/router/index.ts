import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { StateInterface } from '../store';
import userState from '../store/user/state';

import routes from './routes';

export default route<StateInterface>(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE),
  });

  const isUserLogged = Boolean(userState().token);
  const redirectToAuthPage = {
    path: '/auth',
  };

  Router.beforeEach((to, from, next) => {
    const matchedRoutes = to.matched;
    const isNeedAuth = matchedRoutes.some((record) => record.meta.auth);
    const isNeedGuest = matchedRoutes.some((record) => record.meta.guest);

    if (isNeedAuth) {
      if (!isUserLogged) next(redirectToAuthPage);
      else next();
    } else if (isNeedGuest) {
      console.log('isNeedGuest', isUserLogged);
      next();
      // if (false) {
      //   next({
      //     path: '/',
      //     query: {
      //       redirect: to.fullPath,
      //     },
      //   });
      // }
    } else {
      next(); // make sure to always call next()!
    }
  });

  return Router;
});
