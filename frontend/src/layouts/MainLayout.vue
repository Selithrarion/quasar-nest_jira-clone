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
              v-for="tab in tabsData"
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

          <BaseButton icon="notifications" :tooltip="t('common.notifications')" unelevated dense round />
          <BaseButton icon="help" :tooltip="t('common.help')" unelevated dense round />
          <BaseButton icon="settings" :tooltip="t('common.settings')" unelevated dense round />
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

    <ProjectBoardDialogCreateIssue v-if="dialog.openedName.value === 'createIssue'" @close="dialog.close" />
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'src/store';
import { useRouter, useRoute } from 'vue-router';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import CommonSearch from 'components/common/CommonSearch.vue';
import ProjectBoardDialogCreateIssue from 'components/project/board/dialog/ProjectBoardDialogCreateIssue.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    CommonSearch,
    ProjectBoardDialogCreateIssue,
  },

  setup() {
    const { t } = useI18n();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const dialog = useDialog();
    const loading = useLoading({ customNames: ['logout'] });

    const searchValue = ref('');
    function search() {
      console.log(searchValue.value);
    }

    const tabsData = reactive([
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
      } finally {
        loading.stop('logout');
      }
    }

    return {
      t,
      dialog,
      loading,

      searchValue,
      search,

      tabsData,

      isShowCreateIssueButton,

      currentUser,

      openProfilePage,
      logout,
    };
  },
});
</script>
