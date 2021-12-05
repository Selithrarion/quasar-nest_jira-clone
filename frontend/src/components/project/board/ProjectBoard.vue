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
      <h6 class="no-margin">{{ t('project.noCurrentIssues') }}</h6>
      <div class="flex-center gap-1">
        <BaseButton :label="t('project.createIssue')" color="primary" dense flat @click="dialog.open('createIssue')" />
        {{ t('project.orCheck') }}
        <BaseButton :label="t('project.boardSettings')" color="primary" dense flat @click="dialog.open('settings')" />
      </div>
    </div>

    <ProjectBoardDialogCreateIssue :model-value="dialog.openedName.value === 'createIssue'" @close="dialog.close" />
    <ProjectBoardDialogViewIssue :model-value="dialog.openedName.value === 'viewIssue'" @close="closeIssue" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onBeforeMount, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
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

  sockets: {
    connect() {
      console.log('socket connected');
    },
    async updateBoardIssues() {
      // await this.$store.dispatch('project/getBoardByID', this.selectedBoardId);
    },
  },

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
    const { t } = useI18n();
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const dialog = useDialog();
    const loading = useLoading({ default: true });

    async function getBoard(id = props.selectedBoardId) {
      await store.dispatch('project/getBoardByID', id);
    }

    onBeforeMount(async () => {
      await getBoard();
      if (route.query.issueID) dialog.open('viewIssue');
      loading.stop();
    });
    onMounted(() => {
      // interface Socket {
      //   subscribe: (event: string, cb: (value: unknown) => unknown) => void;
      //   unsubscribe: (event: string) => void;
      //   emit: <T>(event: string, data?: T) => void;
      // }
      // const socket = inject('$socket') as Socket;
      // const socket1 = inject('socket') as Socket;
      // const socket2 = inject('sockets') as Socket;
      // console.log('socket', socket, socket1, socket2);
      // // socket.emit('sendUpdateBoardIssues');
    });

    watch(
      () => props.selectedBoardId,
      async () => {
        loading.start();
        await getBoard();
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
      t,
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
    // TODO: resolve img error (but recently all was fine) :(
    //background: url('src/assets/img/no-active-issues.png') center no-repeat;
    background: url('src/assets/svg/create-team.svg') center no-repeat;
    background-size: 100%;
    width: 180px;
    height: 130px;
  }
}
</style>
