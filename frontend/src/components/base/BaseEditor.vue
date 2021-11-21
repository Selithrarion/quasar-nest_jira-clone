<template>
  <div class="base-editor flex-grow-1">
    <q-editor
      ref="editor"
      :model-value="modelValue"
      class="flex-grow-1"
      min-height="minHeight"
      @update:model-value="$emit('update:model-value', $event)"
    >
    </q-editor>
    <div v-if="actionButtons" class="flex-center-end gap-2 q-mt-sm">
      <BaseButton label="Cancel" color="blue-grey-5" flat @click="$emit('cancel')" />
      <BaseButton label="Save" color="primary" :loading="saveLoading" unelevated @click="$emit('save')" />
    </div>
  </div>
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
    autofocus: {
      type: Boolean,
      required: false,
      default: true,
    },

    actionButtons: {
      type: Boolean,
      required: false,
      default: true,
    },
    saveLoading: Boolean,
  },

  emits: ['update:model-value', 'cancel', 'save'],

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
