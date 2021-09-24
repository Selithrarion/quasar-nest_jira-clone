<template>
  <div class="common-input-edit" :class="{ 'common-input-edit--clickable': !disabled }">
    <div v-if="isShowInput && !disabled">
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
      @click="showInput"
    >
      <slot name="button">
        <div>{{ modelValue }}</div>
      </slot>
      <slot name="loading">
        <BaseLoader v-if="loading" thickness="0.15" gray-color small />
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
    disabled: Boolean,
    loading: Boolean,

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

    function showInput() {
      if (!props.disabled) isShowInput.value = true;
    }
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
      showInput,
      handleBlur,
      handleReset,
    };
  },
});
</script>

<style lang="scss" scoped>
.common-input-edit {
  &__button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    transition: background-color 150ms ease;
  }
  &.common-input-edit--clickable {
    cursor: pointer;
    .common-input-edit__button:hover {
      background-color: $blue-grey-1;
    }
    .common-input-edit__button:active {
      color: $blue-grey-10;
    }
  }

  &__button-padding {
    padding: 4px 10px;
  }
}
</style>
