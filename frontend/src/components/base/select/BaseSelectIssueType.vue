<template>
  <BaseSelect
    :model-value="modelValue"
    :label="label || t('project.issuePriority.priority')"
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
import { useI18n } from 'vue-i18n';

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
      default: null,
    },
  },

  emits: ['update:model-value'],

  setup() {
    const { t } = useI18n();

    return {
      t,
    };
  },
});
</script>
