<template>
  <q-card class="project-card hover-shadow-sm" flat bordered>
    <BaseAvatar
      class="project-card__avatar"
      :src="project.avatar && project.avatar.url"
      :item-name="project.name"
      :item-color="project.color"
    />

    <q-card-section>
      <div class="text-subtitle2 text-weight-bold ellipsis w-max-content" data-test="name">
        {{ project.name }}
        <BaseTooltip :label="project.name" />
      </div>
      <div class="text-caption ellipsis">
        {{ formatProjectType(project.typeID) }}
        <BaseTooltip :label="formatProjectType(project.typeID)" />
      </div>
    </q-card-section>

    <q-separator inset />

    <q-card-section class="text-caption q-py-xs text-center">
      <BaseButton
        data-test="openProject"
        class="q-pa-1"
        :label="t('work.boards', project.boards && project.boards.length)"
        :tooltip="t('work.openProject')"
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
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'WorkProjectCard',

  props: {
    project: {
      type: Object,
      required: true,
      default: null,
    },
  },

  setup() {
    const { t } = useI18n();
    const router = useRouter();

    function formatProjectType(typeID: number): string {
      return typeID === 1 ? t('project.companyManage') : t('project.teamManage');
    }

    async function openProject(projectID: number) {
      await router.push(`/projects/${projectID}`);
    }

    return {
      t,
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
