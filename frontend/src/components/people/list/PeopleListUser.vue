<template>
  <div class="people-list-user">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PeopleListUser',
});
</script>

<style lang="scss" scoped>
.people-list-user {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 8px;
  > div {
    height: 180px;
  }
}
</style>
