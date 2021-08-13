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

    <q-input v-model="form.description" type="textarea" label="Описание" autogrow filled />

    <BaseSelect v-model="form.accessID" label="Доступ" :options="accessOptions">
      <template #optionPrepend="{ option }">
        <q-icon :name="option.icon" />
      </template>
      <template #optionLabel="{ option }">
        <q-item-label>{{ option.name }}</q-item-label>
        <q-item-label style="max-width: 600px" caption>{{ option.description }}</q-item-label>
      </template>
    </BaseSelect>

    <div class="dialog-action-buttons">
      <BaseButton label="Назад" color="primary" flat @click="close" />
      <BaseButton label="Сохранить" type="submit" color="primary" :loading="loading" unelevated />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import useFormValidation from 'src/composables/common/useFormValidation';

export default defineComponent({
  name: 'DashboardCreateForm',

  props: {
    loading: Boolean,
  },

  emits: ['submit', 'close'],

  setup(props, { emit }) {
    const rules = useFormValidation();

    const accessOptions = reactive([
      {
        id: 4,
        name: 'Закрытый',
        description: 'Только вы имеете доступ.',
        icon: 'lock',
      },
      {
        id: 5,
        name: 'Ограниченный',
        description: 'Только выбранные люди имеют доступ.',
        icon: 'people',
      },
      {
        id: 6,
        name: 'Открытый',
        description: 'Все пользователи организации имеют доступ.',
        icon: 'lock_open',
      },
    ]);

    const form = reactive({
      name: '',
      description: '',
      accessID: accessOptions[0].id,
    });

    function submit() {
      emit('submit', form);
    }
    function close() {
      emit('close');
    }

    return {
      rules,
      accessOptions,
      form,
      submit,
      close,
    };
  },
});
</script>
