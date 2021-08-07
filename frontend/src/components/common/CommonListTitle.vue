<template>
  <div class="text-caption text-uppercase" :class="{ 'q-py-xs q-px-md': padding }">
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
      required: true,
    },
    padding: Boolean,
  },
});
</script>
