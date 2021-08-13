<template>
  <div class="flex justify-between text-subtitle2 q-pb-sm">
    <span>Недавние проекты</span>
    <BaseButton label="Все проекты" tooltip="Открыть страницу проектов" size="sm" to="/projects" flat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseTooltip from 'components/base/BaseTooltip.vue';

export default defineComponent({
  name: 'WorkProjectHeader',

  components: {
    BaseTooltip,
  },
});
</script>
