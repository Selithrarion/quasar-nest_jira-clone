<template>
  <PeopleDetailSide
    type="user"
    :button-label="canEdit ? t('people.manageAccount') : null"
    :display-name="user.name"
    :name="user.username"
    :avatar="user.avatar"
    :color="user.color"
    :can-edit="canEdit"
    @button-click="openAccountSettingsPage"
    @update:name="updateUserInfo('username', $event)"
    @update:display-name="updateUserInfo('name', $event)"
  >
    <template #append>
      <q-card>
        <q-card-section class="column gap-2">
          <CommonListTitle :title="t('people.info')" />
          <q-input
            v-model="form.position"
            :label="canEdit ? t('people.yourPosition') : t('people.position')"
            :readonly="!canEdit"
            outlined
            dense
            @blur="updateUserInfo('position', form.position)"
            @keydown.enter="$event.target.blur()"
          >
            <BaseTooltip v-if="canEdit" label="Position name can be changed" />
          </q-input>
          <q-input
            v-model="form.department"
            :label="canEdit ? t('people.yourDepartment') : t('people.department')"
            :readonly="!canEdit"
            outlined
            dense
            @blur="updateUserInfo('department', form.department)"
            @keydown.enter="$event.target.blur()"
          >
            <BaseTooltip v-if="canEdit" label="Department name can be changed" />
          </q-input>
          <q-input
            v-model="form.organisation"
            :label="canEdit ? t('people.yourOrganisation') : t('people.organisation')"
            :readonly="!canEdit"
            outlined
            dense
            @blur="updateUserInfo('organisation', form.organisation)"
            @keydown.enter="$event.target.blur()"
          >
            <BaseTooltip v-if="canEdit" label="Organization name can be changed" />
          </q-input>
          <q-input
            v-model="form.location"
            :label="canEdit ? t('people.yourLocation') : t('people.location')"
            :readonly="!canEdit"
            outlined
            dense
            @blur="updateUserInfo('location', form.location)"
            @keydown.enter="$event.target.blur()"
          >
            <BaseTooltip v-if="canEdit" label="Location data can be changed" />
          </q-input>
        </q-card-section>

        <q-card-section class="column gap-2">
          <CommonListTitle :title="t('people.contactInfo')" />
          <BaseItem :clickable="canEdit" @click="canEdit ? dialog.open('changeEmail') : null">
            <q-item-section side>
              <q-icon name="mail_outline" size="24px" color="blue-grey-3" />
            </q-item-section>
            <q-item-section> {{ user.email }} </q-item-section>
            <q-item-section v-if="canEdit" side>
              <q-icon name="edit" size="20px" color="blue-grey-3" />
            </q-item-section>
          </BaseItem>
        </q-card-section>

        <q-card-section v-if="canEdit ? true : availableUserTeams.length" class="column gap-2">
          <CommonListTitle title="commands" />
          <BaseItem v-for="team in availableUserTeams" :key="team.id" @click="handleTeamClick(team.id)">
            <q-item-section side>
              <BaseAvatar
                size="32px"
                :src="team.avatar && team.avatar.url"
                :item-name="team.name"
                :item-color="team.color"
                :show-icon="!team.id"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ team.name }}</q-item-label>
              <q-item-label v-if="team.users" caption> {{ t('people.members', team.users.length) }} </q-item-label>
            </q-item-section>
          </BaseItem>
        </q-card-section>
      </q-card>

      <PeopleDialogEmailChange :model-value="dialog.openedName.value === 'changeEmail'" @close="dialog.close" />
      <PeopleDialogTeamCreate :model-value="dialog.openedName.value === 'createTeam'" @close="dialog.close" />
    </template>
  </PeopleDetailSide>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, PropType, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import useDialog from 'src/composables/common/useDialog';

import CommonListTitle from 'components/common/CommonListTitle.vue';
import PeopleDetailSide from 'components/people/detail/PeopleDetailSide.vue';
import PeopleDialogEmailChange from 'components/people/PeopleDialogEmailChange.vue';
import PeopleDialogTeamCreate from 'components/people/PeopleDialogTeamCreate.vue';

import { UserModel } from 'src/models/user/user.model';

export default defineComponent({
  name: 'PeopleDetailSideUser',

  components: {
    CommonListTitle,
    PeopleDetailSide,
    PeopleDialogEmailChange,
    PeopleDialogTeamCreate,
  },

  props: {
    user: {
      type: Object as PropType<UserModel>,
      required: true,
    },
    canEdit: Boolean,
  },

  setup(props) {
    const { t } = useI18n();
    const router = useRouter();
    const store = useStore();
    const dialog = useDialog();

    async function openAccountSettingsPage() {
      await router.push('/');
    }

    const createNewTeamItem = ref({
      id: 0,
      color: 'blue-grey-2',
      name: 'Create a new team',
    });
    const availableUserTeams = computed(() => {
      const teams = props.user.teams || [];
      if (props.canEdit) return [...teams, createNewTeamItem.value];
      else return teams;
    });
    async function handleTeamClick(teamID: number) {
      if (!teamID) dialog.open('createTeam');
      else await router.push(`/people/team/${teamID}`);
    }

    const form = reactive({
      position: props.user.position,
      department: props.user.department,
      organisation: props.user.organisation,
      location: props.user.location,
    });
    async function updateUserInfo<T>(field: string, value: T) {
      const id = props.user.id;
      const payload = {
        [field]: value,
      };

      await store.dispatch('people/updateUser', { id, payload });
    }

    return {
      t,
      dialog,

      openAccountSettingsPage,

      availableUserTeams,
      handleTeamClick,

      form,
      updateUserInfo,
    };
  },
});
</script>
