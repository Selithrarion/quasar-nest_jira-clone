<template>
  <div class="q-px-xl q-mt-md">
    <BaseLoader v-if="!projects" page-margin />

    <q-table
      v-else
      v-model:pagination="pagination"
      row-key="name"
      :rows="projects"
      :columns="columns"
      :loading="loading.custom.table"
      @request="handleRequest"
    >
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
          <BaseButton
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
          <BaseAvatar
            class="q-mr-sm"
            size="md"
            :src="props.row.leader.avatar && props.row.leader.avatar.url"
            :item-name="props.row.leader.username"
            :item-color="props.row.leader.color"
            show-icon
          />
          <BaseButton
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
          <BaseButtonMore data-test="moreButton" block>
            <q-menu auto-close>
              <q-list>
                <BaseItem :label="t('project.settings')" />
                <BaseItem
                  data-test="deleteProject"
                  :label="t('project.trash')"
                  @click="dialog.open('deleteProject', { item: props.row })"
                />
              </q-list>
            </q-menu>
          </BaseButtonMore>
        </q-td>
      </template>
    </q-table>

    <BaseDialog
      type="delete"
      :model-value="dialog.openedName.value === 'deleteProject'"
      :title="`Delete ${dialog.openedItem.value.name}?`"
      :confirm-loading="dialog.loading.value"
      @close="dialog.close"
      @confirm="deleteProject(dialog.openedItem.value.id)"
    >
      {{ t('project.delete') }}
    </BaseDialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onBeforeMount } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import { ProjectModel, ProjectTypeEnum } from 'src/models/project/project.model';
import { PaginationTableProps } from 'src/models/common/pagination.model';
import useLoading from 'src/composables/common/useLoading';

export default defineComponent({
  name: 'ProjectsPageTable',

  setup() {
    const q = useQuasar();
    const { t } = useI18n();
    const store = useStore();
    const dialog = useDialog();
    const loading = useLoading({ customNames: ['table'] });

    const projects = computed(() => store.state.project.projects);
    const projectsMeta = computed(() => store.state.project.projectsMeta);

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: projectsMeta.value?.currentPage || 1,
      rowsPerPage: projectsMeta.value?.itemsPerPage || 5,
      rowsNumber: projectsMeta.value?.totalItems || 10,
    });
    async function handleRequest(props: PaginationTableProps) {
      try {
        loading.start('table');
        const { page, rowsPerPage, sortBy, descending } = props.pagination;
        await store.dispatch('project/getAll', { page, limit: rowsPerPage });
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;
      } finally {
        loading.stop('table');
      }
    }

    onBeforeMount(async () => {
      if (!projects.value) {
        await store.dispatch('project/getAll');
        pagination.value.page = projectsMeta.value?.currentPage || 1;
        pagination.value.rowsPerPage = projectsMeta.value?.itemsPerPage || 5;
        pagination.value.rowsNumber = projectsMeta.value?.totalItems || 10;
      }
    });

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
        label: t('table.name'),
        field: (row: ProjectModel) => row.name,
        sortable: true,
        align: 'left',
      },
      {
        name: 'key',
        required: true,
        label: t('table.key'),
        field: (row: ProjectModel) => row.key,
        sortable: true,
        align: 'left',
      },
      {
        name: 'typeID',
        required: true,
        label: t('table.type'),
        field: (row: ProjectModel) => ProjectTypeEnum[row.typeID],
        align: 'left',
      },
      {
        name: 'leader',
        required: true,
        label: t('table.leader'),
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

    async function deleteProject(projectID: number) {
      try {
        dialog.startLoading();
        await store.dispatch('project/delete', projectID);
        q.notify({
          type: 'positive',
          message: 'Project deleted',
        });
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
      return `/projects/${projectID}/board`;
    }

    return {
      t,
      dialog,
      loading,

      columns,
      projects,

      pagination,
      handleRequest,

      deleteProject,

      toggleFavorite,

      getProjectURL,
    };
  },
});
</script>
