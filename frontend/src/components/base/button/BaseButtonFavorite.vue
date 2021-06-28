<template>
  <q-btn
    :size="size"
    :icon="favorite ? 'star' : 'star_border'"
    :color="favorite ? 'orange-5' : 'grey-6'"
    :flat="flat"
    :round="round"
    v-bind="$attrs"
  >
    <BaseTooltip :label="favorite ? tooltipRemove : tooltipAdd" />
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseTooltip from 'components/base/BaseTooltip.vue';

export default defineComponent({
  name: 'BaseButtonFavorite',

  components: { BaseTooltip },

  props: {
    favorite: {
      type: Boolean,
      required: true,
    },

    size: {
      type: String,
      required: false,
      default: 'md',
    },
    flat: {
      type: Boolean,
      required: false,
      default: true,
    },
    round: {
      type: Boolean,
      required: false,
      default: true,
    },

    tooltipRemove: {
      type: String,
      required: false,
      default: 'Снять отметку',
    },
    tooltipAdd: {
      type: String,
      required: false,
      default: 'Пометить',
    },
  },
});
</script>
