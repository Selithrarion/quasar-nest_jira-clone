import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';
import { http } from 'boot/axios';
import { UserModel } from '../models/user/user.model';

export default boot(async ({ router, urlPath, store }) => {
  const savedUserData: UserModel = Cookies.get('user');
  if (savedUserData && savedUserData.accessToken && savedUserData.refreshToken) {
    const { accessToken } = savedUserData;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    await store.dispatch('user/loadUser', savedUserData);
  } else if (!urlPath.includes('/auth')) {
    await router.push(`/auth?redirect=${window.location.pathname}`);
  }

  router.beforeEach((to, from, next) => {
    const matchedRoutes = to.matched;
    const isNeedAuth = matchedRoutes.some((record) => record.meta.auth);
    const isNeedGuest = matchedRoutes.some((record) => record.meta.guest);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user = store.state.user.currentUser as UserModel;

    if (isNeedAuth) {
      if (!user) next('/auth');
      else next();
    } else if (isNeedGuest) {
      if (user) next('/');
      next();
    } else {
      next();
    }
  });
});
