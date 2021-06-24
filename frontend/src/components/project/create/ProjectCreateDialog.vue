<template>
  <BaseDialog :show="show" :actions="false" maximized @close="close">
    <template #title>
      <div class="flex justify-center text-h5 full-width">
        <div v-if="!selectedType">Выберите тип проекта</div>
        <div v-else>Создать проект</div>
      </div>
    </template>

    <template #default>
      <div class="project-create-dialog-content">
        <ProjectCreateSelectType v-if="!selectedType" @select="selectType" />
        <ProjectCreateForm v-else :type="selectedType" @back="resetType" />
      </div>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import BaseDialog from 'components/base/BaseDialog.vue';
import ProjectCreateSelectType from 'components/project/create/ProjectCreateSelectType.vue';
import ProjectCreateForm from 'components/project/create/ProjectCreateForm.vue';

export default defineComponent({
  name: 'ProjectCreateDialog',

  components: { BaseDialog, ProjectCreateSelectType, ProjectCreateForm },

  props: {
    show: {
      type: Boolean,
      required: true,
      default: null,
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
    const selectedType = ref<string | null>(null);
    function selectType(type: string) {
      selectedType.value = type;
    }
    function resetType() {
      selectedType.value = null;
    }

    function close() {
      emit('close');
    }

    return { selectedType, selectType, resetType, close };
  },
});
</script>
