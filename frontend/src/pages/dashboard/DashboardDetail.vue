<template>
  <q-page class="dashboard-detail q-px-xl">
    <div class="flex items-center justify-between">
      <h5>
        {{ dashboard.name }}
      </h5>

      <div class="flex items-center gap-3">
        <BaseButtonFavorite
          padding="6px"
          :favorite="dashboard.favorite"
          :round="false"
          @click="toggleFavoriteDashboard"
        />

        <BaseButton
          class="text-weight-bold"
          label="Add gadget"
          secondary-color
          unelevated
          @click="dialog.open('addGadget')"
        />

        <BaseButton class="text-weight-bold" label="Change schema" secondary-color unelevated>
          <q-menu auto-close>
            <q-list>
              <BaseItem class="q-pa-sm">
                <BaseButton icon="grid_view" size="12px" padding="6px" color="grey-9" text-color="white" unelevated />
                <BaseButton icon="grid_view" size="12px" padding="6px" unelevated />
                <BaseButton icon="grid_view" size="12px" padding="6px" unelevated />
                <BaseButton icon="grid_view" size="12px" padding="6px" unelevated />
                <BaseButton icon="grid_view" size="12px" padding="6px" unelevated />
              </BaseItem>
            </q-list>
          </q-menu>
        </BaseButton>

        <BaseButtonMore class="btn--secondary" padding="6px" :flat="false" :round="false" unelevated>
          <q-menu auto-close>
            <q-list padding dense>
              <!--              TODO: it seems it common list title?-->
              <BaseItem class="flex items-center text-caption text-uppercase" :label="dashboard.name" />
              <BaseItem label="Edit and share" disable />
              <BaseItem label="Copy" disable />
              <BaseItem label="View as wall panel" disable />
              <BaseItem label="Delete" @click="dialog.open('deleteDashboard')" />

              <q-separator class="q-my-sm" />

              <BaseItem label="View slideshow on wallboard" disable />
              <BaseItem label="Set up a slideshow on a wallboard" disable />

              <q-separator class="q-my-sm" />

              <BaseItem label="Create dashboard " @click="dialog.open('createDashboard')" />
              <BaseItem label="Show all dashboards" @click="goToDashboardsPage" />
            </q-list>
          </q-menu>
        </BaseButtonMore>
      </div>
    </div>

    <div class="flex gap-4">
      <div
        v-for="gadget in filteredGadgets"
        :key="gadget.id"
        class="gadget-item"
        :style="{ 'border-top': gadget.color === 'none' ? '' : `4px solid ${getColorValueByKey(gadget.color)}` }"
      >
        <div class="gadget-item__header" :style="[gadget.color === 'none' ? 'padding-top: 3px' : '']">
          <div class="flex-center gap-2">
            <q-icon name="drag_indicator" color="blue-grey-3" />
            <span class="text-subtitle1 text-weight-medium">{{ gadget.label }}</span>
          </div>

          <div>
            <BaseButton tooltip="Collapse" icon="close_fullscreen" size="14px" padding="4px" unelevated disable flat />
            <BaseButton tooltip="Expand" icon="fullscreen" size="14px" padding="4px" unelevated disable flat />
            <BaseButton icon="more_horiz" size="14px" padding="4px" unelevated flat>
              <q-menu auto-close>
                <div class="q-px-md q-pt-md q-pb-sm select-none">
                  <CommonListTitle title="highlight color" />
                  <div class="flex gap-2 q-py-sm">
                    <button
                      v-for="color in colors"
                      :key="color.key"
                      class="color-btn"
                      :style="{ background: color.value }"
                      @click="selectGadgetColor(gadget.id, color.key)"
                    >
                      <q-icon
                        v-if="gadget.color === color.key"
                        name="check"
                        :color="color.key === 'none' ? 'black' : 'white'"
                      />
                    </button>
                  </div>
                </div>

                <q-separator />

                <q-list class="select-none" dense>
                  <BaseItem label="Refresh the page" disable />
                  <BaseItem label="Tune" disable />
                  <BaseItem label="Rename" disable />
                  <BaseItem label="Delete" disable />
                </q-list>
              </q-menu>
            </BaseButton>
          </div>
        </div>

        <q-form class="column justify-between full-height">
          <div class="flex justify-end q-mt-auto q-pt-lg">
            <BaseButton label="Save" secondary-color unelevated />
          </div>
        </q-form>
      </div>

      <div class="gadget-empty-slot">
        <div class="flex-center column">
          <div class="text-grey-7">Drag the gadget to this column</div>
          <div>or</div>
          <BaseButton
            label="Adding a gadget"
            color="primary"
            size="14px"
            dense
            flat
            @click="dialog.open('addGadget')"
          />
        </div>
      </div>
    </div>

    <DashboardGadgetAddDialog :model-value="dialog.openedName.value === 'addGadget'" @close="dialog.close" />
    <DashboardCreateDialog :model-value="dialog.openedName.value === 'createDashboard'" @close="dialog.close" />
    <BaseDialog
      type="delete"
      :model-value="dialog.openedName.value === 'deleteDashboard'"
      :title="`Delete ${dashboard.name}?`"
      :confirm-loading="isDeleteDashboardLoading"
      @close="dialog.close"
      @confirm="deleteDashboard"
    >
      This dashboard and its configuration will be permanently deleted. Use this dashboard in as a wallboard or to
      display a slideshow on a wallboard.
    </BaseDialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import CommonListTitle from 'components/common/CommonListTitle.vue';
