<template>
  <Suspense>
    <template #default>
      <q-page class="projects-page">
        <CommonPageHeader
          page-title="Проекты"
          create-button-label="Создать проект"
          :filters="['type']"
          @create="dialog.open('create')"
        />

        <ProjectsPageTable />

        <ProjectCreateDialog :show="dialog.openedName.value === 'create'" @close="dialog.close" />
      </q-page>
    </template>

    <template #fallback>
      <BaseLoader page-margin />
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useDialog from 'src/composables/common/useDialog';

import BaseLoader from 'components/base/BaseLoader.vue';
import ProjectsPageTable from 'components/project/ProjectsPageTable.vue';
import CommonPageHeader from 'components/common/CommonPageHeader.vue';
import ProjectCreateDialog from 'components/project/create/ProjectCreateDialog.vue';

export default defineComponent({
  name: 'Projects',

  components: {
    BaseLoader,
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
