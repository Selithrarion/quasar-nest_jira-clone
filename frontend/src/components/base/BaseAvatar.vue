<template>
  <q-avatar :size="size" :color="src ? 'white' : itemColor" v-bind="$attrs">
    <slot>
      <BaseLoader
        v-if="loading"
        thickness="0.18"
        :color="whiteLoader ? 'white' : null"
        :gray-color="!whiteLoader"
        center
      />

      <q-img v-else-if="src" class="rounded-full" ratio="1" :src="src" :alt="`${itemName} Avatar`">
        <template #loading>
          <BaseLoader thickness="0.18" :color="whiteLoader ? 'white' : null" :gray-color="!whiteLoader" center />
        </template>
      </q-img>

      <q-icon v-else-if="showIcon" name="person" :size="iconSize" />

      <span v-else-if="itemName" class="text-white">{{ String(itemName).slice(0, 2) }}</span>
    </slot>

    <BaseTooltip :tooltip="tooltip || username" />
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseAvatar',

  props: {
    src: {
      type: String,
      required: false,
      default: null,
    },

    itemName: {
      type: String,
      required: false,
      default: null,
    },
    itemColor: {
      type: String,
      required: false,
      default: null,
    },

    iconSize: {
      type: String,
      required: false,
      default: '16px',
    },
    showIcon: Boolean,

    loading: Boolean,
    whiteLoader: Boolean,

    size: {
      type: String,
      required: false,
      default: '24px',
    },

    tooltip: {
      type: String,
      required: false,
      default: null,
    },
  },

  setup() {
    return {};
  },
});
</script>
