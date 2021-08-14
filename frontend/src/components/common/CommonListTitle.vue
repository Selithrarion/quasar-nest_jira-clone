<template>
  <div class="flex-center-between text-caption text-uppercase" :class="{ 'q-py-xs q-px-md': padding }">
    <slot>
      {{ title }}
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CommonListTitle',

  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    padding: Boolean,
  },
});
</script>
