<template>
  <q-card class="project-card hover-shadow-sm" flat bordered>
    <q-card-section>
      <div class="text-subtitle2 text-weight-bold">{{ project.title }}</div>
      <div class="text-caption truncate">{{ project.type }}</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section class="text-caption q-py-xs text-center">
      <q-btn class="q-pa-1" label="5 досок" size="sm" flat />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WorkProjectCard',

  props: {
    project: {
      type: Object,
      required: true,
      default: null,
    },
  },

  setup() {
    return {};
  },
});
</script>

<style lang="sass" scoped>
.project-card
  border-left: 20px solid #eeeeee
  width: 240px
</style>
