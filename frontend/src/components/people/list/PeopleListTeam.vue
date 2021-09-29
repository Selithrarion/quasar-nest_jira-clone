<template>
  <div class="people-list-team">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PeopleListTeam',
});
</script>

<style lang="scss" scoped>
.people-list-team {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
}
</style>
