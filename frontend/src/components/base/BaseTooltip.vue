<template>
  <q-tooltip class="bg-blue-grey-9 text-caption q-py-none q-px-sm" :delay="delay" v-bind="$attrs">
    <slot>
      {{ label }}
    </slot>
  </q-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseTooltip',

  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
    delay: {
      type: [Number, String],
      required: false,
      default: 300
    }
  },
});
</script>
