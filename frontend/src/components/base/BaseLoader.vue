<template>
  <div
    class="base-loader text-center"
    :style="[pageMargin ? 'margin-top: 128px' : '']"
    :class="{ 'flex-center full-height': center }"
  >
    <q-circular-progress size="40px" color="primary" :thickness="0.11" indeterminate v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseLoader',

  inheritAttrs: false,

  props: {
    pageMargin: Boolean,
    center: Boolean,
  },
});
</script>
