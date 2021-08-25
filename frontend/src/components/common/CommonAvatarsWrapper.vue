<template>
  <div class="avatars-wrapper flex-center" :class="getClasses">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'CommonAvatarsWrapper',

  props: {
    margin: {
      type: String,
      required: false,
      default: 'medium',
      validator: (value: string): boolean => {
        return ['small', 'medium', 'large'].indexOf(value) !== -1;
      },
    },
    hoverEffects: Boolean,
  },

  setup(props) {
    const getClasses = computed(() => {
      const classes = [];

      classes.push(props.margin);
      if (props.hoverEffects) classes.push('hover-effects');

      return classes;
    });

    return {
      getClasses,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatars-wrapper {
  ::v-deep.small > .q-avatar {
    margin: 0 -3px;
  }
  ::v-deep.medium > .q-avatar {
    margin: 0 -8px;
  }
  ::v-deep.large > .q-avatar {
    margin: 0 -12px;
  }

  ::v-deep .q-avatar__content {
    border: 2px solid white;
  }

  > ::v-deep.selected::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    box-shadow: 0 0 0 2px $blue-5;
  }

  :first-child {
    z-index: 6;
  }
  :nth-child(2) {
    z-index: 5;
  }
  :nth-child(3) {
    z-index: 4;
  }
  :nth-child(4) {
    z-index: 3;
  }
  :nth-child(5) {
    z-index: 2;
  }
  :nth-child(6) {
    z-index: 1;
  }

  &.hover-effects {
    ::v-deep > .base-avatar {
      cursor: pointer;
      transition: transform 200ms ease;
    }
    ::v-deep > .base-avatar:hover {
      transform: translateY(-8px);
    }
  }
}
</style>
