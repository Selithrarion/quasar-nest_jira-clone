<template>
  <q-page class="work-page">
    <CommonPageTitle title="Ваша работа" />

    <BaseLoader v-if="!availableProjects" page-margin />
    <div v-else class="q-px-xl q-py-md bg-grey-1">
      <WorkProjectHeader />

      <WorkProjectList>
        <WorkProjectCard v-for="project in availableProjects" :key="project.id" :project="project" />
      </WorkProjectList>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue';
import { useStore } from 'src/store';
import useLoading from 'src/composables/common/useLoading';

import BaseLoader from 'components/base/BaseLoader.vue';
import CommonPageTitle from 'components/common/CommonPageTitle.vue';

import WorkProjectHeader from 'components/work/WorkProjectHeader.vue';
import WorkProjectList from 'components/work/WorkProjectList.vue';
import WorkProjectCard from 'components/work/WorkProjectCard.vue';

export default defineComponent({
  name: 'PageIndex',

  components: {
    BaseLoader,
    CommonPageTitle,
    WorkProjectHeader,
    WorkProjectList,
    WorkProjectCard,
  },

  setup() {
    const store = useStore();
    const loading = useLoading();

    const availableProjects = computed(() => store.state.project.projects);

    onBeforeMount(async () => {
      if (!availableProjects.value) await store.dispatch('project/getAll');
    });

    return {
      loading,
      availableProjects,
    };
  },
});
</script>
