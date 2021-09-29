<template>
  <div class="flex justify-between text-subtitle2 q-pb-sm">
    <span>{{ t('work.recent') }}</span>
    <BaseButton :label="t('work.all')" :tooltip="t('work.open')" size="sm" to="/projects" flat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'WorkProjectHeader',

  setup() {
    const { t } = useI18n();
    return {
      t,
    };
  },
});
</script>
