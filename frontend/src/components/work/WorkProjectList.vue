<template>
  <div class="flex gap-4">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WorkProjectList',

  setup() {
    return {};
  },
});
</script>
