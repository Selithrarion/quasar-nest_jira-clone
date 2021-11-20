<template>
  <q-form @submit.prevent="submit">
    <q-input
      v-model="form.name"
      label="Name"
      hint="Up to 40 characters"
      :rules="[rules.required, rules.max40]"
      autofocus
      lazy-rules
      filled
    />

    <q-input v-model="form.description" type="textarea" label="Description" autogrow filled />

    <BaseSelect v-model="form.accessID" label="Access" :options="accessOptions">
      <template #optionPrepend="{ option }">
        <q-icon :name="option.icon" />
      </template>
      <template #optionLabel="{ option }">
        <q-item-label>{{ option.name }}</q-item-label>
        <q-item-label style="max-width: 600px" caption>{{ option.description }}</q-item-label>
      </template>
    </BaseSelect>

    <div class="dialog-action-buttons">
      <BaseButton label="Back" color="primary" flat @click="close" />
      <BaseButton label="Save" type="submit" color="primary" :loading="loading" unelevated />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import useFormValidation from 'src/composables/form/useFormValidation';

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
        name: 'Closed',
        description: 'Only you have access.',
        icon: 'lock',
      },
      {
        id: 5,
        name: 'Limited',
        description: 'Only selected people have access.',
        icon: 'people',
      },
      {
        id: 6,
        name: 'Open',
        description: 'All users of the organization have access.',
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
