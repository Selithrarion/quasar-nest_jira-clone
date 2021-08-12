<template>
  <div class="project-board-column bg-grey-2 flex-grow-1 full-height rounded-md">
    <CommonListTitle class="text-weight-medium q-pa-sm">
      {{ selectedColumn.name }} {{ selectedColumnIssues.length }}
    </CommonListTitle>

    <div class="full-height">
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

                <q-avatar v-if="element.assigned" size="24px">
                  <img
                    :src="element.avatarURL || require('src/assets/img/default-avatar-1.png')"
                    :alt="`${element.assigned.name} Avatar`"
                  />
                  <BaseTooltip :label="`Исполнитель: ${element.assigned.name}`" />
                </q-avatar>
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
import { useStore } from 'src/store';

import Draggable from 'vuedraggable';
import CommonListTitle from 'components/common/CommonListTitle.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';
import ProjectBoardIconIssuePriority from 'components/project/board/icon/ProjectBoardIconIssuePriority.vue';

import { IssueModel } from 'src/models/project/issue.model';

export default defineComponent({
  name: 'ProjectBoardColumn',

  components: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Draggable,
    CommonListTitle,
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
    const store = useStore();

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
      ghostClass: 'ghost',
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
        if (!id) return;

        const payload = { issues };
        await store.dispatch('project/updateColumn', { id, payload });
      },
    });

    return {
      openIssue,

      isDrag,
      handleDragStart,
      handleDragEnd,
      dragOptions,
      computedDraggableClasses,

      selectedColumn,
      selectedColumnIssues,
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
.ghost {
  opacity: 0.5;
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
    background: $blue-grey-1;
  }
}
</style>