import DashboardCreateDialog from 'components/dashboard/create/DashboardCreateDialog.vue';
import DashboardGadgetAddDialog from 'components/dashboard/gadget/DashboardGadgetAddDialog.vue';

import { DashboardModel } from 'src/models/dashboard/dashboard.model';

export default defineComponent({
  name: 'DashboardDetail',

  components: {
    CommonListTitle,

    DashboardCreateDialog,
    DashboardGadgetAddDialog,
  },

  setup() {
    // const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const dialog = useDialog();

    // const dashboardID = route.params.id;
    // await store.dispatch('dashboard/fetchDashboardDetail', dashboardID);
    const dashboard = computed((): DashboardModel | null => store.state.dashboard.dashboardDetail);

    const isDeleteDashboardLoading = ref(false);
    async function deleteDashboard() {
      try {
        isDeleteDashboardLoading.value = true;

        await new Promise((res) =>
          setTimeout(() => {
            res({});
          }, 2000)
        );

        await goToDashboardsPage();
      } finally {
        isDeleteDashboardLoading.value = false;
      }
    }
    async function goToDashboardsPage() {
      await router.push('/dashboards');
    }

    const filteredGadgets = computed(() => dashboard.value?.gadgets.filter((g) => g !== null));
    const colors = [
      {
        key: 'blue',
        value: '#2196f3',
      },
      {
        key: 'red',
        value: '#f44336',
      },
      {
        key: 'yellow',
        value: '#ffb74d',
      },
      {
        key: 'green',
        value: '#4caf50',
      },
      {
        key: 'light-blue',
        value: '#80deea',
      },
      {
        key: 'purple',
        value: '#9c27b0',
      },
      {
        key: 'gray',
        value: '#9e9e9e',
      },
      {
        key: 'none',
        value: 'transparent',
      },
    ];
    function selectGadgetColor(id: number, colorKey: string) {
      if (!filteredGadgets.value) return;
      const index = filteredGadgets.value.findIndex((g) => g?.id === id);
      const gadget = filteredGadgets.value[index];
      if (gadget) gadget.color = colorKey;
    }
    function getColorValueByKey(colorKey: string) {
      const color = colors.find((c) => c.key === colorKey);
      return color?.value;
    }

    function toggleFavoriteDashboard() {
      if (dashboard.value) {
        dashboard.value.favorite = !dashboard.value.favorite;
      }
    }

    return {
      dialog,

      dashboard,
      filteredGadgets,

      isDeleteDashboardLoading,
      deleteDashboard,
      goToDashboardsPage,

      colors,
      selectGadgetColor,
      getColorValueByKey,

      toggleFavoriteDashboard,
    };
  },
});
</script>

<style lang="scss" scoped>
.dashboard-details {
  %gadget {
    display: flex;
    flex-flow: column;
    flex: 1;
    min-height: 500px;
    padding: 24px;
    border-radius: 6px;
  }
  .gadget-empty-slot {
    @extend %gadget;
    align-items: center;
    justify-content: center;
    border: 1px dashed $blue-grey-5;
  }
  .gadget-item {
    @extend %gadget;
    border: 1px solid $blue-grey-3;
    &__header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      cursor: grab;
      user-select: none;
      padding-bottom: 24px;
    }
  }
}
.color-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  border: 1px solid $grey-4;
  border-radius: 4px;
  transition: filter 200ms ease, box-shadow 300ms ease;
  cursor: pointer;
  &:hover {
    filter: brightness(1.2);
    box-shadow: $shadow-1;
  }
}
</style>
