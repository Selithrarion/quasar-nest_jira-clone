<template>
  <BaseDialog
    title="Создать задачу"
    confirm-text="Создать"
    :content-loading="isContentLoading"
    :confirm-loading="loading.value"
    hide-close-icon
    use-form
    large
    @confirm="create"
    @close="close"
  >
    <template #title-append-buttons>
      <div class="row items-center gap-2 no-wrap">
        <q-btn class="btn--secondary" label="Импортировать задачи" unelevated disable no-caps no-wrap />
        <q-btn-dropdown
          class="btn--secondary"
          label="Настроить поля"
          unelevated
          disable
          no-caps
          no-wrap
        ></q-btn-dropdown>
      </div>
    </template>

    <template #default>
      <q-form>
        <q-select
          v-model="form.project"
          style="max-width: 250px"
          label="Проект"
          option-label="name"
          :options="availableProjects"
          :rules="[rules.required]"
          hide-bottom-space
          filled
        />
        <q-select
          v-model="form.type"
          style="max-width: 250px"
          label="Тип задачи"
          option-label="name"
          option-value="id"
          :options="availableIssueTypes"
          :rules="[rules.required]"
          hide-bottom-space
          emit-value
          map-options
          filled
        >
          <template #option="{ itemProps, itemEvents, opt }">
            <q-item v-bind="itemProps" v-on="itemEvents">
              <div class="flex-center q-pr-sm">
                <ProjectBoardIconIssueType :type="opt.id" small />
              </div>

              <q-item-section>
                <q-item-label>{{ opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-separator />

        <q-input v-model="form.name" label="Резюме" :rules="[rules.required]" hide-bottom-space autofocus filled />
        <q-input v-model="form.description" type="textarea" label="Описание" autogrow filled />

        <q-separator />

        <q-select
          v-model="form.priority"
          style="max-width: 250px"
          label="Приоритет"
          option-label="name"
          option-value="id"
          :options="availableIssuePriorities"
          :rules="[rules.required]"
          hide-bottom-space
          emit-value
          map-options
          filled
        >
          <template #option="{ itemProps, itemEvents, opt }">
            <q-item v-bind="itemProps" v-on="itemEvents">
              <div class="flex-center q-pr-sm">
                <ProjectBoardIconPriorityType :type="opt.id" hide-tooltip small />
              </div>

              <q-item-section>
                <q-item-label>{{ opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-input v-model="form.marks" style="max-width: 250px" label="Метки" disable filled />

        <div class="column gap-1">
          <q-select
            v-model="form.assigned"
            style="max-width: 250px"
            label="Исполнитель"
            option-label="name"
            option-value="id"
            :options="availableProjectUsers"
            emit-value
            map-options
            filled
          >
            <template #option="{ itemProps, itemEvents, opt }">
              <q-item v-bind="itemProps" v-on="itemEvents">
                <div class="flex-center q-pr-sm">
                  <q-avatar size="24px">
                    <img
                      :src="opt.avatarURL || require('src/assets/img/default-avatar-1.png')"
                      :alt="`${opt.name} Avatar`"
                    />
                  </q-avatar>
                </div>

                <q-item-section>
                  <q-item-label>{{ opt.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <div>
            <q-btn label="Назначить мне" dense no-caps no-wrap flat @click="assignToCurrentUser" />
          </div>
        </div>
      </q-form>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useStore } from 'src/store';
import useLoading from 'src/composables/common/useLoading';
import useFormValidation from 'src/composables/common/useFormValidation';

import BaseDialog from 'components/base/BaseDialog.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';
import ProjectBoardIconPriorityType from 'components/project/board/icon/ProjectBoardIconPriorityType.vue';
import { UserModel } from 'src/models/user/user.model';
import { IssuePriorityEnum, IssueTypeEnum } from 'src/models/project/issue.model';

export default defineComponent({
  name: 'ProjectBoardDialogCreateIssue',

  components: {
    BaseDialog,
    ProjectBoardIconIssueType,
    ProjectBoardIconPriorityType,
  },

  emits: ['close'],

  setup(props, { emit }) {
    const store = useStore();
    const loading = useLoading();
    const rules = useFormValidation();

    const availableProjects = computed(() => store.state.project.projects);
    const availableProjectUsers = computed(() => store.state.project.projectDetail?.users);
    const availableIssueTypes = computed(() => store.state.project.availableIssueTypes);
    const availableIssuePriorities = computed(() => store.state.project.availableIssuePriorities);
    const isContentLoading = computed(() => !availableProjects.value || !availableProjectUsers.value);

    const currentProject = computed(() => store.state.project.projectDetail);
    const currentBoard = computed(() => store.state.project.boardDetail);

    const form = reactive({
      project: currentProject.value,
      type: IssueTypeEnum['BUG'],
      priority: IssuePriorityEnum['MEDIUM'],
      name: '',
      description: '',
      assigned: null as UserModel | null,
      marks: [],
    });

    async function create() {
      try {
        loading.start();
        const board = currentBoard.value || currentProject.value?.boards[0];
        const payload = { ...form, board };
        await store.dispatch('project/createIssue', payload);
        close();
      } finally {
        loading.stop;
      }
    }
    function close() {
      emit('close');
    }

    function assignToCurrentUser() {
      const currentUser = store.state.user.currentUser;
      form.assigned = currentUser;
    }

    return {
      loading,
      rules,

      availableProjects,
      availableProjectUsers,
      availableIssueTypes,
      availableIssuePriorities,
      isContentLoading,

      form,

      create,
      close,

      assignToCurrentUser,
    };
  },
});
</script>
