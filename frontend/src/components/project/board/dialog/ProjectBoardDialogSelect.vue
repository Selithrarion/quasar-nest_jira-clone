<template>
  <BaseDialog
    close-text="Back"
    confirm-text="Create board"
    :title="computedTitle"
    :show-back-button="step !== 1"
    :back-text="step === 1 ? 'Cancel' : 'Back'"
    :hide-confirm-button="step === 2"
    :confirm-loading="loading.active.value"
    :confirm-icon="step === 1 ? 'add' : undefined"
    :confirm-classes="step === 1 ? 'btn--secondary' : null"
    :content-loading="step === 3 && !availableProjects"
    hide-close-button
    large
    @back="step--"
    @close="close"
    @confirm="handleDialogConfirmClick"
  >
    <div v-if="step === 1">
      <CommonSearch v-model="search" :outlined="false" client-search filled />

      <CommonListTitle class="q-mt-md q-mb-sm"> boards in {{ project.name }} </CommonListTitle>
      <q-list>
        <BaseItem
          v-for="board in filteredBoards"
          :key="board.id"
          class="row items-center gap-3 q-pl-sm"
          :class="{ 'shadow-1': isActiveBoard(board.id) }"
          @click="selectBoard(board)"
        >
          <q-icon name="check" size="sm" :color="isActiveBoard(board.id) ? 'green-6' : 'blue-grey-5'" />

          <div class="row items-center justify-between no-wrap full-width">
            <q-item-section :class="{ 'text-weight-bold': isActiveBoard(board.id) }">
              {{ board.name }}
            </q-item-section>

            <BaseButton
              v-show="!isActiveBoard(board.id)"
              icon="more_horiz"
              padding="4px"
              color="blue-grey-4"
              size="small"
              flat
              @click.stop=""
            >
              <q-menu auto-close>
                <q-list>
                  <BaseItem label="Delete" @click.stop="dialog.open('deleteBoard', { item: board })" />
                </q-list>
              </q-menu>
            </BaseButton>
          </div>
        </BaseItem>
      </q-list>
    </div>

    <div v-else-if="step === 2">
      <div class="row no-wrap q-col-gutter-lg">
        <div class="column justify-between flex-1">
          <div class="column">
            <h5 class="text-weight-medium no-margin">Scrum</h5>
            <div class="q-mt-md">
              Scrum is about planning, incorporating, and communicating time-grouped chunks operations called sprints.
            </div>
          </div>

          <BaseButton
            class="q-mt-xl"
            label="Scrum board creation"
            secondary-color
            disable
            unelevated
            @click="showScrumCreateForm"
          />
        </div>

        <div class="column justify-between flex-1">
          <div class="column">
            <h5 class="text-weight-medium no-margin">Kanban</h5>
            <div class="q-mt-md">
              Kanban is about visualizing the workflow and limiting the amount of work done in at the moment, for the
              consistent improvement of existing processes.
            </div>
          </div>

          <BaseButton
            class="q-mt-xl"
            label="Creating a Kanban board"
            secondary-color
            unelevated
            @click="showKanbanCreateForm"
          />
        </div>
      </div>
    </div>

    <div v-else-if="step === 3">
      <div class="form-fields-wrapper">
        <q-input v-model="form.name" label="Board name" autofocus lazy-rules filled />
        <BaseSelect v-model="form.project" label="Project" :options="availableProjects" :emit-value="false" />
      </div>
    </div>

    <BaseDialog
      type="delete"
      :model-value="dialog.openedName.value === 'deleteBoard'"
      :title="`Delete ${dialog.openedItem.value.name}?`"
      :confirm-loading="dialog.loading.value"
      :confirm-disabled="dialog.openedItem.value.name !== confirmBoardName"
      @close="closeDeleteConfirmDialog"
      @confirm="deleteBoard(dialog.openedItem.value.id)"
    >
      <div>
        Are you sure you want to Delete the board
        <b>{{ dialog.openedItem.value.name }}</b>
        ? The data in it will be lost forever.
      </div>
      <q-input v-model.trim="confirmBoardName" class="q-mt-md" label="Enter board name" autofocus outlined />
    </BaseDialog>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import CommonSearch from 'components/common/CommonSearch.vue';
