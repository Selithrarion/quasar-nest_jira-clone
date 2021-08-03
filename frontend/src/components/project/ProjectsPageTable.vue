<template>
  <div class="q-px-xl q-mt-md">
    <BaseLoader v-if="!projects" page-margin />

    <q-table row-key="name" :rows="projects" :columns="columns">
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
            class="full-width"
            align="left"
            option-value="id"
            :label="props.row.name"
            :to="getProjectURL(props.row)"
            emit-value
            map-options
            dense
            flat
          />
        </q-td>
      </template>

      <template #body-cell-leader="props">
        <q-td v-if="props.row.leader" :props="props">
          <q-avatar
            class="q-mr-sm"
            size="md"
            :icon="props.row.leader.avatarURL ? null : 'people'"
            :color="props.row.leader.avatarURL ? null : 'blue-grey-2'"
          >
            <img v-if="props.row.leader.avatarURL" :src="props.row.leader.avatarURL" alt="Avatar" />
          </q-avatar>
          <q-btn
            class="full-width"
            align="left"
            :label="props.row.leader.name"
            :to="`/people/${props.row.leader.id}`"
            dense
            flat
          />
        </q-td>
        <q-td v-else> — </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props">
          <BaseButtonMore block>
            <q-menu auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Настройки проекта</q-item-section>
                </q-item>
                <q-item clickable @click="dialog.open('deleteProject', { item: props.row })">
                  <q-item-section>Переместить в коризну</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </BaseButtonMore>
        </q-td>
      </template>
    </q-table>

    <BaseDialog
      v-if="dialog.openedName.value === 'deleteProject'"
      type="delete"
      :title="`Удалить ${dialog.openedItem.value.name}?`"
      :confirm-loading="dialog.loading.value"
      @close="dialog.close"
      @confirm="deleteProject(dialog.openedItem.value.id)"
    >
      Этот проект и его конфигурация будут удалены без возможности восстановления.
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onBeforeMount } from 'vue';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import BaseLoader from 'components/base/BaseLoader.vue';
import BaseDialog from 'components/base/BaseDialog.vue';
import BaseButtonFavorite from 'components/base/button/BaseButtonFavorite.vue';
import BaseButtonMore from 'components/base/button/BaseButtonMore.vue';

import { ProjectModel, ProjectTypeEnum } from 'src/models/project/project.model';

export default defineComponent({
  name: 'ProjectsPageTable',

  components: {
    BaseLoader,
    BaseDialog,
    BaseButtonFavorite,
    BaseButtonMore,
  },

  setup() {
    const store = useStore();
    const dialog = useDialog();

    const columns = reactive([
      {
        name: 'favorite',
        label: '',
        field: (row: ProjectModel) => row.favorite,
        align: 'center',
      },
      {
        name: 'name',
        required: true,
        label: 'Имя',
        field: (row: ProjectModel) => row.name,
        sortable: true,
        align: 'left',
      },
      {
        name: 'key',
        required: true,
        label: 'Ключ',
        field: (row: ProjectModel) => row.key,
        sortable: true,
        align: 'left',
      },
      {
        name: 'typeID',
        required: true,
        label: 'Тип',
        field: (row: ProjectModel) => ProjectTypeEnum[row.typeID],
        align: 'left',
      },
      {
        name: 'leader',
        required: true,
        label: 'Руководитель',
        field: (row: ProjectModel) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'actions',
        label: '',
        field: (row: ProjectModel) => row.id,
        align: 'right',
      },
    ]);

    const projects = computed(() => store.state.project.projects);

    onBeforeMount(async () => {
      if (!projects.value) await store.dispatch('project/getAll');
    });

    async function deleteProject(projectID: number) {
      try {
        dialog.startLoading();
        await store.dispatch('project/delete', projectID);
        dialog.close();
      } finally {
        dialog.stopLoading();
      }
    }

    async function toggleFavorite(projectID: number) {
      await store.dispatch('project/toggleFavorite', projectID);
    }

    function getProjectURL(project: ProjectModel) {
      const projectID = project.id;
      const firstBoardID = project.boards?.[0]?.id;

      if (firstBoardID) return `/projects/${projectID}/board/${firstBoardID}`;
      else return `/projects/${projectID}`;
    }

    return {
      dialog,

      columns,
      projects,
      deleteProject,

      toggleFavorite,

      getProjectURL,
    };
  },
});
</script>
