import { boot } from 'quasar/wrappers';
import { http } from 'boot/axios';

export default boot(({ router }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const userToken = http.defaults.headers.common.Authorization as string;

  router.beforeEach((to, from, next) => {
    const matchedRoutes = to.matched;
    const isNeedAuth = matchedRoutes.some((record) => record.meta.auth);
    const isNeedGuest = matchedRoutes.some((record) => record.meta.guest);

    if (isNeedAuth) {
      if (!userToken) {
        console.log('need auth and no token');
        next('/auth');
      } else next();
    } else if (isNeedGuest) {
      if (userToken) next('/projects');
      next();
    } else {
      next();
    }
  });
});
