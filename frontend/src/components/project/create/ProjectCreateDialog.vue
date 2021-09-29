<template>
  <BaseDialog :actions="false" maximized @close="close">
    <template #title>
      <div class="flex justify-center text-h5 full-width">
        <div v-if="!selectedTypeID">{{ t('project.chooseType') }}</div>
        <div v-else>{{ t('project.create') }}</div>
      </div>
    </template>

    <template #default>
      <ProjectCreateSelectType v-if="!selectedTypeID" @select="selectType" />
      <ProjectCreateForm v-else :type-id="selectedTypeID" @back="resetType" />
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import ProjectCreateSelectType from 'components/project/create/ProjectCreateSelectType.vue';
import ProjectCreateForm from 'components/project/create/ProjectCreateForm.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ProjectCreateDialog',

  components: {
    ProjectCreateSelectType,
    ProjectCreateForm,
  },

  emits: ['close'],

  setup(props, { emit }) {
    const { t } = useI18n();

    const selectedTypeID = ref<number | null>(null);
    function selectType(type: number) {
      selectedTypeID.value = type;
    }
    function resetType() {
      selectedTypeID.value = null;
    }

    function close() {
      emit('close');
    }

    return {
      t,

      selectedTypeID,
      selectType,
      resetType,
      close,
    };
  },
});
</script>
