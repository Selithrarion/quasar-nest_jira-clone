<template>
  <BaseDialog
    title="Создать задачу"
    confirm-text="Создать"
    :show="show"
    :content-loading="isContentLoading"
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
          option-value="id"
          :options="availableProjects"
          emit-value
          map-options
          filled
        />
        <q-select
          v-model="form.type"
          style="max-width: 250px"
          label="Тип задачи"
          option-label="name"
          option-value="key"
          :options="availableIssueTypes"
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

        <q-input v-model="form.name" label="Резюме" autofocus filled />
        <q-input v-model="form.description" type="textarea" label="Описание" autogrow filled />

        <q-separator />

        <q-select
          v-model="form.priority"
          style="max-width: 250px"
          label="Приоритет"
          option-label="name"
          option-value="key"
          :options="availableIssuePriorities"
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
        <q-input v-model="form.marks" style="max-width: 250px" label="Метки" filled />

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
                  <ProjectBoardIconPriorityType :type="opt.id" hide-tooltip small />
                </div>

                <q-item-section>
                  <q-item-label>{{ opt.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <div>
            <q-btn label="Назначить мне" dense no-caps no-wrap flat />
          </div>
        </div>
      </q-form>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onBeforeMount } from 'vue';
import { useStore } from 'src/store';
import useLoading from 'src/composables/common/useLoading';

import BaseDialog from 'components/base/BaseDialog.vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';
import ProjectBoardIconPriorityType from 'components/project/board/icon/ProjectBoardIconPriorityType.vue';

export default defineComponent({
  name: 'ProjectBoardDialogCreateIssue',

  components: {
    BaseDialog,
    ProjectBoardIconIssueType,
    ProjectBoardIconPriorityType,
  },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const store = useStore();
    const loading = useLoading({ customNames: ['content'] });

    const availableProjects = computed(() => store.state.project.projects);
    const availableProjectUsers = computed(() => store.state.project.projectUsers);
    const availableIssueTypes = computed(() => store.state.project.availableIssueTypes);
    const availableIssuePriorities = computed(() => store.state.project.availableIssuePriorities);

    const isContentLoading = computed(() => !availableProjects.value || !availableProjectUsers.value);

    const currentProject = computed(() => store.state.project?.projectDetail);
    onBeforeMount(async () => {
      if (!availableProjects.value) await store.dispatch('project/getAll');
      if (!availableProjectUsers.value) await store.dispatch('project/getProjectUsers');
    });

    const form = reactive({
      project: currentProject,
      type: 1,
      priority: 3,
      name: '',
      description: '',
      assigned: null,
      marks: [],
    });

    function create() {
      console.log(form);
    }
    function close() {
      emit('close');
    }

    return {
      loading,

      availableProjects,
      availableProjectUsers,
      availableIssueTypes,
      availableIssuePriorities,
      isContentLoading,

      form,

      create,
      close,
    };
  },
});
</script>
