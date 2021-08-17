<template>
  <PeopleDetailSide
    button-label="Добавить людей"
    :name="team.name"
    show-more-button
    @button-click="dialog.open('addUsers')"
  >
    <template #moreButtonItems>
      <BaseItem label="Удалить команду" />
    </template>

    <template #append>
      <q-card>
        <q-card-section class="row gap-2">
          <CommonListTitle title="участники" />
          <BaseItem v-for="user in team.users" :key="user.id" @click="openUserProfile(user.id)">
            <q-item-section side>
              <q-avatar v-if="user.avatarURL" size="24px">
                <img :src="user.avatarURL" :alt="`${user.name} Avatar`" />
              </q-avatar>
              <q-avatar v-else :color="user.color" text-color="white" size="24px">
                <q-icon name="person" size="16px" />
              </q-avatar>
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
        <BaseSelect
          v-model="localAddedTeamUsers"
          :options="availableUsers"
          label="Их имя или @упоминание"
          hint="Вы можете пригласить не более 10 пользователей за раз."
          input-debounce="0"
          hide-selected
          fill-input
          use-input
          use-chips
        />
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
import PeopleDetailSide from 'components/people/detail/PeopleDetailSide.vue';

import { TeamModel } from 'src/models/user/team.model';

export default defineComponent({
  name: 'PeopleDetailSideTeam',

  components: {
    CommonListTitle,
    PeopleDetailSide,
  },

  props: {
    team: {
      type: Object as PropType<TeamModel>,
      required: true,
    },
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