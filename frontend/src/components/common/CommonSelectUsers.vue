<template>
  <BaseSelect
    input-debounce="500"
    max-values="10"
    :model-value="modelValue"
    :options="options"
    :label="t('user.displayNameUsernameOrEmail')"
    :hint="t('user.max10Users')"
    :emit-value="false"
    multiple
    counter
    fill-input
    use-input
    use-chips
    v-bind="$attrs"
    @filter="searchUsers"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #optionLabel="{ option }">
      <q-item-label>{{ option.username }} ({{ option.name }})</q-item-label>
    </template>
  </BaseSelect>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { UserModel } from 'src/models/user/user.model';
import userRepository from 'src/repositories/userRepository';

export default defineComponent({
  name: 'CommonSelectUsers',

  props: {
    modelValue: {
      type: Array as PropType<UserModel[]>,
      required: false,
      default: () => [],
    },
  },

  emits: ['update:model-value', 'update:options'],

  setup(props, { emit }) {
    const { t } = useI18n();

    const options = ref<UserModel[]>([]);

    type SelectUpdateFunction = (arg0?: () => void) => void;
    async function searchUsers(value: string, update: SelectUpdateFunction) {
      const normalized = value.toLowerCase();
      options.value = await userRepository.searchUsers(normalized);
      emit('update:options', options.value);
      update();
    }

    return {
      t,
      options,
      searchUsers,
    };
  },
});
</script>
