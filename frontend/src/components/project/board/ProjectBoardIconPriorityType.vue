<template>
  <q-icon :name="selectedType.icon" :color="selectedType.color" size="sm">
    <BaseTooltip :label="selectedType.tooltip" />
  </q-icon>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import BaseTooltip from 'components/base/BaseTooltip.vue';

export default defineComponent({
  name: 'ProjectBoardIconPriorityType',

  components: {
    BaseTooltip,
  },

  props: {
    type: {
      type: String,
      required: true,
      validator: (value: string): boolean => {
        return ['lowest', 'low', 'medium', 'high', 'highest'].includes(value);
      },
    },
  },

  setup(props) {
    const types = [
      {
        key: 'low',
        icon: 'expand_more',
        color: 'green-3',
        tooltip: 'Очень низкий приоритет',
      },
      {
        key: 'low',
        icon: 'expand_more',
        color: 'green-5',
        tooltip: 'Низкий приоритет',
      },
      {
        key: 'medium',
        icon: 'drag_handle',
        color: 'amber-5',
        tooltip: 'Средний приоритет',
      },
      {
        key: 'high',
        icon: 'expand_less',
        color: 'red-5',
        tooltip: 'Высокий приоритет',
      },
      {
        key: 'highest',
        icon: 'priority_high',
        color: 'red-7',
        tooltip: 'Срочно',
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
