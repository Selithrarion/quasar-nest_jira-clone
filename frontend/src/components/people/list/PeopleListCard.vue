<template>
  <q-card class="shadow-1 hover-shadow-lg" :class="{ 'cursor-pointer': clickable }">
    <slot />
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PeopleListCard',

  props: {
    clickable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
});
</script>
