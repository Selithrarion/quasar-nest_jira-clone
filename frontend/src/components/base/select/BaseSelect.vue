<template>
  <q-select
    class="base-select"
    :class="computedClasses"
    :model-value="modelValue"
    :style="{ maxWidth: `${maxWidth}px`, width: `${width}px` }"
    :option-label="optionLabel"
    :option-value="optionValue"
    :hide-bottom-space="hideBottomSpace"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :filled="filled && !buttonStyle"
    :menu-offset="buttonStyle ? [0, 8] : [0, 0]"
    :borderless="buttonStyle"
    :hide-dropdown-icon="buttonStyle"
    :use-chips="useChips"
    v-bind="$attrs"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <template #default>
      <BaseTooltip v-if="tooltip" :label="tooltip" delay="700" />
    </template>

    <template v-if="!useChips" #selected-item="{ opt }">
      <div class="flex items-center gap-1 no-wrap ellipsis">
        <slot name="selected-item" :option="opt">
          {{ opt[optionLabel] }}
        </slot>
      </div>
    </template>

    <template #option="{ itemProps, itemEvents, opt }">
      <BaseItem v-bind="itemProps" v-on="itemEvents">
        <div v-if="$slots.optionPrepend" class="flex-center q-pr-sm">
          <slot name="optionPrepend" :option="opt" />
        </div>

        <q-item-section>
          <slot name="optionLabel" :option="opt">
            <q-item-label>{{ opt[optionLabel] }}</q-item-label>
          </slot>
        </q-item-section>
      </BaseItem>
    </template>

    <template #no-option>
      <BaseItem class="text-grey" :label="t('common.noResults')" />
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'BaseSelect',

  props: {
    modelValue: {
      type: [Number, String, Array, Object],
      required: false,
      default: null,
    },

    truncate: {
      type: Boolean,
      required: false,
      default: true,
    },
    buttonStyle: Boolean,

    tooltip: {
      type: String,
      required: false,
      default: null,
    },

    maxWidth: {
      type: String,
      required: false,
      default: 'auto',
    },
    width: {
      type: String,
      required: false,
      default: 'auto',
    },

    optionLabel: {
      type: String,
      required: false,
      default: 'name',
    },
    optionValue: {
      type: String,
      required: false,
      default: 'id',
    },

    hideBottomSpace: {
      type: Boolean,
      required: false,
      default: true,
    },
    emitValue: {
      type: Boolean,
      required: false,
      default: true,
    },
    mapOptions: {
      type: Boolean,
      required: false,
      default: true,
    },
    filled: {
      type: Boolean,
      required: false,
      default: true,
    },
    useChips: Boolean,
  },

  emits: ['update:model-value'],

  setup(props) {
    const { t } = useI18n();

    const computedClasses = computed(() => {
      const classes = [];

      if (props.truncate) classes.push('base-select--truncate');
      if (props.buttonStyle) classes.push('base-select--button-style');

      return classes;
    });

    return {
      t,
      computedClasses,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-select {
  .base-select--truncate ::v-deep .q-field__native > span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &.base-select--button-style {
    transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    &:hover {
      background-color: $blue-grey-1;
    }
    &:active {
      background-color: $blue-grey-2;
    }
  }
}
</style>
