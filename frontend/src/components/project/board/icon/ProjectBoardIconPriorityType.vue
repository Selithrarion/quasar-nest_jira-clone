<template>
  <q-icon :name="selectedType.icon" :color="selectedType.color" :size="small ? 'xs' : 'sm'">
    <BaseTooltip v-if="!hideTooltip" :label="selectedType.name" />
  </q-icon>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'src/store';
import BaseTooltip from 'components/base/BaseTooltip.vue';

export default defineComponent({
  name: 'ProjectBoardIconPriorityType',

  components: {
    BaseTooltip,
  },

  props: {
    type: {
      type: [Number, String],
      required: true,
      validator: (value: string): boolean => {
        return ['LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST'].includes(value);
      },
    },
    small: Boolean,
    hideTooltip: Boolean,
  },

  setup(props) {
    const store = useStore();

    const availableIssuePriorities = computed(() => store.state.project.availableIssuePriorities);
    const selectedType = computed(() => {
      const type = props.type;
      return availableIssuePriorities.value.find((t) => t.key === type || t.id === type);
    });

    return {
      selectedType,
    };
  },
});
</script>
