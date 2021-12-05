<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="bg-white text-blue-grey-7 shadow-3">
      <q-toolbar class="justify-between gap-4" style="min-height: 49px">
        <div class="flex-center gap-4">
          <BaseButton
            class="text-blue-grey-8 text-weight-regular"
            padding="0 4px"
            label="Jira software"
            size="20px"
            to="/"
            :ripple="{ color: 'primary' }"
            unelevated
            dense
          />

          <q-tabs active-color="primary" inline-label no-caps>
            <q-route-tab
              v-for="tab in availableTabs"
              :key="tab.name"
              :name="tab.name"
              :label="tab.label"
              :to="tab.url"
              :exact="tab.exact"
            />
          </q-tabs>

          <BaseButton
            v-if="isShowCreateIssueButton"
            class="flex-shrink-0"
            :label="t('common.createIssue')"
            color="primary"
            padding="4px 12px"
            unelevated
            @click="dialog.open('createIssue')"
          />
        </div>

        <div class="flex-center gap-4">
          <CommonSearch v-model="searchValue" prepend-icon @search="search" />

          <LayoutNotifications />
          <BaseButton icon="help" :tooltip="t('common.help')" unelevated dense round />
          <BaseButton icon="settings" :tooltip="t('common.settings')" unelevated dense round>
            <q-menu style="width: 300px" auto-close>
              <q-list>
                <BaseItem
                  v-for="lang in availableLanguages"
                  :key="lang.key"
                  :class="{ 'bg-blue-grey-1': lang.key === locale }"
                  :label="lang.name"
                  @click="setLanguage(lang.key)"
                />
              </q-list>
            </q-menu>
          </BaseButton>
          <BaseButton unelevated dense round>
            <BaseAvatar
              v-if="currentUser"
              :src="currentUser.avatar && currentUser.avatar.url"
              :item-name="currentUser.username"
              :item-color="currentUser.color"
            />

            <q-menu style="width: 300px">
              <q-list>
                <BaseItem v-close-popup :label="t('user.profile')" @click="openProfilePage" />
                <BaseItem :label="t('auth.signOut')" :loading="loading.custom.logout" @click="logout" />
              </q-list>
            </q-menu>
          </BaseButton>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <ProjectBoardDialogCreateIssue :model-value="dialog.openedName.value === 'createIssue'" @close="dialog.close" />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useStore } from 'src/store';
import { useRouter, useRoute } from 'vue-router';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';
import useLocalStorage from 'src/composables/common/useLocalStorage';

import LayoutNotifications from 'components/layout/LayoutNotifications.vue';
import CommonSearch from 'components/common/CommonSearch.vue';
import ProjectBoardDialogCreateIssue from 'components/project/board/dialog/ProjectBoardDialogCreateIssue.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    LayoutNotifications,
    CommonSearch,
    ProjectBoardDialogCreateIssue,
  },

  setup() {
    const q = useQuasar();
    const { t, locale } = useI18n();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const dialog = useDialog();
    const loading = useLoading({ customNames: ['logout'] });
    const storage = useLocalStorage();

    const searchValue = ref('');
    function search() {
      console.log(searchValue.value);
    }

    onMounted(() => {
      const savedLang = storage.load('language') as string;
      locale.value = savedLang || 'en-US';
    });

    const availableTabs = reactive([
      {
        name: 'work',
        label: t('tabs.work'),
        url: '/',
        exact: true,
      },
      {
        name: 'projects',
        label: t('tabs.projects'),
        url: '/projects',
      },
      {
        name: 'filters',
        label: t('tabs.filters'),
        url: '/filters',
      },
      {
        name: 'dashboards',
        label: t('tabs.dashboards'),
        url: '/dashboards',
      },
      {
        name: 'people',
        label: t('tabs.people'),
        url: '/people',
      },
      {
        name: 'apps',
        label: t('tabs.apps'),
        url: '/apps',
      },
    ]);

    const availableLanguages = [
      {
        name: 'English',
        key: 'en-US',
      },
      {
        name: 'Русский',
        key: 'ru',
      },
      {
        name: 'عرب',
        key: 'ar',
      },
    ];
    function setLanguage(lang: string) {
      locale.value = lang;
      storage.save(lang, 'language');
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      import('quasar/lang/' + lang).then((l) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        q.lang.set(l.default);
      });
    }

    const isShowCreateIssueButton = computed(() => route.path.includes('/projects/'));

    const currentUser = computed(() => store.state.user.currentUser);

    async function openProfilePage() {
      const userID = currentUser.value?.id;
      if (userID) await router.push(`/people/${userID}`);
    }
    async function logout() {
      try {
        loading.start('logout');
        await store.dispatch('user/logout');
        await router.push('/auth');
        router.go(0);
      } finally {
        loading.stop('logout');
      }
    }

    return {
      t,
      locale,
      dialog,
      loading,

      searchValue,
      search,

      availableTabs,
      availableLanguages,
      setLanguage,

      isShowCreateIssueButton,

      currentUser,

      openProfilePage,
      logout,
    };
  },
});
</script>
