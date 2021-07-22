<template>
  <BaseDialog
    title="Создать задачу"
    confirm-text="Создать"
    :show="show"
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
        <q-input v-model="form.project" style="max-width: 250px" label="Проект" filled />
        <q-input v-model="form.issueType" style="max-width: 250px" label="Тип задачи" filled />

        <q-input v-model="form.name" label="Резюме" autofocus filled />
        <q-input v-model="form.description" type="textarea" label="Описание" autogrow filled />

        <q-input v-model="form.priority" style="max-width: 250px" label="Приоритет" filled />
        <q-input v-model="form.marks" style="max-width: 250px" label="Метки" filled />

        <div class="column gap-1">
          <q-input v-model="form.assigned" label="Исполнитель" filled />
          <div>
            <q-btn label="Назначить мне" dense no-caps no-wrap flat />
          </div>
        </div>
      </q-form>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import BaseDialog from 'components/base/BaseDialog.vue';

export default defineComponent({
  name: 'ProjectBoardDialogCreateTask',

  components: {
    BaseDialog,
  },

  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const form = reactive({
      project: null,
      issueType: null,
      name: '',
      description: '',
      assigned: null,
      priority: 3,
      marks: [],
    });

    function create() {
      console.log(form);
    }
    function close() {
      emit('close');
    }

    return {
      form,

      create,
      close,
    };
  },
});
</script>