import CommonListTitle from 'components/common/CommonListTitle.vue';

import { BoardModel } from 'src/models/project/board.model';
import { ProjectModel, ProjectTemplateEnum } from 'src/models/project/project.model';

export default defineComponent({
  name: 'ProjectBoardDialogSelect',

  components: {
    CommonSearch,
    CommonListTitle,
  },

  props: {
    project: {
      type: Object as PropType<ProjectModel>,
      required: true,
    },
    availableProjects: {
      type: Array as PropType<ProjectModel[]>,
      required: false,
      default: null,
    },

    boards: {
      type: Array as PropType<BoardModel[]>,
      required: true,
    },
    selectedBoard: {
      type: Object as PropType<BoardModel>,
      required: true,
    },
  },

  emits: ['select', 'create', 'close'],

  setup(props, { emit }) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const dialog = useDialog();
    const loading = useLoading();

    const isOpenedBoardsPage = computed(() => route.path.includes('board'));
    function isActiveBoard(boardID: number) {
      const isSelectedBoard = boardID === props.selectedBoard.id;
      return isSelectedBoard && isOpenedBoardsPage.value;
    }

    async function handleDialogConfirmClick() {
      if (step.value === 1) step.value++;
      else await createBoard();
    }

    const search = ref('');
    const filteredBoards = computed(() => {
      if (!search.value) return props.boards;
      return props.boards.filter((b) => b.name.toLowerCase().includes(search.value.toLowerCase()));
    });

    function selectBoard(board: BoardModel) {
      const isSelectedAnotherBoard = board.id !== props.selectedBoard.id;
      if (isSelectedAnotherBoard || !isOpenedBoardsPage.value) {
        emit('select', board);
      }
      close();
    }
    const confirmBoardName = ref('');
    async function deleteBoard(boardID: number) {
      try {
        dialog.startLoading();
        await store.dispatch('project/deleteBoard', boardID);
        closeDeleteConfirmDialog();
      } finally {
        dialog.stopLoading();
      }
    }
    function closeDeleteConfirmDialog() {
      confirmBoardName.value = '';
      dialog.close();
    }
    function close() {
      step.value = 1;
      form.name = '';
      emit('close');
    }

    const computedTitle = computed(() => {
      if (step.value === 1) return 'Board selection';
      else return 'Create Agile Board';
    });
    const step = ref(1);

    const templateType = ref();
    function showKanbanCreateForm() {
      step.value = 3;
      templateType.value = ProjectTemplateEnum.KANBAN;
    }
    function showScrumCreateForm() {
      step.value = 3;
      templateType.value = ProjectTemplateEnum.SCRUM;
    }

    const form = reactive({
      name: '',
      project: props.project,
    });
    async function createBoard() {
      try {
        loading.start();
        const board = (await store.dispatch('project/createBoard', form)) as BoardModel;
        const isCreatedInCurrentProject = board.projectID === store.state.project.projectDetail?.id;
        if (isCreatedInCurrentProject) selectBoard(board);
        else await router.push(`/projects/${board.projectID}/board/${board.id}`);
      } finally {
        loading.stop();
      }
    }

    return {
      dialog,
      loading,

      isActiveBoard,

      handleDialogConfirmClick,

      search,
      filteredBoards,

      selectBoard,
      deleteBoard,
      confirmBoardName,
      closeDeleteConfirmDialog,
      close,

      computedTitle,
      step,
      showKanbanCreateForm,
      showScrumCreateForm,

      form,
      createBoard,
    };
  },
});
</script>
