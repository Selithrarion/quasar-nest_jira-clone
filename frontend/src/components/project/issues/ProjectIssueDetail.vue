<template>
  <div>
    {{ issue }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

import { IssueModel } from 'src/models/project/issue.model';
import issueRepository from 'src/repositories/issueRepository';

export default defineComponent({
  name: 'ProjectIssueDetail',

  components: {},

  props: {},

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
