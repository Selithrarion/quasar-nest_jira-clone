<template>
  <BaseSelect
    :model-value="modelValue"
    :emit-value="false"
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #selected-item="{ option }">
      <BaseAvatar
        size="16px"
        :src="option.avatar && option.avatar.url"
        :item-name="option.name"
        :item-color="option.color"
      />
      {{ option.name }}
    </template>

    <template #optionPrepend="{ option }">
      <BaseAvatar
        :src="option.avatar && option.avatar.url"
        :item-name="option.name"
        :item-color="option.color"
      />
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
