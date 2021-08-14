<template>
  <q-editor
    ref="editor"
    :model-value="modelValue"
    class="flex-grow-1"
    min-height="minHeight"
    @update:model-value="$emit('update:model-value', modelValue)"
  >
  </q-editor>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';

export default defineComponent({
  name: 'BaseEditor',

  props: {
    modelValue: {
      type: [Number, String],
      required: false,
      default: '',
    },
    minHeight: {
      type: String,
      required: false,
      default: '5rem',
    },
    autofocus: Boolean,
  },

  emits: ['update:model-value'],

  setup(props) {
    const editor = ref<HTMLInputElement | null>(null);

    onMounted(async () => {
      await nextTick();
      if (props.autofocus) editor.value?.focus();
    });

    return {
      editor,
    };
  },
});
</script>
