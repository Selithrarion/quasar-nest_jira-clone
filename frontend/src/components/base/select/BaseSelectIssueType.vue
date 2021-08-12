<template>
  <BaseSelect
    :model-value="modelValue"
    :label="label"
    :emit-value="false"
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #selected-item="{ option }">
      <ProjectBoardIconIssueType :type="option.id" hide-tooltip small />
      <span class="ellipsis">{{ option.name }}</span>
    </template>

    <template #optionPrepend="{ option }">
      <ProjectBoardIconIssueType :type="option.id" hide-tooltip small />
    </template>
  </BaseSelect>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectBoardIconIssueType from 'components/project/board/icon/ProjectBoardIconIssueType.vue';

export default defineComponent({
  name: 'BaseSelectWithAvatar',

  components: {
    ProjectBoardIconIssueType,
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
      default: 'Приоритет',
    },
  },

  emits: ['update:model-value'],
});
</script>
