<template>
  <q-avatar class="base-avatar" :class="classes" :size="size" :style="styles" v-bind="$attrs">
    <slot>
      <BaseLoader
        v-if="loading"
        thickness="0.18"
        :small="parseInt(size) <= 24 || size === 'sm'"
        :medium="(parseInt(size) <= 36 && parseInt(size) >= 25) || size === 'md'"
        :color="whiteLoader ? 'white' : null"
        :gray-color="!whiteLoader"
        center
      />

      <q-img v-else-if="src" class="rounded-full" ratio="1" :src="src" :alt="`${itemName} Avatar`">
        <template #loading>
          <BaseLoader
            thickness="0.18"
            :small="parseInt(size) <= 24 || size === 'sm'"
            :medium="(parseInt(size) <= 36 && parseInt(size) >= 25) || size === 'md'"
            :color="whiteLoader ? 'white' : null"
            :gray-color="!whiteLoader"
            center
          />
        </template>
      </q-img>

      <q-icon v-else-if="showIcon" name="person" color="white" :size="iconSize" />

      <span v-else-if="itemName" class="text-white">{{ itemInitials }}</span>
    </slot>

    <BaseTooltip :label="tooltip || itemName" />
  </q-avatar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

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

  setup(props) {
    const itemInitials = computed(() => String(props.itemName).slice(0, 2).toUpperCase());
    const isHslOrRgbItemColor = computed(() => props.itemColor?.includes('hsl') || props.itemColor?.includes('rgb'));

    const classes = computed(() => {
      return {
        [`bg-${props.itemColor}`]: !isHslOrRgbItemColor.value && !props.src,
      };
    });
    const styles = computed(() => {
      const styles = [];

      if (props.src) styles.push({ background: 'white' });
      else if (isHslOrRgbItemColor.value) styles.push({ background: props.itemColor });

      return styles;
    });

    return {
      itemInitials,
      classes,
      styles,
    };
  },
});
</script>
