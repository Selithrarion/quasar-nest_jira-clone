<template>
  <q-card class="project-card hover-shadow-sm" flat bordered>
    <q-avatar class="project-card__avatar" />

    <q-card-section>
      <div class="text-subtitle2 text-weight-bold ellipsis w-max-content">
        {{ project.name }}
        <BaseTooltip :label="project.name" />
      </div>
      <!--TODO: i18n-->
      <div class="text-caption ellipsis">
        {{ formatProjectType(project.typeID) }}
        <BaseTooltip :label="formatProjectType(project.typeID)" />
      </div>
    </q-card-section>

    <q-separator inset />

    <!--TODO: i18n-->
    <q-card-section class="text-caption q-py-xs text-center">
      <BaseButton
        class="q-pa-1"
        :label="`${project.boards.length} досок`"
        tooltip="Открыть проект"
        size="sm"
        flat
        @click="openProject(project.id)"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import BaseTooltip from 'components/base/BaseTooltip.vue';

export default defineComponent({
  name: 'WorkProjectCard',

  components: {
    BaseTooltip,
  },

  props: {
    project: {
      type: Object,
      required: true,
      default: null,
    },
  },

  setup() {
    const router = useRouter();

    function formatProjectType(typeID: number): string {
      return typeID === 1
        ? 'Программное обеспечение, управляемое компанией'
        : 'Программное обеспечение, управляемое командой';
    }

    async function openProject(projectID: number) {
      await router.push(`/projects/${projectID}`);
    }

    return {
      formatProjectType,
      openProject,
    };
  },
});
</script>

<style lang="sass" scoped>
.project-card
  position: relative
  border-left: 20px solid #eeeeee
  width: 240px
  padding-left: 0.5rem
  &__avatar
    position: absolute
    top: 16px
    left: -12px
    width: 1.5rem
    height: 1.5rem
    background-color: #dbdde5
    border-radius: 4px !important
</style>
