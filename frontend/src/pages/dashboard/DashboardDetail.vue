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

        <q-btn
          class="btn--secondary text-weight-bold"
          label="Добавить гаджет"
          unelevated
          no-caps
          no-wrap
          @click="dialog.open('addGadget')"
        />

        <q-btn class="btn--secondary text-weight-bold" label="Изменить схему" unelevated no-caps>
          <q-menu>
            <q-list>
              <q-item class="q-pa-sm">
                <q-btn icon="grid_view" size="12px" padding="6px" color="grey-9" text-color="white" unelevated />
                <q-btn icon="grid_view" size="12px" padding="6px" unelevated />
                <q-btn icon="grid_view" size="12px" padding="6px" unelevated />
                <q-btn icon="grid_view" size="12px" padding="6px" unelevated />
                <q-btn icon="grid_view" size="12px" padding="6px" unelevated />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <BaseButtonMore class="btn--secondary" padding="6px" :flat="false" :round="false" unelevated>
          <q-menu>
            <q-list padding dense>
              <q-item class="flex items-center text-caption text-uppercase">
                <q-item-section> {{ dashboard.name }} </q-item-section>
              </q-item>
              <q-item v-close-popup disable clickable>
                <q-item-section> Изменить и поделиться</q-item-section>
              </q-item>
              <q-item v-close-popup disable clickable>
                <q-item-section> Копировать </q-item-section>
              </q-item>
              <q-item v-close-popup disable clickable>
                <q-item-section> Просмотреть в виде настенной панели </q-item-section>
              </q-item>
              <q-item v-close-popup clickable @click="dialog.open('deleteDashboard')">
                <q-item-section> Удалить </q-item-section>
              </q-item>

              <q-separator class="q-my-sm" />

              <q-item v-close-popup disable clickable>
                <q-item-section> Просмотреть слайд-шоу на настенной панели </q-item-section>
              </q-item>
              <q-item v-close-popup disable clickable>
                <q-item-section> Настроить слайд-шоу на настенной панели </q-item-section>
              </q-item>

              <q-separator class="q-my-sm" />

              <q-item v-close-popup clickable @click="dialog.open('createDashboard')">
                <q-item-section> Создать дашбоард </q-item-section>
              </q-item>
              <q-item v-close-popup clickable @click="goToDashboardsPage">
                <q-item-section> Показать все дашбоарды</q-item-section>
              </q-item>
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
            <q-btn icon="close_fullscreen" size="14px" padding="4px" unelevated disable flat>
              <BaseTooltip> Свернуть </BaseTooltip>
            </q-btn>
            <q-btn icon="fullscreen" size="14px" padding="4px" unelevated disable flat>
              <BaseTooltip> Развернуть </BaseTooltip>
            </q-btn>
            <q-btn icon="more_horiz" size="14px" padding="4px" unelevated flat>
              <q-menu>
                <div class="q-px-md q-pt-md q-pb-sm select-none">
                  <div class="text-caption text-uppercase">цвет выделения</div>
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
                  <q-item v-close-popup clickable disable>
                    <q-item-section>Обновить страницу</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable disable>
                    <q-item-section>Настроить</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable disable>
                    <q-item-section>Переименовать</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable disable>
                    <q-item-section>Удалить</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>

        <q-form class="column justify-between full-height">
          <div class="flex justify-end q-mt-auto q-pt-lg">
            <q-btn class="btn--secondary" label="Сохранить" unelevated no-caps />
          </div>
        </q-form>
      </div>

      <div class="gadget-empty-slot">
        <div class="flex-center column">
          <div class="text-grey-7">Перетащите гаджет в эту колонку</div>
          <div>или</div>
          <q-btn
            label="Добавление гаджета"
            color="primary"
            size="14px"
            dense
            no-caps
            flat
            @click="dialog.open('addGadget')"
          />
        </div>
      </div>
    </div>

    <DashboardGadgetAddDialog v-if="dialog.openedName.value === 'addGadget'" @close="dialog.close" />
    <DashboardCreateDialog v-if="dialog.openedName.value === 'createDashboard'" @close="dialog.close" />
    <BaseDialog
      v-if="dialog.openedName.value === 'deleteDashboard'"
      type="delete"
      :title="`Удалить ${dashboard.name}?`"
      :confirm-loading="isDeleteDashboardLoading"
      @close="dialog.close"
      @confirm="deleteDashboard"
    >
      Этот дашбоард и его конфигурация будут удалены без возможности восстановления. Использовать этот дашбоард в
      качестве настенной панели или для показа слайд-шоу на настенной панели будет невозможно.
    </BaseDialog>
    <!--    <Suspense>-->
    <!--      <template #default>-->
    <!--        <div></div>-->
    <!--      </template>-->
    <!--      <template #fallback>-->
    <!--        <BaseLoader />-->
    <!--      </template>-->
    <!--    </Suspense>-->
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import BaseDialog from 'components/base/BaseDialog.vue';
import BaseButtonFavorite from 'components/base/button/BaseButtonFavorite.vue';
import BaseButtonMore from 'components/base/button/BaseButtonMore.vue';
import BaseTooltip from 'components/base/BaseTooltip.vue';
import DashboardCreateDialog from 'components/dashboard/create/DashboardCreateDialog.vue';
import DashboardGadgetAddDialog from 'components/dashboard/gadget/DashboardGadgetAddDialog.vue';

import { DashboardModel } from 'src/models/dashboard/dashboard.model';

export default defineComponent({
  name: 'DashboardDetail',

  components: {
    BaseDialog,
    BaseButtonFavorite,
    BaseButtonMore,
    BaseTooltip,

    DashboardCreateDialog,
    DashboardGadgetAddDialog,
  },

  setup() {
    const route = useRoute();
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
