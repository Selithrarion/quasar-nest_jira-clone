<template>
  <BaseSelect
    :model-value="modelValue"
    :options="options"
    label="Их отображаемое имя, имя пользователя или email"
    hint="Вы можете пригласить не более 10 пользователей за раз."
    input-debounce="500"
    max-values="10"
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
    options: {
      type: Array as PropType<UserModel[]>,
      required: false,
      default: () => [],
    },
  },

  emits: ['update:model-value', 'update:options'],

  setup(props, { emit }) {
    type SelectUpdateFunction = (arg0?: () => void) => void;
    async function searchUsers(value: string, update: SelectUpdateFunction) {
      const normalized = value.toLowerCase();
      const updatedUsers = await userRepository.searchUsers(normalized);
      emit('update:options', updatedUsers);
      update();
    }

    return {
      searchUsers,
    };
  },
});
</script>
