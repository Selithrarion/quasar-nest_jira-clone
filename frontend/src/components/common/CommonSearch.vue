<template>
  <q-input
    :model-value="modelValue"
    :placeholder="placeholder"
    :outlined="outlined"
    :debounce="clientSearch ? 0 : 500"
    dense
    v-bind="$attrs"
    @update:model-value="emitSearch"
  >
    <template v-if="prependIcon" #prepend>
      <q-icon name="search" />
    </template>
    <template v-else-if="appendIcon" #prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CommonSearch',

  props: {
    modelValue: {
      type: String,
      required: true,
    },

    clientSearch: {
      type: Boolean,
      required: false,
      default: false,
    },

    placeholder: {
      type: String,
      required: false,
      default: 'Поиск',
    },
    outlined: {
      type: Boolean,
      required: false,
      default: true,
    },
    prependIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    appendIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: ['search'],

  setup(props, { emit }) {
    function emitSearch(value: string) {
      const normalizedSearch = value.toLowerCase().trim();
      emit('search', normalizedSearch);
    }

    return { emitSearch };
  },
});
</script>
