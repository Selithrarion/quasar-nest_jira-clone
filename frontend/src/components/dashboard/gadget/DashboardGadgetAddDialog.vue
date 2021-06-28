<template>
  <BaseDialog
    title="Добавить гаджет"
    :show="show"
    :loading="loading.status"
    :show-confirm-button="false"
    :maximized="$q.screen.lt.md"
    large
    @close="close"
  >
    <div class="row">
      <nav class="col-3">
        <CommonSearch :value="searchValue" autofocus filled />

        <div class="text-caption text-uppercase q-mt-md">Категории</div>
        <q-list class="category-list" dense>
          <q-item class="flex-center-between" clickable>
            <span>Jira</span>
            <q-chip size="sm">2</q-chip>
          </q-item>
          <q-item class="flex-center-between bg-grey-2" clickable>
            <span class="text-weight-bold">Все</span>
            <q-chip size="sm" color="blue-2">2</q-chip>
          </q-item>
        </q-list>
      </nav>

      <div class="col-9 q-pl-lg">
        <BaseAlert
          v-if="isAvailableMoreGadgets"
          class="q-mb-lg"
          title="Доступно больше гаджетов"
          text="Были найдены дополнительные гаджеты, которые можно загрузить."
          color="indigo"
          icon="warning"
          action-text="Загрузить"
          padding="16px 16px 8px 16px"
          @action-click="isAvailableMoreGadgets = false"
        />

        <q-card flat>
          <q-card-section horizontal>
            <q-img
              class="col-3"
              src="https://bnberry.atlassian.net/s/sb53l8/b/2/23697f832c471c129f0f064eaf37e4ce611afd6b/_/download/resources/com.atlassian.jira.atlassian-wallboard-plugin:spacer-gadget/images/spacer-gadget-preview.png"
            />

            <q-card-section>
              <div class="text-subtitle2">Wallboard Spacer Gadget</div>
              <div class="text-xs text-grey-7">Разработчик: Atlassian • Локальный</div>

              <div class="text-sm q-py-md">Allows for custom spacing between gadgets in a wallboard</div>

              <q-btn label="Показать ссылку XML" text-color="blue-8" size="12px" unelevated dense no-caps />
            </q-card-section>

            <q-card-actions class="q-py-md q-pl-md q-pr-none" vertical>
              <q-btn
                class="btn--secondary"
                label="Добавить гаджет"
                size="12px"
                unelevated
                no-caps
                no-wrap
                @click="add"
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import BaseDialog from 'components/base/BaseDialog.vue';
import BaseAlert from 'components/base/BaseAlert.vue';
import CommonSearch from 'components/common/CommonSearch.vue';

import useLoading from 'src/composables/common/useLoading';

export default defineComponent({
  name: 'DashboardGadgetAddDialog',

  components: { BaseDialog, BaseAlert, CommonSearch },

  props: {
    show: {
      type: Boolean,
      required: true,
      default: null,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const loading = useLoading();
    const searchValue = ref('');

    function add() {
      close();
    }
    function close() {
      emit('close');
    }

    const isAvailableMoreGadgets = ref(true);

    return {
      loading,
      searchValue,

      add,
      close,

      isAvailableMoreGadgets,
    };
  },
});
</script>

<style lang="scss" scoped>
.category-list {
  user-select: none;
  margin-left: -16px;
  > .q-item {
    padding-right: 0;
  }
}
</style>
