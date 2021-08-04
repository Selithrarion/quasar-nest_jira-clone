import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';
import { http } from 'boot/axios';
import { UserModel } from '../models/user/user.model';

export default boot(async ({ router, store }) => {
  const savedUserData: UserModel = Cookies.get('user');
  if (savedUserData && savedUserData.accessToken && savedUserData.refreshToken) {
    const { refreshToken, accessToken, ...user } = savedUserData;
    store.commit('user/AUTH_USER', { user, accessToken, refreshToken });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    await router.push('/auth');
  }

  router.beforeEach((to, from, next) => {
    const matchedRoutes = to.matched;
    const isNeedAuth = matchedRoutes.some((record) => record.meta.auth);
    const isNeedGuest = matchedRoutes.some((record) => record.meta.guest);

    if (isNeedAuth) {
      if (!savedUserData) next('/auth');
      else next();
    } else if (isNeedGuest) {
      if (savedUserData) next('/');
      next();
    } else {
      next();
    }
  });
});
