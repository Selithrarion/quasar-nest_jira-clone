import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import { createStore, Store as VuexStore, useStore as vuexUseStore } from 'vuex';

import project from 'src/store/project';
import dashboard from 'src/store/dashboard';
import user from 'src/store/user';
import people from 'src/store/people';

import { ProjectStateInterface } from 'src/store/project/state';
import { DashboardStateInterface } from 'src/store/dashboard/state';
import { UserStateInterface } from 'src/store/user/state';
import { PeopleStateInterface } from 'src/store/people/state';

export interface StateInterface {
  project: ProjectStateInterface;
  dashboard: DashboardStateInterface;
  user: UserStateInterface;
  people: PeopleStateInterface;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}
// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key');

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      project,
      dashboard,
      user,
      people,
    },

    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
