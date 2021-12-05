<template>
  <q-page class="projects-page">
    <CommonPageHeader
      :page-title="t('project.projects')"
      :create-button-label="t('project.create')"
      :filters="['type']"
      @create="dialog.open('create')"
    />

    <ProjectsPageTable />

    <ProjectCreateDialog :model-value="dialog.openedName.value === 'create'" @close="dialog.close" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
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
    const { t } = useI18n();
    const route = useRoute();
    const dialog = useDialog();

    onMounted(() => {
      if (route.query.instantCreate) dialog.open('create');
    });

    return {
      t,
      dialog,
    };
  },
});
</script>
