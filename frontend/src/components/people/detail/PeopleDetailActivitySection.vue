<template>
  <section :class="{ 'q-mt-xl': !hidePadding }">
    <div class="q-mb-md">
      <h6 class="q-my-none text-body1 text-weight-medium">{{ title }}</h6>
      <div v-if="showTitleCaption" class="text-caption text-grey-6">
        {{ t('people.activityAccess') }}
      </div>
    </div>

    <q-card class="row flex-2 q-py-md">
      <template v-if="!items.length">
        <q-card-section class="q-pl-xl col-3">
          <img
            src="https://jira-frontend-static.prod.public.atl-paas.net/assets/WorkListEmpty.4f661661cc7870531cec33801ddb8b45.8.svg"
            alt="Charts"
            style="max-width: 144px; max-height: 144px"
          />
        </q-card-section>
        <q-card-section class="col-9">
          <h6 class="text-weight-regular q-my-md">{{ t('common.thereNoAnything') }}</h6>
          <p v-if="isOwnProfile">
            {{ t('people.activityYourLast') }}
          </p>
          <p v-else-if="isUserProfile">
            {{ t('people.activityUserLast') }}
          </p>
          <p v-else>
            {{ t('people.activityTeamLast') }}
          </p>
        </q-card-section>
      </template>

      <q-card-section v-else class="full-width">
        <q-list>
          <BaseItem v-for="item in limitedItems" :key="item.id" clickable @click="$emit('item-click', item)">
            <slot name="itemPrepend" :item="item" />

            <q-item-section>
              <q-item-label>
                <slot name="itemName" :item="item">
                  {{ item.name }}
                </slot>
              </q-item-label>
              <q-item-label caption>
                <slot name="itemCaption" :item="item">
                  <slot name="itemCaptionName" :item="item">{{ item.name }}</slot>
                  –
                  <slot name="itemCaptionDate" :item="item">{{ formatDate(item.createdAt, DateTypes.DATE) }}</slot>
                </slot>
              </q-item-label>
            </q-item-section>
          </BaseItem>
        </q-list>
        <div v-if="restNumber" class="flex-center text-blue-grey-4 text-caption q-py-sm">
          and {{ restNumber }} hidden
        </div>
      </q-card-section>
    </q-card>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFormat, DateTypes } from 'src/composables/format/useFormat';

export default defineComponent({
  name: 'PeopleDetailActivitySection',

  components: {},

  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },

    title: {
      type: String,
      required: false,
      default: null,
    },
    hidePadding: Boolean,
    showTitleCaption: Boolean,

    isOwnProfile: {
      type: Boolean,
      required: true,
    },
    isUserProfile: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['item-click'],

  setup(props) {
    const { t } = useI18n();
    const { formatDate } = useFormat();

    const limitedItems = computed(() => props.items.slice(0, 5));
    const restNumber = computed(() => (props.items.length > 5 ? props.items.length - 5 : null));

    return {
      t,
      formatDate,
      DateTypes,

      limitedItems,
      restNumber,
    };
  },
});
</script>
