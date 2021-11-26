<template>
  <BaseSelect
    :model-value="modelValue"
    :label="buttonStyle ? null : label || t('project.issuePriority.priority')"
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
import { useI18n } from 'vue-i18n';
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
      default: null,
    },

    buttonStyle: Boolean,
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
