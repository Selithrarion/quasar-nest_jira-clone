<template>
  <q-dialog :model-value="show" :maximized="maximized" v-bind="$attrs" @update:model-value="handleInput">
    <q-card
      class="base-dialog"
      :class="[{ 'big-side-padding': maximized }, { 'overflow-hidden': hideScroll }]"
      :style="computedCardStyles"
    >
      <slot name="content">
        <q-card-section class="row items-center no-wrap q-pa-lg" :class="{ 'fixed-section': fixedHeader }">
          <slot name="title">
            <div class="row items-center gap-2 text-h6 full-width">
              <q-icon v-if="type === 'delete'" color="amber-8" name="warning" />
              {{ title }}
            </div>
          </slot>

          <slot name="title-append-buttons" />

          <BaseButtonCloseIcon v-if="!hideCloseIcon" class="close-icon" @click="close" />
        </q-card-section>

        <q-card-section class="q-pt-none q-px-lg q-pb-lg">
          <BaseLoader v-if="contentLoading" class="q-mt-xl q-mb-lg" />
          <div v-else>
            <slot>Default slot</slot>
          </div>
        </q-card-section>

        <q-card-section
          v-if="actions"
          class="dialog-action-buttons"
          :class="[{ 'dialog-action-buttons--dense': type === 'delete' }, { 'fixed-section': fixedFooter }]"
        >
          <q-btn v-if="showBackButton" color="grey-6" :label="backText" flat @click="back" />
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
    backText: {
      type: String,
      required: false,
      default: 'Назад',
    },
    closeText: {
      type: String,
      required: false,
      default: null,
    },
    confirmColor: {
      type: String,
      required: false,
      default: null,
    },

    fixedHeader: {
      type: Boolean,
      required: false,
      default: true,
    },
    fixedFooter: {
      type: Boolean,
      required: false,
      default: true,
    },

    showBackButton: Boolean,
    hideCloseButton: Boolean,
    hideConfirmButton: Boolean,
    hideCloseIcon: Boolean,

    hideScroll: Boolean,

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

  emits: ['confirm', 'close', 'back'],

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
    function back() {
      emit('back');
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

    const computedCardStyles = computed(() => {
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
      back,

      types,
      selectedType,

      computedCardStyles,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-dialog {
  position: relative;

  .close-icon {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .fixed-section {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 1;
  }
}
</style>
