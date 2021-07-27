<template>
  <BaseLoader v-if="loading.active.value" page-margin />

  <div v-else>
    <ProjectBoardColumnWrapper>
      <ProjectBoardColumn
        v-for="column in boardColumns"
        :key="column"
        :column-name="column.name"
        :column-issues="column.issues"
        @open="dialog.open('viewIssue')"
      ></ProjectBoardColumn>
    </ProjectBoardColumnWrapper>

    <div v-if="!isAnyIssues" class="no-active-issues__wrapper">
      <div class="no-active-issues__image q-mb-md" />
      <h6 class="no-margin">Нет видимых текущих задач</h6>
      <div class="flex-center gap-1">
        <q-btn label="Создайте задачу" color="primary" no-wrap dense flat @click="dialog.open('createIssue')" />
        или проверьте
        <q-btn label="настройки доски" color="primary" no-wrap dense flat @click="dialog.open('settings')" />
      </div>
    </div>

    <ProjectBoardDialogCreateIssue :show="dialog.openedName.value === 'createIssue'" @close="dialog.close" />
    <ProjectBoardDialogViewIssue
      v-if="dialog.openedName.value === 'viewIssue'"
      :show="dialog.openedName.value === 'viewIssue'"
      @close="dialog.close"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount } from 'vue';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import BaseLoader from 'components/base/BaseLoader.vue';
import ProjectBoardColumnWrapper from 'components/project/board/column/ProjectBoardColumnWrapper.vue';
import ProjectBoardColumn from 'components/project/board/column/ProjectBoardColumn.vue';
import ProjectBoardDialogCreateIssue from 'components/project/board/dialog/ProjectBoardDialogCreateIssue.vue';
import ProjectBoardDialogViewIssue from 'components/project/board/dialog/ProjectBoardDialogViewIssue.vue';

export default defineComponent({
  name: 'ProjectBoard',

  components: {
    BaseLoader,
    ProjectBoardColumnWrapper,
    ProjectBoardColumn,
    ProjectBoardDialogCreateIssue,
    ProjectBoardDialogViewIssue,
  },

  props: {
    selectedBoardId: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const dialog = useDialog();
    const loading = useLoading({ default: true });

    onBeforeMount(async () => {
      await store.dispatch('project/getBoardByID', props.selectedBoardId);
      loading.stop();
    });

    const boardColumns = computed(() => store.state.project.boardDetail?.columns);
    const isAnyIssues = computed(() => {
      // let result = false;
      boardColumns.value?.forEach((c) => {
        if (c.issues.length) return true;
      });
      return false;
      // return result;
    });

    return {
      dialog,
      loading,

      boardColumns,
      isAnyIssues,
    };
  },
});
</script>

<style lang="scss" scoped>
.no-active-issues {
  &__wrapper {
    display: flex;
    flex-flow: column;
    align-items: center;
    margin-top: 96px;
  }
  &__image {
    background: url('src/assets/img/no-active-issues.png') center no-repeat;
    background-size: 100%;
    width: 180px;
    height: 130px;
  }
}
</style>
