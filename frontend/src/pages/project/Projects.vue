<template>
  <q-page class="projects-page">
    <CommonPageHeader
      page-title="Проекты"
      create-button-label="Создать проект"
      :filters="['type']"
      @create="dialog.open('create')"
    />

    <div class="q-px-xl q-mt-md">
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
              :label="props.row.name"
              :to="`/projects/${props.row.id}`"
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
            <q-btn class="q-mx-sm" :label="props.row.leader.name" :to="`/people/${props.row.leader.id}`" dense flat />
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <BaseButtonMore>
              <q-menu>
                <q-list>
                  <q-item v-close-popup clickable>
                    <q-item-section>Настройки проекта</q-item-section>
                  </q-item>
                  <q-item v-close-popup clickable>
                    <q-item-section>Переместить в коризну</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </BaseButtonMore>
          </q-td>
        </template>
      </q-table>
    </div>

    <ProjectCreateDialog :show="dialog.opened.value === 'create'" @close="dialog.close" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import useDialog from 'src/composables/common/useDialog';

import BaseButtonFavorite from 'components/base/button/BaseButtonFavorite.vue';
import BaseButtonMore from 'components/base/button/BaseButtonMore.vue';
import CommonPageHeader from 'components/common/CommonPageHeader.vue';
import ProjectCreateDialog from 'components/project/create/ProjectCreateDialog.vue';

import { ProjectInterface } from 'components/project/models/project.interface';

export default defineComponent({
  name: 'Projects',

  components: {
    BaseButtonFavorite,
    BaseButtonMore,
    CommonPageHeader,
    ProjectCreateDialog,
  },

  setup() {
    const dialog = useDialog();

    const columns = reactive([
      {
        name: 'favorite',
        label: '',
        field: (row: ProjectInterface) => row.favorite,
        align: 'center',
      },
      {
        name: 'name',
        required: true,
        label: 'Имя',
        field: (row: ProjectInterface) => row.name,
        sortable: true,
        align: 'left',
      },
      {
        name: 'key',
        required: true,
        label: 'Ключ',
        field: (row: ProjectInterface) => row.key,
        sortable: true,
        align: 'left',
      },
      {
        name: 'type',
        required: true,
        label: 'Тип',
        field: (row: ProjectInterface) => row.type,
        align: 'left',
      },
      {
        name: 'leader',
        required: true,
        label: 'Руководитель',
        field: (row: ProjectInterface) => row.leader,
        sortable: true,
        align: 'left',
      },
      {
        name: 'actions',
        label: '',
        field: (row: ProjectInterface) => row.id,
        align: 'right',
      },
    ]);
    const projects: ProjectInterface[] = reactive([
      {
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
    ]);

    function toggleFavorite(projectID: number) {
      const project = projects.find((p) => p.id === projectID);
      if (!project) return;

      project.favorite = !project.favorite;
    }

    return {
      dialog,
      columns,
      projects,
      toggleFavorite,
    };
  },
});
</script>
