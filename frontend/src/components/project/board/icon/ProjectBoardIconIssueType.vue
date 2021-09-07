<template>
  <q-icon v-if="selectedType" :name="selectedType.icon" :color="selectedType.color" :size="small ? 'xs' : 'sm'">
    <BaseTooltip v-if="!hideTooltip" :label="tooltip || selectedType.name" />
  </q-icon>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'ProjectBoardIconIssueType',

  props: {
    type: {
      type: [Number, String],
      required: true,
      validator: (value: number | string): boolean => {
        return ['BUG', 'TASK', 'HISTORY', 'EPIC', 'INVESTIGATION'].includes(String(value)) || typeof value === 'number';
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

    const availableIssueTypes = computed(() => store.state.project.availableIssueTypes);
    const selectedType = computed(() => {
      const type = props.type;
      return availableIssueTypes.value.find((t) => t.key === type || t.id === type);
    });

    return {
      selectedType,
    };
  },
});
</script>
