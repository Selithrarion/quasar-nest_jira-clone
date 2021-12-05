<template>
  <q-page class="people-page big-side-padding q-pb-xl">
    <div class="column gap-4 q-mt-lg">
      <div class="flex justify-end gap-2">
        <BaseButton label="Create a new team" secondary-color unelevated @click="dialog.open('createTeam')" />
        <BaseButton label="Add people" color="primary" unelevated />
      </div>

      <CommonSearch v-model="searchValue" placeholder="Search people and teams" :outlined="false" filled append-icon />
    </div>

    <BaseLoader v-if="loading.active.value" page-margin />
    <template v-else>
      <h6 class="text-body1">You work with</h6>
      <PeopleListUser>
        <PeopleListUserCard
          v-for="user in availableUsers"
          :key="user.id"
          :user="user"
          @click="router.push(`/people/${user.id}`)"
        />
      </PeopleListUser>

      <h6 class="text-body1">Your commands</h6>
      <PeopleListTeam>
        <PeopleListTeamCard
          v-for="team in availableTeams"
          :key="team.id"
          :team="team"
          @click="router.push(`/people/team/${team.id}`)"
        />
        <PeopleListTeamCardDefault @create-new="dialog.open('createTeam')" />
      </PeopleListTeam>
    </template>

    <PeopleDialogTeamCreate :model-value="dialog.openedName.value === 'createTeam'" @close="dialog.close" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';
import useLoading from 'src/composables/common/useLoading';

import CommonSearch from 'components/common/CommonSearch.vue';
import PeopleListUser from 'components/people/list/PeopleListUser.vue';
import PeopleListUserCard from 'components/people/list/PeopleListUserCard.vue';
import PeopleListTeam from 'components/people/list/PeopleListTeam.vue';
import PeopleListTeamCard from 'components/people/list/PeopleListTeamCard.vue';
import PeopleListTeamCardDefault from 'components/people/list/PeopleListTeamCardDefault.vue';
import PeopleDialogTeamCreate from 'components/people/PeopleDialogTeamCreate.vue';

import userRepository from 'src/repositories/userRepository';

import { TeamModel } from 'src/models/user/team.model';

export default defineComponent({
  name: 'People',

  components: {
    CommonSearch,
    PeopleListUser,
    PeopleListUserCard,
    PeopleListTeam,
    PeopleListTeamCard,
    PeopleListTeamCardDefault,
    PeopleDialogTeamCreate,
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const dialog = useDialog();
    const loading = useLoading({ default: true });

    const searchValue = ref('');

    const currentUser = computed(() => store.state.user.currentUser);
    const availableUsers = computed(() => [currentUser.value]);

    const availableTeams = ref<TeamModel[]>([]);
    onBeforeMount(async () => {
      availableTeams.value = await userRepository.getCurrentUserTeams();
      loading.stop();
    });

    return {
      router,
      dialog,
      loading,

      searchValue,

      currentUser,
      availableUsers,
      availableTeams,
    };
  },
});
</script>
