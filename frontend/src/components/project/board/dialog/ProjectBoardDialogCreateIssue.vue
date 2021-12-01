<template>
  <BaseDialog
    :title="t('common.createIssue')"
    :confirm-text="t('common.create')"
    :content-loading="isContentLoading"
    :confirm-loading="loading.active.value"
    hide-close-icon
    use-form
    large
    @confirm="create"
    @close="close"
  >
    <template #title-append-buttons>
      <div class="row items-center gap-2 no-wrap">
        <BaseButton :label="t('project.importIssues')" secondary-color unelevated disable no-wrap />
        <q-btn-dropdown
          class="btn--secondary"
          :label="t('project.configureFields')"
          unelevated
          disable
          no-caps
          no-wrap
        ></q-btn-dropdown>
      </div>
    </template>

    <template #default>
      <BaseSelectWithAvatar
        v-model="form.project"
        width="250"
        :label="t('project.project')"
        :options="availableProjects"
        :rules="[rules.required]"
      />

      <BaseSelectIssueType
        v-model="form.typeID"
        width="250"
        :label="t('project.issueType.issueType')"
        :options="availableIssueTypes"
        :rules="[rules.required]"
      />

      <q-separator />

      <q-input
        v-model="form.name"
        :label="t('common.summary')"
        :rules="[rules.required]"
        hide-bottom-space
        autofocus
        filled
      />
      <q-input v-model="form.description" type="textarea" :label="t('common.description')" autogrow filled />

      <q-separator />

      <BaseSelectIssuePriority
        v-model="form.priorityID"
        width="250"
        :options="availableIssuePriorities"
        :rules="[rules.required]"
      />
      <q-input v-model="form.marks" style="max-width: 250px" :label="t('project.marks')" disable filled />

      <div class="column gap-1">
        <BaseSelectWithAvatar
          v-model="form.assigned"
          width="250"
          :label="t('project.assigned')"
          :options="availableProjectUsers"
        />
        <div>
          <BaseButton :label="t('project.assignToMe')" dense flat @click="assignToCurrentUser" />
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useStore } from 'src/store';
import useLoading from 'src/composables/common/useLoading';
import useFormValidation from 'src/composables/form/useFormValidation';

import { UserModel } from 'src/models/user/user.model';
import { IssuePriorityEnum, IssueTypeEnum } from 'src/models/project/issue.model';

export default defineComponent({
  name: 'ProjectBoardDialogCreateIssue',

  emits: ['close'],

  setup(props, { emit }) {
    const q = useQuasar();
    const { t } = useI18n();
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

    const valid = ref(false);
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
        q.notify({
          type: 'positive',
          message: 'Issue created',
        });
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
      t,
      loading,
      rules,

      availableProjects,
      availableProjectUsers,
      availableIssueTypes,
      availableIssuePriorities,
      isContentLoading,

      valid,
      form,

      create,
      close,

      assignToCurrentUser,
    };
  },
});
</script>
