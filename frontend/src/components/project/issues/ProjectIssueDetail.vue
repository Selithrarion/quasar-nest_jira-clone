<template>
  <div v-if="issue">detail ID {{ issue.id }} – name {{ issue.name }}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

import { IssueModel } from 'src/models/project/issue.model';
import issueRepository from 'src/repositories/issueRepository';

export default defineComponent({
  name: 'ProjectIssueDetail',

  setup() {
    const route = useRoute();
    const issue = ref<IssueModel>();

    onBeforeMount(async () => {
      const issueID = Number(route.params.issueID);
      issue.value = await issueRepository.getByID(issueID);
    });

    return {
      issue,
    };
  },
});
</script>
