<template>
  <q-page class="dashboard-page">
    <CommonPageHeader
      page-title="Дашбоарды"
      create-button-label="Создать дашбоард"
      :filters="['leader', 'project', 'group']"
      @create="dialog.open('createDashboard')"
    />

    <div class="q-px-xl q-mt-md">
      <Suspense>
        <template #default>
          <q-table row-key="name" :rows="dashboards" :columns="columns">
            <template #header-cell-favorite="props">
              <q-th style="width: 20px" :props="props">
                <q-icon name="star" size="16px" color="grey-6" />
              </q-th>
            </template>

            <template #body-cell-favorite="props">
              <q-td :props="props">
                <BaseButtonFavorite :favorite="props.row.favorite" @click="toggleFavorite(props.row.id)" />
              </q-td>
            </template>

            <template #body-cell-name="props">
              <q-td :props="props">
                <q-btn
                  :label="props.row.name"
                  :to="`/dashboards/${props.row.id}`"
                  option-value="id"
                  emit-value
                  map-options
                  dense
                  flat
                />
              </q-td>
            </template>

            <template #body-cell-leader="props">
              <q-td :props="props">
                <q-avatar size="md">
                  <img :src="props.row.leader.avatarURL" alt="Avatar" />
                </q-avatar>
                <q-btn
                  class="q-mx-sm"
                  :label="props.row.leader.name"
                  :to="`/people/${props.row.leader.id}`"
                  dense
                  flat
                />
              </q-td>
            </template>

            <template #body-cell-access="props">
              <q-td :props="props">
                <div class="flex items-center gap-2">
                  <q-avatar size="md" square>
                    <img :src="props.row.project.avatarURL" alt="Company avatar" />
                  </q-avatar>
                  <span>{{ props.row.project.name }},</span>
                  <span>{{ props.row.access.name }}</span>
                </div>
              </q-td>
            </template>

            <template #body-cell-actions="props">
              <q-td :props="props">
                <BaseButtonMore>
                  <q-menu>
                    <q-list>
                      <q-item v-close-popup clickable>
                        <q-item-section>Копировать дашбоард</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </BaseButtonMore>
              </q-td>
            </template>
          </q-table>
        </template>
        <template #fallback>
          <BaseLoader />
        </template>
      </Suspense>
    </div>

    <DashboardCreateDialog v-if="dialog.openedName.value === 'createDashboard'" @close="dialog.close" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import BaseLoader from 'components/base/BaseLoader.vue';
import BaseButtonFavorite from 'components/base/button/BaseButtonFavorite.vue';
import BaseButtonMore from 'components/base/button/BaseButtonMore.vue';
import CommonPageHeader from 'components/common/CommonPageHeader.vue';
import DashboardCreateDialog from 'components/dashboard/create/DashboardCreateDialog.vue';

import { DashboardModel } from 'src/models/dashboard/dashboard.model';
import dashboardService from 'src/service/dashboardService';

export default defineComponent({
  name: 'Dashboard',

  components: { BaseLoader, BaseButtonFavorite, BaseButtonMore, CommonPageHeader, DashboardCreateDialog },

  setup() {
    const dialog = useDialog();

    const columns = reactive([
      {
        name: 'favorite',
        label: '',
        field: (row: DashboardModel) => row.favorite,
        align: 'center',
      },
      {
        name: 'name',
        required: true,
        label: 'Название',
        field: (row: DashboardModel) => row.name,
        sortable: true,
        align: 'left',
      },
      {
        name: 'leader',
        required: true,
        label: 'Руководитель',
        field: (row: DashboardModel) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'access',
        required: true,
        label: 'Доступ',
        field: (row: DashboardModel) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'marksCount',
        required: true,
        label: 'Пометки',
        field: (row: DashboardModel) => row.marksCount,
        format: (val: number) => `${val} человек`,
        sortable: true,
        align: 'left',
      },
      {
        name: 'actions',
        label: '',
        field: (row: DashboardModel) => row.id,
        align: 'right',
      },
    ]);

    const dashboards = reactive<DashboardModel[]>([]);

    function toggleFavorite(dashboardID: number) {
      const dashboard: DashboardModel | undefined = dashboards.find((d: DashboardModel) => d.id === dashboardID);
      if (!dashboard) return;

      dashboard.favorite = !dashboard.favorite;
    }

    return {
      dialog,

      columns,
      dashboards,
      toggleFavorite,
    };
  },
});
</script>
