<template>
  <BaseButton icon="more_horiz" :round="round" :flat="flat" v-bind="$attrs">
    <slot />
  </BaseButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BaseButtonMore',

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
  },
});
</script>
