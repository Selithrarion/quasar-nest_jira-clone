<template>
  <div class="col-4 column gap-4">
    <h6 class="no-margin">
      <slot name="name">
        {{ name }}
      </slot>
    </h6>

    <div v-if="$slots.appendName" class="row items-center gap-3">
      <slot name="appendName">
        <q-icon class="text-blue-grey-3" name="visibility" size="sm" />
        <div class="text-body2 text-blue-grey-4">Открытая команда</div>
      </slot>
    </div>

    <div v-if="buttonLabel || showMoreButton" class="flex-center-between gap-2">
      <BaseButton class="flex-grow-1" :label="buttonLabel" secondary-color unelevated @click="$emit('button-click')" />

      <BaseButtonMore v-if="showMoreButton" padding="6px" :round="false" :flat="false" secondary-color unelevated>
        <q-menu anchor="bottom middle" self="top middle" auto-close dense>
          <q-list>
            <slot name="moreButtonItems" />
          </q-list>
        </q-menu>
      </BaseButtonMore>
    </div>

    <slot name="append" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PeopleDetailSide',

  props: {
    name: {
      type: String,
      required: false,
      default: null,
    },
    buttonLabel: {
      type: String,
      required: false,
      default: null,
    },
    showMoreButton: Boolean,
  },

  emits: ['button-click'],

  setup() {
    return {};
  },
});
</script>
