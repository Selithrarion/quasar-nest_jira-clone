<template>
  <BaseButton v-close-popup icon="close" tooltip="Close" :flat="flat" :round="round" :dense="dense" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButtonCloseIcon',

  props: {
    round: {
      type: Boolean,
      required: false,
      default: true,
    },
    flat: {
      type: Boolean,
      required: false,
      default: true,
    },
    dense: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
});
</script>
