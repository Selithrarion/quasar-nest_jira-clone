import { boot } from 'quasar/wrappers';
import { UserModel } from '../models/user/user.model';

export default boot(({ router, store }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const user = store.state.user.currentUser as UserModel;

  router.beforeEach((to, from, next) => {
    const matchedRoutes = to.matched;
    const isNeedAuth = matchedRoutes.some((record) => record.meta.auth);
    const isNeedGuest = matchedRoutes.some((record) => record.meta.guest);

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
