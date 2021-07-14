<template>
  <div class="project-board-column bg-grey-2 flex-grow-1 h-full rounded-md">
    <div class="text-caption text-uppercase text-weight-medium q-pa-sm">In progress</div>

    <div class="q-px-xs q-pb-xs">
      <Draggable
        v-model="issues"
        class="list-group"
        item-key="id"
        tag="transition-group"
        :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !isDrag ? 'flip-list' : null,
        }"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
      >
<!--        <template #item="{ element }">-->
        <template #item>
          <q-card class="list-group-item" @click="openIssue(100)">
            <q-card-section class="q-px-sm q-pt-sm q-pb-none">
              <span> Lorem ipsum dolor sit amet, consectetur adipisic </span>
              <BaseTooltip label="Lorem ipsum dolor sit amet, consectetur adipisic" />
            </q-card-section>
            <q-card-section class="flex-center-between q-pa-sm">
              <div>
                <ProjectBoardIconIssueType type="bug" />
              </div>

              <div class="row gap-2">
                <span class="cursor-pointer">
                  JP-100
                  <BaseTooltip label="JP-100" />
                </span>

                <q-avatar size="24px">
                  <img
                    src="https://secure.gravatar.com/avatar/d1cb0ee26c499154d46f1ab7b61cf44f?d=https%3A%2F%2Favatar-management--avatars.us-west-2.prod.public.atl-paas.net%2Fdefault-avatar-1.png"
                    alt="User Avatar"
                  />
                  <BaseTooltip label="Исполнитель: Сергей Мальцев" />
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
import { defineComponent, reactive, ref } from 'vue';

import Draggable from 'vuedraggable';
import BaseTooltip from 'components/base/BaseTooltip.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';

import { IssueModel } from 'src/models/project/issue.model';

export default defineComponent({
  name: 'ProjectBoardColumn',

  components: {
    Draggable,
    BaseTooltip,
    ProjectBoardIconIssueType,
  },

  props: {},

  emits: ['open'],

  setup(props, { emit }) {
    const issues = reactive<IssueModel[]>([
      {
        id: 1,
        name: 'name',
        description: 'des',
        comments: [],
        watchNumber: 1,
        watchers: [],
        priority: 3,
        author: {
          id: 1,
          name: 'Jira Jira',
          avatarURL:
            'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
          email: 'jirajiraemail@gmail.com',
          locale: 'ru_RU',
          isActive: true,
        },
        assigned: {
          id: 1,
          name: 'Jira Jira',
          avatarURL:
            'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
          email: 'jirajiraemail@gmail.com',
          locale: 'ru_RU',
          isActive: true,
        },
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
      {
        id: 2,
        name: 'title',
        description: 'des',
        comments: [],
        watchNumber: 1,
        watchers: [],
        priority: 3,
        author: {
          id: 1,
          name: 'Jira Jira',
          avatarURL:
            'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
          email: 'jirajiraemail@gmail.com',
          locale: 'ru_RU',
          isActive: true,
        },
        assigned: {
          id: 1,
          name: 'Jira Jira',
          avatarURL:
            'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
          email: 'jirajiraemail@gmail.com',
          locale: 'ru_RU',
          isActive: true,
        },
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
      },
    ]);
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
      issues,
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
  gap: 4px;
  min-height: 77px;
}
.list-group-item {
  cursor: grab;
}
</style>
