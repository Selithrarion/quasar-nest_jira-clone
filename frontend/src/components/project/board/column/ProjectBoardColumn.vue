<template>
  <div class="project-board-column bg-grey-2 flex-grow-1 full-height rounded-md">
    <div class="text-caption text-uppercase text-weight-medium q-pa-sm">{{ columnName }}</div>

    <div v-if="columnIssues.length" class="full-height">
      <Draggable
        v-model="columnIssues"
        class="list-group"
        item-key="id"
        tag="transition-group"
        :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: isDrag ? null : 'flip-list',
        }"
        :class="{ 'list-group--drag': isDrag }"
        v-bind="dragOptions"
        @start="isDrag = true"
        @end="isDrag = false"
      >
        <template #item="{ element }">
          <q-card class="list-group-item" @click="openIssue(element.id)">
            <q-card-section class="q-px-sm q-pt-sm q-pb-none">
              <span> {{ element.name }} </span>
              <BaseTooltip v-if="!isDrag" :label="element.name" />
            </q-card-section>
            <q-card-section class="flex-center-between q-pa-sm">
              <div>
                <ProjectBoardIconIssueType type="bug" />
              </div>

              <div class="row gap-2">
                <span class="cursor-pointer">
                  {{ element.key }}
                  <BaseTooltip :label="element.key" />
                </span>

                <q-avatar size="24px">
                  <img
                    src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
                    alt="User Avatar"
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
import { defineComponent, reactive, ref, PropType } from 'vue';

import Draggable from 'vuedraggable';
import BaseTooltip from 'components/base/BaseTooltip.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';

import { IssueModel } from 'src/models/project/issue.model';

export default defineComponent({
  name: 'ProjectBoardColumn',

  components: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    Draggable,
    BaseTooltip,
    ProjectBoardIconIssueType,
  },

  props: {
    columnName: {
      type: String,
      required: true,
    },
    columnIssues: {
      type: Object as PropType<IssueModel[]>,
      required: true,
    },
  },

  emits: ['open'],

  setup(props, { emit }) {
    function openIssue(issueID: number) {
      emit('open', issueID);
    }

    const isDrag = ref(false);
    const dragOptions = {
      animation: 200,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost',
    };

    return {
      openIssue,

      isDrag,
      dragOptions,
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
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8e3fb;
}
.list-group {
  display: flex;
  flex-flow: column;
  padding: 0 4px 12px;
  gap: 4px;
  height: calc(100% - 36px);
  border: 2px dashed transparent;
  &--drag {
    border-color: $blue-4;
    border-radius: 4px;
  }
}
.list-group-item {
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
