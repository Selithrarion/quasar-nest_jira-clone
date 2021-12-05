<template>
  <q-dialog :model-value="show" :maximized="maximized" v-bind="$attrs" @update:model-value="handleInput">
    <q-card
      class="base-dialog"
      :class="[{ 'big-side-padding': maximized }, { 'overflow-hidden': hideScroll }]"
      :style="computedCardStyles"
    >
      <slot name="content">
        <q-card-section
          v-if="!contentLoading"
          class="row items-center no-wrap q-pa-lg"
          :class="{ 'fixed-section': fixedHeader }"
        >
          <slot name="title">
            <div class="row items-center gap-2 text-h6 full-width no-wrap">
              <q-icon v-if="type === 'delete'" color="amber-8" name="warning" />
              {{ title }}
            </div>
          </slot>

          <slot name="title-append-buttons" />

          <BaseButtonCloseIcon v-if="!hideCloseIcon" class="close-icon" @click="close" />
        </q-card-section>

        <q-form class="gap-0" @submit="confirm">
          <q-card-section class="q-pt-none q-px-lg q-pb-lg" :style="{ height: contentLoading ? '300px' : 'auto' }">
            <BaseLoader v-if="contentLoading" center />
            <div v-else class="form-fields-wrapper">
              <slot>Default slot</slot>
            </div>
          </q-card-section>

          <q-card-section
            v-if="actions && !contentLoading"
            class="dialog-action-buttons"
            :class="[{ 'dialog-action-buttons--dense': type === 'delete' }, { 'fixed-section': fixedFooter }]"
          >
            <BaseButton
              v-if="showBackButton"
              color="blue-grey-6"
              :label="backText || defaultBackText"
              flat
              @click="back"
            />
            <BaseButton
              v-if="!hideCloseButton"
              v-close-popup
              color="blue-grey-6"
              :label="closeText || selectedType.closeButtonText"
              flat
              @click="close"
            />
            <BaseButton
              v-if="!hideConfirmButton"
              type="submit"
              :class="confirmClasses"
              :color="confirmColor || selectedType.confirmColor"
              :label="confirmText || selectedType.confirmButtonText"
              :icon="confirmIcon"
              :loading="confirmLoading"
              :disabled="confirmDisabled"
              unelevated
            />
          </q-card-section>
        </q-form>
      </slot>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'BaseDialog',

  props: {
    modelValue: Boolean,

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
    confirmColor: {
      type: String,
      required: false,
      default: null,
    },
    confirmIcon: {
      type: String,
      required: false,
      default: undefined,
    },
    confirmClasses: {
      type: String,
      required: false,
      default: null,
    },
    confirmDisabled: Boolean,

    backText: {
      type: String,
      required: false,
      default: null,
    },
    closeText: {
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

    small: Boolean,
    medium: {
      type: Boolean,
      required: false,
      default: true,
    },
    large: Boolean,
  },

  emits: ['confirm', 'close', 'back'],

  setup(props, { emit }) {
    const { t } = useI18n();

    const show = ref(false);
    watch(
      () => props.modelValue,
      (v) => {
        show.value = v;
      }
    );

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

    const defaultBackText = ref(t('common.back'));
    const defaultConfirmText = ref(t('common.confirm'));

    const types = [
      {
        name: 'default',
        confirmButtonText: t('common.confirm'),
        confirmColor: 'primary',
        closeButtonText: t('common.close'),
      },
      {
        name: 'delete',
        confirmButtonText: t('common.delete'),
        confirmColor: 'amber-8',
        closeButtonText: t('common.cancel'),
      },
    ];
    const selectedType = computed(() => {
      const defaultType = types[0];
      const propsType = types.find((t) => t.name === props.type);
      return propsType || defaultType;
    });

    const computedCardStyles = computed(() => {
      const styles = [];

      if (props.small && !props.maximized) styles.push({ width: '300px' });
      else if (props.large && !props.maximized) styles.push({ width: '900px' }, { maxWidth: '900px' });
      else if (props.medium && !props.maximized) styles.push({ width: '600px' }, { maxWidth: '600px' });

      return styles;
    });

    return {
      handleInput,
      confirm,
      close,
      back,

      defaultBackText,
      defaultConfirmText,
      show,

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
    top: 20px;
    right: 20px;
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
