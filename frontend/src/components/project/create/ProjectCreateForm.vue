<template>
  <q-form @submit.prevent="submit">
    <q-input
      v-model="form.name"
      label="Название"
      hint="До 40 символов"
      :rules="[rules.required, rules.max40]"
      autofocus
      lazy-rules
      filled
    />

    <BaseSelect v-model="form.accessID" label="Доступ" :options="accessOptions">
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
      label="Ключ"
      hint="К примеру My Project может быть — MP, MP1, MYPR, MY, PR или любое другое"
      lazy-rules
      filled
      :rules="[rules.required, rules.max10]"
    />

    <BaseSelect v-model="form.templateID" label="Шаблон" :options="templateOptions" option-disable="disabled" />

    <div class="dialog-action-buttons">
      <BaseButton label="Назад" color="primary" flat @click="back" />
      <BaseButton label="Создать" type="submit" color="primary" :loading="loading.active.value" unelevated />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';

import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useFormValidation from 'src/composables/common/useFormValidation';
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
    const router = useRouter();
    const store = useStore();
    const rules = useFormValidation();
    const loading = useLoading();

    const accessOptions = reactive([
      {
        id: 1,
        name: 'Закрытый',
        description:
          'Только администраторы и пользователи, добавленные в проект, могут выполнять поиск, создавать и редактировать его задачи.',
        icon: 'lock',
      },
      {
        id: 2,
        name: 'Ограниченный',
        description:
          'Любой пользователь может выполнять поиск, просматривать и комментировать. Только пользователи, добавленные в проект, могут создавать и редактировать его задачи.',
        icon: 'people',
      },
      {
        id: 3,
        name: 'Открытый',
        description:
          'Любой пользователь может выполнять поиск, просматривать, комментировать, создавать и редактировать задачи.',
        icon: 'lock_open',
      },
    ]);
    const templateOptions = reactive([
      {
        id: 1,
        name: 'Kanban',
        description:
          'Получите наглядное представление о работе над проектом благодаря простым подсказкам и функциональной доске.',
      },
      {
        id: 2,
        name: 'Scrum',
        description: 'Быстрее достигайте намеченных целей с современной доской и бэклогом.',
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
