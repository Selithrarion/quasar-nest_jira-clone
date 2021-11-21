<template>
  <BaseDialog
    title="Create a new team"
    confirm-text="Create a team"
    :loading="loading.active.value"
    large
    @confirm="createTeam"
  >
    <div class="row q-pl-md">
      <div class="col-4 create-team-background" />
      <div class="col-8 q-pl-lg">
        <p class="q-mb-lg">
          Add employees to your team and work on tasks in one place. Track @mentions to stay up to date,
          collaborate and effectively manage all settings on your profile page teams.
          <a href="https://support.atlassian.com/atlassian-account/docs/what-is-an-atlassian-team/"> More details </a>
        </p>

        <div class="form-fields-wrapper">
          <q-input
            v-model="form.name"
            label="Team name"
            hint="What is the name of your team?"
            lazy-rules
            filled
            :rules="[rules.required, rules.max40]"
          />

          <CommonSelectUsers v-model="form.users" />
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { useRouter } from 'vue-router';
import useFormValidation from 'src/composables/form/useFormValidation';
import useLoading from 'src/composables/common/useLoading';

import CommonSelectUsers from 'components/common/CommonSelectUsers.vue';

import teamRepository from 'src/repositories/teamRepository';

export default defineComponent({
  name: 'PeopleDialogTeamCreate',

  components: {
    CommonSelectUsers,
  },

  setup() {
    const router = useRouter();
    const loading = useLoading();
    const rules = useFormValidation();

    const form = reactive({
      name: '',
      users: [],
    });

    async function createTeam() {
      try {
        loading.start();
        const team = await teamRepository.create(form);
        await openTeam(team.id);
      } finally {
        loading.stop();
      }
    }
    async function openTeam(teamID: number) {
      await router.push(`/people/team/${teamID}`);
    }

    return {
      rules,
      loading,

      form,
      createTeam,
    };
  },
});
</script>

<style lang="scss" scoped>
.create-team-background {
  background: url('src/assets/svg/create-team.svg') no-repeat center;
}
</style>
