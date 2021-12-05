<template>
  <PeopleDetailSide
    type="team"
    :item-id="team.id"
    :button-label="canEdit ? 'Add people' : null"
    :display-name="team.name"
    :name="team.name"
    :avatar="team.avatar"
    :color="team.color"
    :show-more-button="canEdit"
    :can-edit="canEdit"
    @button-click="dialog.open('addUsers')"
    @update:display-name="updateTeamInfo('name', $event)"
  >
    <template #moreButtonItems>
      <BaseItem v-if="canEdit" label="Delete command" @click="dialog.open('deleteTeam')" />
    </template>

    <template #append>
      <q-card>
        <q-card-section class="column gap-2">
          <CommonListTitle :title="t('people.membersNoCount')" />
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
        :model-value="dialog.openedName.value === 'addUsers'"
        :title="t('people.addTeamMembers')"
        :confirm-loading="dialog.loading.value"
        @close="dialog.close"
        @confirm="addUsersToTeam"
      >
        <!--TODO: hide already added users-->
        <CommonSelectUsers v-model="form.users" />
      </BaseDialog>
      <BaseDialog
        type="delete"
        :model-value="dialog.openedName.value === 'deleteTeam'"
        :title="t('people.deleteTeam')"
        :confirm-loading="dialog.loading.value"
        @close="dialog.close"
        @confirm="deleteTeam"
      >
        <!--eslint-disable-next-line vue/no-v-html-->
        <div v-html="t('people.deleteTeamText', { name: team.name, number: team.users.length })" />
      </BaseDialog>
    </template>
  </PeopleDetailSide>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import CommonListTitle from 'components/common/CommonListTitle.vue';
import CommonSelectUsers from 'components/common/CommonSelectUsers.vue';
import PeopleDetailSide from 'components/people/detail/PeopleDetailSide.vue';

import teamRepository from 'src/repositories/teamRepository';

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

  setup(props) {
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();
    const dialog = useDialog();

    async function addUsersToTeam() {
      try {
        dialog.startLoading();
        await teamRepository.addUsers(props.team.id, form.users);
      } finally {
        dialog.stopLoading();
      }
    }

    const form = reactive({
      users: [],
    });

    async function updateTeamInfo<T>(field: string, value: T) {
      const id = props.team.id;
      const payload = {
        [field]: value,
      };

      await store.dispatch('people/updateTeam', { id, payload });
    }
    async function deleteTeam() {
      try {
        dialog.startLoading();
        await teamRepository.delete(props.team.id);
        await router.push('/people');
      } finally {
        dialog.stopLoading();
      }
    }

    async function openUserProfile(userID: number) {
      await router.push(`/people/${userID}`);
    }

    return {
      t,
      dialog,

      form,
      addUsersToTeam,

      updateTeamInfo,
      deleteTeam,

      openUserProfile,
    };
  },
});
</script>
