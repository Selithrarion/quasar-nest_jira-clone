<template>
  <q-page class="projects-page">
    <CommonPageHeader
      page-title="Фильтры"
      create-button-label="Создать фильтр"
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
            <q-btn :label="props.row.name" :to="`filters/${props.row.id}`" dense flat />
          </q-td>
        </template>

        <template #body-cell-leader="props">
          <q-td :props="props">
            <q-avatar size="md">
              <img :src="props.row.leader.avatarURL" alt="Avatar" />
            </q-avatar>
            <q-btn class="q-mx-sm" :label="props.row.leader.name" :to="`/people/${props.row.leader.id}`" dense flat />
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
                    <q-item-section>Управление подписками</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable>
                    <q-item-section>Копировать фильтр</q-item-section>
                  </q-item>
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

import BaseButtonFavorite from 'components/base/button/BaseButtonFavorite.vue';
import BaseButtonMore from 'components/base/button/BaseButtonMore.vue';
import CommonPageHeader from 'components/common/CommonPageHeader.vue';

import { FilterInterface } from 'src/models/filter/filter.interface';
import { AccessEnum } from 'src/models/common/access.model';

export default defineComponent({
  name: 'Filters',

  components: { BaseButtonFavorite, BaseButtonMore, CommonPageHeader },

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
        label: 'Название',
        field: (row: FilterInterface) => row.name,
        sortable: true,
        align: 'left',
      },
      {
        name: 'leader',
        required: true,
        label: 'Руководитель',
        field: (row: FilterInterface) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'access',
        required: true,
        label: 'Доступ',
        field: (row: FilterInterface) => AccessEnum[row.accessID],
        sortable: false,
        align: 'left',
      },
      {
        name: 'favoriteCount',
        required: true,
        label: 'Кто добавил в избранное',
        field: (row: FilterInterface) => row.favoriteCount,
        format: (val: number) => `${val} пользователей`,
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
