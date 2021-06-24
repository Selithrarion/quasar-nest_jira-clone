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

          <q-tabs v-model="selectedTab" active-color="primary" inline-label>
            <q-route-tab
              v-for="tab in tabsData"
              :key="tab.name"
              :name="tab.name"
              :label="tab.label"
              :to="tab.url"
              exact
            />
          </q-tabs>

          <q-btn class="flex-shrink-0" color="primary" padding="4px 12px" unelevated no-caps>Создать</q-btn>
        </div>

        <div class="flex-center gap-4">
          <CommonSearch :value="searchValue" prepend-icon @search="search" />

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
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import CommonSearch from 'components/common/CommonSearch.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { CommonSearch },

  setup() {
    const searchValue = ref('');
    function search(value: string) {
      console.log(value);
      searchValue.value = value;
    }

    const selectedTab = ref('work');
    const tabsData = reactive([
      {
        name: 'work',
        label: 'Ваша работа',
        url: '/',
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

    return {
      tabsData,
      selectedTab,

      searchValue,
      search,
    };
  },
});
</script>
