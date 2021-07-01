<template>
  <q-dialog :model-value="show" :maximized="maximized" v-bind="$attrs" @update:model-value="handleInput">
    <q-card class="base-dialog" :class="{ 'big-side-padding': maximized }" :style="getCardStyles">
      <slot name="content">
        <q-card-section class="flex items-center q-py-lg">
          <slot name="title">
            <div class="flex items-center gap-2 text-h6 full-width">
              <q-icon v-if="type === 'delete'" color="amber-8" name="warning" />
              {{ title }}
            </div>
          </slot>

          <BaseButtonCloseIcon v-if="!hideCloseIcon" class="close-icon" @click="close" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <BaseLoader v-if="contentLoading" />
          <div v-else>
            <slot>Default slot</slot>
          </div>
        </q-card-section>

        <q-card-section
          v-if="actions"
          class="dialog-action-buttons"
          :class="{ 'dialog-action-buttons--dense': type === 'delete' }"
        >
          <q-btn
            v-if="!hideCloseButton"
            v-close-popup
            color="grey-6"
            :label="closeText || selectedType.closeButtonText"
            flat
            @click="close"
          />
          <q-btn
            v-if="!hideConfirmButton"
            :color="confirmColor || selectedType.confirmColor"
            :label="confirmText || selectedType.confirmButtonText"
            :loading="confirmLoading"
            unelevated
            @click="confirm"
          />
        </q-card-section>
      </slot>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import BaseLoader from 'components/base/BaseLoader.vue';
import BaseButtonCloseIcon from 'components/base/button/BaseButtonCloseIcon.vue';

export default defineComponent({
  name: 'BaseDialog',

  components: { BaseLoader, BaseButtonCloseIcon },

  props: {
    show: {
      type: Boolean,
      required: true,
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: 'confirm',
      validator(this: void, value: string): boolean {
        return ['confirm', 'delete'].indexOf(value) !== -1;
      },
    },
    contentLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      required: false,
      default: false,
    },

    actions: {
      type: Boolean,
      required: false,
      default: true,
    },
    maximized: {
      type: Boolean,
      required: false,
      default: false,
    },

    title: {
      type: String,
      required: false,
      default: null,
    },
    confirmText: {
      type: String,
      required: false,
      default: null,
    },
    closeText: {
      type: String,
      required: false,
      default: null,
    },
    confirmColor: {
      type: String,
      required: false,
      default: 'primary',
    },

    hideConfirmButton: Boolean,
    hideCloseButton: Boolean,
    hideCloseIcon: Boolean,

    small: {
      type: Boolean,
      required: false,
      default: false,
    },
    medium: {
      type: Boolean,
      required: false,
      default: false,
    },
    large: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: ['confirm', 'close'],

  setup(props, { emit }) {
    function handleInput(value: boolean) {
      if (!value) close();
    }
    function confirm() {
      emit('confirm');
    }
    function close() {
      emit('close');
    }

    const types = [
      {
        name: 'default',
        confirmButtonText: 'Подтвердить',
        confirmColor: 'primary',
        closeButtonText: 'Закрыть',
      },
      {
        name: 'delete',
        confirmButtonText: 'Удалить',
        confirmColor: 'amber-8',
        closeButtonText: 'Отмена',
      },
    ];
    const selectedType = computed(() => {
      const defaultType = types[0];
      const propsType = types.find((t) => t.name === props.type);
      return propsType || defaultType;
    });

    const getCardStyles = computed(() => {
      const styles = [];

      if (props.small) styles.push({ width: '300px' });
      else if (props.medium) styles.push({ width: '600px' }, { maxWidth: '600px' });
      else if (props.large) styles.push({ width: '900px' }, { maxWidth: '900px' });

      return styles;
    });

    return {
      handleInput,
      confirm,
      close,

      types,
      selectedType,

      getCardStyles,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-dialog {
  .close-icon {
    position: absolute;
    top: 16px;
    right: 16px;
  }
}
</style>
