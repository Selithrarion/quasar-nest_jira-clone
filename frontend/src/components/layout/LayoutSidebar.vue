<template>
  <q-drawer v-model="show" class="bg-grey-1" :width="240" :breakpoint="700" bordered>
    <div class="sidebar-header row no-wrap items-center gap-3 q-px-md q-pb-md q-pt-lg">
      <BaseAvatar size="28px" :src="avatar" :item-name="title" :item-color="color" square />
      <div>
        <h6 v-if="title" class="q-my-none text-body2">
          {{ title }}
        </h6>
        <div v-if="subtitle" class="text-caption text-blue-grey-4">
          {{ subtitle }}
        </div>
      </div>
    </div>

    <div class="q-pa-sm flex-grow-1">
      <slot />
    </div>

    <div class="sidebar-footer q-pa-sm">
      <slot name="footer" />
    </div>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LayoutSidebar',

  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    subtitle: {
      type: String,
      required: false,
      default: null,
    },

    avatar: {
      type: String,
      required: false,
      default: null,
    },
    color: {
      type: String,
      required: false,
      default: null,
    },
  },

  setup() {
    const show = ref(true);

    return {
      show,
    };
  },
});
</script>
