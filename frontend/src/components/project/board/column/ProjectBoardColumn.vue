<template>
  <div class="board-column bg-grey-2 flex-grow-1 full-height rounded-md">
    <CommonInputEdit
      v-model="selectedColumnLocalName"
      no-button-padding
      autogrow
      @update="updateColumnName"
      @reset="resetColumnName"
    >
      <template #button>
        <CommonListTitle class="q-pa-sm">
          <span>{{ selectedColumnLocalName }} {{ selectedColumnIssues.length }}</span>
          <BaseLoader v-if="loading.active.value" gray-color small />
        </CommonListTitle>
      </template>
    </CommonInputEdit>

    <div class="full-height" :class="{ 'opacity-60': loading.active.value }">
      <Draggable
        v-model="selectedColumnIssues"
        class="list-group"
        item-key="id"
        :class="computedDraggableClasses"
        v-bind="dragOptions"
        @start="handleDragStart"
        @end="handleDragEnd"
      >
        <template #item="{ element }">
          <q-card class="list-group-item" @click="openIssue(element.id)">
            <q-card-section class="q-px-sm q-pt-sm q-pb-none">
              <span>
                {{ element.name }}
                <BaseTooltip v-if="!isDrag" :label="element.name" />
              </span>
            </q-card-section>
            <q-card-section class="flex-center-between q-pa-sm">
              <div class="flex-center gap-1">
                <ProjectBoardIconIssueType :type="element.typeID" small />
                <ProjectBoardIconIssuePriority :priority="element.priorityID" />
              </div>

              <div class="row items-center gap-2">
                <span class="cursor-pointer">
                  {{ element.key }}
                  <BaseTooltip :label="element.key" />
                </span>

                <BaseAvatar
                  v-if="element.assigned"
                  :src="element.assigned.avatar && element.assigned.avatar.url"
                  :item-name="element.assigned.username"
                  :item-color="element.assigned.color"
                  :tooltip="`${t('project.assigned')}: ${element.assigned.name}`"
                />
              </div>
            </q-card-section>
          </q-card>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'src/store';
import useLoading from 'src/composables/common/useLoading';

import Draggable from 'vuedraggable';
import CommonListTitle from 'components/common/CommonListTitle.vue';
import CommonInputEdit from 'components/common/CommonInputEdit.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';
import ProjectBoardIconIssuePriority from 'components/project/board/icon/ProjectBoardIconIssuePriority.vue';

import { IssueModel } from 'src/models/project/issue.model';

export default defineComponent({
  name: 'ProjectBoardColumn',

  components: {
    Draggable,
    CommonListTitle,
    CommonInputEdit,
    ProjectBoardIconIssueType,
    ProjectBoardIconIssuePriority,
  },

  props: {
    columnIndex: {
      type: Number,
      required: true,
    },
  },

  emits: ['open'],

  setup(props, { emit }) {
    const { t } = useI18n();
    const store = useStore();
    const loading = useLoading();

    function openIssue(issueID: number) {
      emit('open', issueID);
    }

    const isDrag = ref(false);
    function handleDragStart() {
      isDrag.value = true;
      store.commit('project/SET_ISSUE_DRAGGING_STATUS', true);
    }
    function handleDragEnd() {
      isDrag.value = false;
      store.commit('project/SET_ISSUE_DRAGGING_STATUS', false);
    }

    const dragOptions = {
      animation: 200,
      group: 'issues',
      disabled: false,
      ghostClass: 'item-ghost',
    };
    const globalIssueDraggingStatus = computed(() => store.state.project.isIssueDragging);
    const computedDraggableClasses = computed(() => {
      const classes = [];

      if (isDrag.value) classes.push('list-group--drag');
      if (isDrag.value !== globalIssueDraggingStatus.value) classes.push('list-group--can-drop-item');

      return classes;
    });

    const selectedColumn = computed(() => store.state.project.boardDetail?.columns?.[props.columnIndex]);
    const selectedColumnIssues = computed({
      get(): IssueModel[] | undefined {
        return selectedColumn.value?.issues;
      },
      async set(issues: IssueModel[] | undefined) {
        const id = selectedColumn.value?.id;
        const payload = { issues };
        await store.dispatch('project/updateColumn', { id, payload });
      },
    });

    const isEditName = ref(false);
    const selectedColumnLocalName = ref(selectedColumn.value?.name || '');
    async function updateColumnName() {
      try {
        loading.start();
        const id = selectedColumn.value?.id;
        const payload = { name: selectedColumnLocalName.value };
        await store.dispatch('project/updateColumn', { id, payload });
      } finally {
        loading.stop();
      }
    }
    function resetColumnName() {
      if (!selectedColumn.value) return;
      isEditName.value = false;
      selectedColumnLocalName.value = selectedColumn.value.name;
    }

    return {
      t,
      loading,
      openIssue,

      isDrag,
      handleDragStart,
      handleDragEnd,
      dragOptions,
      computedDraggableClasses,

      selectedColumn,
      selectedColumnIssues,

      isEditName,
      selectedColumnLocalName,
      updateColumnName,
      resetColumnName,
    };
  },
});
</script>

<style lang="scss" scoped>
.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.item-ghost {
  opacity: 0.6;
  background: #c8e3fb;
}
.list-group {
  display: flex;
  flex-flow: column;
  gap: 4px;
  padding: 0 4px 12px;
  height: calc(100% - 36px);
  border: 2px dashed transparent;
  border-radius: 4px;
  transition: border-color 200ms ease;
  &--drag {
    border-color: $blue-4;
  }
  &--can-drop-item {
    border-color: $green-13;
  }
}
.list-group-item {
  user-select: none;
  cursor: grab;
  transition: background-color 150ms ease-in;
  &:hover {
    background: $grey-1;
  }
  &:active {
    background: $blue-1;
  }
}
</style>
