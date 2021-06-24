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
                <q-btn
                  size="md"
                  :icon="props.row.favorite ? 'star' : 'star_border'"
                  :color="props.row.favorite ? 'orange-5' : 'grey-6'"
                  flat
                  round
                  @click="toggleFavorite(props.row.id)"
                />
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
                  <img :src="props.row.leader.avatarURLs.x32" alt="Avatar" />
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
                    <img :src="props.row.project.avatarURLs.x32" alt="Company avatar" />
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

    <DashboardCreateDialog :show="dialog.opened.value === 'createDashboard'" @close="dialog.close" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import BaseLoader from 'components/base/BaseLoader.vue';
import BaseButtonMore from 'components/base/button/BaseButtonMore.vue';
import CommonPageHeader from 'components/common/CommonPageHeader.vue';
import DashboardCreateDialog from 'components/dashboard/create/DashboardCreateDialog.vue';

import { DashboardInterface } from 'components/dashboard/models/dashboard.interface';
import dashboardService from 'src/service/dashboardService';

export default defineComponent({
  name: 'Dashboard',

  components: { BaseLoader, BaseButtonMore, CommonPageHeader, DashboardCreateDialog },

  setup() {
    const dialog = useDialog();

    const columns = reactive([
      {
        name: 'favorite',
        label: '',
        field: (row: DashboardInterface) => row.favorite,
        align: 'center',
      },
      {
        name: 'name',
        required: true,
        label: 'Название',
        field: (row: DashboardInterface) => row.name,
        sortable: true,
        align: 'left',
      },
      {
        name: 'leader',
        required: true,
        label: 'Руководитель',
        field: (row: DashboardInterface) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'access',
        required: true,
        label: 'Доступ',
        field: (row: DashboardInterface) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'marksCount',
        required: true,
        label: 'Пометки',
        field: (row: DashboardInterface) => row.marksCount,
        format: (val: number) => `${val} человек`,
        sortable: true,
        align: 'left',
      },
      {
        name: 'actions',
        label: '',
        field: (row: DashboardInterface) => row.id,
        align: 'right',
      },
    ]);

    const dashboards = reactive<DashboardInterface[]>([
      {
        id: 1,
        name: 'Jira dashboard',
        favorite: true,
        marksCount: 666,
        gadgets: [
          {
            id: 1,
            label: 'Пузырьковая диаграмма',
            color: 'blue-6',
          },
          null,
          null,
        ],
        project: {
          id: 1,
          name: 'Jira project',
          key: 'JP',
          type: 'Software',
          favorite: true,
          avatarURLs: {
            x16: 'https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg',
            x24: 'https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg',
            x32: 'https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg',
            x48: 'https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-gradient-square-border-illustration-image_1467225.jpg',
          },
          leader: {
            id: 1,
            name: 'Jira Jira',
            avatarURLs: {
              x16: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
              x24: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
              x32: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
              x48: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
            },
            email: 'jirajiraemail@gmail.com',
            locale: 'ru_RU',
            isActive: true,
          },
        },
        access: {
          id: 1,
          name: 'Для всех ролей',
        },
        leader: {
          id: 1,
          name: 'Jira Jira',
          avatarURLs: {
            x16: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
            x24: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
            x32: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
            x48: 'https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg',
          },
          email: 'jirajiraemail@gmail.com',
          locale: 'ru_RU',
          isActive: true,
        },
      },
    ]);

    function toggleFavorite(dashboardID: number) {
      const dashboard: DashboardInterface | undefined = dashboards.find(
        (d: DashboardInterface) => d.id === dashboardID
      );
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
