<template>
  <q-page class="work-page">
    <CommonPageTitle title="Ваша работа" />

    <div class="q-px-xl q-py-md bg-grey-1">
      <WorkProjectHeader />

      <WorkProjectList>
        <WorkProjectCard v-for="project in projects" :key="project.id" :project="project" />
      </WorkProjectList>
    </div>
  </q-page>
</template>

<script lang="ts">
import CommonPageTitle from 'components/common/CommonPageTitle.vue';

import WorkProjectHeader from 'components/work/WorkProjectHeader.vue';
import WorkProjectList from 'components/work/WorkProjectList.vue';
import WorkProjectCard from 'components/work/WorkProjectCard.vue';

export default {
  name: 'PageIndex',

  components: {
    CommonPageTitle,
    WorkProjectHeader,
    WorkProjectList,
    WorkProjectCard,
  },

  setup() {
    const projects = [
      {
        id: 1,
        title: 'Jira project',
        type: 'Программное обеспечение, управляемое компанией',
        key: 'JP',
      },
    ];

    return {
      projects,
    };
  },
};
</script>
