<template>
  <q-page class="dashboard-page">
    <CommonPageHeader
      page-title="Dashboards"
      create-button-label="Create dashboard"
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
                <BaseButton :label="props.row.name" :to="`/dashboards/${props.row.id}`" dense flat />
              </q-td>
            </template>

            <template #body-cell-leader="props">
              <q-td :props="props">
                <BaseAvatar
                  size="md"
                  :src="props.row.leader.avatar && props.row.leader.avatar.url"
                  :item-name="props.row.leader.username"
                  :item-color="props.row.leader.color"
                />
                <BaseButton
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
                  <BaseAvatar
                    size="md"
                    :src="props.row.project.avatar && props.row.project.avatar.url"
                    :item-name="props.row.project.username"
                    :item-color="props.row.project.color"
                    square
                  />
                  <span>{{ props.row.project.name }},</span>
                  <span>{{ props.row.access.name }}</span>
                </div>
              </q-td>
            </template>

            <template #body-cell-actions="props">
              <q-td :props="props">
                <BaseButtonMore>
                  <q-menu auto-close>
                    <q-list>
                      <BaseItem label="Copy dashboard" />
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

    <DashboardCreateDialog :model-value="dialog.openedName.value === 'createDashboard'" @close="dialog.close" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
// import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import CommonPageHeader from 'components/common/CommonPageHeader.vue';
import DashboardCreateDialog from 'components/dashboard/create/DashboardCreateDialog.vue';

import { DashboardModel } from 'src/models/dashboard/dashboard.model';
// import dashboardRepository from 'src/repositories/dashboardRepository';

export default defineComponent({
  name: 'Dashboard',

  components: {
    CommonPageHeader,
    DashboardCreateDialog,
  },

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
        label: 'Name',
        field: (row: DashboardModel) => row.name,
        sortable: true,
        align: 'left',
      },
      {
        name: 'leader',
        required: true,
        label: 'Supervisor',
        field: (row: DashboardModel) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'access',
        required: true,
        label: 'Access',
        field: (row: DashboardModel) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'marksCount',
        required: true,
        label: 'Overlays',
        field: (row: DashboardModel) => row.marksCount,
        format: (val: number) => `${val} human`,
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
