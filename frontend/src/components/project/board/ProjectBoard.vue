<template>
  <BaseLoader v-if="loading.active.value" page-margin />

  <div v-else>
    <ProjectBoardColumnWrapper v-if="isAnyIssues">
      <ProjectBoardColumn
        v-for="(column, index) in boardColumns"
        :key="column"
        :column-index="index"
        @open="openIssue"
      />
    </ProjectBoardColumnWrapper>

    <div v-else class="no-active-issues__wrapper">
      <div class="no-active-issues__image q-mb-md" />
      <h6 class="no-margin">Нет видимых текущих задач</h6>
      <div class="flex-center gap-1">
        <BaseButton label="Создайте задачу" color="primary" dense flat @click="dialog.open('createIssue')" />
        или проверьте
        <BaseButton label="настройки доски" color="primary" dense flat @click="dialog.open('settings')" />
      </div>
    </div>

    <ProjectBoardDialogCreateIssue v-if="dialog.openedName.value === 'createIssue'" @close="dialog.close" />
    <ProjectBoardDialogViewIssue v-if="dialog.openedName.value === 'viewIssue'" @close="closeIssue" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, watch } from 'vue';
import { useStore } from 'src/store';
import { useRoute, useRouter } from 'vue-router';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import ProjectBoardColumnWrapper from 'components/project/board/column/ProjectBoardColumnWrapper.vue';
import ProjectBoardColumn from 'components/project/board/column/ProjectBoardColumn.vue';
import ProjectBoardDialogCreateIssue from 'components/project/board/dialog/ProjectBoardDialogCreateIssue.vue';
import ProjectBoardDialogViewIssue from 'components/project/board/dialog/ProjectBoardDialogViewIssue.vue';

export default defineComponent({
  name: 'ProjectBoard',

  components: {
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
    const route = useRoute();
    const router = useRouter();
    const dialog = useDialog();
    const loading = useLoading({ default: true });

    onBeforeMount(async () => {
      await store.dispatch('project/getBoardByID', props.selectedBoardId);
      if (route.query.issueID) dialog.open('viewIssue');
      loading.stop();
    });

    watch(
      () => props.selectedBoardId,
      async (value: number) => {
        loading.start();
        await store.dispatch('project/getBoardByID', value);
        loading.stop();
      }
    );

    const boardColumns = computed(() => store.state.project.boardDetail?.columns);
    const isAnyIssues = computed(() => {
      let result = false;
      boardColumns.value?.forEach((c) => {
        if (c.issues.length) result = true;
      });
      return result;
    });

    async function openIssue(issueID: number) {
      await router.push({ query: { issueID } });
      dialog.open('viewIssue');
    }
    async function closeIssue() {
      await router.push({ query: {} });
      dialog.close();
    }

    return {
      dialog,
      loading,

      boardColumns,
      isAnyIssues,

      openIssue,
      closeIssue,
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
