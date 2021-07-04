<template>
  <q-form @submit="submit">
    <q-input
      v-model="form.name"
      type="text"
      label="Название"
      hint="До 40 символов"
      :rules="[rules.required, rules.max40]"
      autofocus
      lazy-rules
      filled
    />

    <q-input v-model="form.description" type="textarea" label="Описание" autogrow filled />

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

    <div class="dialog-action-buttons">
      <q-btn label="Назад" color="primary" flat @click="close" />
      <q-btn label="Сохранить" type="submit" color="primary" :loading="loading" unelevated />
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
