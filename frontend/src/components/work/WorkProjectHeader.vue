<template>
  <div class="flex justify-between text-subtitle2 q-pb-sm">
    <span>Недавние проекты</span>
    <q-btn label="Все проекты" size="sm" to="/projects" flat />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WorkProjectHeader',
});
</script>
