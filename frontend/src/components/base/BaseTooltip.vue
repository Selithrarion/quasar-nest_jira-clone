<template>
  <q-tooltip class="bg-blue-grey-8 text-caption q-py-none q-px-sm" :delay="300" v-bind="$attrs">
    <slot />
  </q-tooltip>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseTooltip',
});
</script>
