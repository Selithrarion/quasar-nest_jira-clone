<template>
  <q-page class="projects-page">
    <CommonPageHeader
      page-title="Проекты"
      create-button-label="Создать проект"
      :filters="['type']"
      @create="dialog.open('create')"
    />

    <ProjectsPageTable />

    <ProjectCreateDialog v-if="dialog.openedName.value === 'create'" @close="dialog.close" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useDialog from 'src/composables/common/useDialog';

import ProjectsPageTable from 'components/project/ProjectsPageTable.vue';
import CommonPageHeader from 'components/common/CommonPageHeader.vue';
import ProjectCreateDialog from 'components/project/create/ProjectCreateDialog.vue';

export default defineComponent({
  name: 'Projects',

  components: {
    CommonPageHeader,
    ProjectCreateDialog,
    ProjectsPageTable,
  },

  setup() {
    const dialog = useDialog();

    return {
      dialog,
    };
  },
});
</script>
