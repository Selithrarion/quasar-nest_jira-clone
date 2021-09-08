<template>
  <div>{{ projectIssues }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

import { IssueModel } from 'src/models/project/issue.model';

import projectRepository from 'src/repositories/projectRepository';

export default defineComponent({
  name: 'ProjectIssues',

  setup() {
    const route = useRoute();

    const projectIssues = ref<IssueModel[]>();
    onBeforeMount(async () => {
      const projectID = Number(route.params.projectID);
      projectIssues.value = await projectRepository.getIssuesByProjectID(projectID);
    });

    return {
      projectIssues,
    };
  },
});
</script>
