<template>
  <q-form @submit.prevent="submit">
    <q-input
      v-model="form.name"
      :label="t('common.title')"
      :hint="t('validation.upToChars', 40)"
      :rules="[rules.required, rules.max40]"
      autofocus
      lazy-rules
      filled
    />

    <BaseSelect v-model="form.accessID" :label="t('access.access')" :options="accessOptions">
      <template #optionPrepend="{ option }">
        <q-icon :name="option.icon" />
      </template>
      <template #optionLabel="{ option }">
        <q-item-label>{{ option.name }}</q-item-label>
        <q-item-label style="max-width: 600px" caption>{{ option.description }}</q-item-label>
      </template>
    </BaseSelect>

    <q-input
      v-model="form.key"
      hint="For example, My Project can be - MP, MP1, MYPR, MY, PR or any other"
      :label="t('table.key')"
      :rules="[rules.required, rules.max10]"
      lazy-rules
      filled
    />

    <BaseSelect
      v-model="form.templateID"
      option-disable="disabled"
      :label="t('table.template')"
      :options="templateOptions"
    />

    <div class="dialog-action-buttons">
      <BaseButton color="primary" :label="t('common.back')" flat @click="back" />
      <BaseButton
        type="submit"
        color="primary"
        :label="t('common.create')"
        :loading="loading.active.value"
        unelevated
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useFormValidation from 'src/composables/form/useFormValidation';
import useLoading from 'src/composables/common/useLoading';

import { ProjectModel, ProjectTypeEnum } from 'src/models/project/project.model';

export default defineComponent({
  name: 'ProjectCreateForm',

  props: {
    typeId: {
      type: Number as PropType<ProjectTypeEnum>,
      required: true,
    },
  },

  emits: ['back'],

  setup(props, { emit }) {
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();
    const rules = useFormValidation();
    const loading = useLoading();

    const accessOptions = reactive([
      {
        id: 1,
        name: t('access.private'),
        description: t('access.privateDescription'),
        icon: 'lock',
      },
      {
        id: 2,
        name: t('access.limited'),
        description: t('access.limitedDescription'),
        icon: 'people',
      },
      {
        id: 3,
        name: t('access.opened'),
        description: t('access.openedDescription'),
        icon: 'lock_open',
      },
    ]);
    const templateOptions = reactive([
      {
        id: 1,
        name: 'Kanban',
        description: t('project.kanbanDescription'),
      },
      {
        id: 2,
        name: 'Scrum',
        description: t('project.scrumDescription'),
        disabled: true,
      },
    ]);

    const form = reactive({
      name: '',
      key: '',
      accessID: accessOptions[0].id,
      templateID: templateOptions[0].id,
      typeID: props.typeId,
    });

    async function submit() {
      try {
        loading.start();
        const project = (await store.dispatch('project/create', form)) as ProjectModel;
        await openProject(project.id);
      } catch (e) {
        loading.stop();
      }
    }
    function back() {
      emit('back');
    }

    async function openProject(projectID: number) {
      await router.push(`/projects/${projectID}`);
    }

    return {
      t,
      rules,
      loading,

      accessOptions,
      templateOptions,

      form,
      submit,
      back,
    };
  },
});
</script>
