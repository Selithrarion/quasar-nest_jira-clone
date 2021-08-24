<template>
  <div
    class="base-loader text-center z-top"
    :style="[pageMargin ? 'margin-top: 128px' : '']"
    :class="{ 'flex-center absolute-full': center }"
  >
    <q-circular-progress
      :size="computedSize"
      :color="computedColor"
      :thickness="thickness"
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

    color: {
      type: String,
      required: false,
      default: null,
    },
    thickness: {
      type: [Number, String],
      required: false,
      default: 0.11,
    },

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
    const computedColor = computed(() => {
      if (props.color) return props.color;
      else return props.grayColor ? 'blue-grey-6' : 'primary';
    });

    return {
      computedSize,
      computedColor,
    };
  },
});
</script>
