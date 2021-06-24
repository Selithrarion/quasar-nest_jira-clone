<template>
  <h5 class="q-px-xl">{{ title }}</h5>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CommonPageTitle',

  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
