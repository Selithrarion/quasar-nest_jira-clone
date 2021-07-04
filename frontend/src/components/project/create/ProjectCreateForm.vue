<template>
  <q-form @submit="submit">
    <q-input
      v-model="form.name"
      label="Название"
      hint="До 40 символов"
      :rules="[rules.required, rules.max40]"
      autofocus
      lazy-rules
      filled
    />

    <q-select
      v-model="form.accessID"
      label="Доступ"
      :options="accessOptions"
      option-label="name"
      option-value="id"
      emit-value
      map-options
      filled
    >
      <template #option="{ itemProps, itemEvents, opt }">
        <q-item v-bind="itemProps" v-on="itemEvents">
          <div class="flex-center q-pr-md">
            <q-icon :name="opt.icon" />
          </div>

          <q-item-section>
            <q-item-label>{{ opt.name }}</q-item-label>
            <q-item-label style="max-width: 600px" caption>{{ opt.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-select>

    <q-input
      v-model="form.key"
      label="Ключ"
      hint="К примеру My Project может быть — MP, MP1, MYPR, MY, PR или любое другое"
      lazy-rules
      filled
      :rules="[rules.required, rules.max10]"
    />

    <q-select
      v-model="form.templateID"
      label="Шаблон"
      :options="templateOptions"
      option-label="name"
      option-value="id"
      map-options
      emit-value
      filled
    />

    <div class="dialog-action-buttons">
      <q-btn label="Назад" color="primary" flat @click="back" />
      <q-btn label="Создать" type="submit" color="primary" :loading="loading.status" unelevated />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
// import { useStore } from 'vuex';
import useFormValidation from 'src/composables/common/useFormValidation';
import useLoading from 'src/composables/common/useLoading';

export default defineComponent({
  name: 'ProjectCreateForm',

  props: {
    type: {
      type: String,
      required: true,
      default: null,
      validator(value: string): boolean {
        return ['company', 'team'].indexOf(value) !== -1;
      },
    },
  },

  emits: ['back'],

  setup(props, { emit }) {
    // const store = useStore();
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
      },
    ]);

    const form = reactive({
      name: '',
      accessID: accessOptions[0].id,
      key: '',
      templateID: templateOptions[0].id,
    });

    function submit() {
      try {
        loading.start();
      } finally {
        loading.stop();
      }
    }
    function back() {
      emit('back');
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
