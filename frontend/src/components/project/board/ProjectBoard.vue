<template>
  <BaseLoader v-if="loading.active.value" />

  <div>
    <ProjectBoardColumnWrapper>
      <ProjectBoardColumn v-for="column in 5" :key="column" @open="dialog.open('viewIssue')"></ProjectBoardColumn>
    </ProjectBoardColumnWrapper>

    <ProjectBoardDialogViewIssue :show="dialog.openedName.value === 'viewIssue'" @close="dialog.close" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import BaseLoader from 'components/base/BaseLoader.vue';
import ProjectBoardColumnWrapper from 'components/project/board/column/ProjectBoardColumnWrapper.vue';
import ProjectBoardColumn from 'components/project/board/column/ProjectBoardColumn.vue';
import ProjectBoardDialogViewIssue from 'components/project/board/dialog/ProjectBoardDialogViewIssue.vue';

export default defineComponent({
  name: 'ProjectBoard',

  components: {
    BaseLoader,
    ProjectBoardColumnWrapper,
    ProjectBoardColumn,
    ProjectBoardDialogViewIssue,
  },

  setup() {
    const dialog = useDialog();
    const loading = useLoading();

    return {
      dialog,
      loading,
    };
  },
});
</script>
