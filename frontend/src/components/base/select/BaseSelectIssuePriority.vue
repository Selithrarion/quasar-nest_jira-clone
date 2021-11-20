<template>
  <BaseSelect
    :model-value="modelValue"
    :label="buttonStyle ? null : label"
    :button-style="buttonStyle"
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #selected-item="{ option }">
      <ProjectBoardIconIssuePriority :priority="option.id" hide-tooltip small />
      <span class="ellipsis">{{ option.name }}</span>
    </template>

    <template #optionPrepend="{ option }">
      <ProjectBoardIconIssuePriority :priority="option.id" hide-tooltip small />
    </template>
  </BaseSelect>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectBoardIconIssuePriority from 'components/project/board/icon/ProjectBoardIconIssuePriority.vue';

export default defineComponent({
  name: 'BaseSelectWithAvatar',

  components: {
    ProjectBoardIconIssuePriority,
  },

  props: {
    modelValue: {
      type: [Number, String, Object],
      required: false,
      default: null,
    },

    label: {
      type: String,
      required: false,
      default: 'Priority',
    },

    buttonStyle: Boolean,
  },

  emits: ['update:model-value'],
});
</script>
