<template>
  <BaseDialog
    close-text="Назад"
    confirm-text="Создать доску"
    :title="computedTitle"
    :show="show"
    :actions="step !== 1"
    :show-back-button="step !== 1"
    :back-text="step === 1 ? 'Отмена' : 'Назад'"
    :hide-confirm-button="step !== 3"
    :confirm-loading="loading.active.value"
    :content-loading="step === 3 && loading.custom.projects"
    hide-close-button
    large
    @back="step = 2"
    @close="close"
    @confirm="createBoard"
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
          <q-item-section :class="{ 'text-weight-bold': board.id === selectedBoard.id }">
            {{ board.name }}
          </q-item-section>
        </q-item>
      </q-list>

      <div class="row justify-end q-mt-xl">
        <q-btn class="btn--secondary" label="Создать доску" icon="add" unelevated no-caps no-wrap @click="step = 2" />
      </div>
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
            class="btn--secondary q-mt-lg"
            label="Создание доски Scrum"
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
            class="btn--secondary q-mt-lg"
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
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, PropType, onBeforeMount } from 'vue';
import { useStore } from 'src/store';
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

  emits: ['select', 'close'],

  setup(props, { emit }) {
    const store = useStore();
    const loading = useLoading({ customNames: ['projects'] });

    onBeforeMount(async () => {
      if (!props.availableProjects) {
        try {
          loading.start('projects');
          await store.dispatch('project/getAll');
          await new Promise((res) =>
            setTimeout(() => {
              res({});
            }, 10000)
          );
        } finally {
          loading.stop('projects');
        }
      }
    });

    const search = ref('');
    const filteredBoards = computed(() => {
      if (!search.value) return props.boards;
      return props.boards.filter((b) => b.name.toLowerCase().includes(search.value));
    });

    function selectBoard(boardID: number) {
      const isSelectedAnotherBoard = boardID !== props.selectedBoard.id;
      if (isSelectedAnotherBoard) {
        emit('select', boardID);
      }
      close();
    }
    function close() {
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
        await store.dispatch('project/createBoard', form);
        close();
      } finally {
        loading.stop;
      }
    }

    return {
      loading,

      search,
      filteredBoards,

      selectBoard,
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
