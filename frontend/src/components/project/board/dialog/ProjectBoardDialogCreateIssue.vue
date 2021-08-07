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
        <BaseSelect
          v-model="form.project"
          label="Проект"
          width="250"
          :options="availableProjects"
          :rules="[rules.required]"
        />

        <BaseSelect
          v-model="form.typeID"
          label="Тип задачи"
          width="250"
          :options="availableIssueTypes"
          :rules="[rules.required]"
        >
          <template #optionPrepend="{ option }">
            <ProjectBoardIconIssueType :type="option.id" small />
          </template>
        </BaseSelect>

        <q-separator />

        <q-input v-model="form.name" label="Резюме" :rules="[rules.required]" hide-bottom-space autofocus filled />
        <q-input v-model="form.description" type="textarea" label="Описание" autogrow filled />

        <q-separator />

        <BaseSelect
          v-model="form.priorityID"
          label="Приоритет"
          width="250"
          :options="availableIssuePriorities"
          :rules="[rules.required]"
        >
          <template #optionPrepend="{ option }">
            <ProjectBoardIconIssuePriority :priority="option.id" hide-tooltip small />
          </template>
        </BaseSelect>
        <q-input v-model="form.marks" style="max-width: 250px" label="Метки" disable filled />

        <div class="column gap-1">
          <BaseSelect v-model="form.assigned" label="Исполнитель" width="250" :options="availableProjectUsers">
            <template #optionPrepend="{ option }">
              <q-avatar size="24px">
                <img
                  :src="option.avatarURL || require('src/assets/img/default-avatar-1.png')"
                  :alt="`${option.name} Avatar`"
                />
              </q-avatar>
            </template>
          </BaseSelect>
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
import BaseSelect from 'components/base/BaseSelect.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';
import ProjectBoardIconIssuePriority from 'components/project/board/icon/ProjectBoardIconIssuePriority.vue';
import { UserModel } from 'src/models/user/user.model';
import { IssuePriorityEnum, IssueTypeEnum } from 'src/models/project/issue.model';

export default defineComponent({
  name: 'ProjectBoardDialogCreateIssue',

  components: {
    BaseDialog,
    BaseSelect,
    ProjectBoardIconIssueType,
    ProjectBoardIconIssuePriority,
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
      typeID: IssueTypeEnum['BUG'],
      priorityID: IssuePriorityEnum['MEDIUM'],
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
