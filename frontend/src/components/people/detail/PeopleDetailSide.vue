<template>
  <div class="col-4 column gap-4">
    <div class="column gap-1">
      <CommonInputEdit
        v-model="localDisplayName"
        input-classes="text-h6"
        @update="updateDisplayName"
        @reset="resetDisplayName"
      >
        <template #button>
          <h6 class="no-margin">
            <slot name="displayName">
              {{ displayName }}
            </slot>
          </h6>
        </template>
      </CommonInputEdit>

      <CommonInputEdit v-model="localName" input-classes="text-body2" @update="updateName" @reset="resetName">
        <template #button>
          <div class="text-blue-grey-6 text-body2">
            <slot name="name">
              {{ name }}
            </slot>
          </div>
        </template>
      </CommonInputEdit>
    </div>

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
import { defineComponent, ref } from 'vue';
import CommonInputEdit from 'components/common/CommonInputEdit.vue';

export default defineComponent({
  name: 'PeopleDetailSide',

  components: {
    CommonInputEdit,
  },

  props: {
    displayName: {
      type: String,
      required: false,
      default: null,
    },
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

  emits: ['button-click', 'update:display-name', 'update:name'],

  setup(props, { emit }) {
    const localDisplayName = ref(props.displayName);
    function updateDisplayName() {
      emit('update:display-name', localDisplayName.value);
    }
    function resetDisplayName() {
      localDisplayName.value = props.displayName;
    }

    const localName = ref(props.name);
    function updateName() {
      emit('update:name', localName.value);
    }
    function resetName() {
      localName.value = props.displayName;
    }

    return {
      localDisplayName,
      updateDisplayName,
      resetDisplayName,

      localName,
      updateName,
      resetName,
    };
  },
});
</script>
