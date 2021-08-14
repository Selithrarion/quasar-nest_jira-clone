<template>
  <component
    :is="currentComponent"
    class="base-button"
    :class="computedClasses"
    :no-wrap="noWrap"
    no-caps
    v-bind="$attrs"
  >
    <BaseTooltip v-if="tooltip" :label="tooltip" />
    <slot> {{ label }} </slot>
  </component>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BaseButton',

  props: {
    label: {
      type: String,
      required: false,
      default: null,
    },
    tooltip: {
      type: String,
      required: false,
      default: null,
    },
    secondaryColor: Boolean,
    plainStyle: Boolean,

    noWrap: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const computedClasses = computed(() => {
      const classes = [];

      if (props.secondaryColor) classes.push('base-button--secondary');
      if (props.plainStyle) classes.push('base-button--plain-style');

      return classes;
    });

    const currentComponent = computed(() => {
      return props.plainStyle ? 'button' : 'q-btn';
    });

    return {
      computedClasses,
      currentComponent,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-button {
  ::v-deep .q-btn__content {
    gap: 6px;
    .q-icon {
      margin-left: 0;
      margin-right: 0;
    }
  }
  &--secondary {
    background-color: $blue-grey-1 !important;
    color: $blue-grey-8 !important;
    font-weight: 500 !important;
  }
  &--plain-style {
    cursor: pointer;
    background-color: transparent;
    outline: none;
    box-shadow: none;
    border: none;
    padding: 0;
    opacity: 0.6;
    &:hover {
      color: $blue-grey-8;
      opacity: 1;
      text-decoration: underline;
    }
  }
}
</style>
