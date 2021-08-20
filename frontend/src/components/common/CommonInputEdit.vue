<template>
  <div class="common-input-edit">
    <div v-if="isShowInput">
      <slot>
        <q-input
          :model-value="modelValue"
          :class="[inputClasses]"
          autofocus
          outlined
          dense
          v-bind="$attrs"
          @blur="handleBlur"
          @keydown.enter="$event.target.blur()"
          @keydown.esc="handleReset"
          @update:model-value="$emit('update:model-value', $event)"
        />
      </slot>
    </div>

    <div
      v-else
      class="common-input-edit__button"
      role="button"
      :class="{ 'common-input-edit__button-padding': !noButtonPadding }"
      @click="isShowInput = true"
    >
      <slot name="button">
        <div>{{ modelValue }}</div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CommonInputEdit',

  props: {
    modelValue: {
      type: [Number, String],
      required: false,
      default: null,
    },
    inputClasses: {
      type: String,
      required: false,
      default: null,
    },
    noButtonPadding: Boolean,
  },

  emits: ['update:model-value', 'update', 'reset'],

  setup(props, { emit }) {
    const originalValue = ref(props.modelValue);
    const isShowInput = ref(false);

    function handleBlur() {
      isShowInput.value = false;
      if (originalValue.value === props.modelValue) return;
      else emit('update');
    }
    function handleReset() {
      emit('reset');
      isShowInput.value = false;
    }

    return {
      isShowInput,
      handleBlur,
      handleReset,
    };
  },
});
</script>

<style lang="scss" scoped>
.common-input-edit {
  &__button {
    font-weight: 500;
    cursor: pointer;
    transition: background-color 150ms ease;
    &:hover {
      background-color: $blue-grey-1;
    }
    &:active {
      color: $blue-grey-10;
    }
  }
  &__button-padding {
    padding: 4px 10px;
  }
}
</style>
