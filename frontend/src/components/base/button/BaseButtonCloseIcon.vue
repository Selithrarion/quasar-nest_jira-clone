<template>
  <q-btn v-close-popup icon="close" :flat="flat" :round="round" :dense="dense">
    <BaseTooltip label="Закрыть" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseTooltip from 'components/base/BaseTooltip.vue';

export default defineComponent({
  name: 'BaseButtonCloseIcon',

  components: {
    BaseTooltip,
  },

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
