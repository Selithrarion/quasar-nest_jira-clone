<template>
  <BaseDialog
    title="Add gadget"
    :loading="loading.active.value"
    :maximized="$q.screen.lt.md"
    hide-confirm-button
    large
    @close="close"
  >
    <div class="row">
      <nav class="col-3">
        <CommonSearch v-model="searchValue" autofocus filled />

        <CommonListTitle class="q-mt-md" title="Categories" />
        <q-list class="category-list" dense>
          <BaseItem>
            <q-item-section>
              <span>Jira</span>
              <q-chip size="sm">2</q-chip>
            </q-item-section>
          </BaseItem>
          <BaseItem class="bg-grey-2">
            <q-item-section>
              <span class="text-weight-bold">Everything</span>
              <q-chip size="sm" color="blue-2">2</q-chip>
            </q-item-section>
          </BaseItem>
        </q-list>
      </nav>

      <div class="col-9 q-pl-lg">
        <BaseAlert
          v-if="isAvailableMoreGadgets"
          class="q-mb-lg"
          title="Access no more gadgets"
          text="Additional gadgets were found for download."
          color="indigo"
          icon="warning"
          action-text="Download"
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
              <div class="text-caption text-grey-7">Developer: Atlassian • Local</div>

              <div class="text-body2 q-py-md">Allows for custom spacing between gadgets in a wallboard</div>

              <BaseButton label="Show XML Link" text-color="blue-8" size="12px" unelevated dense />
            </q-card-section>

            <q-card-actions class="q-py-md q-pl-md q-pr-none" vertical>
              <BaseButton label="Add gadget" size="12px" secondary-color unelevated @click="add" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import CommonSearch from 'components/common/CommonSearch.vue';
import CommonListTitle from 'components/common/CommonListTitle.vue';

import useLoading from 'src/composables/common/useLoading';

export default defineComponent({
  name: 'DashboardGadgetAddDialog',

  components: {
    CommonSearch,
    CommonListTitle,
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
