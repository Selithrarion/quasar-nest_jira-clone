<template>
  <BaseDialog :show="show" :actions="false" maximized @close="close">
    <template #title>
      <div class="flex justify-center text-h5 full-width">
        <div v-if="!selectedTypeID">Выберите тип проекта</div>
        <div v-else>Создать проект</div>
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
    },
  },

  emits: ['close'],

  setup(props, { emit }) {
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

    return { selectedTypeID, selectType, resetType, close };
  },
});
</script>
