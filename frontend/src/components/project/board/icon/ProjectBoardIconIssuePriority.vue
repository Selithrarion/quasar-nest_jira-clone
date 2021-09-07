<template>
  <q-icon
    v-if="selectedPriority"
    :name="selectedPriority.icon"
    :color="selectedPriority.color"
    :size="small ? 'xs' : 'sm'"
  >
    <BaseTooltip v-if="!hideTooltip" :label="tooltip || selectedPriority.name" />
  </q-icon>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'ProjectBoardIconIssuePriority',

  props: {
    priority: {
      type: [Number, String],
      required: true,
      validator: (value: string | number): boolean => {
        return ['LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST'].includes(String(value)) || typeof value === 'number';
      },
    },

    tooltip: {
      type: String,
      required: false,
      default: null,
    },

    small: Boolean,
    hideTooltip: Boolean,
  },

  setup(props) {
    const store = useStore();

    const availableIssuePriorities = computed(() => store.state.project.availableIssuePriorities);
    const selectedPriority = computed(() => {
      const priority = props.priority;
      return availableIssuePriorities.value.find((p) => p.key === priority || p.id === priority);
    });

    return {
      selectedPriority,
    };
  },
});
</script>
