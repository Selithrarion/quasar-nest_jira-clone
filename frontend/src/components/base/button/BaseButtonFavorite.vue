<template>
  <q-btn
    size="md"
    :icon="favorite ? 'star' : 'star_border'"
    :color="favorite ? 'orange-5' : 'grey-6'"
    flat
    round
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseButtonFavorite',

  props: {
    favorite: {
      type: Boolean,
      required: true,
    },
    round: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
});
</script>
