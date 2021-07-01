<template>
  <div class="row justify-between gap-4 no-wrap">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectBoardColumnWrapper',
});
</script>
