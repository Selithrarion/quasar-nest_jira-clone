<template>
  <q-select
    :model-value="modelValue"
    :style="{ maxWidth: `${maxWidth}px`, width: `${width}px` }"
    :option-label="optionLabel"
    :option-value="optionValue"
    :hide-bottom-space="hideBottomSpace"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :filled="filled"
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #option="{ itemProps, itemEvents, opt }">
      <q-item v-bind="itemProps" v-on="itemEvents">
        <div v-if="$slots.optionPrepend" class="flex-center q-pr-sm">
          <slot name="optionPrepend" :opt="opt" />
        </div>

        <q-item-section>
          <slot name="optionLabel" :opt="opt">
            <q-item-label>{{ opt[optionLabel] }}</q-item-label>
          </slot>
        </q-item-section>
      </q-item>
    </template>

    <template #no-option>
      <q-item>
        <q-item-section class="text-grey"> Результатов нет </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BaseSelect',

  props: {
    modelValue: {
      type: [Number, String, Array, Object],
      required: false,
      default: null,
    },

    maxWidth: {
      type: String,
      required: false,
      default: 'auto',
    },
    width: {
      type: String,
      required: false,
      default: 'auto',
    },

    optionLabel: {
      type: String,
      required: false,
      default: 'name',
    },
    optionValue: {
      type: String,
      required: false,
      default: 'id',
    },

    hideBottomSpace: {
      type: Boolean,
      required: false,
      default: true,
    },
    emitValue: {
      type: Boolean,
      required: false,
      default: true,
    },
    mapOptions: {
      type: Boolean,
      required: false,
      default: true,
    },
    filled: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  emits: ['update:model-value'],
});
</script>
