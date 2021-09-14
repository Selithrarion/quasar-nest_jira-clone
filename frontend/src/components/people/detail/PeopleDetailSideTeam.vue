<template>
  <PeopleDetailSide
    :button-label="canEdit ? 'Добавить людей' : null"
    :name="team.name"
    :color="team.color"
    :show-more-button="canEdit"
    @button-click="dialog.open('addUsers')"
  >
    <template #moreButtonItems>
      <BaseItem v-if="canEdit" label="Удалить команду" />
    </template>

    <template #append>
      <q-card>
        <q-card-section class="row gap-2">
          <CommonListTitle title="участники" />
          <BaseItem v-for="user in team.users" :key="user.id" @click="openUserProfile(user.id)">
            <q-item-section side>
              <BaseAvatar :src="user.avatar && user.avatar.url" :item-name="user.name" :item-color="user.color" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ user.name }}</q-item-label>
              <q-item-label v-if="user.position" caption> {{ user.position }} </q-item-label>
            </q-item-section>
          </BaseItem>
        </q-card-section>
      </q-card>

      <BaseDialog
        v-if="dialog.openedName.value === 'addUsers'"
        title="Добавть участников в команду"
        @close="dialog.close"
        @confirm="addUsersToTeam"
      >
        <CommonSelectUsers v-model="localAddedTeamUsers" v-model:options="availableUsers" />
      </BaseDialog>
    </template>
  </PeopleDetailSide>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import CommonListTitle from 'components/common/CommonListTitle.vue';
import CommonSelectUsers from 'components/common/CommonSelectUsers.vue';
import PeopleDetailSide from 'components/people/detail/PeopleDetailSide.vue';

import { TeamModel } from 'src/models/user/team.model';

export default defineComponent({
  name: 'PeopleDetailSideTeam',

  components: {
    CommonListTitle,
    CommonSelectUsers,
    PeopleDetailSide,
  },

  props: {
    team: {
      type: Object as PropType<TeamModel>,
      required: true,
    },
    canEdit: Boolean,
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    const dialog = useDialog();

    const availableUsers = computed(() => store.state.people.availableUsers);
    const localAddedTeamUsers = ref([]);
    async function addUsersToTeam() {
      //
    }

    async function openUserProfile(userID: number) {
      await router.push(`/people/${userID}`);
    }

    return {
      dialog,

      availableUsers,
      localAddedTeamUsers,
      addUsersToTeam,

      openUserProfile,
    };
  },
});
</script>
