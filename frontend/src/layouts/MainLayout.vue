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

          <q-tabs v-model="selectedTab" active-color="primary" inline-label no-caps>
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
            label="Создать задачу"
            color="primary"
            padding="4px 12px"
            unelevated
            @click="dialog.open('createIssue')"
          />
        </div>

        <div class="flex-center gap-4">
          <CommonSearch v-model="searchValue" prepend-icon @search="search" />

          <BaseButton icon="notifications" unelevated dense round />
          <BaseButton icon="help" unelevated dense round />
          <BaseButton icon="settings" unelevated dense round />
          <BaseButton unelevated dense round>
            <q-avatar v-if="currentUserAvatarURL" size="24px">
              <img :src="currentUserAvatarURL" alt="Profile Avatar" />
            </q-avatar>
            <q-avatar v-else size="24px" color="orange">{{ currentUserInitials }}</q-avatar>

            <q-menu style="width: 300px" auto-close>
              <q-list>
                <BaseItem label="Профиль" @click="openProfilePage" />
                <BaseItem label="Выйти" @click="logout" />
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
import { useStore } from 'src/store';
import { useRouter, useRoute } from 'vue-router';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import CommonSearch from 'components/common/CommonSearch.vue';
import ProjectBoardDialogCreateIssue from 'components/project/board/dialog/ProjectBoardDialogCreateIssue.vue';
import userService from 'src/service/userService';

export default defineComponent({
  name: 'MainLayout',

  components: {
    CommonSearch,
    ProjectBoardDialogCreateIssue,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const dialog = useDialog();
    const loading = useLoading({ customNames: ['logout'] });

    const searchValue = ref('');
    function search() {
      console.log(searchValue.value);
    }

    const selectedTab = ref('work');
    const tabsData = reactive([
      {
        name: 'work',
        label: 'Ваша работа',
        url: '/',
        exact: true,
      },
      {
        name: 'projects',
        label: 'Проекты',
        url: '/projects',
      },
      {
        name: 'filters',
        label: 'Фильтры',
        url: '/filters',
      },
      {
        name: 'dashboards',
        label: 'Дашбоарды',
        url: '/dashboards',
      },
      {
        name: 'people',
        label: 'Люди',
        url: '/people',
      },
      {
        name: 'apps',
        label: 'Приложения',
        url: '/apps',
      },
    ]);

    const isShowCreateIssueButton = computed(() => route.path.includes('/projects/'));

    const currentUser = computed(() => store.state.user.currentUser);
    const currentUserInitials = computed(() => currentUser.value?.name?.[0]);
    const currentUserAvatarURL = computed(() => currentUser.value?.avatarURL);

    async function openProfilePage() {
      const userID = currentUser.value?.id;
      if (userID) await router.push(`/people/${userID}`);
    }
    async function logout() {
      try {
        loading.start('logout');
        await userService.logout();
      } finally {
        loading.stop('logout');
      }
    }

    return {
      dialog,
      loading,

      searchValue,
      search,

      tabsData,
      selectedTab,

      isShowCreateIssueButton,

      currentUserInitials,
      currentUserAvatarURL,

      openProfilePage,
      logout,
    };
  },
});
</script>
