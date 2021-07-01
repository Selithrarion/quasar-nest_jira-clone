<template>
  <q-icon :name="selectedType.icon" :color="selectedType.color" size="sm">
    <BaseTooltip :label="selectedType.tooltip" />
  </q-icon>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import BaseTooltip from 'components/base/BaseTooltip.vue';

export default defineComponent({
  name: 'ProjectBoardIconIssueType',

  components: {
    BaseTooltip,
  },

  props: {
    type: {
      type: String,
      required: true,
      validator: (value: string): boolean => {
        return ['bug', 'task', 'subtask', 'history', 'epic', 'investigation', 'upgrade'].indexOf(value) !== -1;
      },
    },
  },

  setup(props) {
    const types = [
      {
        key: 'bug',
        icon: 'crop_square',
        color: 'red-5',
        tooltip: 'Баг',
      },
      {
        key: 'task',
        icon: 'check_circle',
        color: 'blue-5',
        tooltip: 'Задача',
      },
    ];
    const selectedType = computed(() => {
      return types.find((t) => t.key === props.type);
    });

    return {
      selectedType,
    };
  },
});
</script>
