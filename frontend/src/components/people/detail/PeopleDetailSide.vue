<template>
  <div class="column gap-4 flex-grow-1 relative-position">
    <label class="people-detail-side__avatar">
      <input ref="avatarInput" class="hidden absolute-full" type="file" accept="image/*" @input="uploadAvatar" />
      <q-avatar size="128px" :style="{ backgroundColor: avatar ? 'white' : color }">
        <BaseLoader v-if="loading.active.value" thickness="0.18" gray-color center />
        <q-img v-else-if="avatar" :ratio="1" :src="avatar.url" :alt="`${name} Avatar`">
          <template #loading>
            <BaseLoader thickness="0.18" gray-color center />
          </template>
        </q-img>
        <span v-else class="text-white">{{ displayName[0] }}</span>
      </q-avatar>
      <div class="people-detail-side__avatar-hover">
        <q-icon name="photo" size="32px" color="white" />
      </div>
    </label>

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
import { useStore } from 'src/store';
import useLoading from 'src/composables/common/useLoading';

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

    buttonLabel: {
      type: String,
      required: false,
      default: null,
    },
    showMoreButton: Boolean,
  },

  emits: ['button-click', 'update:display-name', 'update:name'],

  setup(props, { emit }) {
    const store = useStore();
    const loading = useLoading();

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

    const avatarInput = ref<HTMLInputElement | null>(null);
    async function uploadAvatar() {
      const file = avatarInput.value?.files?.[0];
      if (!file) return;

      try {
        loading.start();
        await store.dispatch('people/uploadUserImage', { file, type: 'avatar' });
      } finally {
        loading.stop();
      }
    }

    return {
      loading,

      localDisplayName,
      updateDisplayName,
      resetDisplayName,

      localName,
      updateName,
      resetName,

      avatarInput,
      uploadAvatar,
    };
  },
});
</script>

<style lang="scss" scoped>
.people-detail-side {
  &__avatar {
    position: absolute;
    top: -128px;
    left: 24px;
    cursor: pointer;
    border-radius: 100%;
    border: 3px solid white;
  }
  &__avatar-hover {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 128px;
    width: 128px;
    background-color: rgba(23, 76, 112, 0.56);
    transition: background 1000ms ease, opacity 300ms ease;
    opacity: 0;
    border-radius: 100%;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
