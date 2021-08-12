<template>
  <BaseSelect
    :model-value="modelValue"
    :emit-value="false"
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #selected-item="{ option }">
      <q-avatar size="16px">
        <img :src="option.avatarURL || require('src/assets/img/default-avatar-1.png')" :alt="`${option.name} Avatar`" />
      </q-avatar>
      {{ option.name }}
    </template>

    <template #optionPrepend="{ option }">
      <q-avatar size="24px">
        <img :src="option.avatarURL || require('src/assets/img/default-avatar-1.png')" :alt="`${option.name} Avatar`" />
      </q-avatar>
    </template>
  </BaseSelect>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSelectWithAvatar',

  props: {
    modelValue: {
      type: [Number, String, Object],
      required: false,
      default: null,
    },
  },

  emits: ['update:model-value'],
});
</script>
