<template>
  <div>
    <ProjectBoardColumnWrapper>
      <ProjectBoardColumn v-for="column in 5" :key="column" @open="dialog.open('viewIssue')"></ProjectBoardColumn>
    </ProjectBoardColumnWrapper>

    <ProjectBoardViewIssueDialog :show="dialog.opened === 'viewIssue'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ProjectBoardColumnWrapper from 'components/project/board/ProjectBoardColumnWrapper.vue';
import ProjectBoardColumn from 'components/project/board/ProjectBoardColumn.vue';
import ProjectBoardViewIssueDialog from 'components/project/board/ProjectBoardViewIssueDialog.vue';

import useDialog from 'src/composables/common/useDialog';

export default defineComponent({
  name: 'ProjectBoard',

  components: {
    ProjectBoardColumnWrapper,
    ProjectBoardColumn,
    ProjectBoardViewIssueDialog,
  },

  setup() {
    const dialog = useDialog();

    return {
      dialog,
    };
  },
});
</script>
