<template>
  <div class="project-issues">
    <q-list>
      <BaseItem
        v-for="item in projectIssues"
        :key="item.id"
        class="flex-center-between"
        @click="openIssueDetail(item.id)"
      >
        {{ item.name }}

        <div class="flex gap-2">
          <ProjectBoardIconIssuePriority :priority="item.priorityID" />
          <ProjectBoardIconIssueType :type="item.typeID" />
        </div>
      </BaseItem>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { IssueModel } from 'src/models/project/issue.model';
import projectRepository from 'src/repositories/projectRepository';

import ProjectBoardIconIssuePriority from 'components/project/board/icon/ProjectBoardIconIssuePriority.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';

export default defineComponent({
  name: 'ProjectIssues',

  components: {
    ProjectBoardIconIssuePriority,
    ProjectBoardIconIssueType,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    const projectIssues = ref<IssueModel[]>();
    onBeforeMount(async () => {
      const projectID = Number(route.params.projectID);
      projectIssues.value = await projectRepository.getIssuesByProjectID(projectID);
    });

    async function openIssueDetail(issueID: number) {
      await router.push(`/projects/${Number(route.params.projectID)}/issues/${issueID}`);
    }

    return {
      projectIssues,
      openIssueDetail,
    };
  },
});
</script>

<style lang="scss" scoped>
.project-issues {
  width: 300px;
}
</style>
