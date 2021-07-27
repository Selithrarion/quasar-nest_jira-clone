<template>
  <BaseDialog
    close-text="Назад"
    confirm-text="Создать доску"
    :title="computedTitle"
    :show="show"
    :show-back-button="step !== 1"
    :back-text="step === 1 ? 'Отмена' : 'Назад'"
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

      <div class="text-caption text-uppercase q-mt-md q-mb-sm">доски в {{ project.name }}</div>
      <q-list>
        <q-item
          v-for="board in filteredBoards"
          :key="board.id"
          class="row items-center gap-3 q-pl-sm"
          :class="{ 'shadow-1': board.id === selectedBoard.id }"
          clickable
          @click="selectBoard(board)"
        >
          <q-icon name="check" size="sm" :color="board.id === selectedBoard.id ? 'green-6' : 'blue-grey-5'" />

          <div class="row items-center justify-between no-wrap full-width">
            <q-item-section :class="{ 'text-weight-bold': board.id === selectedBoard.id }">
              {{ board.name }}
            </q-item-section>

            <q-btn
              v-show="board.id !== selectedBoard.id"
              icon="more_horiz"
              padding="4px"
              color="blue-grey-4"
              size="small"
              flat
              @click.stop=""
            >
              <q-menu>
                <q-list>
                  <q-item v-close-popup clickable @click.stop="dialog.open('deleteBoard', { item: board })">
                    <q-item-section> Удалить </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-item>
      </q-list>
    </div>

    <div v-else-if="step === 2">
      <div class="row no-wrap q-col-gutter-lg">
        <div class="column justify-between flex-1">
          <div class="column">
            <h5 class="text-weight-medium no-margin">Scrum</h5>
            <div class="q-mt-md">
              Scrum предназначается для планирования, включения и передачи сгруппированных по времени фрагментов
              операций, называемых спринтами.
            </div>
          </div>

          <q-btn
            class="btn--secondary q-mt-xl"
            label="Создание доски Scrum"
            disable
            unelevated
            no-caps
            @click="showScrumCreateForm"
          />
        </div>

        <div class="column justify-between flex-1">
          <div class="column">
            <h5 class="text-weight-medium no-margin">Kanban</h5>
            <div class="q-mt-md">
              Kanban предназначается для визуализации рабочего процесса и ограничения объема работы, выполняющейся в
              данный момент, для последовательного усовершенствования существующих процессов.
            </div>
          </div>

          <q-btn
            class="btn--secondary q-mt-xl"
            label="Создание доски Kanban"
            unelevated
            no-caps
            @click="showKanbanCreateForm"
          />
        </div>
      </div>
    </div>

    <div v-else-if="step === 3">
      <q-form>
        <q-input v-model="form.name" label="Имя доски" autofocus lazy-rules filled />
        <q-select
          v-model="form.projectID"
          label="Проект"
          :options="availableProjects"
          option-label="name"
          option-value="id"
          emit-value
          map-options
          filled
        />
      </q-form>
    </div>

    <BaseDialog
      type="delete"
      :show="dialog.openedName.value === 'deleteBoard'"
      :title="`Удалить ${dialog.openedItem.value.name}?`"
      :confirm-loading="dialog.loading.value"
      :confirm-disabled="dialog.openedItem.value.name !== confirmBoardName"
      @close="closeDeleteConfirmDialog"
      @confirm="deleteBoard(dialog.openedItem.value.id)"
    >
      Вы уверены, что хотите удалить доску
      <b>{{ dialog.openedItem.value.name }}</b>
      ? Данные в ней навсегда будут утеряны.
      <q-input v-model.trim="confirmBoardName" class="q-mt-md" label="Введите имя доски" autofocus outlined />
    </BaseDialog>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, PropType } from 'vue';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import BaseDialog from 'components/base/BaseDialog.vue';
import CommonSearch from 'components/common/CommonSearch.vue';

import { BoardModel } from 'src/models/project/board.model';
import { ProjectModel } from 'src/models/project/project.model';

export default defineComponent({
  name: 'ProjectBoardDialogSelect',

  components: {
    BaseDialog,
    CommonSearch,
  },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
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
    const store = useStore();
    const dialog = useDialog();
    const loading = useLoading();

    async function handleDialogConfirmClick() {
      if (step.value === 1) step.value++;
      else await createBoard();
    }

    const search = ref('');
    const filteredBoards = computed(() => {
      if (!search.value) return props.boards;
      return props.boards.filter((b) => b.name.toLowerCase().includes(search.value));
    });

    function selectBoard(board: BoardModel) {
      const isSelectedAnotherBoard = board.id !== props.selectedBoard.id;
      if (isSelectedAnotherBoard) {
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
      if (step.value === 1) return 'Выбор доски';
      else return 'Создать доску Agile';
    });
    const step = ref(1);

    const templateType = ref();
    function showKanbanCreateForm() {
      step.value = 3;
      templateType.value = 'KANBAN';
    }
    function showScrumCreateForm() {
      step.value = 3;
      templateType.value = 'SCRUM';
    }

    const form = reactive({
      name: '',
      projectID: props.project.id,
    });
    async function createBoard() {
      try {
        loading.start();
        const board = (await store.dispatch('project/createBoard', form)) as BoardModel;
        const isCreatedInCurrentProject = board.projectID === store.state.project.projectDetail?.id;
        if (isCreatedInCurrentProject) selectBoard(board);
        else close()
      } finally {
        loading.stop();
      }
    }

    return {
      dialog,
      loading,

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
