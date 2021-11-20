<template>
  <q-page class="projects-page">
    <CommonPageHeader
      page-title="Filters"
      create-button-label="Create filter"
      :filters="['leader', 'project', 'group']"
      @create="dialog.open('createFilter')"
    />

    <div class="q-px-xl q-mt-md">
      <q-table row-key="name" :rows="filters" :columns="columns">
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
            <BaseButton :label="props.row.name" :to="`filters/${props.row.id}`" dense flat />
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
                  <BaseItem label="Subscription management" />
                  <BaseItem label="Copy filter" />
                </q-list>
              </q-menu>
            </BaseButtonMore>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import useDialog from 'src/composables/common/useDialog';

import CommonPageHeader from 'components/common/CommonPageHeader.vue';

import { FilterInterface } from 'src/models/filter/filter.interface';
import { AccessEnum } from 'src/models/common/access.model';

export default defineComponent({
  name: 'Filters',

  components: {
    CommonPageHeader,
  },

  setup() {
    const dialog = useDialog();

    const columns = reactive([
      {
        name: 'favorite',
        label: '',
        field: (row: FilterInterface) => row.favorite,
        align: 'center',
      },
      {
        name: 'name',
        required: true,
        label: 'Name',
        field: (row: FilterInterface) => row.name,
        sortable: true,
        align: 'left',
      },
      {
        name: 'leader',
        required: true,
        label: 'Supervisor',
        field: (row: FilterInterface) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'access',
        required: true,
        label: 'Access',
        field: (row: FilterInterface) => AccessEnum[row.accessID],
        sortable: false,
        align: 'left',
      },
      {
        name: 'favoriteCount',
        required: true,
        label: 'Who added to favorites',
        field: (row: FilterInterface) => row.favoriteCount,
        format: (val: number) => `${val} users`,
        sortable: true,
        align: 'left',
      },
      {
        name: 'actions',
        label: '',
        field: (row: FilterInterface) => row.id,
        align: 'right',
      },
    ]);
    const filters = reactive<FilterInterface[]>([]);

    function toggleFavorite(filterID: number) {
      const filter = filters.find((f) => f.id === filterID);
      if (!filter) return;

      filter.favorite = !filter.favorite;
    }

    return {
      dialog,

      columns,
      filters,
      toggleFavorite,
    };
  },
});
</script>
