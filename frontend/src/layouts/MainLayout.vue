<template>
  <q-layout view="hHh Lpr lFf">
    <q-header class="bg-white text-blue-grey-7 shadow-3">
      <q-toolbar class="justify-between gap-4" style="min-height: 49px">
        <div class="flex-center gap-4">
          <q-btn
            class="text-blue-grey-8 text-weight-regular"
            padding="0 4px"
            size="20px"
            to="/"
            :ripple="{ color: 'primary' }"
            unelevated
            dense
            no-caps
          >
            Jira software
          </q-btn>

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

          <q-btn
            v-if="isShowCreateIssueButton"
            class="flex-shrink-0"
            label="Создать задачу"
            color="primary"
            padding="4px 12px"
            unelevated
            no-caps
            @click="dialog.open('createIssue')"
          />
        </div>

        <div class="flex-center gap-4">
          <CommonSearch v-model="searchValue" prepend-icon @search="search" />

          <q-btn icon="notifications" unelevated dense round />
          <q-btn icon="help" unelevated dense round />
          <q-btn icon="settings" unelevated dense round />
          <q-avatar size="24px" color="orange">J</q-avatar>
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
import { useRoute } from 'vue-router';
import useDialog from 'src/composables/common/useDialog';

import CommonSearch from 'components/common/CommonSearch.vue';
import ProjectBoardDialogCreateIssue from 'components/project/board/dialog/ProjectBoardDialogCreateIssue.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    CommonSearch,
    ProjectBoardDialogCreateIssue,
  },

  setup() {
    const route = useRoute();
    const dialog = useDialog();

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

    return {
      dialog,

      searchValue,
      search,

      tabsData,
      selectedTab,

      isShowCreateIssueButton,
    };
  },
});
</script>
