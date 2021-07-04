<template>
  <div>
    <ProjectBoardColumnWrapper>
      <ProjectBoardColumn v-for="column in 5" :key="column" @open="dialog.open('viewIssue')"></ProjectBoardColumn>
    </ProjectBoardColumnWrapper>

    <ProjectBoardDialogViewIssue :show="dialog.opened.value === 'viewIssue'" @close="dialog.close" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ProjectBoardColumnWrapper from 'components/project/board/column/ProjectBoardColumnWrapper.vue';
import ProjectBoardColumn from 'components/project/board/column/ProjectBoardColumn.vue';
import ProjectBoardDialogViewIssue from 'components/project/board/dialog/ProjectBoardDialogViewIssue.vue';

import useDialog from 'src/composables/common/useDialog';

export default defineComponent({
  name: 'ProjectBoard',

  components: {
    ProjectBoardColumnWrapper,
    ProjectBoardColumn,
    ProjectBoardDialogViewIssue,
  },

  setup() {
    const dialog = useDialog();

    return {
      dialog,
    };
  },
});
</script>
