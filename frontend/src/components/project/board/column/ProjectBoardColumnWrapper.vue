<template>
  <div class="project-board-column-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectBoardColumnWrapper',
});
</script>

<style lang="scss" scoped>
.project-board-column-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
</style>
