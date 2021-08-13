<template>
  <div class="base-alert rounded-md" :class="getBackgroundColor" :style="{ padding }" v-bind="$attrs">
    <div class="flex items-center gap-3">
      <q-icon size="20px" :name="icon" :class="getIconColor" />
      <div class="text-weight-bold text-body2" :class="getTitleColor">{{ title }}</div>
    </div>

    <div class="alert-padding text-body2 q-mt-sm q-mb-md" :class="getTextColor">{{ text }}</div>

    <div class="text-center">
      <BaseButton v-if="actionText" :label="actionText" :color="color" flat @click="$emit('action-click')" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseAlert',

  props: {
    title: {
      type: String,
      required: false,
      default: 'Title',
    },
    text: {
      type: String,
      required: false,
      default: 'Text',
    },
    color: {
      type: String,
      required: false,
      default: 'red',
    },
    icon: {
      type: String,
      required: true,
      default: 'x-circle-solid',
    },
    actionText: {
      type: String,
      required: false,
      default: null,
    },
    padding: {
      type: String,
      required: false,
      default: '16px',
    },
  },

  emits: ['action-click'],

  computed: {
    getBackgroundColor(): string {
      return `bg-${this.color}-1`;
    },
    getIconColor(): string {
      return `text-${this.color}-4`;
    },
    getTitleColor(): string {
      return `text-${this.color}-8`;
    },
    getTextColor(): string {
      return `text-${this.color}-7`;
    },
  },
});
</script>

<style lang="scss" scoped>
.base-alert {
  display: flex;
  flex-flow: column;
  .alert-padding {
    padding-left: 32px;
  }
}
</style>
