<template>
  <div>
    <p>Why are there two types of projects?</p>
    <p>
      Team-Driven Projects are a new kind of Jira Software Cloud projects built from the ground up.
      Note. Choice, which you will do in this step cannot be changed. The only way to change the project type is to create a new one project.
    </p>

    <div class="project-types-wrapper row q-pt-lg">
      <div class="project-type col">
        <div class="q-mb-md">
          <div class="text-subtitle1 text-blue-grey-14 text-weight-medium text-center">
            Company managed project
          </div>
          <div class="q-mt-sm q-mb-md">
            Company-managed Projects support popular Jira Software features that value consistent service users.
          </div>
        </div>

        <div class="column justify-center">
          <BaseButton label="Select company-managed" size="0.8rem" disable @click="select(ProjectTypeEnum.TEAM)" />
          <div class="project-type__caption q-pt-sm text-blue-grey-6">
            <div>You cannot create company managed projects.</div>
            <div>Contact your Jira admin.</div>
          </div>
        </div>
      </div>

      <div class="project-type col">
        <div class="q-mb-md">
          <div class="text-subtitle1 text-blue-grey-14 text-weight-medium text-center">
            Team-driven project
          </div>
          <div class="q-mt-sm q-mb-md">
            In team-driven projects, Jira Software is completely redesigned to make it easier to customize,
            use and service for software development teams of all sizes.
          </div>
        </div>

        <BaseButton
          color="primary"
          label="Select team-driven"
          size="0.8rem"
          unelevated
          @click="select(ProjectTypeEnum.SOFTWARE)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ProjectTypeEnum } from 'src/models/project/project.model';

export default defineComponent({
  name: 'ProjectCreateSelectType',

  emits: ['select'],

  setup(props, { emit }) {
    function select(type: number) {
      emit('select', type);
    }

    return {
      select,
      ProjectTypeEnum,
    };
  },
});
</script>

<style lang="scss" scoped>
.project-types-wrapper {
  gap: 8px;
  @media screen and (min-width: $breakpoint-sm-min) {
    gap: 24px;
  }
  @media screen and (min-width: $breakpoint-md-min) {
    gap: 48px;
  }
}
.project-type {
  background: $grey-2;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  &__caption {
    text-align: center;
    font-size: 11px;
  }
}
</style>
