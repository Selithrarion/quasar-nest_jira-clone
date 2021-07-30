<template>
  <div class="flex justify-between text-subtitle2 q-pb-sm">
    <span>Недавние проекты</span>
    <q-btn label="Все проекты" size="sm" to="/projects" flat>
      <BaseTooltip label="Открыть страницу проектов" />
    </q-btn>
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
