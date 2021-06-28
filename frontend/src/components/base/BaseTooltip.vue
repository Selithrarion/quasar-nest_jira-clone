<template>
  <q-tooltip class="bg-blue-grey-9 text-caption q-py-none q-px-sm" :delay="300" v-bind="$attrs">
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
    label: String,
  },
});
</script>
