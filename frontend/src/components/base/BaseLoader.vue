<template>
  <div
    class="base-loader text-center"
    :style="[pageMargin ? 'margin-top: 128px' : '']"
    :class="{ 'flex-center full-height': center }"
  >
    <q-circular-progress
      :size="computedSize"
      :color="grayColor ? 'blue-grey-6' : 'primary'"
      :thickness="0.11"
      indeterminate
      v-bind="$attrs"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BaseLoader',

  inheritAttrs: false,

  props: {
    pageMargin: Boolean,
    center: Boolean,
    grayColor: Boolean,

    small: Boolean,
    medium: Boolean,
    large: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  setup(props) {
    const computedSize = computed(() => {
      if (props.small) return '16px';
      else if (props.medium) return '24px';
      else return '40px';
    });

    return {
      computedSize,
    };
  },
});
</script>
