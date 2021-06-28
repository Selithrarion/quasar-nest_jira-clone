<template>
  <span @click="copyToClipboard">
    <slot>
      <q-icon name="content-copy" />
    </slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'CommonClipboard',

  props: {
    text: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const q = useQuasar();

    async function copyToClipboard() {
      await navigator.clipboard.writeText(props.text);
      q.notify({
        message: 'Copied to clipboard',
        type: 'info',
        textColor: 'white',
        timeout: 1000,
      });
    }

    return {
      copyToClipboard,
    };
  },
});
</script>
